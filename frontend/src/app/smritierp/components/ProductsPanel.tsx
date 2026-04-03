/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
*/

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Pencil, Trash2, Plus, Search, PackageOpen } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  unit: string;
  default_rate: number;
  purchase_rate: number;
  mrp: number;
  sku: string;
  barcode: string;
  attr1: string;
  attr2: string;
  attr3: string;
  custom_fields: Record<string, string>;
  stock: number;
}

export default function ProductsPanel() {
  const { db, persistDB } = useERPDatabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Bulk Excel Parse State
  const [excelText, setExcelText] = useState('');
  const [parsedRows, setParsedRows] = useState<Product[]>([]);

  // Business Retail/Shoper9 Profile
  const [profile, setProfile] = useState({
    attr1_label: 'Brand',
    attr2_label: 'Size',
    attr3_label: 'Color',
    enable_mrp: true,
    enable_barcode: true,
    dynamic_fields: [] as string[],
    price_groups: [] as string[]
  });
  
  const [form, setForm] = useState({ 
    name: '', description: '', category: 'General', 
    unit: 'pcs', default_rate: '', purchase_rate: '', mrp: '',
    sku: '', barcode: '', attr1: '', attr2: '', attr3: '',
    custom_fields: {} as Record<string, string>
  });

  const loadProfile = useCallback(() => {
    if (!db) return;
    try {
      const res = db.exec(`SELECT key, value FROM business_profile WHERE key IN ('inv_attr1_label', 'inv_attr2_label', 'inv_attr3_label', 'inv_enable_mrp', 'inv_enable_barcode', 'inv_dynamic_fields', 'inv_price_groups')`);
      if (res[0]) {
        const loaded: any = {};
        res[0].values.forEach(r => loaded[r[0] as string] = r[1]);
        
        let dynArr = (loaded['inv_dynamic_fields'] || '').split(',').map((s:string) => s.trim()).filter(Boolean);
        const pgStr = loaded['inv_price_groups'] || '';
        const pgArr = pgStr.split(',').map((s:string) => s.split(':')[0].trim()).filter(Boolean);
        
        // Merge Price Groups into Dynamic Fields so they render on the table seamlessly!
        dynArr = Array.from(new Set([...dynArr, ...pgArr]));
        
        setProfile(p => ({
          attr1_label: loaded['inv_attr1_label'] || p.attr1_label,
          attr2_label: loaded['inv_attr2_label'] || p.attr2_label,
          attr3_label: loaded['inv_attr3_label'] || p.attr3_label,
          enable_mrp: loaded['inv_enable_mrp'] !== 'false',
          enable_barcode: loaded['inv_enable_barcode'] !== 'false',
          dynamic_fields: dynArr,
          price_groups: pgArr
        }));
      }
    } catch(e) { console.error(e); }
  }, [db]);

  const loadProducts = useCallback(() => {
    if (!db) return;
    try {
      const q = search.toLowerCase();
      const res = db.exec(`
        SELECT p.id, p.name, p.description, p.category, p.unit, p.default_rate, p.sku, p.purchase_rate,
               COALESCE((SELECT SUM(CASE WHEN type='IN' THEN qty WHEN type='OUT' THEN -qty ELSE qty END) FROM inventory_ledger WHERE product_id = p.id), 0) as stock,
               p.mrp, p.barcode, p.attr1, p.attr2, p.attr3, p.custom_fields
        FROM products p 
        ORDER BY p.category, p.name
      `);
      if (res[0]) {
        const rows = res[0].values.map(r => {
          let jData = {};
          try { jData = JSON.parse(r[14] as string || '{}'); } catch(e){}
          return {
            id: r[0] as number,
            name: r[1] as string || '',
            description: r[2] as string || '',
            category: r[3] as string || 'General',
            unit: r[4] as string || '',
            default_rate: r[5] as number || 0,
            sku: r[6] as string || '',
            purchase_rate: r[7] as number || 0,
            stock: r[8] as number || 0,
            mrp: r[9] as number || 0,
            barcode: r[10] as string || '',
            attr1: r[11] as string || '',
            attr2: r[12] as string || '',
            attr3: r[13] as string || '',
            custom_fields: jData
          };
        }).filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.barcode.toLowerCase().includes(q) || p.attr1.toLowerCase().includes(q));
        setProducts(rows);
      } else {
        setProducts([]);
      }
    } catch(e) {
      console.error(e);
    }
  }, [db, search]);

  useEffect(() => {
    loadProfile();
    loadProducts();
  }, [loadProfile, loadProducts]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    
    const sellRate = parseFloat(form.default_rate) || 0;
    const buyRate = parseFloat(form.purchase_rate) || 0;
    const mrpRate = parseFloat(form.mrp) || 0;

    const data = [
      form.name, form.description, form.category, form.unit, sellRate, buyRate, 
      mrpRate, form.sku, form.barcode, form.attr1, form.attr2, form.attr3,
      JSON.stringify(form.custom_fields)
    ];

    if (editingId) {
      db.run(`UPDATE products SET name=?, description=?, category=?, unit=?, default_rate=?, purchase_rate=?, mrp=?, sku=?, barcode=?, attr1=?, attr2=?, attr3=?, custom_fields=? WHERE id=?`, [...data, editingId]);
    } else {
      db.run(`INSERT INTO products (name, description, category, unit, default_rate, purchase_rate, mrp, sku, barcode, attr1, attr2, attr3, custom_fields) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`, data);
    }
    persistDB();
    setIsModalOpen(false);
    loadProducts();
  };

  const handleDelete = (id: number) => {
    if (!db) return;
    if (confirm('Delete this product/service? This will also remove all associated stock ledger entries.')) {
      db.run(`DELETE FROM inventory_ledger WHERE product_id=?`, [id]);
      db.run(`DELETE FROM products WHERE id=?`, [id]);
      persistDB();
      loadProducts();
    }
  };

  const openForm = (prod?: Product) => {
    if (prod) {
      setEditingId(prod.id);
      setForm({ 
        name: prod.name, description: prod.description, category: prod.category, 
        unit: prod.unit, default_rate: prod.default_rate.toString(), 
        purchase_rate: prod.purchase_rate.toString(), mrp: prod.mrp.toString(),
        sku: prod.sku, barcode: prod.barcode, attr1: prod.attr1, attr2: prod.attr2, attr3: prod.attr3,
        custom_fields: prod.custom_fields || {}
      });
    } else {
      setEditingId(null);
      setForm({ name: '', description: '', category: 'General', unit: 'pcs', default_rate: '', purchase_rate: '', mrp: '', sku: '', barcode: '', attr1: '', attr2: '', attr3: '', custom_fields: {} });
    }
    setIsModalOpen(true);
  };

  // --- EXCEL BULK PASTE LOGIC ---
  const handleExcelPaste = (text: string) => {
    setExcelText(text);
    const rows = text.split('\n').filter(r => r.trim().length > 0);
    const parsed: Product[] = [];
    
    // Ignore header row if it looks like a header (contains 'Name' or 'Item')
    const startIdx = (rows.length > 0 && (rows[0].toLowerCase().includes('name') || rows[0].toLowerCase().includes('sku'))) ? 1 : 0;

    for (let i = startIdx; i < rows.length; i++) {
        const cols = rows[i].split('\t').map(c => c.trim());
        if (!cols[0]) continue; // Name is required
        const cFields: Record<string,string> = {};
        profile.dynamic_fields.forEach((df, dfIdx) => {
           cFields[df] = cols[10 + dfIdx] ? cols[10 + dfIdx].substring(0, 50) : '';
        });

        parsed.push({
            id: i, // temp id
            name: cols[0].substring(0, 50),
            sku: cols[1] ? cols[1].substring(0, 20) : '',
            category: cols[2] ? cols[2].substring(0, 30) : 'General',
            attr1: cols[3] ? cols[3].substring(0, 20) : '',
            attr2: cols[4] ? cols[4].substring(0, 20) : '',
            attr3: cols[5] ? cols[5].substring(0, 20) : '',
            purchase_rate: parseFloat(cols[6]) || 0,
            mrp: parseFloat(cols[7]) || 0,
            default_rate: parseFloat(cols[8]) || 0,
            barcode: cols[9] ? cols[9].substring(0, 30) : '',
            unit: 'pcs',
            description: '',
            stock: 0,
            custom_fields: cFields
        });
    }
    setParsedRows(parsed);
  };

  const commitExcelBatch = () => {
    if (!db || parsedRows.length === 0) return;
    
    try {
        db.run("BEGIN TRANSACTION");
        for (const row of parsedRows) {
             const data = [
                row.name, row.description, row.category, row.unit, row.default_rate, row.purchase_rate, 
                row.mrp, row.sku, row.barcode, row.attr1, row.attr2, row.attr3, JSON.stringify(row.custom_fields)
             ];
             db.run(`INSERT INTO products (name, description, category, unit, default_rate, purchase_rate, mrp, sku, barcode, attr1, attr2, attr3, custom_fields) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`, data);
        }
        db.run("COMMIT");
        persistDB();
        setIsExcelModalOpen(false);
        setExcelText('');
        setParsedRows([]);
        loadProducts();
    } catch(e) {
        db.run("ROLLBACK");
        alert('Bulk import failed. Please check your data format.');
        console.error(e);
    }
  };

  // --- RULE ENGINE LOGIC ---
  const [ruleForm, setRuleForm] = useState({ targetGroup: '', filterField: 'ALL', filterVal: '', baseField: 'mrp', op: '-', amount: '', amtType: '%' });
  
  const applyPriceRule = () => {
      if (!db || !ruleForm.targetGroup || !ruleForm.amount) return;
      const amt = parseFloat(ruleForm.amount);
      if (isNaN(amt)) return;

      const filtered = products.filter(p => {
          if (ruleForm.filterField === 'ALL') return true;
          if (ruleForm.filterField === 'category') return p.category.toLowerCase() === ruleForm.filterVal.toLowerCase();
          if (ruleForm.filterField === 'attr1') return p.attr1.toLowerCase() === ruleForm.filterVal.toLowerCase();
          if (ruleForm.filterField === 'attr2') return p.attr2.toLowerCase() === ruleForm.filterVal.toLowerCase();
          if (ruleForm.filterField === 'attr3') return p.attr3.toLowerCase() === ruleForm.filterVal.toLowerCase();
          return true;
      });

      if (!confirm(`Warning: This algebraic rule will irreversibly overwrite "${ruleForm.targetGroup}" pricing for ${filtered.length} products. Proceed?`)) return;

      try {
          db.run("BEGIN TRANSACTION");
          for (const p of filtered) {
               const baseAmt = ruleForm.baseField === 'mrp' ? p.mrp : p.default_rate;
               const change = ruleForm.amtType === '%' ? (baseAmt * amt / 100) : amt;
               let finalAmt = baseAmt;
               if (ruleForm.op === '+') finalAmt += change;
               if (ruleForm.op === '-') finalAmt -= change;
               if (ruleForm.op === '*') finalAmt *= change;
               
               const newJ = { ...p.custom_fields, [ruleForm.targetGroup]: finalAmt.toFixed(2) };
               db.run("UPDATE products SET custom_fields=? WHERE id=?", [JSON.stringify(newJ), p.id]);
          }
          db.run("COMMIT");
          persistDB();
          setIsRuleModalOpen(false);
          loadProducts();
          alert(`Successfully computed & saved ${filtered.length} new prices.`);
      } catch(e) {
          db.run("ROLLBACK");
          console.error(e);
          alert('Mathematical batch processing failed.');
      }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-5">
        <div>
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Inventory Master</h2>
          <p className="text-slate-400 text-xs font-display tracking-widest uppercase">Shoper-Grade Master Data Management</p>
        </div>
        <div className="flex gap-3">
          {profile.price_groups.length > 0 && (
              <button onClick={() => setIsRuleModalOpen(true)} className="bg-purple-500/10 border border-purple-500/20 text-purple-400 font-black px-4 py-2.5 rounded-sm flex items-center gap-2 hover:bg-purple-500/20 text-[10px] uppercase tracking-widest transition-colors shadow-lg">
                <span className="material-symbols-outlined text-[14px]">calculate</span> Price Policy Engine
              </button>
          )}
          <button onClick={() => { setIsExcelModalOpen(true); setExcelText(''); setParsedRows([]); }} className="bg-green-500/10 border border-green-500/20 text-green-400 font-black px-4 py-2.5 rounded-sm flex items-center gap-2 hover:bg-green-500/20 text-[10px] uppercase tracking-widest transition-colors shadow-lg">
            <span className="material-symbols-outlined text-[14px]">content_paste</span> Bulk Paste Excel
          </button>
          <button onClick={() => openForm()} className="bg-primary text-background-dark font-black px-5 py-2.5 rounded-sm flex items-center gap-2 hover:bg-primary/90 text-[10px] uppercase tracking-widest transition-colors shadow-lg">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center bg-[#0b0c16]/50 gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search by Name, SKU, category, or ${profile.attr1_label}...`} 
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-600 font-mono text-sm" 
          />
        </div>
        
        {products.length === 0 ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center">
            <PackageOpen size={48} className="mb-4 text-slate-600/50" />
            <p className="text-xs uppercase tracking-widest font-bold">No items found. Build your product catalogue.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0b0c16]/80 text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/10">
                <tr>
                  <th className="px-5 py-4 font-black">Item Identity</th>
                  <th className="px-5 py-4 font-black text-center">Stock</th>
                  <th className="px-5 py-4 font-black">{profile.attr1_label}</th>
                  <th className="px-5 py-4 font-black text-center">{profile.attr2_label} / {profile.attr3_label}</th>
                  {profile.dynamic_fields.map((df, i) => <th key={i} className="px-5 py-4 font-black text-green-500/80">{df}</th>)}
                  {profile.enable_mrp && <th className="px-5 py-4 font-black text-right">MRP</th>}
                  <th className="px-5 py-4 font-black text-right">Sales Rate</th>
                  <th className="px-5 py-4 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-black text-white text-sm mb-0.5">{p.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] uppercase tracking-wider bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-sm border border-white/10">
                          {p.category}
                        </span>
                        {p.sku && <span className="text-[10px] text-amber-500 font-mono tracking-widest font-bold">SKU:{p.sku}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className={`font-mono text-xl font-bold ${p.stock <= 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {p.stock}
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest">{p.unit}</div>
                    </td>
                    <td className="px-5 py-3 font-bold text-slate-300">{p.attr1 || '-'}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {p.attr2 && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-sm border border-white/10">{p.attr2}</span>}
                        {p.attr3 && <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-sm border border-white/10">{p.attr3}</span>}
                        {(!p.attr2 && !p.attr3) && <span className="text-slate-600">-</span>}
                      </div>
                    </td>
                    {profile.dynamic_fields.map((df, i) => (
                      <td key={i} className="px-5 py-3 font-mono text-green-400 font-bold">{p.custom_fields?.[df] || '-'}</td>
                    ))}
                    {profile.enable_mrp && (
                      <td className="px-5 py-3 text-right font-mono text-slate-500">
                        ₹{p.mrp.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </td>
                    )}
                    <td className="px-5 py-3 text-right">
                      <div className="font-mono text-white text-sm font-bold">₹{p.default_rate.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                      {p.purchase_rate > 0 && <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Cost: ₹{p.purchase_rate}</div>}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => openForm(p)} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-sm transition-colors"><Pencil size={14}/></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-sm transition-colors border border-red-500/20"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0b0c16] border border-white/10 w-full max-w-4xl rounded-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#12122a]">
              <h3 className="text-sm font-display font-black text-white uppercase tracking-widest">{editingId ? 'Edit Product Master' : 'New Product Registration'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">×</button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6">
              
              <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em] border-b border-white/5 pb-2 mb-4">Core Identity</div>
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="col-span-2">
                  <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">Item Name <span className="text-red-400">*</span></label>
                  <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white outline-none focus:border-primary/50 text-xs" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">Category</label>
                  <input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white outline-none focus:border-primary/50 text-xs" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">Unit</label>
                  <input value={form.unit} onChange={e=>setForm({...form, unit: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white outline-none focus:border-primary/50 text-xs" placeholder="pcs, mtr, kg" />
                </div>
                <div className="col-span-4">
                  <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">Description</label>
                  <textarea rows={2} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white outline-none focus:border-primary/50 text-xs resize-none" />
                </div>
              </div>

              <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em] border-b border-white/5 pb-2 mb-4">Retail Custom Attributes</div>
              <div className="grid grid-cols-3 gap-4 mb-8 bg-white/5 p-4 rounded-sm border border-white/5">
                <div>
                  <label className="block text-[9px] uppercase font-black text-primary mb-1">{profile.attr1_label}</label>
                  <input value={form.attr1} onChange={e=>setForm({...form, attr1: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-white outline-none focus:border-primary/50 text-xs" placeholder="e.g. Nike, Samsung" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-black text-amber-500 mb-1">{profile.attr2_label}</label>
                  <input value={form.attr2} onChange={e=>setForm({...form, attr2: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-white outline-none focus:border-primary/50 text-xs" placeholder="e.g. XL, 42, 100g" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-black text-green-500 mb-1">{profile.attr3_label}</label>
                  <input value={form.attr3} onChange={e=>setForm({...form, attr3: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-sm px-3 py-2 text-white outline-none focus:border-primary/50 text-xs" placeholder="e.g. Red, Matte" />
                </div>
                {profile.dynamic_fields.map((df, i) => (
                  <div key={i}>
                    <label className="block text-[9px] uppercase font-black text-blue-400 mb-1">{df}</label>
                    <input value={form.custom_fields[df] || ''} onChange={e=>setForm({...form, custom_fields: {...form.custom_fields, [df]: e.target.value}})} className="w-full bg-black/50 border border-blue-500/30 rounded-sm px-3 py-2 text-blue-300 font-mono outline-none focus:border-blue-500 text-xs" placeholder={`Data for ${df}`} />
                  </div>
                ))}
              </div>

              <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em] border-b border-white/5 pb-2 mb-4">Pricing & Codes</div>
              <div className="grid grid-cols-4 gap-4 mb-2">
                {profile.enable_barcode && (
                  <>
                    <div className="col-span-2">
                      <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">SKU / Item Code</label>
                      <input value={form.sku} onChange={e=>setForm({...form, sku: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white font-mono outline-none focus:border-primary/50 text-xs uppercase" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">Manufacturer Barcode (EAN/UPC)</label>
                      <input value={form.barcode} onChange={e=>setForm({...form, barcode: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white font-mono outline-none focus:border-primary/50 text-xs" />
                    </div>
                  </>
                )}
                
                <div className={`col-span-${profile.enable_mrp ? '1' : '2'}`}>
                  <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">Purchase Rate (Cost)</label>
                  <input type="number" step="0.01" min="0" value={form.purchase_rate} onChange={e=>setForm({...form, purchase_rate: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-white font-mono outline-none focus:border-primary/50 text-xs" />
                </div>
                {profile.enable_mrp && (
                  <div className="col-span-1">
                    <label className="block text-[9px] uppercase font-black text-slate-500 mb-1">MRP</label>
                    <input type="number" step="0.01" min="0" value={form.mrp} onChange={e=>setForm({...form, mrp: e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-sm px-3 py-2 text-slate-400 font-mono outline-none focus:border-primary/50 text-xs" />
                  </div>
                )}
                <div className={`col-span-${profile.enable_mrp ? '2' : '2'}`}>
                  <label className="block text-[9px] uppercase font-black text-primary mb-1">Sales Rate (Your Price)</label>
                  <input type="number" step="0.01" min="0" value={form.default_rate} onChange={e=>setForm({...form, default_rate: e.target.value})} className="w-full bg-primary/10 border border-primary/30 rounded-sm px-3 py-2 text-white font-mono outline-none focus:border-primary text-xs font-bold" />
                </div>
              </div>
            </form>
            <div className="p-5 border-t border-white/5 flex gap-3 bg-[#12122a] shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-white/5 text-white py-2.5 rounded-sm hover:bg-white/10 transition uppercase tracking-widest text-[10px] font-black border border-white/10">Cancel</button>
                <button onClick={handleSave} className="flex-1 bg-primary text-background-dark py-2.5 rounded-sm hover:bg-primary/90 transition uppercase tracking-widest text-[10px] font-black flex items-center justify-center gap-2">
                  <Pencil size={14} /> Commit to Inventory Master
                </button>
            </div>
          </div>
        </div>
      )}

      {/* EXCEL IMPORT MODAL */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-[#0b0c16] border border-white/10 w-full max-w-6xl rounded-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#12122a]">
              <h3 className="text-sm font-display font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <span className="material-symbols-outlined text-green-400">grid_on</span> Bulk Master Import (Excel Paste)
              </h3>
              <button onClick={() => setIsExcelModalOpen(false)} className="text-slate-400 hover:text-white">×</button>
            </div>
            
            <div className="flex-1 flex flex-col min-h-0">
               <div className="p-4 bg-blue-500/5 border-b border-blue-500/10">
                  <div className="text-[10px] uppercase font-black tracking-widest text-blue-400 mb-2">Instructions</div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">Copy your data from Excel (Ctrl+C) and paste it into the box below (Ctrl+V). The columns in your Excel sheet MUST match this exact order (left-to-right):</p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-white font-bold">1. Item Name*</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-amber-400">2. SKU</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-slate-300">3. Category</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-slate-300">4. {profile.attr1_label}</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-slate-300">5. {profile.attr2_label}</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-slate-300">6. {profile.attr3_label}</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-red-300">7. Unit Cost</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-blue-300">8. MRP</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-green-400">9. Sales Rate</span>
                      <span className="bg-black/50 px-2 py-1 rounded-sm border border-white/10 text-amber-200">10. Barcode</span>
                      {profile.dynamic_fields.map((df, i) => (
                        <span key={i} className="bg-black/50 px-2 py-1 rounded-sm border border-blue-500/30 text-blue-300 font-bold">{11 + i}. {df}</span>
                      ))}
                  </div>
               </div>

               <div className="flex flex-1 min-h-0 bg-black/20">
                  <div className="w-1/3 border-r border-white/5 flex flex-col p-4 bg-[#0b0c16]">
                      <label className="text-[10px] uppercase font-black text-slate-500 mb-2 tracking-widest">Paste Data Here</label>
                      <textarea 
                          value={excelText}
                          onChange={(e) => handleExcelPaste(e.target.value)}
                          className="flex-1 bg-black/50 text-green-400 font-mono text-[10px] p-3 border border-white/10 rounded-sm outline-none focus:border-green-500/50 resize-none whitespace-pre"
                          placeholder="Paste TSV data directly from Excel..."
                      />
                  </div>
                  <div className="w-2/3 overflow-auto flex flex-col">
                      <div className="bg-[#12122a] p-3 border-b border-white/5 sticky top-0 text-[10px] uppercase font-black text-slate-400 tracking-widest flex justify-between items-center z-10 shrink-0">
                          Data Preview ({parsedRows.length} Items Validated)
                      </div>
                      <div className="flex-1 overflow-auto">
                        <table className="w-full text-left text-xs whitespace-nowrap">
                            <thead className="bg-[#0b0c16]/80 text-[9px] uppercase tracking-widest text-slate-500 sticky top-0 z-10 border-b border-white/10">
                                <tr>
                                    <th className="px-3 py-2">Name</th>
                                    <th className="px-3 py-2">SKU</th>
                                    <th className="px-3 py-2">Category</th>
                                    <th className="px-3 py-2">{profile.attr1_label}</th>
                                    <th className="px-3 py-2">{profile.attr2_label}</th>
                                    <th className="px-3 py-2">{profile.attr3_label}</th>
                                    <th className="px-3 py-2 text-right">Cost</th>
                                    <th className="px-3 py-2 text-right">MRP</th>
                                    <th className="px-3 py-2 text-right">Selling</th>
                                    {profile.dynamic_fields.map((df, i) => <th key={i} className="px-3 py-2">{df}</th>)}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {parsedRows.map((r, i) => (
                                    <tr key={i} className="hover:bg-white/5 text-[10px]">
                                        <td className="px-3 py-1.5 font-bold text-white max-w-[150px] truncate">{r.name}</td>
                                        <td className="px-3 py-1.5 font-mono text-amber-500">{r.sku||'-'}</td>
                                        <td className="px-3 py-1.5 text-slate-400">{r.category||'-'}</td>
                                        <td className="px-3 py-1.5 text-slate-400">{r.attr1||'-'}</td>
                                        <td className="px-3 py-1.5 text-slate-400">{r.attr2||'-'}</td>
                                        <td className="px-3 py-1.5 text-slate-400">{r.attr3||'-'}</td>
                                        <td className="px-3 py-1.5 text-right font-mono">{r.purchase_rate}</td>
                                        <td className="px-3 py-1.5 text-right font-mono">{r.mrp}</td>
                                        <td className="px-3 py-1.5 text-right font-mono text-green-400 font-bold">{r.default_rate}</td>
                                        {profile.dynamic_fields.map((df, i) => (
                                          <td key={i} className="px-3 py-1.5 font-mono text-blue-400">{r.custom_fields?.[df] || '-'}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                      </div>
                  </div>
               </div>
            </div>

            <div className="p-4 border-t border-white/5 flex gap-3 bg-[#12122a] shrink-0 justify-end items-center">
                <button type="button" onClick={() => setIsExcelModalOpen(false)} className="px-6 bg-white/5 text-white py-2.5 rounded-sm hover:bg-white/10 transition uppercase tracking-widest text-[10px] font-black border border-white/10">Cancel</button>
                <button onClick={commitExcelBatch} disabled={parsedRows.length === 0} className="px-8 bg-green-500 text-background-dark py-2.5 rounded-sm hover:bg-green-400 transition uppercase tracking-widest text-[10px] font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="material-symbols-outlined text-[14px]">save</span> Commit {parsedRows.length} Items to Database
                </button>
            </div>
          </div>
        </div>
      )}

      {/* RULE ENGINE MODAL */}
      {isRuleModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0b0c16] border border-purple-500/30 rounded-sm shadow-2xl w-full max-w-lg overflow-hidden flex flex-col font-body animate-fadeIn relative">
             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"></div>
             
             <div className="p-6 border-b border-white/5 space-y-1 bg-[#12122a]">
                <h2 className="text-lg font-black text-white tracking-widest uppercase flex items-center gap-2">
                   <span className="material-symbols-outlined text-purple-400">calculate</span> Mass Price Assigner
                </h2>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider">Execute mathematical margin policies instantly across the database.</p>
             </div>

             <div className="p-6 space-y-5 bg-[#0b0c16]">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest block">1. Target Price Group</label>
                   <select className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-purple-500/50"
                           value={ruleForm.targetGroup} onChange={e => setRuleForm({...ruleForm, targetGroup: e.target.value})}>
                      <option value="">-- Select Target Destination --</option>
                      {profile.price_groups.map(pg => <option key={pg} value={pg}>{pg}</option>)}
                      <option value="" disabled>--- Other Dynamic Fields ---</option>
                      {profile.dynamic_fields.filter(df => !profile.price_groups.includes(df)).map(df => <option key={df} value={df}>{df}</option>)}
                   </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                       <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest block">2. Filter Attribute</label>
                       <select className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-purple-500/50"
                               value={ruleForm.filterField} onChange={e => setRuleForm({...ruleForm, filterField: e.target.value})}>
                          <option value="ALL">Apply to ALL Products</option>
                          <option value="category">Category</option>
                          <option value="attr1">{profile.attr1_label}</option>
                          <option value="attr2">{profile.attr2_label}</option>
                          <option value="attr3">{profile.attr3_label}</option>
                       </select>
                   </div>
                   <div className="space-y-2">
                       <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest block">Target Value</label>
                       <input type="text" placeholder={ruleForm.filterField === 'ALL' ? 'N/A' : 'Exact match (e.g. Nike)'} 
                              disabled={ruleForm.filterField === 'ALL'}
                              className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-xs text-white outline-none focus:border-purple-500/50 disabled:opacity-30"
                              value={ruleForm.filterVal} onChange={e => setRuleForm({...ruleForm, filterVal: e.target.value})} />
                   </div>
                </div>

                <div className="space-y-3 bg-purple-500/5 p-4 border border-purple-500/10 rounded-sm">
                   <label className="text-[10px] uppercase font-black text-purple-400 tracking-widest block flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">functions</span> 3. Algebraic Formula</label>
                   <div className="flex gap-2 items-center">
                       <span className="text-xs font-mono text-slate-400 shrink-0">TAKE</span>
                       <select className="flex-1 bg-black/50 border border-white/10 rounded-sm p-2 text-xs text-white outline-none focus:border-purple-500/50"
                               value={ruleForm.baseField} onChange={e => setRuleForm({...ruleForm, baseField: e.target.value})}>
                          <option value="mrp">MRP</option>
                          <option value="default_rate">Default Sales Rate</option>
                       </select>
                   </div>
                   <div className="flex gap-2 items-center">
                       <span className="text-xs font-mono text-slate-400 shrink-0">AND</span>
                       <select className="w-16 bg-black/50 border border-white/10 rounded-sm p-2 text-xs text-white outline-none text-center font-black"
                               value={ruleForm.op} onChange={e => setRuleForm({...ruleForm, op: e.target.value})}>
                          <option value="+">ADD</option>
                          <option value="-">SUBTRACT</option>
                          <option value="*">MULTIPLY BY</option>
                       </select>
                       <input type="number" placeholder="Value..." className="flex-1 bg-black/50 border border-white/10 rounded-sm p-2 text-xs text-white outline-none text-right font-mono"
                              value={ruleForm.amount} onChange={e => setRuleForm({...ruleForm, amount: e.target.value})} />
                       <select className="w-16 bg-black/50 border border-white/10 rounded-sm p-2 text-xs text-white outline-none text-center font-black"
                               value={ruleForm.amtType} onChange={e => setRuleForm({...ruleForm, amtType: e.target.value})}>
                          <option value="%">%</option>
                          <option value="flat">₹ Flat</option>
                       </select>
                   </div>
                </div>
             </div>

             <div className="p-4 border-t border-white/5 flex gap-3 bg-[#12122a] shrink-0 justify-end items-center">
                <button type="button" onClick={() => setIsRuleModalOpen(false)} className="px-6 bg-white/5 text-white py-2.5 rounded-sm hover:bg-white/10 transition uppercase tracking-widest text-[10px] font-black border border-white/10">Abort</button>
                <button onClick={applyPriceRule} disabled={!ruleForm.targetGroup || !ruleForm.amount} className="px-8 bg-purple-600 text-white py-2.5 rounded-sm hover:bg-purple-500 transition uppercase tracking-widest text-[10px] font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="material-symbols-outlined text-[14px]">send</span> Compute & Commit
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
