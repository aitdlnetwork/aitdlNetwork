/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
*/

"use client";

import React, { useState, useEffect } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Barcode, Search, AlertCircle, Printer, X, Plus } from 'lucide-react';
import JsBarcode from 'jsbarcode';

interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  mrp: number;
  rate: number;
  unit: string;
  hsn: string;
  attr1: string;
  attr2: string;
  attr3: string;
  category: string;
  custom_fields: Record<string, string>;
  count: number;
}

export default function BarcodeModule() {
  const { db } = useERPDatabase();
  const [printMode, setPrintMode] = useState<'browser' | 'prn'>('browser');
  const [prnTemplate, setPrnTemplate] = useState('');
  
  // Search
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Batch Queue
  const [queue, setQueue] = useState<Product[]>([]);

  // Profile data
  const [profile, setProfile] = useState<any>({ toName: 'BUSINESS' });

  useEffect(() => {
    const saved = localStorage.getItem('smritierp_prn_template');
    if (saved) setPrnTemplate(saved);

    if (db) {
        try {
            const res = db.exec("SELECT key, value FROM business_profile WHERE key IN ('businessName', 'inv_dynamic_fields')");
            if (res[0]) {
                const p: any = {};
                res[0].values.forEach(r => p[r[0] as string] = r[1]);
                const dfStr = p['inv_dynamic_fields'] || '';
                const dynArr = dfStr.split(',').map((s:string) => s.trim()).filter(Boolean);
                setProfile({ toName: p.businessName || 'SMRITIERP', dynamic_fields: dynArr });
            }
        } catch(e) {}
    }
  }, [db]);

  useEffect(() => {
    if (!db || search.length < 2) {
      setSearchResults([]);
      return;
    }
    try {
      const q = `%${search.toLowerCase()}%`;
      const res = db.exec(`
        SELECT id, name, sku, barcode, mrp, default_rate, unit, hsn_code, attr1, attr2, attr3, category, custom_fields 
        FROM products 
        WHERE LOWER(name) LIKE ? OR LOWER(sku) LIKE ? OR LOWER(barcode) LIKE ? LIMIT 10
      `, [q, q, q]);
      
      if (res[0]) {
        const rows = res[0].values.map(r => {
          let jData = {};
          try { jData = JSON.parse(r[12] as string || '{}'); } catch(e){}
          return {
            id: r[0] as number, name: r[1] as string, sku: r[2] as string, barcode: r[3] as string,
            mrp: r[4] as number, rate: r[5] as number, unit: r[6] as string, hsn: r[7] as string,
            attr1: r[8] as string, attr2: r[9] as string, attr3: r[10] as string, category: r[11] as string,
            custom_fields: jData,
            count: 1
          };
        });
        setSearchResults(rows);
      } else {
        setSearchResults([]);
      }
    } catch(e) {}
  }, [db, search]);

  const addToQueue = (p: Product) => {
    const existing = queue.find(q => q.id === p.id);
    if (existing) {
      setQueue(queue.map(q => q.id === p.id ? { ...q, count: q.count + 1 } : q));
    } else {
      setQueue([...queue, { ...p, count: 1 }]);
    }
    setSearch('');
    setSearchResults([]);
  };

  const removeFromQueue = (id: number) => setQueue(queue.filter(q => q.id !== id));
  
  const updateCount = (id: number, count: number) => {
      if (count < 1) count = 1;
      setQueue(queue.map(q => q.id === id ? { ...q, count } : q));
  }

  const handlePrintPDF = (item?: Product) => {
    const targetQueue = item ? [item] : queue;
    if (targetQueue.length === 0) return;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    let html = `
    <html>
    <head>
      <title>Print Barcodes</title>
      <style>
        @page { margin: 0; size: 50mm 25mm; }
        body { margin: 0; padding: 2mm; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; text-align: center; }
        .label { width: 46mm; height: 21mm; display: flex; flex-direction: column; justify-content: center; align-items: center; page-break-after: always; box-sizing: border-box; overflow: hidden; }
        .business { font-size: 8px; font-weight: bold; margin-bottom: 2px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; color: #000; }
        .name { font-size: 9px; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; font-weight: bold; color: #000; }
        .price { font-size: 11px; font-weight: 900; margin-top: 1px; color: #000; }
        .meta { font-size: 7px; color: #000; font-weight: bold; margin-top: 1px; display: flex; gap: 4px; }
        img { max-width: 100%; height: 8mm; }
      </style>
    </head>
    <body onload="setTimeout(() => window.print(), 200);">
    `;

    for (const q of targetQueue) {
        // generate canvas
        const canvas = document.createElement('canvas');
        const code = q.barcode || q.sku || String(q.id).padStart(6, '0');
        try {
            JsBarcode(canvas, code, { format: "CODE128", width: 1.5, height: 35, displayValue: true, fontSize: 10, margin: 2 });
        } catch(e) {}
        const barcodeSrc = canvas.toDataURL('image/png');

        for(let i=0; i<q.count; i++) {
            html += `
            <div class="label">
               <div class="business">${profile.toName}</div>
               <img src="${barcodeSrc}" />
               <div class="name">${q.name.substring(0, 30)}</div>
               <div class="meta">
                 ${q.attr1 ? `<span>${q.attr1}</span>` : ''}
                 ${q.attr2 ? `<span>${q.attr2}</span>` : ''}
                 ${q.custom_fields && Object.values(q.custom_fields).filter(Boolean).length > 0 ? `<span>${Object.values(q.custom_fields).filter(Boolean)[0]}</span>` : ''}
               </div>
               <div class="price">MRP: ${q.mrp > 0 ? q.mrp : q.rate}</div>
            </div>
            `;
        }
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

  const handleDownloadPRN = (item?: Product) => {
    const targetQueue = item ? [item] : queue;
    if (targetQueue.length === 0) return;
    if (!prnTemplate.trim()) { alert('Please provide a PRN template first.'); return; }
    
    let finalPrnContext = '';

    for (const q of targetQueue) {
        const code = q.barcode || q.sku || String(q.id).padStart(6, '0');
        for (let i = 0; i < q.count; i++) {
            let replaced = prnTemplate;
            replaced = replaced.replace(/\[ITEM_NAME\]/gi, (q.name || '').substring(0, 30));
            replaced = replaced.replace(/\[RATE\]/gi, q.rate.toString());
            replaced = replaced.replace(/\[MRP\]/gi, q.mrp.toString());
            replaced = replaced.replace(/\[SKU\]/gi, q.sku || '');
            replaced = replaced.replace(/\[BRAND\]/gi, q.attr1 || '');
            replaced = replaced.replace(/\[SIZE\]/gi, q.attr2 || '');
            replaced = replaced.replace(/\[COLOR\]/gi, q.attr3 || '');
            replaced = replaced.replace(/\[HSN\]/gi, q.hsn || '');
            replaced = replaced.replace(/\[BARCODE\]/gi, code);
            replaced = replaced.replace(/\[BUSINESS_NAME\]/gi, (profile.toName || 'SMRITIERP').substring(0, 30));
            
            // Dynamic JSON replacements
            if (q.custom_fields) {
                Object.entries(q.custom_fields).forEach(([key, val]) => {
                    if (typeof key === 'string') {
                       const regex = new RegExp(`\\[${key.toUpperCase().trim()}\\]`, 'gi');
                       replaced = replaced.replace(regex, (val as string) || '');
                    }
                });
            }
            
            finalPrnContext += replaced + '\n\n';
        }
    }
    
    const blob = new Blob([finalPrnContext], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_${Date.now()}.prn`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn flex flex-col h-[calc(100vh-2rem)]">
      
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter flex items-center gap-3">
             <Barcode size={24} className="text-primary"/> Barcode Print Station
          </h2>
          <p className="text-slate-400 text-xs font-display tracking-widest uppercase">Batch Label Dispatch Pipeline</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* LEFT COLUMN: SOURCE & PRN TEMPLATE */}
        <div className="col-span-1 flex flex-col gap-6 h-full overflow-y-auto pr-2">
            
            {/* Search Box */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-4 shrink-0 relative">
                <div className="text-[10px] uppercase font-black tracking-widest text-primary mb-3">Product Search</div>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        value={search} onChange={e=>setSearch(e.target.value)}
                        placeholder="Scan or type item name / SKU..."
                        className="w-full bg-black/40 border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm text-white font-mono outline-none focus:border-primary/50"
                    />
                </div>
                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#0b0c16] border border-white/10 rounded-sm shadow-2xl z-50 max-h-64 overflow-y-auto">
                        {searchResults.map(r => (
                            <div key={r.id} onClick={() => addToQueue(r)} className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer flex justify-between items-center group">
                                <div>
                                    <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">{r.name}</div>
                                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">₹{r.mrp || r.rate} • SKU: {r.sku || '-'}</div>
                                </div>
                                <Plus size={16} className="text-slate-600 group-hover:text-primary"/>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Print Mode Config */}
            <div className="bg-white/5 border border-white/10 rounded-sm flex flex-col flex-1 min-h-0">
                <div className="flex border-b border-white/5 shrink-0">
                    <button onClick={() => setPrintMode('browser')} className={`flex-1 px-4 py-3 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${printMode === 'browser' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-slate-500 hover:text-white'}`}>Native PDF (50x25)</button>
                    <button onClick={() => setPrintMode('prn')} className={`flex-1 px-4 py-3 text-[10px] font-black uppercase tracking-wider border-b-2 transition-all ${printMode === 'prn' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-slate-500 hover:text-white'}`}>Raw PRN Dispatch</button>
                </div>
                
                <div className="p-5 overflow-y-auto flex-1">
                    {printMode === 'browser' ? (
                        <div className="text-xs text-amber-500/80 bg-amber-500/10 border border-amber-500/20 px-4 py-4 rounded-sm flex items-start gap-3 leading-relaxed">
                            <AlertCircle size={18} className="shrink-0 mt-0.5" />
                            <p><strong>Thermal Label PDF Format.</strong> Generates a standard graphic canvas formatted for 50mm x 25mm thermal labels. Ensure your printer driver paper size perfectly matches this dimension.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 h-full">
                            <div className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-sm leading-relaxed">
                                <strong>Raw PRN Mode (ZPL/TSPL)</strong><br/>
                                <div className="mt-2 text-slate-300 font-mono space-y-1">
                                    <div>[ITEM_NAME]</div>
                                    <div>[RATE] / [MRP]</div>
                                    <div>[SKU] / [BARCODE]</div>
                                    <div>[BRAND] / [SIZE] / [COLOR]</div>
                                    {profile.dynamic_fields && profile.dynamic_fields.length > 0 && (
                                      <div className="text-green-400 font-bold mt-1">
                                        Infinite Tags detected: {profile.dynamic_fields.map((df:string) => `[${df.toUpperCase()}]`).join(' / ')}
                                      </div>
                                    )}
                                </div>
                            </div>
                            <textarea 
                                value={prnTemplate}
                                onChange={(e) => {
                                    setPrnTemplate(e.target.value);
                                    localStorage.setItem('smritierp_prn_template', e.target.value);
                                }}
                                className="w-full flex-1 bg-black/50 border border-white/10 rounded-sm p-4 text-[11px] text-green-400 font-mono outline-none focus:border-primary/50 resize-none min-h-[200px]"
                                placeholder="Paste your raw ^XA / TSPL printer template here..."
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: DISPATCH QUEUE */}
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-sm flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0b0c16]/50 shrink-0">
                <div className="text-[10px] uppercase font-black tracking-widest text-primary flex items-center gap-2">
                    <Printer size={14}/> Batch Print Queue
                </div>
                {queue.length > 0 && (
                    <div className="flex gap-2">
                        {printMode === 'browser' ? (
                            <button onClick={()=>handlePrintPDF()} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2">
                                <Printer size={14} /> Print All ({queue.reduce((acc, q) => acc + q.count, 0)})
                            </button>
                        ) : (
                            <button onClick={()=>handleDownloadPRN()} className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[14px]">download</span> Download PRN Spool
                            </button>
                        )}
                        <button onClick={()=>setQueue([])} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest rounded-sm transition-colors">Clear</button>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto">
                {queue.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8">
                        <Barcode size={48} className="mb-4 opacity-20" />
                        <div className="text-xs uppercase tracking-widest font-bold">Queue is empty. Search items to add to batch.</div>
                     </div>
                ) : (
                    <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-[#0b0c16]/80 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/10 sticky top-0 z-10">
                            <tr>
                                <th className="px-5 py-4 font-black">Product</th>
                                <th className="px-5 py-4 font-black">MRP</th>
                                <th className="px-5 py-4 font-black text-center w-32">No. Labels</th>
                                <th className="px-5 py-4 font-black text-right w-20">Act</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {queue.map(q => (
                                <tr key={q.id} className="hover:bg-white/5 group">
                                    <td className="px-5 py-3">
                                        <div className="font-bold text-white text-sm">{q.name}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            {q.sku && <span className="text-[9px] text-amber-500 font-mono tracking-widest">SKU:{q.sku}</span>}
                                            {q.attr1 && <span className="text-[9px] bg-white/5 px-1 rounded-sm text-slate-400">{q.attr1}</span>}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 font-mono">₹{q.mrp > 0 ? q.mrp : q.rate}</td>
                                    <td className="px-5 py-3 text-center">
                                        <input 
                                            type="number" min="1" value={q.count || ''} 
                                            onChange={(e) => updateCount(q.id, parseInt(e.target.value) || 1)}
                                            className="w-16 bg-black/40 border border-white/10 rounded-sm text-center px-2 py-1.5 text-white font-mono outline-none focus:border-primary"
                                        />
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <button onClick={()=>removeFromQueue(q.id)} className="p-1.5 text-slate-500 hover:text-red-400 rounded-sm hover:bg-red-400/10 transition-colors">
                                            <X size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}
