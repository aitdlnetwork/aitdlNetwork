/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { ChevronLeft, Save, Printer, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function PurchaseEditor({ billId, onClose }: { billId: number | null, onClose: () => void }) {
  const { db, persistDB } = useERPDatabase();
  const [items, setItems] = useState<any[]>([{ name: '', desc: '', qty: 1, rate: 0 }]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  
  const [form, setForm] = useState({
    billNum: '', docType: 'PURCHASE ORDER', billStatus: 'draft',
    toName: '', toAddr: '', vendorId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30*864e5).toISOString().split('T')[0],
    discount: 0, tax: 0, currency: '₹',
    notes: 'Please quote referencing this Purchase Order.'
  });

  const [businessName, setBusinessName] = useState('');
  const [businessAddr, setBusinessAddr] = useState('');
  const [toast, setToast] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [oldBillNum, setOldBillNum] = useState<string | null>(null);
  const didLoad = useRef(false);

  useEffect(() => {
    if (!db) return;
    
    const vRes = db.exec(`SELECT id, name FROM vendors ORDER BY name`);
    if (vRes[0]) setVendors(vRes[0].values);

    const pRes = db.exec(`
      SELECT id, name, description, purchase_rate, default_qty, unit,
             COALESCE((SELECT SUM(CASE WHEN type='IN' THEN qty WHEN type='OUT' THEN -qty ELSE qty END) FROM inventory_ledger WHERE product_id = products.id), 0) as stock,
             category
      FROM products ORDER BY name
    `);
    if (pRes[0]) setProducts(pRes[0].values);

    loadBusinessProfile();

    if (didLoad.current) return;
    didLoad.current = true;

    if (billId) {
      loadBillFromDb(billId);
    } else {
      generateBillNumber();
    }
  }, [db, billId]);

  const loadBusinessProfile = () => {
    if (!db) return;
    const res = db.exec(`SELECT key, value FROM business_profile WHERE key IN ('fromName', 'fromAddr')`);
    if (res[0]) {
      const loaded: any = {};
      res[0].values.forEach(([key, val]) => { loaded[key as string] = val; });
      setBusinessName(loaded.fromName || '');
      setBusinessAddr(loaded.fromAddr || '');
    }
  };

  const generateBillNumber = () => {
    if (!db) return;
    const r = db.exec(`SELECT COUNT(*) FROM purchases`);
    const count = (r[0]?.values[0]?.[0] as number || 0) + 1;
    const yr = new Date().getFullYear();
    setForm(prev => ({ ...prev, billNum: `PO-${yr}-${String(count).padStart(3, '0')}` }));
  };

  const loadBillFromDb = (id: number) => {
    if (!db) return;
    const r = db.exec(`SELECT * FROM purchases WHERE id=?`, [id]);
    if (!r[0]) return;
    
    const cols = r[0].columns;
    const vals = r[0].values[0];
    const row: any = {};
    cols.forEach((c, i) => row[c] = vals[i]);

    setForm({
      billNum: row.bill_number || '', docType: row.doc_type || 'PURCHASE ORDER', billStatus: row.status || 'draft',
      toName: row.to_name || '', toAddr: row.to_addr || '', vendorId: row.vendor_id?.toString() || '',
      issueDate: row.issue_date || '', dueDate: row.due_date || '',
      discount: parseFloat(row.discount) || 0, tax: parseFloat(row.tax) || 0, currency: row.currency || '₹',
      notes: row.notes || ''
    });
    setOldBillNum(row.bill_number);
    try { setItems(JSON.parse(row.items_json || '[]')); } catch { setItems([]); }
  };

  const handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setForm({ ...form, vendorId: id });
    if (!id || !db) return;
    const r = db.exec(`SELECT name, addr FROM vendors WHERE id=?`, [parseInt(id)]);
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

    const vId = form.vendorId ? parseInt(form.vendorId) : null;
    const data = [
      form.billNum, form.docType, form.billStatus,
      form.toName, form.toAddr, vId,
      form.issueDate, form.dueDate,
      form.discount, form.tax, form.currency, subtotal, total,
      form.notes, JSON.stringify(items)
    ];

    try {
      if (billId) {
        db.run(`UPDATE purchases SET bill_number=?, doc_type=?, status=?, to_name=?, to_addr=?, vendor_id=?, issue_date=?, due_date=?, discount=?, tax=?, currency=?, subtotal=?, total=?, notes=?, items_json=?, updated_at=datetime('now') WHERE id=?`, [...data, billId]);
      } else {
        db.run(`INSERT INTO purchases(bill_number, doc_type, status, to_name, to_addr, vendor_id, issue_date, due_date, discount, tax, currency, subtotal, total, notes, items_json) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, data);
      }

      if (oldBillNum && oldBillNum !== form.billNum) {
        db.run(`DELETE FROM inventory_ledger WHERE reference_doc=?`, [oldBillNum]);
      }
      db.run(`DELETE FROM inventory_ledger WHERE reference_doc=?`, [form.billNum]);

      if (form.billStatus === 'received' || form.billStatus === 'paid') {
        items.forEach(it => {
            if(it.id) {
              db.run(`INSERT INTO inventory_ledger(product_id, type, reference_doc, qty) VALUES(?, 'IN', ?, ?)`, [it.id, form.billNum, it.qty]);
            } else if (it.name && it.name.trim()) {
              const pidRes = db.exec(`SELECT id FROM products WHERE LOWER(TRIM(name))=LOWER(TRIM(?)) LIMIT 1`, [it.name]);
              if(pidRes[0]) {
                const matchedId = pidRes[0].values[0][0];
                db.run(`INSERT INTO inventory_ledger(product_id, type, reference_doc, qty) VALUES(?, 'IN', ?, ?)`, [matchedId, form.billNum, it.qty]);
              }
            }
        });
      }

      persistDB();
      setToast('Purchase Saved Successfully!');
      setTimeout(() => { onClose(); }, 800);
    } catch(err: any) {
      console.error(err);
      if (err.message?.includes('UNIQUE constraint failed')) {
        setErrorMsg(`Duplicate Entry: The bill number "${form.billNum}" is already in use.`);
      } else {
        setErrorMsg("Error saving document: " + err.message);
      }
    }
  };

  const printDocument = () => {
    window.print();
  };

  const subtotal = items.reduce((s, it) => s + (it.qty * it.rate), 0);
  const discAmt = subtotal * (form.discount / 100);
  const taxAmt = (subtotal - discAmt) * (form.tax / 100);
  const total = subtotal - discAmt + taxAmt;

  const fmtDate = (s: string) => { if (!s) return '—'; const d = new Date(s); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };

  return (
    <div className="flex flex-col h-full bg-[#0b0c16] print:bg-white print:text-black">
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
          <button onClick={handleSave} className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-4 py-2 rounded-sm font-bold text-sm tracking-widest uppercase transition">
            <Save size={16} /> Save Document
          </button>
          <button onClick={printDocument} className="flex items-center gap-2 bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-sm font-bold text-sm tracking-widest uppercase transition">
            <Printer size={16} /> Print / PDF
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden print:overflow-visible h-full">
        <div className="w-[400px] border-r border-white/5 bg-[#12122a]/50 p-6 overflow-y-auto print:hidden space-y-6 form-sidebar">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-sm flex items-center gap-3">
               <AlertCircle size={20} />
               <span className="text-sm font-bold">{errorMsg}</span>
            </div>
          )}
          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-xs border-b border-white/5 pb-2">Purchase Settings</h3>
            <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="text-xs text-slate-400 uppercase">Doc Type</label>
                 <select value={form.docType} onChange={e=>setForm({...form, docType: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary">
                   <option>PURCHASE ORDER</option>
                   <option>EXPENSE BILL</option>
                 </select>
               </div>
               <div>
                 <label className="text-xs text-slate-400 uppercase">Status</label>
                 <select value={form.billStatus} onChange={e=>setForm({...form, billStatus: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary">
                   <option value="draft">Draft PO</option>
                   <option value="sent">Sent to Vendor</option>
                   <option value="received">Stock Received</option>
                   <option value="paid">Paid & Settled</option>
                 </select>
               </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase">PO Number</label>
              <input value={form.billNum} onChange={e=>setForm({...form, billNum: e.target.value})} className="w-full font-mono bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary"/>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-xs border-b border-white/5 pb-2">Vendor / Supplier</h3>
            <div>
              <label className="text-xs text-slate-400 uppercase">Select Vendor</label>
              <select value={form.vendorId} onChange={handleVendorChange} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary mb-2">
                <option value="">-- Custom (No Vendor) --</option>
                {vendors.map((v: any) => <option key={v[0]} value={v[0]}>{v[1]}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase">Vendor Name</label>
              <input value={form.toName} onChange={e=>setForm({...form, toName: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary"/>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase">Vendor Address</label>
              <textarea rows={3} value={form.toAddr} onChange={e=>setForm({...form, toAddr: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary"/>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-primary font-bold uppercase tracking-widest text-xs border-b border-white/5 pb-2">Costs & Adjustments</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-400 uppercase">Issue Date</label>
                <input type="date" value={form.issueDate} onChange={e=>setForm({...form, issueDate: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase">Expected By</label>
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
            <div>
              <label className="text-xs text-slate-400 uppercase">Notes to Vendor</label>
              <textarea rows={2} value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-1.5 text-sm text-white outline-none focus:border-primary"/>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center bg-[#05050A] overflow-y-auto p-8 pt-12 print:p-0 print:bg-white preview-pane">
           <div className="w-[794px] mb-8 bg-[#1a1a2e] border border-white/10 p-6 rounded-sm shadow-2xl print:hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-primary font-bold uppercase tracking-widest text-xs">Procurement Items</h3>
                <div className="flex items-center gap-2">
                   <select onChange={(e) => {
                     const id = e.target.value;
                     if(!id) return;
                     const p = products.find(prod => prod[0].toString() === id);
                     if(p) setItems([...items, { id: p[0], name: p[1], desc: p[2]||'', qty: p[4]||1, rate: p[3]||0 }]);
                     e.target.value = '';
                   }} className="bg-black/50 border border-white/10 rounded-sm px-3 py-1 text-xs text-white outline-none">
                     <option value="">+ From Catalogue</option>
                     {products.map((p: any) => {
                       const isService = p[7]?.toLowerCase() === 'service' || p[7]?.toLowerCase() === 'digital';
                       return (
                         <option key={p[0]} value={p[0]}>
                           {p[1]} {!isService ? `(Stock: ${p[6]} ${p[5]})` : '(Service)'}
                         </option>
                       );
                     })}
                   </select>
                   <button onClick={() => setItems([...items, {id:null, name:'', desc: '', qty: 1, rate: 0}])} className="bg-primary/20 text-primary px-3 py-1 rounded-sm text-xs uppercase tracking-widest font-bold border border-primary/20 hover:bg-primary/30">+ Blank Row</button>
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

           <div className="w-[794px] min-h-[1123px] bg-white text-black p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] print:shadow-none print:p-0 relative font-['DM_Sans',sans-serif]">
              <div className="flex justify-between items-start mb-12">
                <div>
                   <div className="text-2xl font-black text-slate-900 tracking-tight">{businessName || 'Your Company Name'}</div>
                   <div className="whitespace-pre-line text-sm text-slate-500 max-w-xs">{businessAddr}</div>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-black text-slate-200 uppercase tracking-tighter mix-blend-multiply">{form.docType}</div>
                   <div className="text-lg font-bold text-slate-700 font-mono mt-1">#{form.billNum || 'PO-000'}</div>
                </div>
              </div>

              <div className="flex justify-between items-start border-b border-slate-200 pb-8 mb-8">
                 <div className="text-sm text-slate-600 space-y-1 w-64">
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Order To (Vendor)</div>
                    <div className="font-bold text-slate-900">{form.toName || 'Vendor Name'}</div>
                    <div className="whitespace-pre-line leading-relaxed">{form.toAddr}</div>
                 </div>
                 <div className="text-right">
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Issue Date</div>
                    <div className="font-bold text-slate-800 mb-4">{fmtDate(form.issueDate)}</div>
                    <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Delivery / Expected Date</div>
                    <div className="font-bold text-slate-800">{fmtDate(form.dueDate)}</div>
                 </div>
              </div>

              <table className="w-full text-sm mb-8">
                 <thead>
                   <tr className="border-b-2 border-slate-900 text-left">
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900">Description</th>
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900 text-right w-24">Req Qty</th>
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900 text-right w-32">Agreed Rate</th>
                      <th className="py-3 font-bold text-xs uppercase tracking-wide text-slate-900 text-right w-32">Total</th>
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
                       <span>Purchase Total</span>
                       <span className="font-mono">{form.currency}{total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                    </div>
                 </div>
              </div>

              {form.notes && (
                <div className="mb-6">
                  <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Instructions to Vendor</div>
                  <div className="whitespace-pre-line text-sm text-slate-700 bg-slate-50 p-4 border border-slate-100 rounded-sm">{form.notes}</div>
                </div>
              )}

              <div className="mt-24 text-right w-48 ml-auto">
                <div className="text-xs mb-10">For <span className="font-bold text-slate-900">{businessName}</span></div>
                <div className="border-t border-slate-300 pt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Authorised Signatory</div>
              </div>
           </div>
        </div>
      </div>
      
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
