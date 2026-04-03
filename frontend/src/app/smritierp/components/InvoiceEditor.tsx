/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
*/

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { ChevronLeft, Save, Printer, Trash2, CheckCircle, AlertCircle, Loader2, Plus } from 'lucide-react';

interface Item { id?: number | null; name: string; desc: string; qty: number; rate: number; hsn?: string; uom?: string; }
interface Client { id: number; name: string; addr?: string; gst?: string; pan?: string; price_group?: string; }
interface Product { id: number; name: string; description: string; default_rate: number; default_qty: number; unit: string; stock: number; category: string; hsn_code?: string; attr1?: string; attr2?: string; attr3?: string; custom_fields?: Record<string, string>; }

function numberToWords(num: number): string {
  const a = ['','One ','Two ','Three ','Four ','Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  const n = ('000000000' + num).substr(-9);
  if (parseInt(n) === 0) return 'Zero Only';
  let str = '';
  str += parseInt(n[0]+n[1]) !== 0 ? (a[parseInt(n[0]+n[1])] || b[parseInt(n[0])]+' '+a[parseInt(n[1])]) + 'Crore ' : '';
  str += parseInt(n[2]+n[3]) !== 0 ? (a[parseInt(n[2]+n[3])] || b[parseInt(n[2])]+' '+a[parseInt(n[3])]) + 'Lakh ' : '';
  str += parseInt(n[4]+n[5]) !== 0 ? (a[parseInt(n[4]+n[5])] || b[parseInt(n[4])]+' '+a[parseInt(n[5])]) + 'Thousand ' : '';
  str += parseInt(n[6]) !== 0 ? (a[parseInt(n[6])] || b[parseInt(n[6])]+' '+a[parseInt(n[6])]) + 'Hundred ' : '';
  str += (parseInt(n.substr(7)) !== 0 && str !== '' ? 'and ' : '') + (a[parseInt(n.substr(7))] || b[parseInt(n[7])]+' '+a[parseInt(n[8])]);
  return str.trim() + ' Rupees Only';
}

const INP = "w-full text-xs text-white bg-black/30 border border-white/10 rounded-sm px-2.5 py-1.5 outline-none focus:border-primary/50 transition-colors";
const LBL = "block text-[9px] text-slate-500 uppercase font-black tracking-wider mb-1";
const SEC = "text-[9px] text-primary font-black uppercase tracking-[0.2em] border-b border-white/5 pb-1.5 mb-3";

export default function InvoiceEditor({ billId: initialBillId, onClose }: { billId: number | null; onClose: () => void }) {
  const { db, persistDB } = useERPDatabase();
  const [currentBillId, setCurrentBillId] = useState<number | null>(initialBillId);
  const [items, setItems] = useState<Item[]>([{ name: '', desc: '', qty: 1, rate: 0, hsn: '', uom: 'pcs' }]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [oldBillNum, setOldBillNum] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const didLoad = useRef(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [docScale, setDocScale] = useState(0.85);
  const [priceGroups, setPriceGroups] = useState<Record<string, 'INCLUSIVE' | 'EXCLUSIVE'>>({});

  const [form, setForm] = useState({
    billNum: '', docType: 'TAX INVOICE', billStatus: 'draft',
    fromName: '', fromTagline: '', fromAddr: '', fromGSTIN: '', fromPAN: '',
    toName: '', toAddr: '', toGSTIN: '', toPAN: '', clientId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 864e5).toISOString().split('T')[0],
    discount: 0, tax: 18, currency: '₹',
    bankName: '', bankBankName: '', bankAccNum: '', bankIFSC: '', bankType: '', bankBranch: '',
    showBank: true, upiId: '', upiName: '', showUPI: true,
    notes: 'Thank you for your business!', signLabel: 'Authorised Signatory',
    price_group: '',
  });

  // ── Scale preview to fit pane ──────────────────────────────────────────────
  useEffect(() => {
    const compute = () => {
      if (!previewRef.current) return;
      const { clientWidth, clientHeight } = previewRef.current;
      setDocScale(Math.min((clientWidth - 32) / 794, (clientHeight - 32) / 1123, 0.95));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (previewRef.current) ro.observe(previewRef.current);
    return () => ro.disconnect();
  }, []);

  const loadBusinessProfile = useCallback(() => {
    if (!db) return;
    const res = db.exec('SELECT key, value FROM business_profile');
    if (!res[0]) return;
    const loaded: Record<string, string> = {};
    res[0].values.forEach(([k, v]) => { if (k) loaded[k as string] = v as string; });
    setForm(f => ({
      ...f,
      fromName: loaded.fromName || '', fromTagline: loaded.fromTagline || '',
      fromAddr: loaded.fromAddr || '', fromGSTIN: loaded.fromGSTIN || '', fromPAN: loaded.fromPAN || '',
      bankName: loaded.bankName || '', bankBankName: loaded.bankBankName || '',
      bankAccNum: loaded.bankAccNum || '', bankIFSC: loaded.bankIFSC || '',
      bankType: loaded.bankType || '', bankBranch: loaded.bankBranch || '',
      upiId: loaded.upiId || '', upiName: loaded.upiName || '',
      notes: loaded.notes || f.notes, signLabel: loaded.signLabel || f.signLabel,
      tax: parseFloat(loaded.defaultTax) || 18, discount: parseFloat(loaded.defaultDiscount) || 0,
    }));

    if (loaded.inv_price_groups) {
      const pgs: Record<string, 'INCLUSIVE' | 'EXCLUSIVE'> = {};
      loaded.inv_price_groups.split(',').forEach(s => {
        const [name, mode] = s.split(':');
        if (name) pgs[name.trim()] = (mode?.trim().toUpperCase() === 'INCLUSIVE' ? 'INCLUSIVE' : 'EXCLUSIVE');
      });
      setPriceGroups(pgs);
    }
  }, [db]);

  const generateBillNumber = useCallback(() => {
    if (!db) return;
    const r = db.exec('SELECT COUNT(*) FROM bills');
    const count = (r[0]?.values[0]?.[0] as number || 0) + 1;
    setForm(p => ({ ...p, billNum: `INV-${new Date().getFullYear()}-${String(count).padStart(3, '0')}` }));
  }, [db]);

  const loadBillFromDb = useCallback((id: number) => {
    if (!db) return;
    const r = db.exec('SELECT * FROM bills WHERE id=?', [id]);
    if (!r[0]) return;
    const row: Record<string, any> = {};
    r[0].columns.forEach((c, i) => row[c] = r[0].values[0][i]);
    setOldBillNum(row.bill_number || null);
    setForm({
      billNum: row.bill_number || '', docType: row.doc_type || 'TAX INVOICE', billStatus: row.status || 'draft',
      fromName: row.from_name || '', fromTagline: row.from_tagline || '', fromAddr: row.from_addr || '',
      fromGSTIN: row.from_gstin || '', fromPAN: row.from_pan || '',
      toName: row.to_name || '', toAddr: row.to_addr || '', toGSTIN: row.to_gstin || '', toPAN: row.to_pan || '',
      clientId: row.client_id?.toString() || '',
      issueDate: row.issue_date || '', dueDate: row.due_date || '',
      discount: parseFloat(row.discount) || 0, tax: parseFloat(row.tax) || 18, currency: row.currency || '₹',
      bankName: row.bank_name || '', bankBankName: row.bank_bank || '', bankAccNum: row.bank_acc || '',
      bankIFSC: row.bank_ifsc || '', bankType: row.bank_type || '', bankBranch: row.bank_branch || '',
      showBank: !!row.show_bank, upiId: row.upi_id || '', upiName: row.upi_name || '', showUPI: !!row.show_upi,
      notes: row.notes || '', signLabel: row.sign_label || 'Authorised Signatory',
      price_group: row.price_group || '',
    });
    try { setItems(JSON.parse(row.items_json || '[]')); } catch { setItems([]); }
  }, [db]);

  useEffect(() => {
    if (!db) return;
    try {
      const cRes = db.exec('SELECT id, name, addr, gst, pan, price_group FROM clients ORDER BY name');
      if (cRes[0]) setClients(cRes[0].values.map(c => ({ id: c[0] as number, name: c[1] as string, addr: c[2] as string, gst: c[3] as string, pan: c[4] as string, price_group: c[5] as string })));
      const pRes = db.exec('SELECT id, name, description, default_rate, default_qty, unit, COALESCE((SELECT SUM(CASE WHEN type=\'IN\' THEN qty ELSE -qty END) FROM inventory_ledger WHERE product_id=products.id),0) as stock, category, hsn_code, attr1, attr2, attr3, custom_fields FROM products ORDER BY name');
      if (pRes[0]) setProducts(pRes[0].values.map(p => {
        let cf = {};
        try { cf = JSON.parse(p[12] as string || '{}'); } catch(e){}
        return { id: p[0] as number, name: p[1] as string, description: p[2] as string, default_rate: p[3] as number, default_qty: p[4] as number, unit: p[5] as string, stock: p[6] as number, category: p[7] as string, hsn_code: p[8] as string, attr1: p[9] as string, attr2: p[10] as string, attr3: p[11] as string, custom_fields: cf };
      }));
      if (didLoad.current) return;
      didLoad.current = true;
      if (currentBillId) { loadBillFromDb(currentBillId); } else { loadBusinessProfile(); generateBillNumber(); }
    } catch (e) { console.error(e); }
  }, [db, currentBillId, loadBillFromDb, loadBusinessProfile, generateBillNumber]);

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setForm(f => ({ ...f, clientId: id }));
    if (!id || !db) return;
    const r = db.exec('SELECT name, addr, gst, pan, price_group FROM clients WHERE id=?', [parseInt(id)]);
    if (r[0]) { 
      const [n, a, g, p, pg] = r[0].values[0]; 
      setForm(f => ({ ...f, toName: n as string, toAddr: a as string, toGSTIN: g as string || '', toPAN: p as string || '', price_group: pg as string || '' })); 
    }
  };

  const handleSave = useCallback(() => {
    if (!db || isSavingRef.current) return;
    if (!form.billNum) { setErrorMsg('Bill Number is required.'); return; }
    isSavingRef.current = true;
    setIsSaving(true);
    setErrorMsg(null);
    const subtotal = items.reduce((s, it) => s + it.qty * it.rate, 0);
    const discAmt = subtotal * (form.discount / 100);
    const taxableAmt = subtotal - discAmt;
    const taxAmt = taxableAmt * (form.tax / 100);
    const total = Math.round(taxableAmt + taxAmt);
    const cId = form.clientId ? parseInt(form.clientId) : null;
    const data = [
      form.billNum, form.docType, form.billStatus,
      form.fromName, form.fromTagline, form.fromAddr, form.fromGSTIN, form.fromPAN,
      form.toName, form.toAddr, form.toGSTIN, form.toPAN, cId,
      form.issueDate, form.dueDate, form.discount, form.tax, form.currency, taxableAmt, total,
      form.bankName, form.bankBankName, form.bankAccNum, form.bankIFSC, form.bankType, form.bankBranch,
      form.showBank ? 1 : 0, form.upiId, form.upiName, form.showUPI ? 1 : 0,
      form.notes, '', form.signLabel, 1, 1, 1, JSON.stringify(items),
    ];
    try {
      if (currentBillId) {
        db.run(`UPDATE bills SET bill_number=?,doc_type=?,status=?,from_name=?,from_tagline=?,from_addr=?,from_gstin=?,from_pan=?,to_name=?,to_addr=?,to_gstin=?,to_pan=?,client_id=?,issue_date=?,due_date=?,discount=?,tax=?,currency=?,subtotal=?,total=?,bank_name=?,bank_bank=?,bank_acc=?,bank_ifsc=?,bank_type=?,bank_branch=?,show_bank=?,upi_id=?,upi_name=?,show_upi=?,notes=?,footer_msg=?,sign_label=?,show_sign=?,show_for_company=?,show_aitdl=?,items_json=?,price_group=?,updated_at=datetime('now') WHERE id=?`, [...data, form.price_group, currentBillId]);
      } else {
        db.run(`INSERT INTO bills(bill_number,doc_type,status,from_name,from_tagline,from_addr,from_gstin,from_pan,to_name,to_addr,to_gstin,to_pan,client_id,issue_date,due_date,discount,tax,currency,subtotal,total,bank_name,bank_bank,bank_acc,bank_ifsc,bank_type,bank_branch,show_bank,upi_id,upi_name,show_upi,notes,footer_msg,sign_label,show_sign,show_for_company,show_aitdl,items_json,price_group) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [...data, form.price_group]);
        const idRes = db.exec('SELECT last_insert_rowid()');
        if (idRes[0]) setCurrentBillId(idRes[0].values[0][0] as number);
      }
      if (oldBillNum && oldBillNum !== form.billNum) db.run('DELETE FROM inventory_ledger WHERE reference_doc=?', [oldBillNum]);
      db.run('DELETE FROM inventory_ledger WHERE reference_doc=?', [form.billNum]);
      if (form.billStatus === 'sent' || form.billStatus === 'paid') {
        items.forEach(it => {
          const pid = it.id || (() => { const r = db.exec('SELECT id FROM products WHERE LOWER(TRIM(name))=LOWER(TRIM(?)) LIMIT 1', [it.name]); return r[0]?.values[0][0]; })();
          if (pid) db.run(`INSERT INTO inventory_ledger(product_id,type,reference_doc,qty) VALUES(?,'OUT',?,?)`, [pid, form.billNum, it.qty]);
        });
      }
      persistDB();
      setToast(currentBillId ? 'Document Updated!' : 'Document Saved!');
      setTimeout(() => { isSavingRef.current = false; setIsSaving(false); setToast(''); }, 2500);
    } catch (err: unknown) {
      isSavingRef.current = false; setIsSaving(false);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setErrorMsg(msg.includes('UNIQUE constraint') ? `Bill # "${form.billNum}" already exists.` : 'Save error: ' + msg);
    }
  }, [db, currentBillId, form, items, oldBillNum, persistDB]);

  // ── Computed values ────────────────────────────────────────────────────────
  const subtotal = items.reduce((s, it) => s + it.qty * it.rate, 0);
  const discAmnt = subtotal * (form.discount / 100);
  const taxableAmnt = subtotal - discAmnt;
  const totalGST = taxableAmnt * (form.tax / 100);
  const cgst = totalGST / 2;
  const sgst = totalGST / 2;
  const grandTotal = taxableAmnt + totalGST;
  const finalTotal = Math.round(grandTotal);
  const roundOff = finalTotal - grandTotal;
  const fmtDate = (s: string) => { if (!s) return '—'; try { return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); } catch { return s; } };
  const fmtAmt = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const isNewDoc = !currentBillId;

  const statusColor: Record<string, string> = { draft: '#f59e0b', sent: '#3b82f6', paid: '#22c55e' };
  const qrUrl = form.upiId ? `https://chart.googleapis.com/chart?cht=qr&chs=120x120&chl=${encodeURIComponent(`upi://pay?pa=${form.upiId}&pn=${form.upiName}&cu=INR`)}&choe=UTF-8` : '';

  return (
    <div className="flex flex-col bg-[#0b0c16]" style={{ height: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px', background: '#16a34a', color: 'white', padding: '10px 20px', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', fontSize: '13px', fontWeight: '700' }}>
          <CheckCircle size={16} /> {toast}
        </div>
      )}

      {/* ── HEADER BAR ── */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/5 bg-[#12122a]/80 shrink-0 print:hidden" style={{ minHeight: '52px' }}>
        <button onClick={onClose} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-3">
          {errorMsg && <span className="flex items-center gap-1 text-red-400 text-xs max-w-xs truncate"><AlertCircle size={13} /> {errorMsg}</span>}
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all disabled:opacity-50" style={{ background: '#00d4aa', color: '#0b0c16' }}>
            {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {isSaving ? 'Saving...' : (isNewDoc ? 'Save Document' : 'Update Document')}
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm border border-white/10 text-white hover:bg-white/10 transition-all">
            <Printer size={13} /> Print / PDF
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex" style={{ flex: 1, minHeight: 0 }}>

        {/* LEFT SIDEBAR — All form controls + line items */}
        <div className="border-r border-white/5 overflow-y-auto" style={{ width: '390px', flexShrink: 0, background: '#0e0e22' }}>
          <div className="p-4 space-y-4">

            {/* Document Settings */}
            <div>
              <div className={SEC}>Document Settings</div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className={LBL}>Type</label>
                  <select value={form.docType} onChange={e => setForm(f => ({ ...f, docType: e.target.value }))} className={INP}>
                    <option>TAX INVOICE</option><option>INVOICE</option><option>PROFORMA</option><option>QUOTATION</option>
                  </select>
                </div>
                <div>
                  <label className={LBL}>Status</label>
                  <select value={form.billStatus} onChange={e => setForm(f => ({ ...f, billStatus: e.target.value }))} className={INP}>
                    <option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className={LBL}>Invoice #</label>
                  <input value={form.billNum} onChange={e => setForm(f => ({ ...f, billNum: e.target.value }))} className={INP + ' font-mono'} />
                </div>
                <div>
                  <label className={LBL}>Currency</label>
                  <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} className={INP}>
                    <option value="₹">₹ INR</option><option value="$">$ USD</option><option value="€">€ EUR</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={LBL}>Issue Date</label><input type="date" value={form.issueDate} onChange={e => setForm(f => ({ ...f, issueDate: e.target.value }))} className={INP} /></div>
                <div><label className={LBL}>Due Date</label><input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className={INP} /></div>
              </div>
            </div>

            {/* Buyer */}
            <div>
              <div className={SEC}>Bill To (Buyer)</div>
              <select value={form.clientId} onChange={handleClientChange} className={INP + ' mb-2'}>
                <option value="">-- Select Client --</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="mb-2"><label className={LBL}>Name</label><input value={form.toName} onChange={e => setForm(f => ({ ...f, toName: e.target.value }))} className={INP} placeholder="Client / Company Name" /></div>
              <div className="mb-2"><label className={LBL}>Address</label><textarea rows={2} value={form.toAddr} onChange={e => setForm(f => ({ ...f, toAddr: e.target.value }))} className={INP + ' resize-none'} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={LBL}>GSTIN</label><input value={form.toGSTIN} onChange={e => setForm(f => ({ ...f, toGSTIN: e.target.value }))} className={INP + ' font-mono'} placeholder="27XXXXX..." /></div>
                <div><label className={LBL}>PAN</label><input value={form.toPAN} onChange={e => setForm(f => ({ ...f, toPAN: e.target.value }))} className={INP + ' font-mono'} placeholder="ABCDE1234F" /></div>
              </div>
            </div>

            {/* Taxes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={SEC} style={{ marginBottom: 0 }}>Pricing & Taxes</div>
                {form.price_group && (
                  <div className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[8px] font-black text-purple-400 uppercase tracking-widest">
                    Policy: {form.price_group}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={LBL}>Discount %</label><input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: parseFloat(e.target.value) || 0 }))} className={INP} min="0" max="100" /></div>
                <div><label className={LBL}>GST %</label><input type="number" value={form.tax} onChange={e => setForm(f => ({ ...f, tax: parseFloat(e.target.value) || 0 }))} className={INP} min="0" max="28" /></div>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={SEC} style={{ marginBottom: 0 }}>Line Items</div>
                <div className="flex gap-2">
                  <select onChange={e => { 
                    const id = e.target.value; if (!id) return; 
                    const p = products.find(x => x.id.toString() === id); 
                    if (p) {
                      let rate = p.default_rate || 0;
                      const pg = form.price_group;
                      if (pg && p.custom_fields && p.custom_fields[pg]) {
                        rate = parseFloat(p.custom_fields[pg]) || rate;
                      }
                      
                      // Handle Tax Inclusive Mathematics (Shoper 9 MTP Logic)
                      if (pg && priceGroups[pg] === 'INCLUSIVE') {
                        const taxRate = form.tax || 0;
                        rate = rate / (1 + (taxRate / 100));
                      }

                      setItems(prev => [...prev, { id: p.id, name: p.name, desc: p.description || '', qty: p.default_qty || 1, rate, hsn: p.hsn_code || '', uom: p.unit || 'pcs' }]); 
                    }
                    e.target.value = ''; 
                  }} className="text-[9px] bg-black/30 border border-white/10 text-slate-400 rounded-sm px-2 py-1 outline-none">
                    <option value="">+ Catalogue</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} {p.attr1 ? `[${p.attr1}]` : ''} {p.attr2 ? `[${p.attr2}]` : ''}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => setItems(prev => [...prev, { name: '', desc: '', qty: 1, rate: 0, hsn: '', uom: 'pcs' }])} className="flex items-center gap-1 text-[9px] font-black uppercase text-primary hover:bg-primary/10 px-2 py-1 rounded-sm transition-colors">
                    <Plus size={10} /> Add
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {items.map((it, i) => (
                  <div key={i} className="bg-black/20 border border-white/5 rounded-sm p-2 space-y-1.5">
                    <div className="flex gap-2 items-center">
                      <input value={it.name} onChange={e => { const u = [...items]; u[i].name = e.target.value; setItems(u); }} placeholder="Item Name" className="flex-1 text-xs text-white bg-transparent border-none outline-none font-bold" />
                      <button onClick={() => { const u = [...items]; u.splice(i, 1); setItems(u); }} className="text-red-400/60 hover:text-red-400 transition-colors shrink-0"><Trash2 size={12} /></button>
                    </div>
                    <input value={it.desc} onChange={e => { const u = [...items]; u[i].desc = e.target.value; setItems(u); }} placeholder="Description (optional)" className="w-full text-[10px] text-slate-500 bg-transparent border-none outline-none italic" />
                    <div className="flex gap-2">
                      <input value={it.hsn ?? ''} onChange={e => { const u = [...items]; u[i].hsn = e.target.value; setItems(u); }} placeholder="HSN" className="w-20 text-[10px] text-slate-400 bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <input value={it.uom ?? ''} onChange={e => { const u = [...items]; u[i].uom = e.target.value; setItems(u); }} placeholder="UOM" className="w-14 text-[10px] text-slate-400 bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <input type="number" value={it.qty} onChange={e => { const u = [...items]; u[i].qty = parseFloat(e.target.value) || 0; setItems(u); }} placeholder="Qty" className="w-14 text-[10px] text-center text-white bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <input type="number" value={it.rate} onChange={e => { const u = [...items]; u[i].rate = parseFloat(e.target.value) || 0; setItems(u); }} placeholder="Rate" className="flex-1 text-[10px] text-right text-white bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <span className="text-[10px] text-primary font-black self-center whitespace-nowrap">{fmtAmt(it.qty * it.rate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={SEC} style={{ marginBottom: 0 }}>Bank Details</div>
                <label className="flex items-center gap-1.5 text-[9px] text-slate-500 cursor-pointer">
                  <input type="checkbox" checked={form.showBank} onChange={e => setForm(f => ({ ...f, showBank: e.target.checked }))} className="accent-primary" /> Show
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={LBL}>Account Name</label><input value={form.bankName} onChange={e => setForm(f => ({ ...f, bankName: e.target.value }))} className={INP} /></div>
                <div><label className={LBL}>Bank Name</label><input value={form.bankBankName} onChange={e => setForm(f => ({ ...f, bankBankName: e.target.value }))} className={INP} /></div>
                <div><label className={LBL}>Account No.</label><input value={form.bankAccNum} onChange={e => setForm(f => ({ ...f, bankAccNum: e.target.value }))} className={INP + ' font-mono'} /></div>
                <div><label className={LBL}>IFSC Code</label><input value={form.bankIFSC} onChange={e => setForm(f => ({ ...f, bankIFSC: e.target.value }))} className={INP + ' font-mono'} /></div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <div className={SEC}>Notes & Signature</div>
              <div className="mb-2"><label className={LBL}>Notes</label><textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className={INP + ' resize-none'} /></div>
              <div><label className={LBL}>Signature Label</label><input value={form.signLabel} onChange={e => setForm(f => ({ ...f, signLabel: e.target.value }))} className={INP} /></div>
            </div>

          </div>
        </div>

        {/* RIGHT — Scaled Document Preview */}
        <div ref={previewRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at 50% 50%, #0d0d1a, #05050A)', overflow: 'hidden' }}>
          <div
            className="document-a4-sheet"
            style={{
              width: '794px', height: '1123px', flexShrink: 0,
              transform: `scale(${docScale})`, transformOrigin: 'center center',
              background: '#ffffff', color: '#0f172a',
              fontFamily: "'Inter', sans-serif", overflow: 'hidden',
              boxShadow: '0 30px 90px rgba(0,0,0,0.7)',
              position: 'relative',
            }}
          >
            {/* ══ PREMIUM INVOICE DESIGN ══════════════════════════════════ */}

            {/* TOP COLOR BAR */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #00d4aa, #0ea5e9, #8b5cf6)' }} />

            {/* HEADER */}
            <div style={{ background: '#0f172a', padding: '28px 40px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(0,212,170,0.15)', border: '1.5px solid rgba(0,212,170,0.4)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: '#00d4aa', fontSize: '22px' }}>verified</span>
                </div>
                <div>
                  <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: 900, letterSpacing: '-0.5px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif", lineHeight: 1.1 }}>{form.fromName || 'Your Business Name'}</div>
                  <div style={{ color: '#00d4aa', fontSize: '8px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '3px' }}>{form.fromTagline || 'Professional Services'}</div>
                  {form.fromAddr && <div style={{ color: '#64748b', fontSize: '8.5px', marginTop: '6px', lineHeight: 1.6, maxWidth: '240px' }}>{form.fromAddr}</div>}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                    {form.fromGSTIN && <div style={{ fontSize: '7.5px' }}><span style={{ color: '#475569', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>GSTIN: </span><span style={{ color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>{form.fromGSTIN}</span></div>}
                    {form.fromPAN && <div style={{ fontSize: '7.5px' }}><span style={{ color: '#475569', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>PAN: </span><span style={{ color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600 }}>{form.fromPAN}</span></div>}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#475569', marginBottom: '4px' }}>{form.docType}</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', fontFamily: "'Outfit',sans-serif", letterSpacing: '-0.5px' }}>#{form.billNum}</div>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ fontSize: '8px', color: '#64748b' }}><span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Issue: </span>{fmtDate(form.issueDate)}</div>
                  <div style={{ fontSize: '8px', color: '#64748b' }}><span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Due: </span>{fmtDate(form.dueDate)}</div>
                  <div style={{ marginTop: '4px', display: 'inline-block', padding: '3px 10px', borderRadius: '999px', fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', background: `${statusColor[form.billStatus]}22`, color: statusColor[form.billStatus] || '#94a3b8', border: `1px solid ${statusColor[form.billStatus]}44` }}>
                    {form.billStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* BILL TO */}
            <div style={{ padding: '16px 40px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>Bill To</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', fontFamily: "'Outfit',sans-serif" }}>{form.toName || 'Valued Customer'}</div>
                {form.toAddr && <div style={{ fontSize: '8.5px', color: '#64748b', marginTop: '4px', lineHeight: 1.6, maxWidth: '300px', whiteSpace: 'pre-line' }}>{form.toAddr}</div>}
              </div>
              {(form.toGSTIN || form.toPAN) && (
                <div style={{ textAlign: 'right' }}>
                  {form.toGSTIN && <div style={{ fontSize: '8px', color: '#64748b', marginBottom: '3px' }}><span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>GSTIN: </span><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>{form.toGSTIN}</span></div>}
                  {form.toPAN && <div style={{ fontSize: '8px', color: '#64748b' }}><span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>PAN: </span><span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>{form.toPAN}</span></div>}
                </div>
              )}
            </div>

            {/* ITEMS TABLE */}
            <div style={{ padding: '0 40px', marginTop: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #0f172a' }}>
                    {['#', 'Description', 'HSN/SAC', 'Qty', 'UOM', 'Rate', 'Amount'].map((h, hi) => (
                      <th key={hi} style={{ padding: '6px 4px', fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', textAlign: hi === 0 ? 'center' : hi >= 5 ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                      <td style={{ padding: '8px 4px', fontSize: '8.5px', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>{i + 1}</td>
                      <td style={{ padding: '8px 4px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', fontFamily: "'Outfit',sans-serif" }}>{it.name || 'Item'}</div>
                        {it.desc && <div style={{ fontSize: '8px', color: '#94a3b8', marginTop: '1px', fontStyle: 'italic' }}>{it.desc}</div>}
                      </td>
                      <td style={{ padding: '8px 4px', fontSize: '8px', color: '#94a3b8', fontFamily: 'monospace', textAlign: 'left' }}>{it.hsn || '—'}</td>
                      <td style={{ padding: '8px 4px', fontSize: '9px', fontWeight: 700, color: '#334155', textAlign: 'left' }}>{it.qty}</td>
                      <td style={{ padding: '8px 4px', fontSize: '8px', color: '#94a3b8', textAlign: 'left', textTransform: 'uppercase' }}>{it.uom || 'pcs'}</td>
                      <td style={{ padding: '8px 4px', fontSize: '9px', color: '#475569', fontFamily: 'monospace', textAlign: 'right' }}>{fmtAmt(it.rate)}</td>
                      <td style={{ padding: '8px 4px', fontSize: '10px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit',sans-serif", textAlign: 'right' }}>{form.currency}{fmtAmt(it.qty * it.rate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOTALS + BANK + SIGNATURE */}
            <div style={{ padding: '16px 40px 0', display: 'flex', gap: '24px', alignItems: 'flex-start', marginTop: '8px' }}>

              {/* LEFT: Amount in words + bank */}
              <div style={{ flex: 1 }}>
                <div style={{ padding: '10px 12px', background: '#f8fafc', borderLeft: '3px solid #00d4aa', marginBottom: '12px', borderRadius: '0 4px 4px 0' }}>
                  <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}>Amount in Words</div>
                  <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#0f172a', lineHeight: 1.5, fontStyle: 'italic', textTransform: 'capitalize' }}>{numberToWords(finalTotal)}</div>
                </div>
                {form.showBank && (form.bankAccNum || form.bankIFSC) && (
                  <div style={{ background: '#0f172a', borderRadius: '8px', padding: '12px 14px', color: '#94a3b8' }}>
                    <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#00d4aa', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Bank Details</div>
                    <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#e2e8f0', marginBottom: '2px' }}>{form.bankName}</div>
                    <div style={{ fontSize: '8px', color: '#64748b', marginBottom: '6px', fontFamily: 'monospace' }}>{form.bankBankName}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div><div style={{ fontSize: '7px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: '2px' }}>Account No.</div><div style={{ fontSize: '8.5px', fontWeight: 700, color: '#e2e8f0', fontFamily: 'monospace' }}>{form.bankAccNum}</div></div>
                      <div><div style={{ fontSize: '7px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: '2px' }}>IFSC</div><div style={{ fontSize: '8.5px', fontWeight: 700, color: '#e2e8f0', fontFamily: 'monospace' }}>{form.bankIFSC}</div></div>
                    </div>
                  </div>
                )}
                {form.notes && <div style={{ marginTop: '10px', fontSize: '8px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>{form.notes}</div>}
              </div>

              {/* RIGHT: Tax summary */}
              <div style={{ width: '220px', flexShrink: 0 }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: '#f8fafc', padding: '10px 14px' }}>
                    {[
                      { label: 'Subtotal', value: fmtAmt(subtotal), color: '#334155' },
                      form.discount > 0 ? { label: `Discount (${form.discount}%)`, value: `- ${fmtAmt(discAmnt)}`, color: '#ef4444' } : null,
                      form.tax > 0 ? { label: `CGST (${form.tax / 2}%)`, value: fmtAmt(cgst), color: '#22c55e' } : null,
                      form.tax > 0 ? { label: `SGST (${form.tax / 2}%)`, value: fmtAmt(sgst), color: '#22c55e' } : null,
                      Math.abs(roundOff) > 0.001 ? { label: 'Round Off', value: (roundOff >= 0 ? '+' : '') + roundOff.toFixed(2), color: '#94a3b8' } : null,
                    ].filter(Boolean).map((row, ri) => (
                      <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{row!.label}</span>
                        <span style={{ fontSize: '8.5px', fontWeight: 700, color: row!.color, fontFamily: 'monospace' }}>{form.currency}{row!.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#0f172a', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b' }}>Total Due</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#00d4aa', fontFamily: "'Outfit',sans-serif", letterSpacing: '-0.5px' }}>{form.currency}{fmtAmt(finalTotal)}</span>
                  </div>
                </div>

                {/* Signature */}
                <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '8px' }}>
                  <div style={{ fontSize: '7.5px', color: '#94a3b8', marginBottom: '32px', fontWeight: 600 }}>For <span style={{ color: '#0f172a', fontWeight: 900 }}>{form.fromName || 'Business Name'}</span></div>
                  <div style={{ borderTop: '1.5px solid #0f172a', paddingTop: '6px' }}>
                    <div style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a' }}>{form.signLabel}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 40px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: '7.5px', color: '#94a3b8', fontWeight: 600 }}>Powered by AITDL SmritiERP · smritierp.com</div>
              <div style={{ fontSize: '7.5px', color: '#cbd5e1', fontFamily: 'monospace' }}>{form.billNum} · {fmtDate(form.issueDate)}</div>
            </div>
            {/* ══ END INVOICE ═══════════════════════ */}
          </div>
        </div>
      </div>

      {/* ── PRINT-ONLY: show full A4 at actual size ── */}
      <div className="hidden print:block" style={{ width: '794px', height: '1123px', overflow: 'hidden' }}>
        {/* Same document rendered again for print */}
      </div>

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@700;900&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        @page { size: A4 portrait; margin: 0; }
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { margin: 0 !important; padding: 0 !important; background: white !important; overflow: hidden !important; }
          .document-a4-sheet {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 794px !important; height: 1123px !important;
            overflow: hidden !important;
            transform: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            background: white !important;
          }
        }
      `}} />
    </div>
  );
}
