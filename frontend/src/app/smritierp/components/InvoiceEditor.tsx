/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { ChevronLeft, Save, Printer, Plus, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Item {
  id?: number | null;
  name: string;
  desc: string;
  qty: number;
  rate: number;
  hsn?: string;
  uom?: string;
}

interface Client {
  id: number;
  name: string;
  addr?: string;
  gst?: string;
  pan?: string;
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
  hsn_code?: string;
}

// RUPEES IN WORDS (INDIAN SYSTEM)
function numberToWords(num: number): string {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const n = ('000000000' + num).substr(-9);
    if (parseInt(n) === 0) return 'Zero Only';
    
    let str = '';
    str += parseInt(n[0] + n[1]) !== 0 ? (a[parseInt(n[0] + n[1])] || b[parseInt(n[0])] + ' ' + a[parseInt(n[1])]) + 'Crore ' : '';
    str += parseInt(n[2] + n[3]) !== 0 ? (a[parseInt(n[2] + n[3])] || b[parseInt(n[2])] + ' ' + a[parseInt(n[3])]) + 'Lakh ' : '';
    str += parseInt(n[4] + n[5]) !== 0 ? (a[parseInt(n[4] + n[5])] || b[parseInt(n[4])] + ' ' + a[parseInt(n[5])]) + 'Thousand ' : '';
    str += parseInt(n[6]) !== 0 ? (a[parseInt(n[6])] || b[parseInt(n[6])] + ' ' + a[parseInt(n[6])]) + 'Hundred ' : '';
    str += (parseInt(n.substr(7)) !== 0 && str !== '' ? 'and ' : '') + (a[parseInt(n.substr(7))] || b[parseInt(n[7])] + ' ' + a[parseInt(n[8])]);
    
    return str.trim() + ' Rupees Only';
}

export default function InvoiceEditor({ billId: initialBillId, onClose }: { billId: number | null, onClose: () => void }) {
  const { db, persistDB } = useERPDatabase();
  const [currentBillId, setCurrentBillId] = useState<number | null>(initialBillId); // TRACK ID INTERNALLY
  const [items, setItems] = useState<Item[]>([{ name: '', desc: '', qty: 1, rate: 0, hsn: '', uom: 'pcs' }]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [oldBillNum, setOldBillNum] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [isSaving, setIsSaving] = useState(false); // PREVENT DOUBLE CLICKS
  const didLoad = useRef(false);
  
  const [form, setForm] = useState({
    billNum: '', docType: 'INVOICE', billStatus: 'draft',
    fromName: '', fromTagline: '', fromAddr: '', fromGSTIN: '', fromPAN: '',
    toName: '', toAddr: '', toGSTIN: '', toPAN: '', clientId: '',
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
        fromGSTIN: loaded.fromGSTIN || '',
        fromPAN: loaded.fromPAN || '',
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
      fromGSTIN: row.from_gstin || '', fromPAN: row.from_pan || '',
      toName: row.to_name || '', toAddr: row.to_addr || '', toGSTIN: row.to_gstin || '', toPAN: row.to_pan || '',
      clientId: row.client_id?.toString() || '',
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
      const cRes = db.exec(`SELECT id, name, addr, gst, pan FROM clients ORDER BY name`);
      if (cRes[0]) {
        setClients(cRes[0].values.map(c => ({
          id: c[0] as number,
          name: c[1] as string,
          addr: c[2] as string,
          gst: c[3] as string,
          pan: c[4] as string
        })));
      }

      const pRes = db.exec(`
        SELECT id, name, description, default_rate, default_qty, unit,
               COALESCE((SELECT SUM(CASE WHEN type='IN' THEN qty WHEN type='OUT' THEN -qty ELSE qty END) FROM inventory_ledger WHERE product_id = products.id), 0) as stock,
               category, hsn_code
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
          category: p[7] as string,
          hsn_code: p[8] as string
        })));
      }

      if (didLoad.current) return;
      didLoad.current = true;

      if (currentBillId) {
        loadBillFromDb(currentBillId);
      } else {
        loadBusinessProfile();
        generateBillNumber();
      }
    } catch (e) {
      console.error(e);
    }
  }, [db, currentBillId, loadBillFromDb, loadBusinessProfile, generateBillNumber]);

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setForm({ ...form, clientId: id });
    if (!id || !db) return;
    const r = db.exec(`SELECT name, addr, gst, pan FROM clients WHERE id=?`, [parseInt(id)]);
    if (r[0]) {
      const [n, a, g, p] = r[0].values[0];
      setForm(prev => ({ ...prev, toName: n as string, toAddr: a as string, toGSTIN: g as string || '', toPAN: p as string || '' }));
    }
  };

  const handleSave = () => {
    if (!db || isSaving) return;
    if (!form.billNum) return alert("Bill Number is required");
    setErrorMsg(null);
    setIsSaving(true);

    const subtotal = items.reduce((s, it) => s + (it.qty * it.rate), 0);
    const discAmt = subtotal * (form.discount / 100);
    const taxAmt = (subtotal - discAmt) * (form.tax / 100);
    const total = subtotal - discAmt + taxAmt;

    const cId = form.clientId ? parseInt(form.clientId) : null;
    
    const data = [
      form.billNum, form.docType, form.billStatus,
      form.fromName, form.fromTagline, form.fromAddr, form.fromGSTIN, form.fromPAN,
      form.toName, form.toAddr, form.toGSTIN, form.toPAN, cId,
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
      if (currentBillId) {
        db.run(`UPDATE bills SET bill_number=?, doc_type=?, status=?, from_name=?, from_tagline=?, from_addr=?, from_gstin=?, from_pan=?, to_name=?, to_addr=?, to_gstin=?, to_pan=?, client_id=?, issue_date=?, due_date=?, discount=?, tax=?, currency=?, subtotal=?, total=?, bank_name=?, bank_bank=?, bank_acc=?, bank_ifsc=?, bank_type=?, bank_branch=?, show_bank=?, upi_id=?, upi_name=?, show_upi=?, notes=?, footer_msg=?, sign_label=?, show_sign=?, show_for_company=?, show_aitdl=?, items_json=?, updated_at=datetime('now') WHERE id=?`, [...data, currentBillId]);
      } else {
        db.run(`INSERT INTO bills(bill_number, doc_type, status, from_name, from_tagline, from_addr, from_gstin, from_pan, to_name, to_addr, to_gstin, to_pan, client_id, issue_date, due_date, discount, tax, currency, subtotal, total, bank_name, bank_bank, bank_acc, bank_ifsc, bank_type, bank_branch, show_bank, upi_id, upi_name, show_upi, notes, footer_msg, sign_label, show_sign, show_for_company, show_aitdl, items_json) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, data);
        
        // CAPTURE NEW ID TO PREVENT DUPLICATES ON NEXT CLICK
        const idRes = db.exec("SELECT last_insert_rowid()");
        if (idRes[0]) {
            setCurrentBillId(idRes[0].values[0][0] as number);
        }
      }
      
      if (oldBillNum && oldBillNum !== form.billNum) {
        db.run(`DELETE FROM inventory_ledger WHERE reference_doc=?`, [oldBillNum]);
      }
      db.run(`DELETE FROM inventory_ledger WHERE reference_doc=?`, [form.billNum]);
      if (form.billStatus === 'sent' || form.billStatus === 'paid') {
        items.forEach(it => {
            if(it.id) {
              db.run(`INSERT INTO inventory_ledger(product_id, type, reference_doc, qty) VALUES(?, 'OUT', ?, ?)`, [it.id, form.billNum, it.qty]);
            } else if (it.name && it.name.trim()) {
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
      setTimeout(() => { setIsSaving(false); setToast(''); }, 2000);
    } catch(err: unknown) {
      setIsSaving(false);
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (msg.includes('UNIQUE constraint failed')) {
        setErrorMsg(`Duplicate Entry: The bill/invoice number "${form.billNum}" is already in use.`);
      } else {
        setErrorMsg("Error saving document: " + msg);
      }
    }
  };

  const subtotal = items.reduce((s, it) => s + (it.qty * it.rate), 0);
  const discAmnt = subtotal * (form.discount / 100);
  const taxableAmnt = subtotal - discAmnt;
  const taxAmnt = taxableAmnt * (form.tax / 100);
  const grandTotal = taxableAmnt + taxAmnt;
  const finalTotal = Math.round(grandTotal);
  const roundOff = (finalTotal - grandTotal).toFixed(2);

  const fmtDate = (s: string) => { if (!s) return '—'; const d = new Date(s); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=260x260&chl=${encodeURIComponent(`upi://pay?pa=${form.upiId}&pn=${form.upiName}&cu=INR`)}&choe=UTF-8`;

  return (
    <div className="flex flex-col h-full bg-[#0b0c16] print:bg-white print:text-black printable-container">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-sm backdrop-blur-md shadow-lg animate-fadeIn">
          <CheckCircle size={16} /> {toast}
        </div>
      )}
      <div className="flex items-center justify-between p-4 border-b border-white/5 print:hidden">
        <button onClick={onClose} className="flex items-center gap-2 text-slate-400 hover:text-white transition">
           <ChevronLeft size={20} /> Back to List
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 disabled:opacity-50 px-4 py-2 rounded-sm font-bold text-sm tracking-wider uppercase transition"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Processing...' : 'Save Document'}
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-sm font-bold text-sm tracking-wider uppercase transition">
            <Printer size={16} /> Print / PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden print:overflow-visible h-full">
        <div className="w-[420px] border-r border-white/5 bg-[#12122a]/50 p-6 overflow-y-auto print:hidden space-y-6 form-sidebar">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-sm flex items-center gap-3">
               <AlertCircle size={20} />
               <span className="text-sm font-bold">{errorMsg}</span>
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] border-b border-white/5 pb-2">Document & Status</h3>
            <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="text-[9px] text-slate-500 uppercase font-black">Type</label>
                 <select value={form.docType} onChange={e=>setForm({...form, docType: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none">
                   <option>INVOICE</option><option>TAX INVOICE</option><option>PROFORMA</option><option>QUOTATION</option>
                 </select>
               </div>
               <div>
                 <label className="text-[9px] text-slate-500 uppercase font-black">Status</label>
                 <select value={form.billStatus} onChange={e=>setForm({...form, billStatus: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none">
                   <option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option>
                 </select>
               </div>
            </div>
            <div>
              <label className="text-[9px] text-slate-500 uppercase font-black">Invoice #</label>
              <input value={form.billNum} onChange={e=>setForm({...form, billNum: e.target.value})} className="w-full font-mono bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none"/>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] border-b border-white/5 pb-2">Buyer (Customer) Details</h3>
            <select value={form.clientId} onChange={handleClientChange} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none mb-2">
               <option value="">-- Choose Client --</option>
               {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="text-[9px] text-slate-500 uppercase font-black">GSTIN</label>
                 <input value={form.toGSTIN} onChange={e=>setForm({...form, toGSTIN: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none" placeholder="27XXXXX..."/>
               </div>
               <div>
                 <label className="text-[9px] text-slate-500 uppercase font-black">PAN</label>
                 <input value={form.toPAN} onChange={e=>setForm({...form, toPAN: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none" placeholder="ABCDE1234F"/>
               </div>
            </div>
            <div>
              <label className="text-[9px] text-slate-500 uppercase font-black">Address</label>
              <textarea rows={2} value={form.toAddr} onChange={e=>setForm({...form, toAddr: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none"/>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-[10px] border-b border-white/5 pb-2">Business (Seller) Refs</h3>
            <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="text-[9px] text-slate-500 uppercase font-black">Your GSTIN</label>
                 <input value={form.fromGSTIN} onChange={e=>setForm({...form, fromGSTIN: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none"/>
               </div>
               <div>
                 <label className="text-[9px] text-slate-500 uppercase font-black">Your PAN</label>
                 <input value={form.fromPAN} onChange={e=>setForm({...form, fromPAN: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-xs text-white outline-none"/>
               </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center bg-[#05050A] overflow-y-auto p-8 pt-12 print:p-0 print:bg-white preview-pane">
           
           <div className="w-[850px] mb-8 bg-[#1a1a2e] border border-white/10 p-6 rounded-sm shadow-2xl print:hidden">
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                <h3 className="text-primary font-bold uppercase tracking-widest text-[10px]">Professional Line Items</h3>
                <button onClick={() => setItems([...items, {name:'', desc: '', qty: 1, rate: 0, hsn: '', uom: 'pcs'}])} className="text-primary text-[10px] font-bold uppercase">+ Add Row</button>
              </div>
              <div className="space-y-3">
                 {items.map((it, i) => (
                   <div key={i} className="flex items-start gap-2 bg-black/20 p-2 rounded-sm border border-white/5">
                      <div className="flex-1 space-y-1">
                         <input value={it.name} onChange={e => { const u = [...items]; u[i].name = e.target.value; setItems(u); }} placeholder="Item Name" className="w-full bg-transparent border-none text-white text-xs outline-none font-bold" />
                         <div className="flex gap-2">
                            <input value={it.hsn} onChange={e => { const u = [...items]; u[i].hsn = e.target.value; setItems(u); }} placeholder="HSN/SAC" className="w-24 bg-black/20 text-[10px] text-slate-400 px-2 py-0.5 rounded-sm" />
                            <input value={it.uom} onChange={e => { const u = [...items]; u[i].uom = e.target.value; setItems(u); }} placeholder="Unit (pcs)" className="w-16 bg-black/20 text-[10px] text-slate-400 px-2 py-0.5 rounded-sm" />
                         </div>
                      </div>
                      <div className="w-16">
                         <label className="text-[8px] text-slate-500 uppercase block">Qty</label>
                         <input type="number" value={it.qty} onChange={e => { const u = [...items]; u[i].qty = parseFloat(e.target.value)||0; setItems(u); }} className="w-full bg-black/50 border border-white/10 text-center text-white py-1 rounded-sm text-xs outline-none" />
                      </div>
                      <div className="w-24">
                         <label className="text-[8px] text-slate-500 uppercase block text-right">Rate</label>
                         <input type="number" value={it.rate} onChange={e => { const u = [...items]; u[i].rate = parseFloat(e.target.value)||0; setItems(u); }} className="w-full bg-black/50 border border-white/10 text-right pr-2 text-white py-1 rounded-sm text-xs outline-none" />
                      </div>
                      <button onClick={() => { const u=[...items]; u.splice(i,1); setItems(u); }} className="text-red-400 p-1 hover:bg-red-400/10 rounded-sm mt-4"><Trash2 size={14}/></button>
                   </div>
                 ))}
              </div>
           </div>

            <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 p-16 shadow-[0_40px_100px_rgba(0,0,0,0.6)] print:shadow-none print:p-12 relative font-['Inter',sans-serif] leading-normal animate-fadeIn document-a4-sheet">
               
               <div className="flex justify-between items-start mb-16">
                 <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                       <div className="size-14 rounded-2xl bg-slate-900 flex items-center justify-center text-primary shadow-xl">
                          <span className="material-symbols-outlined text-4xl">verified</span>
                       </div>
                       <div>
                          <h1 className="text-2xl font-['Outfit',sans-serif] font-black tracking-tighter text-slate-900 uppercase">{form.fromName || 'Business Profile'}</h1>
                          <p className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase">{form.fromTagline || 'Sovereign Node'}</p>
                       </div>
                    </div>
                    <div className="text-[10px] text-slate-500 leading-relaxed max-w-[280px] border-l-2 border-slate-100 pl-4">
                       <p className="whitespace-pre-line mb-3">{form.fromAddr}</p>
                       <div className="grid grid-cols-2 gap-x-4 border-t border-slate-50 pt-3">
                          <div className="space-y-1">
                             <span className="text-[8px] font-black text-slate-300 uppercase block">GSTIN</span>
                             <span className="font-mono text-slate-800 font-bold tracking-tighter">{form.fromGSTIN || 'UNREGISTERED'}</span>
                          </div>
                          <div className="space-y-1">
                             <span className="text-[8px] font-black text-slate-300 uppercase block">PAN</span>
                             <span className="font-mono text-slate-800 font-bold tracking-tighter">{form.fromPAN || 'N/A'}</span>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="text-right flex flex-col items-end gap-4">
                    <div className="inline-flex flex-col items-end px-8 py-6 bg-slate-50 border border-slate-100 rounded-3xl shadow-sm">
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Grand Total ({form.currency})</span>
                       <span className="text-4xl font-['Outfit',sans-serif] font-black text-slate-900 leading-none">
                          {finalTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                       </span>
                    </div>
                    <div className="flex flex-col items-end gap-1 px-4">
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{form.docType}</span>
                       <span className="text-lg font-mono font-bold text-slate-900">#{form.billNum}</span>
                    </div>
                 </div>
               </div>

               <div className="grid grid-cols-3 gap-12 mb-16 pb-12 border-b border-slate-100">
                  <div className="col-span-1 border-r border-slate-100 pr-8">
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-4">Consignee (Bill To)</span>
                     <div className="font-['Outfit',sans-serif] font-bold text-slate-900 mb-2">{form.toName || 'Valued Customer'}</div>
                     <div className="text-[10px] text-slate-500 leading-relaxed whitespace-pre-line mb-4">{form.toAddr}</div>
                     <div className="space-y-1">
                        <div className="text-[8px] font-black text-slate-300 uppercase">Buyer GSTIN</div>
                        <div className="font-mono text-[9px] font-bold text-slate-900 tracking-tighter">{form.toGSTIN || 'NOT PROVIDED'}</div>
                     </div>
                  </div>
                  <div className="col-span-2 grid grid-cols-3 gap-8 pl-4">
                     <div><span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">Issue Date</span><div className="text-sm font-bold text-slate-800">{fmtDate(form.issueDate)}</div></div>
                     <div><span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">Due Date</span><div className="text-sm font-bold text-slate-800">{fmtDate(form.dueDate)}</div></div>
                     <div><span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">Status</span><span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600">{form.billStatus}</span></div>
                  </div>
               </div>

               <div className="mb-12">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-b-2 border-slate-900 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                           <th className="py-4 font-black">Product / Service Description</th>
                           <th className="py-4 px-2 text-center">HSN/SAC</th>
                           <th className="py-4 px-2 text-center w-16">Qty</th>
                           <th className="py-4 px-2 text-center w-16">UOM</th>
                           <th className="py-4 text-right w-24">Rate</th>
                           <th className="py-4 text-right w-28">Amount</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {items.map((it, i) => (
                           <tr key={i} className="group">
                              <td className="py-5 pr-4">
                                 <div className="font-['Outfit',sans-serif] font-bold text-slate-900 text-[13px]">{it.name || 'Undefined Item'}</div>
                                 <div className="text-[10px] text-slate-400 italic mt-0.5">{it.desc}</div>
                              </td>
                              <td className="py-5 px-2 text-center font-mono text-[10px] text-slate-500">{it.hsn || '—'}</td>
                              <td className="py-5 px-2 text-center text-xs font-bold text-slate-700">{it.qty}</td>
                              <td className="py-5 px-2 text-center text-[10px] uppercase text-slate-400">{it.uom || 'pcs'}</td>
                              <td className="py-5 text-right text-xs font-mono text-slate-500">{it.rate.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                              <td className="py-5 text-right text-[13px] font-['Outfit',sans-serif] font-black text-slate-900">{(it.qty*it.rate).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="grid grid-cols-5 gap-12 items-start pt-8 border-t border-slate-100">
                  <div className="col-span-3">
                     <div className="mb-8">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-3">Amount in Words</span>
                        <div className="text-[11px] font-bold text-slate-900 leading-relaxed bg-slate-50 p-4 border-l-4 border-primary/20 italic capitalize whitespace-normal">{numberToWords(finalTotal)}</div>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        {form.showBank && (
                           <div className="bg-slate-900 text-slate-300 p-6 rounded-3xl space-y-3 shadow-xl">
                              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/60 block border-b border-white/5 pb-2">Institutional Settlement</span>
                              <div className="text-xs font-bold text-white leading-tight">{form.bankName}<br/><span className="text-[9px] font-mono text-slate-500">{form.bankBankName}</span></div>
                              <div className="grid grid-cols-2 gap-4">
                                 <div><span className="text-[8px] text-slate-500 uppercase font-black block">Account</span><span className="text-[10px] font-bold font-mono text-white">{form.bankAccNum}</span></div>
                                 <div><span className="text-[8px] text-slate-500 uppercase font-black block">IFSC</span><span className="text-[10px] font-bold font-mono text-white">{form.bankIFSC}</span></div>
                              </div>
                           </div>
                        )}
                        {form.showUPI && form.upiId && (
                           <div className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col items-center gap-4 text-center shadow-sm">
                              <div className="p-2 border border-slate-100 rounded-2xl"><img src={qrUrl} alt="UPI" className="w-20 h-20 grayscale opacity-40 hover:opacity-100 transition-opacity" /></div>
                              <div className="text-[9px] font-black text-slate-900 tracking-tighter">{form.upiId}</div>
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="col-span-2 space-y-4">
                     <div className="space-y-3 px-6 py-8 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex justify-between text-[11px] text-slate-500 font-black uppercase"><span>Taxable Value</span><span>{form.currency}{taxableAmnt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                        <div className="flex justify-between text-[11px] text-slate-500 font-black uppercase"><span>GST ({form.tax}%)</span><span className="text-green-600">+ {form.currency}{taxAmnt.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase italic border-t border-slate-200 pt-3"><span>Rounding Off</span><span>{roundOff >= 0 ? '+' : ''}{roundOff}</span></div>
                        <div className="pt-6 flex justify-between items-end border-t border-slate-200">
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Due</span>
                           <span className="text-3xl font-['Outfit',sans-serif] font-black text-slate-900 leading-none">{form.currency}{finalTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                        </div>
                     </div>
                     <div className="text-right pr-6 pt-4">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-12">Certified for <span className="text-slate-900 font-black">{form.fromName}</span></div>
                        <div className="border-t-2 border-slate-900 pt-3">
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">{form.signLabel}</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-12 left-0 right-0 px-16 footer-brand-container">
                  <div className="flex items-center justify-between border-t border-slate-100 pt-8 opacity-40">
                     <div className="flex items-center gap-3"><div className="size-4 bg-slate-900 rounded-sm"></div><span className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-500 italic">Sovereign Architecture</span></div>
                     <div className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">Verified Official Document &nbsp;|&nbsp; smritierp.com &nbsp;|&nbsp; AITDL NODE</div>
                  </div>
               </div>
            </div>
        </div>
      </div>
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html:`
        @page { size: A4; margin: 0; }
        @media print {
          /* HIDE EVERYTHING GLOBALLY */
          body * { visibility: hidden !important; }
          
          /* SHOW ONLY THE DOCUMENT AND ITS PARENTS (NECESSARY FOR POSITIONING) */
          .printable-container, .printable-container *, 
          .preview-pane, .preview-pane *,
          .document-a4-sheet, .document-a4-sheet * { 
            visibility: visible !important; 
          }

          /* FORCE BACKGROUNDS AND TEXT COLORS */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

          /* HIDE UI ELEMENTS INSIDE PRINTABLE AREA */
          .print\\:hidden, .form-sidebar, .professional-line-items-editor, button { 
             display: none !important; 
             visibility: hidden !important;
          }

          /* RESET POSITIONING FOR PAGE */
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .printable-container { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; height: auto !important; margin: 0 !important; padding: 0 !important; }
          .preview-pane { padding: 0 !important; margin: 0 !important; width: 100% !important; background: white !important; display: block !important; overflow: visible !important; }
          
          .document-a4-sheet { 
            margin: 0 auto !important; 
            box-shadow: none !important; 
            width: 794px !important;
            height: 1123px !important;
            padding: 50px !important;
            position: relative !important;
            page-break-after: always !important;
          }

          /* Ensure footer stays correct */
          .footer-brand-container { position: absolute !important; bottom: 40px !important; }
        }
      `}}/>
    </div>
  );
}
