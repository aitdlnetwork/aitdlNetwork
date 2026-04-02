/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { ChevronLeft, Save, Printer, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

interface Item {
  id?: number | null;
  name: string;
  desc: string;
  qty: number;
  rate: number;
}

interface Client {
  id: number;
  name: string;
  addr?: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  default_rate: number;
  default_qty: number;
  unit: string;
  stock: number;
  category: string;
}

export default function InvoiceEditor({ billId, onClose }: { billId: number | null, onClose: () => void }) {
  const { db, persistDB } = useERPDatabase();
  const [items, setItems] = useState<Item[]>([{ name: '', desc: '', qty: 1, rate: 0 }]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [oldBillNum, setOldBillNum] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const didLoad = useRef(false);
  
  const [form, setForm] = useState({
    billNum: '', docType: 'INVOICE', billStatus: 'draft',
    fromName: '', fromTagline: '', fromAddr: '',
    toName: '', toAddr: '', clientId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30*864e5).toISOString().split('T')[0],
    discount: 0, tax: 0, currency: '₹',
    bankName: '', bankBankName: '', bankAccNum: '', bankIFSC: '', bankType: '', bankBranch: '',
    showBank: true, upiId: '', upiName: '', showUPI: true,
    notes: 'Thank you for your business!', footerMsg: '', signLabel: 'Authorised Signature',
    showSign: true, showForCompany: true, showAITDLBrand: true
  });

  const loadBusinessProfile = useCallback(() => {
    if (!db) return;
    const res = db.exec(`SELECT key, value FROM business_profile`);
    if (res[0]) {
      const loaded: Record<string, string> = {};
      res[0].values.forEach(([key, val]) => {
        if (key) loaded[key as string] = val as string;
      });
      setForm(f => ({
        ...f,
        fromName: loaded.fromName || '',
        fromTagline: loaded.fromTagline || '',
        fromAddr: loaded.fromAddr || '',
        bankName: loaded.bankName || '',
        bankBankName: loaded.bankBankName || '',
        bankAccNum: loaded.bankAccNum || '',
        bankIFSC: loaded.bankIFSC || '',
        bankType: loaded.bankType || '',
        bankBranch: loaded.bankBranch || '',
        upiId: loaded.upiId || '',
        upiName: loaded.upiName || '',
        notes: loaded.notes || f.notes,
        footerMsg: loaded.footerMsg || '',
        signLabel: loaded.signLabel || f.signLabel,
        tax: parseFloat(loaded.defaultTax) || 0,
        discount: parseFloat(loaded.defaultDiscount) || 0
      }));
    }
  }, [db]);

  const generateBillNumber = useCallback(() => {
    if (!db) return;
    const r = db.exec(`SELECT COUNT(*) FROM bills`);
    const count = (r[0]?.values[0]?.[0] as number || 0) + 1;
    const yr = new Date().getFullYear();
    setForm(prev => ({ ...prev, billNum: `INV-${yr}-${String(count).padStart(3, '0')}` }));
  }, [db]);

  const loadBillFromDb = useCallback((id: number) => {
    if (!db) return;
    const r = db.exec(`SELECT * FROM bills WHERE id=?`, [id]);
    if (!r[0]) return;
    
    const cols = r[0].columns;
    const vals = r[0].values[0];
    const row: Record<string, any> = {};
    cols.forEach((c, i) => row[c] = vals[i]);

    setOldBillNum(row.bill_number || null);
    setForm({
      billNum: row.bill_number || '', docType: row.doc_type || 'INVOICE', billStatus: row.status || 'draft',
      fromName: row.from_name || '', fromTagline: row.from_tagline || '', fromAddr: row.from_addr || '',
      toName: row.to_name || '', toAddr: row.to_addr || '', clientId: row.client_id?.toString() || '',
      issueDate: row.issue_date || '', dueDate: row.due_date || '',
      discount: parseFloat(row.discount) || 0, tax: parseFloat(row.tax) || 0, currency: row.currency || '₹',
      bankName: row.bank_name || '', bankBankName: row.bank_bank || '', bankAccNum: row.bank_acc || '', 
      bankIFSC: row.bank_ifsc || '', bankType: row.bank_type || '', bankBranch: row.bank_branch || '',
      showBank: !!row.show_bank, upiId: row.upi_id || '', upiName: row.upi_name || '', showUPI: !!row.show_upi,
      notes: row.notes || '', footerMsg: row.footer_msg || '', signLabel: row.sign_label || '',
      showSign: !!row.show_sign, showForCompany: !!row.show_for_company, showAITDLBrand: row.show_aitdl !== 0
    });
    try { setItems(JSON.parse(row.items_json || '[]')); } catch { setItems([]); }
  }, [db]);

  useEffect(() => {
    if (!db) return;
    
    try {
      // Load dropdowns
      const cRes = db.exec(`SELECT id, name, addr FROM clients ORDER BY name`);
      if (cRes[0]) {
        setClients(cRes[0].values.map(c => ({
          id: c[0] as number,
          name: c[1] as string,
          addr: c[2] as string
        })));
      }

      const pRes = db.exec(`
        SELECT id, name, description, default_rate, default_qty, unit,
               COALESCE((SELECT SUM(CASE WHEN type='IN' THEN qty WHEN type='OUT' THEN -qty ELSE qty END) FROM inventory_ledger WHERE product_id = products.id), 0) as stock,
               category
        FROM products ORDER BY name
      `);
      if (pRes[0]) {
        setProducts(pRes[0].values.map(p => ({
          id: p[0] as number,
          name: p[1] as string,
          description: p[2] as string,
          default_rate: p[3] as number,
          default_qty: p[4] as number,
          unit: p[5] as string,
          stock: p[6] as number,
          category: p[7] as string
        })));
      }

      if (didLoad.current) return;
      didLoad.current = true;

      if (billId) {
        loadBillFromDb(billId);
      } else {
        loadBusinessProfile();
        generateBillNumber();
      }
    } catch (e) {
      console.error(e);
    }
  }, [db, billId, loadBillFromDb, loadBusinessProfile, generateBillNumber]);

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setForm({ ...form, clientId: id });
    if (!id || !db) return;
    const r = db.exec(`SELECT name, addr FROM clients WHERE id=?`, [parseInt(id)]);
    if (r[0]) {
      const [n, a] = r[0].values[0];
      setForm(prev => ({ ...prev, toName: n as string, toAddr: a as string }));
    }
  };

  const handleSave = () => {
    if (!db) return;
    if (!form.billNum) return alert("Bill Number is required");
    setErrorMsg(null);

    const subtotal = items.reduce((s, it) => s + (it.qty * it.rate), 0);
    const discAmt = subtotal * (form.discount / 100);
    const taxAmt = (subtotal - discAmt) * (form.tax / 100);
    const total = subtotal - discAmt + taxAmt;

    const cId = form.clientId ? parseInt(form.clientId) : null;
    
    const data = [
      form.billNum, form.docType, form.billStatus,
      form.fromName, form.fromTagline, form.fromAddr,
      form.toName, form.toAddr, cId,
      form.issueDate, form.dueDate,
      form.discount, form.tax, form.currency, subtotal, total,
      form.bankName, form.bankBankName, form.bankAccNum, form.bankIFSC, form.bankType, form.bankBranch,
      form.showBank ? 1 : 0,
      form.upiId, form.upiName, form.showUPI ? 1 : 0,
      form.notes, form.footerMsg, form.signLabel,
      form.showSign ? 1 : 0, form.showForCompany ? 1 : 0, form.showAITDLBrand ? 1 : 0,
      JSON.stringify(items)
    ];

    try {
      if (billId) {
        db.run(`UPDATE bills SET bill_number=?, doc_type=?, status=?, from_name=?, from_tagline=?, from_addr=?, to_name=?, to_addr=?, client_id=?, issue_date=?, due_date=?, discount=?, tax=?, currency=?, subtotal=?, total=?, bank_name=?, bank_bank=?, bank_acc=?, bank_ifsc=?, bank_type=?, bank_branch=?, show_bank=?, upi_id=?, upi_name=?, show_upi=?, notes=?, footer_msg=?, sign_label=?, show_sign=?, show_for_company=?, show_aitdl=?, items_json=?, updated_at=datetime('now') WHERE id=?`, [...data, billId]);
      } else {
        db.run(`INSERT INTO bills(bill_number, doc_type, status, from_name, from_tagline, from_addr, to_name, to_addr, client_id, issue_date, due_date, discount, tax, currency, subtotal, total, bank_name, bank_bank, bank_acc, bank_ifsc, bank_type, bank_branch, show_bank, upi_id, upi_name, show_upi, notes, footer_msg, sign_label, show_sign, show_for_company, show_aitdl, items_json) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, data);
      }
      
      // Ledger Sync
      if (oldBillNum && oldBillNum !== form.billNum) {
        db.run(`DELETE FROM inventory_ledger WHERE reference_doc=?`, [oldBillNum]);
      }
      db.run(`DELETE FROM inventory_ledger WHERE reference_doc=?`, [form.billNum]);
      if (form.billStatus === 'sent' || form.billStatus === 'paid') {
        items.forEach(it => {
            if(it.id) {
              db.run(`INSERT INTO inventory_ledger(product_id, type, reference_doc, qty) VALUES(?, 'OUT', ?, ?)`, [it.id, form.billNum, it.qty]);
            } else if (it.name && it.name.trim()) {
              // Fallback: name normalization lookup
              const pidRes = db.exec(`SELECT id FROM products WHERE LOWER(TRIM(name))=LOWER(TRIM(?)) LIMIT 1`, [it.name]);
              if(pidRes[0]) {
                const matchedId = pidRes[0].values[0][0];
                db.run(`INSERT INTO inventory_ledger(product_id, type, reference_doc, qty) VALUES(?, 'OUT', ?, ?)`, [matchedId, form.billNum, it.qty]);
              }
            }
        });
      }

      persistDB();
      setToast('Invoice Saved Successfully!');
      setTimeout(() => { onClose(); }, 800);
    } catch(err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (msg.includes('UNIQUE constraint failed')) {
        setErrorMsg(`Duplicate Entry: The bill/invoice number "${form.billNum}" is already in use.`);
      } else {
        setErrorMsg("Error saving document: " + msg);
      }
    }
  };

  const printDocument = () => {
    window.print();
  };

  // Preview Calculations
  const subtotal = items.reduce((s, it) => s + (it.qty * it.rate), 0);
  const discAmt = subtotal * (form.discount / 100);
  const taxAmt = (subtotal - discAmt) * (form.tax / 100);
  const total = subtotal - discAmt + taxAmt;

  const fmtDate = (s: string) => { if (!s) return '—'; const d = new Date(s); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };
  const upiPayload = `upi://pay?pa=${encodeURIComponent(form.upiId)}&pn=${encodeURIComponent(form.upiName)}&cu=INR`;
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=260x260&chl=${encodeURIComponent(upiPayload)}&choe=UTF-8`;

  return (
    <div className="flex flex-col h-full bg-[#0b0c16] print:bg-white print:text-black">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-sm backdrop-blur-md shadow-lg animate-fadeIn">
          <CheckCircle size={16} /> {toast}
        </div>
      )}
      {/* Topbar inside editor */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 print:hidden">
        <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-white transition">
          <ChevronLeft size={20} /> Back to List
        </button>
        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-4 py-2 rounded-sm font-bold text-sm tracking-wider uppercase transition">
            <Save size={16} /> Save Document
          </button>
          <button onClick={printDocument} className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-sm font-bold text-sm tracking-wider uppercase transition">
            <Printer size={16} /> Print / PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden print:overflow-visible h-full">
        {/* Left Sidebar Form Options */}
        <div className="w-[400px] border-r border-white/5 bg-[#12122a]/50 p-6 overflow-y-auto print:hidden space-y-6 form-sidebar">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-sm flex items-center gap-3">
               <AlertCircle size={20} />
               <span className="text-sm font-bold">{errorMsg}</span>
            </div>
          )}
          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-xs border-b border-white/5 pb-2">Document Settings</h3>
            <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="text-xs text-slate-400 uppercase">Doc Type</label>
                 <select value={form.docType} onChange={e=>setForm({...form, docType: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary">
                   <option>INVOICE</option>
                   <option>TAX INVOICE</option>
                   <option>PROFORMA</option>
                   <option>QUOTATION</option>
                   <option>RECEIPT</option>
                 </select>
               </div>
               <div>
                 <label className="text-xs text-slate-400 uppercase">Status</label>
                 <select value={form.billStatus} onChange={e=>setForm({...form, billStatus: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary">
                   <option value="draft">Draft</option>
                   <option value="sent">Sent</option>
                   <option value="paid">Paid</option>
                   <option value="overdue">Overdue</option>
                   <option value="cancelled">Cancelled</option>
                 </select>
               </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase">Doc Number</label>
              <input value={form.billNum} onChange={e=>setForm({...form, billNum: e.target.value})} className="w-full font-mono bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary"/>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-xs border-b border-white/5 pb-2">Bill To</h3>
            <div>
              <label className="text-xs text-slate-400 uppercase">Select Client</label>
              <select value={form.clientId} onChange={handleClientChange} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary mb-2">
                <option value="">-- Custom (No Client) --</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase">Billing Name</label>
              <input value={form.toName} onChange={e=>setForm({...form, toName: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary"/>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase">Billing Address</label>
              <textarea rows={3} value={form.toAddr} onChange={e=>setForm({...form, toAddr: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary"/>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-xs border-b border-white/5 pb-2">Dates & Currency</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-400 uppercase">Issue Date</label>
                <input type="date" value={form.issueDate} onChange={e=>setForm({...form, issueDate: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase">Due Date</label>
                <input type="date" value={form.dueDate} onChange={e=>setForm({...form, dueDate: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-slate-400 uppercase">Currency</label>
                <input value={form.currency} onChange={e=>setForm({...form, currency: e.target.value})} className="w-full font-mono bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none text-center" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase">Tax (%)</label>
                <input type="number" step="0.1" value={form.tax} onChange={e=>setForm({...form, tax: parseFloat(e.target.value)||0})} className="w-full font-mono bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none text-center" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase">Disc (%)</label>
                <input type="number" step="0.1" value={form.discount} onChange={e=>setForm({...form, discount: parseFloat(e.target.value)||0})} className="w-full font-mono bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none text-center" />
              </div>
            </div>
          </div>

        </div>

        {/* Central Edit Interface: Item Editor + A4 Container */}
        <div className="flex-1 flex flex-col items-center bg-[#05050A] overflow-y-auto p-8 pt-12 print:p-0 print:bg-white preview-pane">
           
           {/* Line Items Editor widget (Floating above preview logic-wise, but inline here) */}
           <div className="w-[794px] mb-8 bg-[#1a1a2e] border border-white/10 p-6 rounded-sm shadow-2xl print:hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-primary font-bold uppercase tracking-widest text-xs">Line Items Editor</h3>
                <div className="flex items-center gap-2">
                   <select onChange={(e) => {
                     const id = e.target.value;
                     if(!id) return;
                     const p = products.find(prod => prod.id.toString() === id);
                     if(p) setItems([...items, { id: p.id, name: p.name, desc: p.description||'', qty: p.default_qty||1, rate: p.default_rate||0 }]);
                     e.target.value = ''; // reset
                   }} className="bg-black/50 border border-white/10 rounded-sm px-3 py-1 text-xs text-white outline-none">
                     <option value="">+ From Catalogue</option>
                     {products.map((p) => {
                       const isService = p.category?.toLowerCase() === 'service' || p.category?.toLowerCase() === 'digital';
                       return (
                         <option key={p.id} value={p.id}>
                           {p.name} {!isService ? `(Stock: ${p.stock} ${p.unit})` : '(Service)'}
                         </option>
                       );
                     })}
                   </select>
                   <button onClick={() => setItems([...items, {id: null, name:'', desc: '', qty: 1, rate: 0}])} className="bg-primary/20 text-primary px-3 py-1 rounded-sm text-xs uppercase tracking-widest font-bold border border-primary/20 hover:bg-primary/30">+ Blank Row</button>
                </div>
              </div>
              <div className="space-y-3">
                 {items.map((it, i) => (
                   <div key={i} className="flex items-start gap-2 bg-black/20 p-2 rounded-sm border border-white/5">
                      <div className="flex-1 space-y-2">
                         <input value={it.name} onChange={e => { const updated = items.map((x, j) => j === i ? { ...x, name: e.target.value } : x); setItems(updated); }} placeholder="Item Name" className="w-full bg-transparent border-none text-white text-sm outline-none font-bold" />
                         <input value={it.desc} onChange={e => { const updated = items.map((x, j) => j === i ? { ...x, desc: e.target.value } : x); setItems(updated); }} placeholder="Description (Optional)" className="w-full bg-transparent border-none text-slate-400 text-xs outline-none" />
                      </div>
                      <div className="w-20">
                         <input type="number" step="0.01" value={it.qty} onChange={e => { const updated = items.map((x, j) => j === i ? { ...x, qty: parseFloat(e.target.value)||0 } : x); setItems(updated); }} className="w-full bg-black/50 border border-white/10 text-center text-white py-1 rounded-sm text-sm outline-none" />
                      </div>
                      <div className="w-28">
                         <input type="number" step="0.01" value={it.rate} onChange={e => { const updated = items.map((x, j) => j === i ? { ...x, rate: parseFloat(e.target.value)||0 } : x); setItems(updated); }} className="w-full bg-black/50 border border-white/10 text-right pr-2 text-white py-1 rounded-sm text-sm outline-none" />
                      </div>
                      <div className="w-32 text-right pt-1.5 font-mono text-primary font-bold">
                         {form.currency} {(it.qty*it.rate).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </div>
                      <button onClick={() => { const u=[...items]; u.splice(i,1); setItems(u); }} className="text-red-400 p-1 hover:bg-red-400/10 rounded-sm mt-0.5"><Trash2 size={16}/></button>
                   </div>
                 ))}
              </div>
           </div>

           {/* A4 PRINT PREVIEW AREA */}
           <div className="w-[794px] min-h-[1123px] bg-white text-black p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] print:shadow-none print:p-0 relative font-['DM_Sans',sans-serif]">
              
              {/* BRAND HEADER */}
              <div className="flex justify-between items-start mb-12">
                <div>
                   <div className="text-2xl font-black text-slate-900 tracking-tight">{form.fromName || 'Your Company Name'}</div>
                   <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1 mb-2">{form.fromTagline}</div>
                </div>
                <div className="text-right">
                   <div className="text-4xl font-black text-slate-200 uppercase tracking-tighter mix-blend-multiply">{form.docType}</div>
                   <div className="text-lg font-bold text-slate-700 font-mono mt-1">#{form.billNum || 'INV-000'}</div>
                </div>
              </div>

              {/* PARTIES */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-8 mb-8">
                 <div className="text-sm text-slate-600 space-y-1">
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">From</div>
                    <div className="font-bold text-slate-900">{form.fromName}</div>
                    <div className="whitespace-pre-line leading-relaxed">{form.fromAddr}</div>
                 </div>
                 <div className="text-sm text-slate-600 space-y-1 w-64">
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Bill To</div>
                    <div className="font-bold text-slate-900">{form.toName || 'Client Name'}</div>
                    <div className="whitespace-pre-line leading-relaxed">{form.toAddr}</div>
                 </div>
              </div>

              {/* META INFO */}
              <div className="flex gap-16 mb-8 text-sm border-b border-slate-200 pb-8">
                 <div>
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Issue Date</div>
                    <div className="font-bold text-slate-800">{fmtDate(form.issueDate)}</div>
                 </div>
                 <div>
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Due Date</div>
                    <div className="font-bold text-slate-800">{fmtDate(form.dueDate)}</div>
                 </div>
                 <div>
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Document No</div>
                    <div className="font-bold text-slate-800">{form.billNum}</div>
                 </div>
              </div>

              {/* TABLE */}
              <table className="w-full text-sm mb-8">
                 <thead>
                   <tr className="border-b-2 border-slate-900 text-left">
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900">Description</th>
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900 text-right w-24">Qty</th>
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900 text-right w-32">Rate</th>
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900 text-right w-32">Amount</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {items.map((it, i) => (
                     <tr key={i}>
                        <td className="py-4">
                           <div className="font-bold text-slate-800">{it.name || '—'}</div>
                           {it.desc && <div className="text-xs text-slate-500 mt-1">{it.desc}</div>}
                        </td>
                        <td className="py-4 text-right text-slate-600">{it.qty}</td>
                        <td className="py-4 text-right text-slate-600 font-mono">{form.currency}{it.rate.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                        <td className="py-4 text-right font-bold text-slate-800 font-mono">{form.currency}{(it.qty*it.rate).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                     </tr>
                   ))}
                 </tbody>
              </table>

              {/* TOTALS */}
              <div className="flex justify-end mb-12">
                 <div className="w-72 bg-slate-50 p-6 rounded-sm border border-slate-100">
                    <div className="flex justify-between text-sm mb-3 text-slate-600">
                       <span>Subtotal</span>
                       <span className="font-mono font-bold text-slate-800">{form.currency}{subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                    </div>
                    {form.discount > 0 && (
                      <div className="flex justify-between text-sm mb-3 text-slate-600">
                         <span>Discount ({form.discount}%)</span>
                         <span className="font-mono text-slate-800">− {form.currency}{discAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                      </div>
                    )}
                    {form.tax > 0 && (
                      <div className="flex justify-between text-sm mb-4 text-slate-600">
                         <span>Tax ({form.tax}%)</span>
                         <span className="font-mono text-slate-800">+ {form.currency}{taxAmt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-black text-slate-900 border-t-2 border-slate-200 pt-4">
                       <span>Total</span>
                       <span className="font-mono">{form.currency}{total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                    </div>
                 </div>
              </div>

              {/* FOOTER & PAYMENTS */}
              <div className="grid grid-cols-2 gap-8 text-sm text-slate-600">
                 <div>
                    {form.notes && (
                      <div className="mb-6">
                        <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Terms & Notes</div>
                        <div className="whitespace-pre-line text-xs">{form.notes}</div>
                      </div>
                    )}
                    {form.showBank && (
                      <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm text-xs space-y-1">
                         <div className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-2">Bank Transfer Details</div>
                         <div className="flex"><span className="w-24 text-slate-500">Beneficiary</span><span className="font-bold text-slate-800">{form.bankName}</span></div>
                         <div className="flex"><span className="w-24 text-slate-500">Bank</span><span className="font-bold text-slate-800">{form.bankBankName}</span></div>
                         <div className="flex"><span className="w-24 text-slate-500">Account No.</span><span className="font-bold font-mono text-slate-800">{form.bankAccNum}</span></div>
                         <div className="flex"><span className="w-24 text-slate-500">IFSC Code</span><span className="font-bold font-mono text-slate-800">{form.bankIFSC}</span></div>
                      </div>
                    )}
                 </div>
                 
                 <div className="flex flex-col justify-between items-end">
                    {form.showUPI && form.upiId && (
                       <div className="text-right flex flex-col items-end">
                          <div className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-2">Pay via UPI</div>
                          <img src={qrUrl} alt="UPI QR" className="w-28 h-28 object-contain mb-2" />
                          <div className="text-[10px] font-mono text-slate-500">{form.upiId}</div>
                       </div>
                    )}
                    {form.showSign && (
                       <div className="text-right mt-12 w-48">
                          {form.showForCompany && <div className="text-xs mb-10">For <span className="font-bold text-slate-900">{form.fromName}</span></div>}
                          <div className="border-t border-slate-300 pt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">{form.signLabel}</div>
                       </div>
                    )}
                 </div>
              </div>

              {/* AITDL POWERED BY */}
              {form.showAITDLBrand && (
                <div className="absolute bottom-6 left-0 right-0 text-center text-[9px] text-slate-400 font-mono tracking-widest uppercase border-t border-slate-100 pt-4 mx-12">
                   Powered & Managed By <strong>AITDL NETWORK</strong> &nbsp;|&nbsp; aitdl.in &nbsp;|&nbsp; Sovereign Node
                </div>
              )}
           </div>
        </div>
      </div>
      
      {/* Global Print CSS to hide everything except A4 box */}
      <style dangerouslySetInnerHTML={{__html:`
        @page { size: A4; margin: 0; }
        @media print {
          body { background: white !important; }
          .print\\:hidden, nav, header, .form-sidebar { display: none !important; }
          .preview-pane { padding: 0 !important; width: 100% !important; background: white !important; }
        }
      `}}/>
    </div>
  );
}
