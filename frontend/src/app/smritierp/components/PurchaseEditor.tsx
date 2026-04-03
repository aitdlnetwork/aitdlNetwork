/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
*/

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { ChevronLeft, Save, Printer, Trash2, CheckCircle, AlertCircle, Loader2, Plus, Barcode } from 'lucide-react';
import JsBarcode from 'jsbarcode';

interface Item { id?: number | null; name: string; desc: string; qty: number; rate: number; hsn?: string; uom?: string; }
interface Vendor { id: number; name: string; addr?: string; gst?: string; pan?: string; }
interface Product { id: number; name: string; description: string; purchase_rate: number; default_qty: number; unit: string; stock: number; category: string; hsn_code?: string; }

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
const SEC = "text-[9px] text-amber-400 font-black uppercase tracking-[0.2em] border-b border-white/5 pb-1.5 mb-3";

export default function PurchaseEditor({ billId: initialBillId, onClose }: { billId: number | null; onClose: () => void }) {
  const { db, persistDB } = useERPDatabase();
  const [currentBillId, setCurrentBillId] = useState<number | null>(initialBillId);
  const [items, setItems] = useState<Item[]>([{ name: '', desc: '', qty: 1, rate: 0, hsn: '', uom: 'pcs' }]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [oldBillNum, setOldBillNum] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);
  const didLoad = useRef(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const [docScale, setDocScale] = useState(0.85);

  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [barcodePrintMode, setBarcodePrintMode] = useState<'browser' | 'prn'>('browser');
  const [prnTemplate, setPrnTemplate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('smritierp_prn_template');
    if (saved) setPrnTemplate(saved);
  }, []);

  const [form, setForm] = useState({
    billNum: '', docType: 'PURCHASE ORDER', billStatus: 'draft',
    fromName: '', fromTagline: '', fromAddr: '', fromGSTIN: '', fromPAN: '',
    toName: '', toAddr: '', toGSTIN: '', toPAN: '', vendorId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 864e5).toISOString().split('T')[0],
    discount: 0, tax: 18, currency: '₹',
    notes: 'Please quote referencing this Purchase Order.',
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
      tax: parseFloat(loaded.defaultTax) || 18, discount: parseFloat(loaded.defaultDiscount) || 0,
    }));
  }, [db]);

  const generateBillNumber = useCallback(() => {
    if (!db) return;
    const r = db.exec('SELECT COUNT(*) FROM purchases');
    const count = (r[0]?.values[0]?.[0] as number || 0) + 1;
    setForm(p => ({ ...p, billNum: `PO-${new Date().getFullYear()}-${String(count).padStart(3, '0')}` }));
  }, [db]);

  const loadBillFromDb = useCallback((id: number) => {
    if (!db) return;
    const r = db.exec('SELECT * FROM purchases WHERE id=?', [id]);
    if (!r[0]) return;
    const row: Record<string, any> = {};
    r[0].columns.forEach((c, i) => row[c] = r[0].values[0][i]);
    setOldBillNum(row.bill_number || null);
    setForm({
      billNum: row.bill_number || '', docType: row.doc_type || 'PURCHASE ORDER', billStatus: row.status || 'draft',
      fromName: row.from_name || '', fromTagline: row.from_tagline || '', fromAddr: row.from_addr || '',
      fromGSTIN: row.from_gstin || '', fromPAN: row.from_pan || '',
      toName: row.to_name || '', toAddr: row.to_addr || '', toGSTIN: row.to_gstin || '', toPAN: row.to_pan || '',
      vendorId: row.vendor_id?.toString() || '',
      issueDate: row.issue_date || '', dueDate: row.due_date || '',
      discount: parseFloat(row.discount) || 0, tax: parseFloat(row.tax) || 18, currency: row.currency || '₹',
      notes: row.notes || '',
    });
    try { setItems(JSON.parse(row.items_json || '[]')); } catch { setItems([]); }
  }, [db]);

  useEffect(() => {
    if (!db) return;
    try {
      const vRes = db.exec('SELECT id, name, addr, gst, pan FROM vendors ORDER BY name');
      if (vRes[0]) setVendors(vRes[0].values.map(v => ({ id: v[0] as number, name: v[1] as string, addr: v[2] as string, gst: v[3] as string, pan: v[4] as string })));
      const pRes = db.exec('SELECT id, name, description, purchase_rate, default_qty, unit, COALESCE((SELECT SUM(CASE WHEN type=\'IN\' THEN qty ELSE -qty END) FROM inventory_ledger WHERE product_id=products.id),0) as stock, category, hsn_code FROM products ORDER BY name');
      if (pRes[0]) setProducts(pRes[0].values.map(p => ({ id: p[0] as number, name: p[1] as string, description: p[2] as string, purchase_rate: p[3] as number, default_qty: p[4] as number, unit: p[5] as string, stock: p[6] as number, category: p[7] as string, hsn_code: p[8] as string })));
      if (didLoad.current) return;
      didLoad.current = true;
      if (currentBillId) { loadBillFromDb(currentBillId); } else { loadBusinessProfile(); generateBillNumber(); }
    } catch (e) { console.error(e); }
  }, [db, currentBillId, loadBillFromDb, loadBusinessProfile, generateBillNumber]);

  const handleVendorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setForm(f => ({ ...f, vendorId: id }));
    if (!id || !db) return;
    const r = db.exec('SELECT name, addr, gst, pan FROM vendors WHERE id=?', [parseInt(id)]);
    if (r[0]) { const [n, a, g, p] = r[0].values[0]; setForm(f => ({ ...f, toName: n as string, toAddr: a as string, toGSTIN: g as string || '', toPAN: p as string || '' })); }
  };

  const handleSave = useCallback(() => {
    if (!db || isSavingRef.current) return;
    if (!form.billNum) { setErrorMsg('Order Number is required.'); return; }
    isSavingRef.current = true;
    setIsSaving(true);
    setErrorMsg(null);
    const subtotal = items.reduce((s, it) => s + it.qty * it.rate, 0);
    const discAmt = subtotal * (form.discount / 100);
    const taxableAmt = subtotal - discAmt;
    const total = Math.round(taxableAmt * (1 + form.tax / 100));
    const vId = form.vendorId ? parseInt(form.vendorId) : null;
    const data = [
      form.billNum, form.docType, form.billStatus,
      form.fromName, form.fromTagline, form.fromAddr, form.fromGSTIN, form.fromPAN,
      form.toName, form.toAddr, form.toGSTIN, form.toPAN, vId,
      form.issueDate, form.dueDate, form.discount, form.tax, form.currency, taxableAmt, total,
      form.notes, JSON.stringify(items),
    ];
    try {
      if (currentBillId) {
        db.run(`UPDATE purchases SET bill_number=?,doc_type=?,status=?,from_name=?,from_tagline=?,from_addr=?,from_gstin=?,from_pan=?,to_name=?,to_addr=?,to_gstin=?,to_pan=?,vendor_id=?,issue_date=?,due_date=?,discount=?,tax=?,currency=?,subtotal=?,total=?,notes=?,items_json=?,updated_at=datetime('now') WHERE id=?`, [...data, currentBillId]);
      } else {
        db.run(`INSERT INTO purchases(bill_number,doc_type,status,from_name,from_tagline,from_addr,from_gstin,from_pan,to_name,to_addr,to_gstin,to_pan,vendor_id,issue_date,due_date,discount,tax,currency,subtotal,total,notes,items_json) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, data);
        const idRes = db.exec('SELECT last_insert_rowid()');
        if (idRes[0]) setCurrentBillId(idRes[0].values[0][0] as number);
      }
      if (oldBillNum && oldBillNum !== form.billNum) db.run('DELETE FROM inventory_ledger WHERE reference_doc=?', [oldBillNum]);
      db.run('DELETE FROM inventory_ledger WHERE reference_doc=?', [form.billNum]);
      if (form.billStatus === 'received' || form.billStatus === 'paid') {
        items.forEach(it => {
          const pid = it.id || (() => { const r = db.exec('SELECT id FROM products WHERE LOWER(TRIM(name))=LOWER(TRIM(?)) LIMIT 1', [it.name]); return r[0]?.values[0][0]; })();
          if (pid) db.run(`INSERT INTO inventory_ledger(product_id,type,reference_doc,qty) VALUES(?,'IN',?,?)`, [pid, form.billNum, it.qty]);
        });
      }
      persistDB();
      setToast(currentBillId ? 'Order Updated!' : 'Order Saved!');
      setTimeout(() => { isSavingRef.current = false; setIsSaving(false); setToast(''); }, 2500);
    } catch (err: unknown) {
      isSavingRef.current = false; setIsSaving(false);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setErrorMsg(msg.includes('UNIQUE constraint') ? `Order # "${form.billNum}" already exists.` : 'Save error: ' + msg);
    }
  }, [db, currentBillId, form, items, oldBillNum, persistDB]);

  const subtotal = items.reduce((s, it) => s + it.qty * it.rate, 0);
  const discAmnt = subtotal * (form.discount / 100);
  const taxableAmnt = subtotal - discAmnt;
  const totalGST = taxableAmnt * (form.tax / 100);
  const grandTotal = taxableAmnt + totalGST;
  const finalTotal = Math.round(grandTotal);
  const roundOff = finalTotal - grandTotal;
  const fmtDate = (s: string) => { if (!s) return '—'; try { return new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); } catch { return s; } };
  const fmtAmt = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const isNewDoc = !currentBillId;
  const statusColor: Record<string, string> = { draft: '#f59e0b', received: '#3b82f6', paid: '#22c55e' };

  const handlePrintBarcode = (item: Item, count: number) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // generate canvas
    const canvas = document.createElement('canvas');
    // We encode the item ID. If it doesn't exist, we use a simple hash of the name.
    const code = item.id ? String(item.id).padStart(6, '0') : btoa(item.name || 'ITEM').substring(0, 8).toUpperCase();
    
    try {
      JsBarcode(canvas, code, {
        format: "CODE128",
        width: 1.5,
        height: 35,
        displayValue: true,
        fontSize: 10,
        margin: 2
      });
    } catch(e) { console.error(e); }
    
    const barcodeSrc = canvas.toDataURL('image/png');

    let html = `
    <html>
    <head>
      <title>Print Barcode</title>
      <style>
        @page { margin: 0; size: 50mm 25mm; }
        body { margin: 0; padding: 2mm; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; text-align: center; }
        .label { width: 46mm; height: 21mm; display: flex; flex-direction: column; justify-content: center; align-items: center; page-break-after: always; box-sizing: border-box; overflow: hidden; }
        .business { font-size: 8px; font-weight: bold; margin-bottom: 2px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; color: #000; }
        .name { font-size: 9px; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; font-weight: bold; color: #000; }
        .price { font-size: 11px; font-weight: 900; margin-top: 1px; color: #000; }
        img { max-width: 100%; height: 9mm; }
      </style>
    </head>
    <body onload="setTimeout(() => window.print(), 100);">
    `;

    for(let i=0; i<count; i++) {
        html += `
        <div class="label">
           <div class="business">${form.toName || 'SMRITIERP NODE'}</div>
           <img src="${barcodeSrc}" />
           <div class="name">${item.name || 'PRODUCT'}</div>
           <div class="price">${form.currency} ${item.rate.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
        </div>
        `;
    }

    html += `</body></html>`;
    
    const doc = iframe.contentWindow?.document;
    if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
    }
    
    setTimeout(() => { if(iframe.parentNode) document.body.removeChild(iframe); }, 5000);
  };

  const handleDownloadPrn = (item: Item, count: number) => {
    if (!prnTemplate.trim()) { alert('Please provide a PRN template first.'); return; }
    
    let finalPrnContext = '';
    const barcode = item.id ? String(item.id).padStart(6, '0') : btoa(item.name || 'ITEM').substring(0, 8).toUpperCase();
        
    for (let i = 0; i < count; i++) {
        let replaced = prnTemplate;
        replaced = replaced.replace(/\[ITEM_NAME\]/gi, (item.name || '').substring(0, 30));
        replaced = replaced.replace(/\[RATE\]/gi, item.rate.toString());
        replaced = replaced.replace(/\[QTY\]/gi, item.qty.toString());
        replaced = replaced.replace(/\[HSN\]/gi, item.hsn || '');
        replaced = replaced.replace(/\[BARCODE\]/gi, barcode);
        replaced = replaced.replace(/\[BUSINESS_NAME\]/gi, (form.toName || 'SMRITIERP').substring(0, 30));
        finalPrnContext += replaced + '\n\n';
    }
    
    // Auto download mapped PRN file
    const blob = new Blob([finalPrnContext], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `print_${barcode}_${count}pcs.prn`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="flex flex-col bg-[#0b0c16]" style={{ height: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* BARCODE MODAL */}
      {showBarcodeModal && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 print:hidden">
          <div className="bg-[#0b0c16] border border-white/10 w-full max-w-3xl rounded-sm shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-5 border-b border-white/5 shrink-0">
              <h3 className="text-white font-display font-black text-sm uppercase tracking-wider flex items-center gap-2">
                <Barcode size={18} className="text-amber-400" /> Print Item Labels
              </h3>
              <button onClick={() => setShowBarcodeModal(false)} className="text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">Close</button>
            </div>

            <div className="flex border-b border-white/5 shrink-0 px-5">
               <button onClick={() => setBarcodePrintMode('browser')} className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${barcodePrintMode === 'browser' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-white'}`}>Direct PDF Print</button>
               <button onClick={() => setBarcodePrintMode('prn')} className={`px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${barcodePrintMode === 'prn' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-white'}`}>Raw PRN Template</button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
              
              {barcodePrintMode === 'browser' && (
                <div className="text-xs text-amber-500/80 bg-amber-500/10 border border-amber-500/20 px-4 py-3 rounded-sm flex items-start gap-3">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p><strong>Thermal Label Format: 50mm x 25mm.</strong> Optimized for standard thermal barcode printers. In the browser print dialog, ensure your Paper Size is explicitly set to 50mm width by 25mm height for correct output.</p>
                </div>
              )}

              {barcodePrintMode === 'prn' && (
                <div className="flex flex-col gap-3">
                   <div className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-sm flex items-start gap-3 leading-relaxed">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <div>
                        <strong>Raw PRN Mapping Mode (ZPL / TSPL / EPL)</strong><br/>
                        Paste your printer's raw PRN template below. The system will automatically map and replace the following tags with the actual item data before downloading the file:<br/>
                        <code className="text-[10px] text-white bg-black/40 px-1 py-0.5 rounded mx-1">[ITEM_NAME]</code>
                        <code className="text-[10px] text-white bg-black/40 px-1 py-0.5 rounded mx-1">[RATE]</code>
                        <code className="text-[10px] text-white bg-black/40 px-1 py-0.5 rounded mx-1">[QTY]</code>
                        <code className="text-[10px] text-white bg-black/40 px-1 py-0.5 rounded mx-1">[HSN]</code>
                        <code className="text-[10px] text-white bg-black/40 px-1 py-0.5 rounded mx-1">[BARCODE]</code>
                        <code className="text-[10px] text-white bg-black/40 px-1 py-0.5 rounded mx-1">[BUSINESS_NAME]</code>
                      </div>
                   </div>
                   <textarea 
                      value={prnTemplate}
                      onChange={(e) => {
                         setPrnTemplate(e.target.value);
                         localStorage.setItem('smritierp_prn_template', e.target.value);
                      }}
                      className="w-full h-32 bg-black/50 border border-white/10 rounded-sm p-3 text-[10px] text-green-400 font-mono outline-none focus:border-primary/50 resize-y"
                      placeholder="^XA&#10;^FO50,50^A0N,30,30^FD[ITEM_NAME]^FS&#10;^FO50,100^BCN,50,Y,N,N^FD[BARCODE]^FS&#10;^FO50,180^A0N,20,20^FDRs. [RATE]^FS&#10;^XZ"
                   />
                </div>
              )}

              <div className="grid gap-3">
                {items.length === 0 && <div className="text-center p-8 text-slate-500 text-xs font-bold uppercase tracking-wider border border-dashed border-white/10 rounded-sm">No items added to invoice.</div>}
                {items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-sm p-3">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="text-xs font-bold text-white mb-1 truncate">{item.name || 'Unnamed Product'}</div>
                      <div className="text-[10px] text-slate-400 font-mono tracking-wider">Rate: {form.currency}{item.rate.toLocaleString('en-IN')} &nbsp;•&nbsp; Stock Qty: {item.qty}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {barcodePrintMode === 'browser' ? (
                        <>
                          <button onClick={() => handlePrintBarcode(item, 1)} className="px-3 py-1.5 border border-white/10 hover:bg-white/10 text-[10px] font-bold text-slate-300 rounded-sm transition-colors uppercase tracking-wider">Print 1</button>
                          <button onClick={() => handlePrintBarcode(item, item.qty > 0 ? item.qty : 1)} className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/20 text-[10px] font-black rounded-sm transition-colors uppercase tracking-wider flex items-center gap-1.5">
                            <Printer size={12} /> Print All ({item.qty})
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleDownloadPrn(item, 1)} className="px-3 py-1.5 border border-white/10 hover:bg-white/10 text-[10px] font-bold text-slate-300 rounded-sm transition-colors uppercase tracking-wider">Download (1)</button>
                          <button onClick={() => handleDownloadPrn(item, item.qty > 0 ? item.qty : 1)} className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/20 text-[10px] font-black rounded-sm transition-colors uppercase tracking-wider flex items-center gap-1.5" title="Downloads mapped PRN containing all repeated labels">
                            <span className="material-symbols-outlined text-[12px]">download</span> Down All ({item.qty})
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px', background: '#d97706', color: 'white', padding: '10px 20px', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', fontSize: '13px', fontWeight: '700' }}>
          <CheckCircle size={16} /> {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/5 bg-[#12122a]/80 shrink-0 print:hidden" style={{ minHeight: '52px' }}>
        <button onClick={onClose} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
          <ChevronLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-3">
          {errorMsg && <span className="flex items-center gap-1 text-red-400 text-xs max-w-xs truncate"><AlertCircle size={13} /> {errorMsg}</span>}
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all disabled:opacity-50" style={{ background: '#f59e0b', color: '#0b0c16' }}>
            {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {isSaving ? 'Saving...' : (isNewDoc ? 'Save Order' : 'Update Order')}
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm border border-white/10 text-white hover:bg-white/10 transition-all">
            <Printer size={13} /> Print / PDF
          </button>
          <button onClick={() => setShowBarcodeModal(true)} className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all ml-2">
            <Barcode size={13} /> Labels
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="flex" style={{ flex: 1, minHeight: 0 }}>

        {/* LEFT SIDEBAR */}
        <div className="border-r border-white/5 overflow-y-auto" style={{ width: '390px', flexShrink: 0, background: '#0e0e22' }}>
          <div className="p-4 space-y-4">

            <div>
              <div className={SEC}>Order Settings</div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div><label className={LBL}>Type</label>
                  <select value={form.docType} onChange={e => setForm(f => ({ ...f, docType: e.target.value }))} className={INP}>
                    <option>PURCHASE ORDER</option><option>EXPENSE BILL</option>
                  </select>
                </div>
                <div><label className={LBL}>Status</label>
                  <select value={form.billStatus} onChange={e => setForm(f => ({ ...f, billStatus: e.target.value }))} className={INP}>
                    <option value="draft">Draft PO</option><option value="received">Stock Received</option><option value="paid">Paid & Settled</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div><label className={LBL}>Order #</label><input value={form.billNum} onChange={e => setForm(f => ({ ...f, billNum: e.target.value }))} className={INP + ' font-mono'} /></div>
                <div><label className={LBL}>Currency</label>
                  <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} className={INP}>
                    <option value="₹">₹ INR</option><option value="$">$ USD</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={LBL}>Order Date</label><input type="date" value={form.issueDate} onChange={e => setForm(f => ({ ...f, issueDate: e.target.value }))} className={INP} /></div>
                <div><label className={LBL}>Expected By</label><input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className={INP} /></div>
              </div>
            </div>

            <div>
              <div className={SEC}>Vendor / Supplier</div>
              <select value={form.vendorId} onChange={handleVendorChange} className={INP + ' mb-2'}>
                <option value="">-- Select Vendor --</option>
                {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
              <div className="mb-2"><label className={LBL}>Name</label><input value={form.toName} onChange={e => setForm(f => ({ ...f, toName: e.target.value }))} className={INP} /></div>
              <div className="mb-2"><label className={LBL}>Address</label><textarea rows={2} value={form.toAddr} onChange={e => setForm(f => ({ ...f, toAddr: e.target.value }))} className={INP + ' resize-none'} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={LBL}>Vendor GSTIN</label><input value={form.toGSTIN} onChange={e => setForm(f => ({ ...f, toGSTIN: e.target.value }))} className={INP + ' font-mono'} /></div>
                <div><label className={LBL}>Vendor PAN</label><input value={form.toPAN} onChange={e => setForm(f => ({ ...f, toPAN: e.target.value }))} className={INP + ' font-mono'} /></div>
              </div>
            </div>

            <div>
              <div className={SEC}>Pricing</div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className={LBL}>Discount %</label><input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: parseFloat(e.target.value) || 0 }))} className={INP} min="0" /></div>
                <div><label className={LBL}>GST %</label><input type="number" value={form.tax} onChange={e => setForm(f => ({ ...f, tax: parseFloat(e.target.value) || 0 }))} className={INP} min="0" /></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className={SEC} style={{ marginBottom: 0 }}>Procurement Items</div>
                <div className="flex gap-2">
                  <select onChange={e => { const id = e.target.value; if (!id) return; const p = products.find(x => x.id.toString() === id); if (p) setItems(prev => [...prev, { id: p.id, name: p.name, desc: p.description || '', qty: p.default_qty || 1, rate: p.purchase_rate || 0, hsn: p.hsn_code || '', uom: p.unit || 'pcs' }]); e.target.value = ''; }} className="text-[9px] bg-black/30 border border-white/10 text-slate-400 rounded-sm px-2 py-1 outline-none">
                    <option value="">+ Catalogue</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <button onClick={() => setItems(p => [...p, { name: '', desc: '', qty: 1, rate: 0, hsn: '', uom: 'pcs' }])} className="flex items-center gap-1 text-[9px] font-black uppercase text-amber-400 hover:bg-amber-400/10 px-2 py-1 rounded-sm transition-colors">
                    <Plus size={10} /> Add
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {items.map((it, i) => (
                  <div key={i} className="bg-black/20 border border-white/5 rounded-sm p-2 space-y-1.5">
                    <div className="flex gap-2 items-center">
                      <input value={it.name} onChange={e => { const u = [...items]; u[i].name = e.target.value; setItems(u); }} placeholder="Product Name" className="flex-1 text-xs text-white bg-transparent border-none outline-none font-bold" />
                      <button onClick={() => { const u = [...items]; u.splice(i, 1); setItems(u); }} className="text-red-400/60 hover:text-red-400 shrink-0 transition-colors"><Trash2 size={12} /></button>
                    </div>
                    <div className="flex gap-2">
                      <input value={it.hsn ?? ''} onChange={e => { const u = [...items]; u[i].hsn = e.target.value; setItems(u); }} placeholder="HSN" className="w-20 text-[10px] text-slate-400 bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <input value={it.uom ?? ''} onChange={e => { const u = [...items]; u[i].uom = e.target.value; setItems(u); }} placeholder="UOM" className="w-14 text-[10px] text-slate-400 bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <input type="number" value={it.qty} onChange={e => { const u = [...items]; u[i].qty = parseFloat(e.target.value) || 0; setItems(u); }} placeholder="Qty" className="w-14 text-[10px] text-center text-white bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <input type="number" value={it.rate} onChange={e => { const u = [...items]; u[i].rate = parseFloat(e.target.value) || 0; setItems(u); }} placeholder="Rate" className="flex-1 text-[10px] text-right text-white bg-black/20 rounded-sm px-1.5 py-0.5 outline-none border border-white/5" />
                      <span className="text-[10px] text-amber-400 font-black self-center whitespace-nowrap">{fmtAmt(it.qty * it.rate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className={SEC}>Notes to Vendor</div>
              <textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className={INP + ' resize-none'} />
            </div>
          </div>
        </div>

        {/* RIGHT — Scaled Document Preview */}
        <div ref={previewRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at 50% 50%, #110d00, #05050A)', overflow: 'hidden' }}>
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
            {/* TOP COLOR BAR */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #f59e0b, #f97316, #ef4444)' }} />

            {/* HEADER */}
            <div style={{ background: '#0f172a', padding: '28px 40px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(245,158,11,0.15)', border: '1.5px solid rgba(245,158,11,0.4)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '22px' }}>inventory</span>
                </div>
                <div>
                  <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: 900, letterSpacing: '-0.5px', textTransform: 'uppercase', fontFamily: "'Outfit',sans-serif", lineHeight: 1.1 }}>{form.fromName || 'Your Business Name'}</div>
                  <div style={{ color: '#f59e0b', fontSize: '8px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '3px' }}>Procurement Node</div>
                  {form.fromAddr && <div style={{ color: '#64748b', fontSize: '8.5px', marginTop: '6px', lineHeight: 1.6, maxWidth: '240px' }}>{form.fromAddr}</div>}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
                    {form.fromGSTIN && <div style={{ fontSize: '7.5px' }}><span style={{ color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>GSTIN: </span><span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{form.fromGSTIN}</span></div>}
                    {form.fromPAN && <div style={{ fontSize: '7.5px' }}><span style={{ color: '#475569', fontWeight: 700, textTransform: 'uppercase' }}>PAN: </span><span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{form.fromPAN}</span></div>}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#475569', marginBottom: '4px' }}>{form.docType}</div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', fontFamily: "'Outfit',sans-serif", letterSpacing: '-0.5px' }}>#{form.billNum}</div>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ fontSize: '8px', color: '#64748b' }}><span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Order: </span>{fmtDate(form.issueDate)}</div>
                  <div style={{ fontSize: '8px', color: '#64748b' }}><span style={{ fontWeight: 700, textTransform: 'uppercase' }}>Expected: </span>{fmtDate(form.dueDate)}</div>
                  <div style={{ marginTop: '4px', display: 'inline-block', padding: '3px 10px', borderRadius: '999px', fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', background: `${statusColor[form.billStatus] || '#f59e0b'}22`, color: statusColor[form.billStatus] || '#f59e0b', border: `1px solid ${statusColor[form.billStatus] || '#f59e0b'}44` }}>
                    {form.billStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* VENDOR */}
            <div style={{ padding: '16px 40px', background: '#fffbeb', borderBottom: '1px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#92400e', marginBottom: '6px' }}>Vendor / Supplier</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', fontFamily: "'Outfit',sans-serif" }}>{form.toName || 'Supplier Name'}</div>
                {form.toAddr && <div style={{ fontSize: '8.5px', color: '#64748b', marginTop: '4px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{form.toAddr}</div>}
              </div>
              {(form.toGSTIN || form.toPAN) && (
                <div style={{ textAlign: 'right' }}>
                  {form.toGSTIN && <div style={{ fontSize: '8px', color: '#78350f', marginBottom: '3px' }}><span style={{ fontWeight: 700, textTransform: 'uppercase' }}>GSTIN: </span><span style={{ fontFamily: 'monospace' }}>{form.toGSTIN}</span></div>}
                  {form.toPAN && <div style={{ fontSize: '8px', color: '#78350f' }}><span style={{ fontWeight: 700, textTransform: 'uppercase' }}>PAN: </span><span style={{ fontFamily: 'monospace' }}>{form.toPAN}</span></div>}
                </div>
              )}
            </div>

            {/* ITEMS TABLE */}
            <div style={{ padding: '0 40px', marginTop: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #0f172a' }}>
                    {['#', 'Item Description', 'HSN/SAC', 'Qty', 'UOM', 'Net Rate', 'Amount'].map((h, hi) => (
                      <th key={hi} style={{ padding: '6px 4px', fontSize: '7.5px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#64748b', textAlign: hi === 0 ? 'center' : hi >= 5 ? 'right' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fffbeb40' }}>
                      <td style={{ padding: '8px 4px', fontSize: '8.5px', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>{i + 1}</td>
                      <td style={{ padding: '8px 4px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', fontFamily: "'Outfit',sans-serif" }}>{it.name || 'Item'}</div>
                        {it.desc && <div style={{ fontSize: '8px', color: '#94a3b8', fontStyle: 'italic', marginTop: '1px' }}>{it.desc}</div>}
                      </td>
                      <td style={{ padding: '8px 4px', fontSize: '8px', color: '#94a3b8', fontFamily: 'monospace' }}>{it.hsn || '—'}</td>
                      <td style={{ padding: '8px 4px', fontSize: '9px', fontWeight: 700, color: '#334155' }}>{it.qty}</td>
                      <td style={{ padding: '8px 4px', fontSize: '8px', color: '#94a3b8', textTransform: 'uppercase' }}>{it.uom || 'pcs'}</td>
                      <td style={{ padding: '8px 4px', fontSize: '9px', color: '#475569', fontFamily: 'monospace', textAlign: 'right' }}>{fmtAmt(it.rate)}</td>
                      <td style={{ padding: '8px 4px', fontSize: '10px', fontWeight: 900, color: '#0f172a', fontFamily: "'Outfit',sans-serif", textAlign: 'right' }}>{form.currency}{fmtAmt(it.qty * it.rate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOTALS */}
            <div style={{ padding: '16px 40px 0', display: 'flex', gap: '24px', alignItems: 'flex-start', marginTop: '8px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ padding: '10px 12px', background: '#fffbeb', borderLeft: '3px solid #f59e0b', marginBottom: '12px', borderRadius: '0 4px 4px 0' }}>
                  <div style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#92400e', marginBottom: '4px' }}>Commitment in Words</div>
                  <div style={{ fontSize: '8.5px', fontWeight: 700, color: '#0f172a', lineHeight: 1.5, fontStyle: 'italic', textTransform: 'capitalize' }}>{numberToWords(finalTotal)}</div>
                </div>
                {form.notes && <div style={{ fontSize: '8.5px', color: '#64748b', lineHeight: 1.6, padding: '10px 12px', background: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0', fontStyle: 'italic' }}>{form.notes}</div>}
              </div>
              <div style={{ width: '220px', flexShrink: 0 }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{ background: '#f8fafc', padding: '10px 14px' }}>
                    {[
                      { label: 'Order Subtotal', value: fmtAmt(subtotal), color: '#334155' },
                      form.discount > 0 ? { label: `Discount (${form.discount}%)`, value: `- ${fmtAmt(discAmnt)}`, color: '#ef4444' } : null,
                      form.tax > 0 ? { label: `GST (${form.tax}%)`, value: fmtAmt(totalGST), color: '#22c55e' } : null,
                      Math.abs(roundOff) > 0.001 ? { label: 'Round Off', value: (roundOff >= 0 ? '+' : '') + roundOff.toFixed(2), color: '#94a3b8' } : null,
                    ].filter(Boolean).map((row, ri) => (
                      <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{row!.label}</span>
                        <span style={{ fontSize: '8.5px', fontWeight: 700, color: row!.color, fontFamily: 'monospace' }}>{form.currency}{row!.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#0f172a', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b' }}>Commitment</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#f59e0b', fontFamily: "'Outfit',sans-serif" }}>{form.currency}{fmtAmt(finalTotal)}</span>
                  </div>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '8px' }}>
                  <div style={{ fontSize: '7.5px', color: '#94a3b8', marginBottom: '32px' }}>Authorized Procurement for <span style={{ color: '#0f172a', fontWeight: 900 }}>{form.fromName || 'Business'}</span></div>
                  <div style={{ borderTop: '1.5px solid #0f172a', paddingTop: '6px' }}>
                    <div style={{ fontSize: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0f172a' }}>Authorized Signatory</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 40px', borderTop: '1px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fffbeb' }}>
              <div style={{ fontSize: '7.5px', color: '#92400e', fontWeight: 600 }}>AITDL SmritiERP Procurement · smritierp.com</div>
              <div style={{ fontSize: '7.5px', color: '#d97706', fontFamily: 'monospace' }}>{form.billNum} · {fmtDate(form.issueDate)}</div>
            </div>
          </div>
        </div>
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
