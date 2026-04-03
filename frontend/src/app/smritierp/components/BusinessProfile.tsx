/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Save, CheckCircle } from 'lucide-react';

const INP = "w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white text-xs outline-none focus:border-primary/50 transition-colors";
const LBL = "block text-[9px] text-slate-500 uppercase font-black tracking-wider mb-1";
const SEC_TITLE = "text-[9px] text-primary font-black uppercase tracking-[0.2em] pb-2 border-b border-white/5 mb-4 flex items-center gap-2";

const TABS = [
  { id: 'profile', label: 'Business Profile', icon: 'apartment' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

const SETTINGS_TABS = [
  { id: 'inventory', label: 'Inventory (Retail)', icon: 'category' },
  { id: 'accounting', label: 'Accounting', icon: 'account_balance' },
  { id: 'invoice', label: 'Invoice', icon: 'receipt_long' },
  { id: 'tax', label: 'GST & Tax', icon: 'calculate' },
  { id: 'print', label: 'Print & PDF', icon: 'print' },
  { id: 'numbering', label: 'Numbering', icon: 'tag' },
  { id: 'creditnote', label: 'Credit Note', icon: 'undo' },
];

export default function BusinessProfile() {
  const { t } = useI18n();
  const { db, persistDB, lastUpdated, exportDatabase, importDatabase } = useERPDatabase();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [settingsTab, setSettingsTab] = useState('accounting');
  const [toast, setToast] = useState('');

  // All fields — profile + settings unified
  const [fields, setFields] = useState({
    // Profile
    fromName: '', fromTagline: '', fromAddr: '',
    fromGSTIN: '', fromPAN: '', fromCIN: '', fromMSME: '',
    bankName: '', bankBankName: '', bankAccNum: '', bankIFSC: '', bankType: '', bankBranch: '',
    upiId: '', upiName: '',
    notes: '', footerMsg: '', signLabel: '', shortcut_stealth: 'k',

    // Inventory & Custom Retail Attributes (Shoper9 Style)
    inv_attr1_label: 'Brand',
    inv_attr2_label: 'Size',
    inv_attr3_label: 'Color',
    inv_dynamic_fields: '', // comma-separated custom fields
    inv_price_groups: '', // comma-separated custom price groups (e.g. Local:INCLUSIVE, Outstation:EXCLUSIVE)
    inv_enable_mrp: 'true',
    inv_enable_barcode: 'true',

    // Accounting
    financialYearStart: '04', // April
    financialYearEnd: '03',   // March
    financialYearType: 'april-march', // indian standard
    defaultCurrency: '₹',
    currencyCode: 'INR',
    currencyDecimalPlaces: '2',
    defaultPaymentTerms: '30', // days
    accountingMethod: 'accrual', // accrual | cash
    enableRoundOff: 'true',
    roundOffType: 'nearest', // nearest | floor | ceil

    // Invoice Settings
    defaultTax: '18',
    defaultDiscount: '0',
    dueDays: '30',
    invoicePrefix: 'INV',
    invoiceNumberFormat: 'PREFIX-YYYY-NNN', // e.g. INV-2026-001
    invoiceAutoNumber: 'true',
    invoiceResetAnnually: 'true',
    invoiceStartNumber: '1',
    invoiceTerms: 'Payment is due within 30 days of invoice date.',
    invoiceFooterNote: 'Thank you for your business.',
    showAmountInWords: 'true',
    showHSN: 'true',
    showUOM: 'true',
    showBankOnInvoice: 'true',
    showUPIOnInvoice: 'true',
    showSignature: 'true',
    defaultSignLabel: 'Authorised Signatory',

    // Purchase Settings
    poPrefix: 'PO',
    poNumberFormat: 'PREFIX-YYYY-NNN',
    poAutoNumber: 'true',

    // GST & Tax
    gstRegistrationType: 'regular', // regular | composition | unregistered
    gstState: 'MH', // 2-letter state code for GSTIN
    defaultGSTMode: 'cgst-sgst', // cgst-sgst | igst
    defaultGSTSlab: '18', // %
    enableRCM: 'false', // Reverse Charge Mechanism
    enableTDS: 'false',
    tdsRate: '2',
    enableTCS: 'false',
    tcsRate: '0.1',
    compositionRate: '1', // for composition dealers

    // Print & PDF
    paperSize: 'A4', // A4 | A5 | Letter
    orientation: 'portrait',
    printMargin: '0', // mm
    printColorMode: 'color', // color | bw
    showWatermark: 'false',
    watermarkText: 'CONFIDENTIAL',
    printHeaderOnEachPage: 'false',
    logoBase64: '',
    logoWidth: '48', // px in document
    showLogoOnInvoice: 'true',

    // Serial Numbering
    invoiceCurrentNumber: '1',
    poCurrentNumber: '1',
    creditNotePrefix: 'CN',
    creditNoteCurrentNumber: '1',
    debitNotePrefix: 'DN',
    debitNoteCurrentNumber: '1',
    receiptPrefix: 'RCT',
    receiptCurrentNumber: '1',

    // Credit Note
    enableCreditNote: 'true',
    creditNoteValidity: '90', // days
    enableAdvanceCreditNote: 'false',
    advanceCreditNoteExpiry: '180',
    autoApplyCreditNote: 'false',
    creditNoteReason1: 'Sales Return',
    creditNoteReason2: 'Excess Billed',
    creditNoteReason3: 'Quality Issue',
    creditNoteReason4: 'Discount Adjustment',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToggle = (key: string) => {
    setFields(prev => ({ ...prev, [key]: prev[key as keyof typeof prev] === 'true' ? 'false' : 'true' }));
  };

  useEffect(() => {
    if (!db) return;
    try {
      const res = db.exec(`SELECT key, value FROM business_profile`);
      if (res[0]) {
        const loaded: Record<string, string> = {};
        res[0].values.forEach((row) => {
          const key = row[0] as string;
          const val = row[1] as string;
          if (key) loaded[key] = val || '';
        });
        setTimeout(() => setFields(prev => ({ ...prev, ...loaded })), 0);
      }
    } catch (e) { console.error(e); }
  }, [db]);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (confirm("Restore your Business Data? This will replace all current local records. Proceed?")) {
      importDatabase(file).then(() => {
        setToast('Data Restored Successfully.');
      }).catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        setToast(`Restore Failed: ${msg}`);
      });
    }
  };

  const handleSave = () => {
    if (!db) return;
    try {
      Object.entries(fields).forEach(([key, val]) => {
        db.run(`INSERT OR REPLACE INTO business_profile(key, value) VALUES(?, ?)`, [key, val]);
      });
      persistDB();
      setToast('Settings Saved & Synchronized.');
      setTimeout(() => setToast(''), 3000);
    } catch (e) {
      console.error(e);
      setToast('Save Failed.');
    }
  };

  const Toggle = ({ name, label, desc }: { name: string; label: string; desc?: string }) => {
    const isOn = fields[name as keyof typeof fields] === 'true';
    return (
      <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
        <div>
          <div className="text-xs text-white font-bold">{label}</div>
          {desc && <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>}
        </div>
        <button onClick={() => handleToggle(name)} className={`relative shrink-0 w-9 h-5 rounded-full transition-colors ${isOn ? 'bg-primary' : 'bg-white/10'}`}>
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${isOn ? 'translate-x-4' : 'translate-x-0'}`} />
        </button>
      </div>
    );
  };

  const Field = ({ name, label, type = 'text', placeholder = '', size = 'full', options }: {
    name: string; label: string; type?: string; placeholder?: string; size?: 'full' | 'half'; options?: { value: string; label: string }[];
  }) => (
    <div className={size === 'half' ? 'col-span-1' : 'col-span-2'}>
      <label className={LBL}>{label}</label>
      {options ? (
        <select name={name} value={fields[name as keyof typeof fields]} onChange={handleChange} className={INP}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input name={name} type={type} value={fields[name as keyof typeof fields]} onChange={handleChange} placeholder={placeholder} className={INP} />
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ fontFamily: "'Inter',sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[500] flex items-center gap-2 bg-green-600/90 text-white px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider shadow-2xl backdrop-blur-md">
          <CheckCircle size={14} /> {toast}
        </div>
      )}

      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-white/5 px-8 pt-8 pb-6 shrink-0">
        <div>
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">{t('erp_profile_title')}</h2>
          <p className="text-slate-500 text-xs font-display tracking-widest uppercase">Sovereign Configuration & Identity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] text-slate-600 uppercase tracking-widest">Last Write: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}</div>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all" style={{ background: '#00d4aa', color: '#0b0c16' }}>
            <Save size={13} /> Save All
          </button>
        </div>
      </div>

      {/* Top Tabs */}
      <div className="flex gap-0 border-b border-white/5 px-8 shrink-0">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as 'profile' | 'settings')}
            className={`flex items-center gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
            <span className="material-symbols-outlined text-[14px]">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ── PROFILE TAB ──────────────────────────────────────────────── */}
      {activeTab === 'profile' && (
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

            {/* Data Portability */}
            <div className="md:col-span-2 bg-primary/5 p-5 border border-primary/20 rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                  <div>
                    <div className="text-primary font-bold uppercase tracking-widest text-xs">Sovereign Data Portability</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest">Zero-Knowledge Offline-First Infrastructure</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={exportDatabase} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px]">download</span> {t('erp_profile_export')}
                  </button>
                  <label className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-[13px]">upload</span> {t('erp_profile_import')}
                    <input type="file" onChange={handleImportFile} className="hidden" accept=".sqlite" />
                  </label>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 italic bg-white/3 border border-white/5 p-3 rounded-sm">
                AITDL SmritiERP operates on a Zero-Knowledge model. We do not sync, track, or possess your database. Your business data is entirely sovereign and local.
              </div>
            </div>

            {/* Entity Identity */}
            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">apartment</span> Entity Identity</div>
              <div className="space-y-3">
                <div><label className={LBL}>Business / Trade Name</label><input name="fromName" value={fields.fromName} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Tagline / Department</label><input name="fromTagline" value={fields.fromTagline} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Registered Address</label><textarea name="fromAddr" value={fields.fromAddr} onChange={handleChange} className={INP + ' resize-none'} rows={3} /></div>
              </div>
            </div>

            {/* GST Identity */}
            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">badge</span> Regulatory Identity</div>
              <div className="space-y-3">
                <div><label className={LBL}>GSTIN</label><input name="fromGSTIN" value={fields.fromGSTIN} onChange={handleChange} className={INP + ' font-mono'} placeholder="27AAAAA0000A1Z5" /></div>
                <div><label className={LBL}>PAN Number</label><input name="fromPAN" value={fields.fromPAN} onChange={handleChange} className={INP + ' font-mono'} placeholder="ABCDE1234F" /></div>
                <div><label className={LBL}>CIN (if applicable)</label><input name="fromCIN" value={fields.fromCIN} onChange={handleChange} className={INP + ' font-mono'} /></div>
                <div><label className={LBL}>MSME / Udyam No.</label><input name="fromMSME" value={fields.fromMSME} onChange={handleChange} className={INP + ' font-mono'} /></div>
              </div>
            </div>

            {/* Banking */}
            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">account_balance</span> Bank Account</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><label className={LBL}>Beneficiary / Account Name</label><input name="bankName" value={fields.bankName} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Bank Name</label><input name="bankBankName" value={fields.bankBankName} onChange={handleChange} className={INP} /></div>
                <div><label className={LBL}>Account Number</label><input name="bankAccNum" value={fields.bankAccNum} onChange={handleChange} className={INP + ' font-mono'} /></div>
                <div><label className={LBL}>IFSC Code</label><input name="bankIFSC" value={fields.bankIFSC} onChange={handleChange} className={INP + ' font-mono'} /></div>
                <div><label className={LBL}>Branch</label><input name="bankBranch" value={fields.bankBranch} onChange={handleChange} className={INP} /></div>
              </div>
            </div>

            {/* UPI & Digital */}
            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">payments</span> UPI & Digital Payments</div>
              <div className="space-y-3">
                <div><label className={LBL}>UPI ID</label><input name="upiId" value={fields.upiId} onChange={handleChange} className={INP + ' font-mono'} placeholder="name@bankname" /></div>
                <div><label className={LBL}>UPI Display Name</label><input name="upiName" value={fields.upiName} onChange={handleChange} className={INP} /></div>
              </div>
              <div className={SEC_TITLE + ' mt-5'}><span className="material-symbols-outlined text-[14px]">edit_note</span> Document Defaults</div>
              <div className="space-y-3">
                <div><label className={LBL}>Default Invoice Notes</label><textarea name="notes" value={fields.notes} onChange={handleChange} className={INP + ' resize-none'} rows={2} /></div>
                <div><label className={LBL}>Signature Label</label><input name="signLabel" value={fields.signLabel} onChange={handleChange} className={INP} placeholder="Authorised Signatory" /></div>
              </div>
            </div>

            {/* Stealth / Privacy */}
            <div className="md:col-span-2 bg-white/5 p-5 rounded-sm border border-white/10">
              <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">visibility_off</span> Privacy / Focus Mode</div>
              <div className="flex items-center gap-6">
                <div>
                  <label className={LBL}>Focus Mode Hotkey (Ctrl + ?)</label>
                  <input name="shortcut_stealth" maxLength={1} value={fields.shortcut_stealth} onChange={handleChange} className={INP + ' w-16 text-center font-mono uppercase font-black'} placeholder="K" />
                </div>
                <div className="text-[10px] text-slate-500 max-w-sm leading-relaxed mt-4">
                  Toggle focus mode with <kbd className="px-1.5 py-0.5 bg-white/10 rounded-sm text-primary font-mono text-[9px]">Ctrl+{fields.shortcut_stealth.toUpperCase()}</kbd> — hides all web navigation, leaving only the SmritiERP workspace visible.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── SETTINGS TAB ─────────────────────────────────────────────── */}
      {activeTab === 'settings' && (
        <div className="flex flex-1 min-h-0">
          {/* Settings Sub-nav */}
          <div className="w-44 shrink-0 border-r border-white/5 bg-[#0a0a1a] overflow-y-auto py-3">
            {SETTINGS_TABS.map(st => (
              <button key={st.id} onClick={() => setSettingsTab(st.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-wider transition-all ${settingsTab === st.id ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-slate-500 hover:text-slate-300 hover:bg-white/3'}`}>
                <span className="material-symbols-outlined text-[14px]">{st.icon}</span> {st.label}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl space-y-6">

              {/* ── INVENTORY (RETAIL EXTENSIONS) ── */}
              {settingsTab === 'inventory' && (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">edit_attributes</span> Standard Retail Attributes</div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                      Define the standard 3 core hierarchies for your products. Changing the labels here updates the inventory UI instantly.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={LBL}>Attribute 1 Label</label><input name="inv_attr1_label" value={fields.inv_attr1_label} onChange={handleChange} className={INP} /></div>
                      <div><label className={LBL}>Attribute 2 Label</label><input name="inv_attr2_label" value={fields.inv_attr2_label} onChange={handleChange} className={INP} /></div>
                      <div><label className={LBL}>Attribute 3 Label</label><input name="inv_attr3_label" value={fields.inv_attr3_label} onChange={handleChange} className={INP} /></div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-green-500/20 rounded-sm p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px] text-green-400">database</span> Advanced Infinite Attributes</div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                      Need more than 3 attributes? Type an infinite list of custom fields separated by commas (e.g. <span className="text-white font-mono bg-white/10 px-1 rounded">Material, Weight, Expiry, Voltage</span>). The system will automatically build a dynamic Entity-Value document for every single product in your master dataset to track these properties!
                    </p>
                    <div>
                      <label className={LBL}>Your Custom Fields (Comma Separated)</label>
                      <input name="inv_dynamic_fields" value={fields.inv_dynamic_fields} onChange={handleChange} className={`${INP} border-green-500/30 text-green-400 font-bold tracking-widest`} placeholder="Warranty, Grade, RAM, ROM..." />
                    </div>
                  </div>

                  {/* PRICE GROUPS CONFIG */}
                  <div className="bg-white/5 border border-purple-500/20 rounded-sm p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px] text-purple-400">price_change</span> Shoper 9 Price Groups (MTP)</div>
                    <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                      Create mathematical Pricing Groups and attach them to Clients. Define Tax inclusion limits natively to force Reverse-Tax parsing in Billing. Format: <span className="text-white font-mono bg-white/10 px-1 rounded">Name:TaxMode</span>. Valid Tax Modes are <b>INCLUSIVE</b> or <b>EXCLUSIVE</b>.<br/><br/>
                      Example: <span className="text-purple-300 font-mono">Local:INCLUSIVE, Outstation:EXCLUSIVE, Wholesale:EXCLUSIVE</span>
                    </p>
                    <div>
                      <label className={LBL}>Price Margin Policies (Comma Separated mappings)</label>
                      <input name="inv_price_groups" value={fields.inv_price_groups} onChange={handleChange} className={`${INP} border-purple-500/30 text-purple-300 font-bold tracking-widest`} placeholder="Local:INCLUSIVE, VIP:EXCLUSIVE..." />
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">toggle_on</span> Module Features</div>
                    <div className="space-y-0">
                      <Toggle name="inv_enable_mrp" label="Enable MRP Tracking" desc="Track Manufacturer Retail Price separately from standard Sales Rate" />
                      <Toggle name="inv_enable_barcode" label="Enable Barcode / SKU Parsing" desc="Show dedicated SKU and Barcode association fields in product master" />
                    </div>
                  </div>
                </>
              )}

              {/* ── ACCOUNTING ── */}
              {settingsTab === 'accounting' && (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">calendar_month</span> Financial Year</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LBL}>FY Type</label>
                        <select name="financialYearType" value={fields.financialYearType} onChange={handleChange} className={INP}>
                          <option value="april-march">April – March (Indian Standard)</option>
                          <option value="jan-dec">January – December</option>
                          <option value="july-june">July – June</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Accounting Method</label>
                        <select name="accountingMethod" value={fields.accountingMethod} onChange={handleChange} className={INP}>
                          <option value="accrual">Accrual Basis</option>
                          <option value="cash">Cash Basis</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Default Currency</label>
                        <select name="defaultCurrency" value={fields.defaultCurrency} onChange={handleChange} className={INP}>
                          <option value="₹">₹ INR — Indian Rupee</option>
                          <option value="$">$ USD — US Dollar</option>
                          <option value="€">€ EUR — Euro</option>
                          <option value="£">£ GBP — British Pound</option>
                          <option value="AED">AED — UAE Dirham</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Decimal Places</label>
                        <select name="currencyDecimalPlaces" value={fields.currencyDecimalPlaces} onChange={handleChange} className={INP}>
                          <option value="0">0 (e.g. ₹1,234)</option>
                          <option value="2">2 (e.g. ₹1,234.00)</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Default Payment Terms (Days)</label>
                        <input name="defaultPaymentTerms" type="number" value={fields.defaultPaymentTerms} onChange={handleChange} className={INP} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">tune</span> Round Off Settings</div>
                    <div className="space-y-0">
                      <Toggle name="enableRoundOff" label="Enable Round Off on Totals" desc="Automatically round the Grand Total to nearest rupee" />
                    </div>
                    <div className="mt-4">
                      <label className={LBL}>Round Off Method</label>
                      <select name="roundOffType" value={fields.roundOffType} onChange={handleChange} className={INP}>
                        <option value="nearest">Round to Nearest (standard)</option>
                        <option value="floor">Always Round Down</option>
                        <option value="ceil">Always Round Up</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* ── INVOICE ── */}
              {settingsTab === 'invoice' && (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">receipt_long</span> Invoice Configuration</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LBL}>Default Tax (%)</label>
                        <select name="defaultTax" value={fields.defaultTax} onChange={handleChange} className={INP}>
                          {['0','0.1','0.25','1','1.5','3','5','6','7.5','12','18','28'].map(v => (
                            <option key={v} value={v}>{v}%</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Default Discount (%)</label>
                        <input name="defaultDiscount" type="number" value={fields.defaultDiscount} onChange={handleChange} className={INP} min="0" max="100" />
                      </div>
                      <div>
                        <label className={LBL}>Default Due (Days)</label>
                        <input name="dueDays" type="number" value={fields.dueDays} onChange={handleChange} className={INP} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">edit_document</span> Default Text</div>
                    <div className="space-y-3">
                      <div><label className={LBL}>Invoice Terms & Conditions</label><textarea name="invoiceTerms" value={fields.invoiceTerms} onChange={handleChange} className={INP + ' resize-none'} rows={3} /></div>
                      <div><label className={LBL}>Footer Note</label><input name="invoiceFooterNote" value={fields.invoiceFooterNote} onChange={handleChange} className={INP} /></div>
                      <div><label className={LBL}>Signature Label</label><input name="defaultSignLabel" value={fields.defaultSignLabel} onChange={handleChange} className={INP} placeholder="Authorised Signatory" /></div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">toggle_on</span> Display Options</div>
                    <div className="space-y-0">
                      <Toggle name="showAmountInWords" label="Show Amount in Words" desc="Display grand total in words on every invoice" />
                      <Toggle name="showHSN" label="Show HSN/SAC Code" desc="Display HSN code column in items table" />
                      <Toggle name="showUOM" label="Show Unit of Measure" desc="Display UOM (pcs, kg, etc.) column" />
                      <Toggle name="showBankOnInvoice" label="Show Bank Details" desc="Print bank account details on invoice footer" />
                      <Toggle name="showUPIOnInvoice" label="Show UPI Details" desc="Print UPI ID on invoice for easy payment" />
                      <Toggle name="showSignature" label="Show Signature Block" desc="Show authorised signatory section" />
                    </div>
                  </div>
                </>
              )}

              {/* ── GST & TAX ── */}
              {settingsTab === 'tax' && (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">receipt</span> GST Registration</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LBL}>Registration Type</label>
                        <select name="gstRegistrationType" value={fields.gstRegistrationType} onChange={handleChange} className={INP}>
                          <option value="regular">Regular Taxpayer</option>
                          <option value="composition">Composition Dealer</option>
                          <option value="unregistered">Unregistered</option>
                          <option value="sez">SEZ Unit</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Default GST Mode</label>
                        <select name="defaultGSTMode" value={fields.defaultGSTMode} onChange={handleChange} className={INP}>
                          <option value="cgst-sgst">CGST + SGST (Intra-State)</option>
                          <option value="igst">IGST (Inter-State)</option>
                          <option value="auto">Auto Detect by State</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Default GST Slab</label>
                        <select name="defaultGSTSlab" value={fields.defaultGSTSlab} onChange={handleChange} className={INP}>
                          {['0','0.1','0.25','1','1.5','3','5','6','7.5','12','18','28'].map(v => (
                            <option key={v} value={v}>{v}%</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Composition Rate (if applicable)</label>
                        <select name="compositionRate" value={fields.compositionRate} onChange={handleChange} className={INP}>
                          <option value="1">1% (Traders)</option>
                          <option value="2">2% (Manufacturers)</option>
                          <option value="5">5% (Restaurants)</option>
                          <option value="6">6% (Services)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">policy</span> TDS / TCS / RCM</div>
                    <div className="space-y-0 mb-4">
                      <Toggle name="enableRCM" label="Reverse Charge Mechanism (RCM)" desc="Apply RCM on applicable purchases from unregistered dealers" />
                      <Toggle name="enableTDS" label="TDS Deduction" desc="Enable Tax Deducted at Source on eligible payments" />
                      <Toggle name="enableTCS" label="TCS Collection" desc="Enable Tax Collected at Source on eligible sales" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div><label className={LBL}>Default TDS Rate (%)</label><input name="tdsRate" type="number" value={fields.tdsRate} onChange={handleChange} className={INP} step="0.1" /></div>
                      <div><label className={LBL}>Default TCS Rate (%)</label><input name="tcsRate" type="number" value={fields.tcsRate} onChange={handleChange} className={INP} step="0.01" /></div>
                    </div>
                  </div>
                </>
              )}

              {/* ── PRINT ── */}
              {settingsTab === 'print' && (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">print</span> Paper & Layout</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LBL}>Paper Size</label>
                        <select name="paperSize" value={fields.paperSize} onChange={handleChange} className={INP}>
                          <option value="A4">A4 (210×297mm) — Standard</option>
                          <option value="A5">A5 (148×210mm)</option>
                          <option value="Letter">US Letter (216×279mm)</option>
                          <option value="Legal">Legal (216×356mm)</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Orientation</label>
                        <select name="orientation" value={fields.orientation} onChange={handleChange} className={INP}>
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                        </select>
                      </div>
                      <div>
                        <label className={LBL}>Print Color Mode</label>
                        <select name="printColorMode" value={fields.printColorMode} onChange={handleChange} className={INP}>
                          <option value="color">Full Color</option>
                          <option value="bw">Black & White</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">image</span> Logo & Branding</div>
                    <div className="space-y-0 mb-4">
                      <Toggle name="showLogoOnInvoice" label="Show Logo on Invoice" desc="Display business logo in document header" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className={LBL}>Logo Width (px in document)</label>
                        <input name="logoWidth" type="number" value={fields.logoWidth} onChange={handleChange} className={INP} min="24" max="200" />
                      </div>
                      <div>
                        <label className={LBL}>Upload Logo (Base64 encode)</label>
                        <div className="flex items-center gap-3">
                          {fields.logoBase64 && (
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center overflow-hidden">
                              <img src={fields.logoBase64} alt="Logo" className="max-w-full max-h-full object-contain" />
                            </div>
                          )}
                          <label className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-all">
                            <span className="material-symbols-outlined text-[14px]">upload</span> Upload Logo
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => setFields(p => ({ ...p, logoBase64: ev.target?.result as string }));
                              reader.readAsDataURL(file);
                            }} />
                          </label>
                          {fields.logoBase64 && (
                            <button onClick={() => setFields(p => ({ ...p, logoBase64: '' }))} className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-sm text-[10px] font-bold uppercase text-red-400 hover:bg-red-500/20 transition-all">Remove</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">water</span> Watermark</div>
                    <div className="space-y-0 mb-4">
                      <Toggle name="showWatermark" label="Enable Watermark" desc="Show diagonal text watermark on printed document" />
                    </div>
                    <div>
                      <label className={LBL}>Watermark Text</label>
                      <input name="watermarkText" value={fields.watermarkText} onChange={handleChange} className={INP} placeholder="CONFIDENTIAL" />
                    </div>
                  </div>
                </>
              )}

              {/* ── NUMBERING ── */}
              {settingsTab === 'numbering' && (
                <>
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-sm p-4 text-[10px] text-amber-400 leading-relaxed">
                    <span className="material-symbols-outlined text-[14px] mr-1 align-middle">warning</span>
                    Changing number formats will apply to newly created documents only. Existing documents retain their original numbers.
                  </div>
                  {[
                    { prefix: 'invoicePrefix', current: 'invoiceCurrentNumber', title: 'Sales Invoice', format: 'invoiceNumberFormat', icon: 'receipt_long' },
                    { prefix: 'poPrefix', current: 'poCurrentNumber', title: 'Purchase Order', format: 'poNumberFormat', icon: 'shopping_cart' },
                    { prefix: 'creditNotePrefix', current: 'creditNoteCurrentNumber', title: 'Credit Note', icon: 'undo' },
                    { prefix: 'debitNotePrefix', current: 'debitNoteCurrentNumber', title: 'Debit Note', icon: 'redo' },
                    { prefix: 'receiptPrefix', current: 'receiptCurrentNumber', title: 'Receipt / Payment', icon: 'payments' },
                  ].map(doc => (
                    <div key={doc.prefix} className="bg-white/5 border border-white/10 rounded-sm p-5">
                      <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">{doc.icon}</span> {doc.title} Numbering</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={LBL}>Prefix</label>
                          <input name={doc.prefix} value={fields[doc.prefix as keyof typeof fields]} onChange={handleChange} className={INP + ' font-mono'} placeholder="INV" />
                        </div>
                        <div>
                          <label className={LBL}>Current / Start Number</label>
                          <input name={doc.current} type="number" value={fields[doc.current as keyof typeof fields]} onChange={handleChange} className={INP + ' font-mono'} />
                        </div>
                        {doc.format && (
                          <div className="col-span-2">
                            <label className={LBL}>Number Format</label>
                            <select name={doc.format} value={fields[doc.format as keyof typeof fields]} onChange={handleChange} className={INP}>
                              <option value="PREFIX-YYYY-NNN">PREFIX-YYYY-NNN (e.g. INV-2026-001)</option>
                              <option value="PREFIX-YY-NNN">PREFIX-YY-NNN (e.g. INV-26-001)</option>
                              <option value="YYYY-PREFIX-NNN">YYYY-PREFIX-NNN (e.g. 2026-INV-001)</option>
                              <option value="PREFIX-NNN">PREFIX-NNN (e.g. INV-001)</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">event_repeat</span> Reset Policy</div>
                    <div className="space-y-0">
                      <Toggle name="invoiceAutoNumber" label="Auto-increment Invoice Numbers" desc="Automatically assign next number on new document creation" />
                      <Toggle name="invoiceResetAnnually" label="Reset Counter on New Financial Year" desc="Restart numbering from the start number each April 1st" />
                    </div>
                  </div>
                </>
              )}

              {/* ── CREDIT NOTE ── */}
              {settingsTab === 'creditnote' && (
                <>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">undo</span> Credit Note Settings</div>
                    <div className="space-y-0 mb-4">
                      <Toggle name="enableCreditNote" label="Enable Credit Notes" desc="Allow creation of credit notes against sales invoices" />
                      <Toggle name="enableAdvanceCreditNote" label="Enable Advance Credit Note" desc="Allow issuance of credit notes before the original invoice is settled" />
                      <Toggle name="autoApplyCreditNote" label="Auto-Apply Credit Notes" desc="Automatically apply outstanding credit notes to new invoices for the same party" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className={LBL}>Credit Note Validity (Days)</label>
                        <input name="creditNoteValidity" type="number" value={fields.creditNoteValidity} onChange={handleChange} className={INP} />
                        <div className="text-[9px] text-slate-600 mt-1">After this period, the credit note expires and cannot be applied.</div>
                      </div>
                      <div>
                        <label className={LBL}>Advance Credit Note Expiry (Days)</label>
                        <input name="advanceCreditNoteExpiry" type="number" value={fields.advanceCreditNoteExpiry} onChange={handleChange} className={INP} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-sm p-5">
                    <div className={SEC_TITLE}><span className="material-symbols-outlined text-[14px]">list</span> Credit Note Reasons</div>
                    <p className="text-[10px] text-slate-500 mb-3">Pre-set reason options shown in the credit note form dropdown.</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['creditNoteReason1','creditNoteReason2','creditNoteReason3','creditNoteReason4'].map((key, i) => (
                        <div key={key}>
                          <label className={LBL}>Reason {i + 1}</label>
                          <input name={key} value={fields[key as keyof typeof fields]} onChange={handleChange} className={INP} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-sm p-4 text-[10px] text-slate-400 leading-relaxed">
                    <span className="material-symbols-outlined text-primary text-[14px] mr-1 align-middle">info</span>
                    <strong className="text-primary">Indian GST Rule:</strong> Credit notes must be issued by the earlier of: 30th September of the next financial year, or the date of filing the annual return (GSTR-9). Advance credit notes are permitted under Section 34 of the CGST Act for supply adjustments.
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
