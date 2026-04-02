/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Pencil, Trash2, Plus, Box, Search, PackageOpen } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  unit: string;
  default_rate: number;
  purchase_rate: number;
  sku: string;
  stock: number;
}

export default function ProductsPanel() {
  const { db, persistDB } = useERPDatabase();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [form, setForm] = useState({ 
    name: '', description: '', category: 'General', 
    unit: 'pcs', default_rate: '', purchase_rate: '', sku: '' 
  });

  useEffect(() => {
    loadProducts();
  }, [db, search]);

  const loadProducts = () => {
    if (!db) return;
    try {
      const q = search.toLowerCase();
      const res = db.exec(`
        SELECT p.id, p.name, p.description, p.category, p.unit, p.default_rate, p.sku, p.purchase_rate,
               COALESCE((SELECT SUM(CASE WHEN type='IN' THEN qty WHEN type='OUT' THEN -qty ELSE qty END) FROM inventory_ledger WHERE product_id = p.id), 0) as stock
        FROM products p 
        ORDER BY p.category, p.name
      `);
      if (res[0]) {
        const rows = res[0].values.map(r => ({
          id: r[0] as number,
          name: r[1] as string || '',
          description: r[2] as string || '',
          category: r[3] as string || 'General',
          unit: r[4] as string || '',
          default_rate: r[5] as number || 0,
          sku: r[6] as string || '',
          purchase_rate: r[7] as number || 0,
          stock: r[8] as number || 0
        })).filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        setProducts(rows);
      } else {
        setProducts([]);
      }
    } catch(e) {
      console.error(e);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    
    // Parse numeric fields safely
    const sellRate = parseFloat(form.default_rate) || 0;
    const buyRate = parseFloat(form.purchase_rate) || 0;

    if (editingId) {
      db.run(`UPDATE products SET name=?, description=?, category=?, unit=?, default_rate=?, purchase_rate=?, sku=? WHERE id=?`, 
        [form.name, form.description, form.category, form.unit, sellRate, buyRate, form.sku, editingId]);
    } else {
      db.run(`INSERT INTO products (name, description, category, unit, default_rate, purchase_rate, sku) VALUES(?,?,?,?,?,?,?)`, 
        [form.name, form.description, form.category, form.unit, sellRate, buyRate, form.sku]);
    }
    persistDB();
    setIsModalOpen(false);
    loadProducts();
  };

  const handleDelete = (id: number) => {
    if (!db) return;
    if (confirm('Delete this product/service? This will also remove all associated stock ledger entries.')) {
      // Cascade: remove ledger entries first to prevent orphaned stock data
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
        purchase_rate: prod.purchase_rate.toString(), sku: prod.sku 
      });
    } else {
      setEditingId(null);
      setForm({ name: '', description: '', category: 'General', unit: 'pcs', default_rate: '', purchase_rate: '', sku: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Inventory Master</h2>
          <p className="text-slate-400 text-sm">Manage your products, services, pricing, and SKUs.</p>
        </div>
        <button onClick={() => openForm()} className="bg-primary text-background-dark font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90">
          <Plus size={16} /> New Item
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, category, or SKU..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500" 
          />
        </div>
        
        {products.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <PackageOpen size={48} className="mb-4 text-slate-600" />
            <p>No items found. Build your product catalogue.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4 font-bold">Item Name & SKU</th>
                <th className="px-6 py-4 font-bold text-center">Current Stock</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold text-right">Purchase Price</th>
                <th className="px-6 py-4 font-bold text-right">Selling Price</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-xs text-slate-500 flex gap-2 items-center">
                      {p.sku && <span className="font-mono text-[10px] bg-white/10 px-1 py-0.5 rounded text-slate-300 border border-white/10">{p.sku}</span>}
                      <span className="truncate max-w-[200px]">{p.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-mono text-lg font-bold ${p.stock <= 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {p.stock}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">{p.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-slate-400">
                    ₹{p.purchase_rate.toLocaleString('en-IN', {minimumFractionDigits: 2})} <span className="text-xs">/{p.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-white">
                    ₹{p.default_rate.toLocaleString('en-IN', {minimumFractionDigits: 2})} <span className="text-xs text-slate-500">/{p.unit}</span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button onClick={() => openForm(p)} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg"><Pencil size={14}/></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:text-red-300 bg-white/5 hover:bg-red-400/10 rounded-lg"><Trash2 size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#12122a] border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">{editingId ? 'Edit Item' : 'New Item / Service'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs uppercase text-slate-400 mb-1">Item Name <span className="text-red-400">*</span></label>
                  <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">SKU Code</label>
                  <input value={form.sku} onChange={e=>setForm({...form, sku: e.target.value})} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white font-mono uppercase outline-none focus:border-primary" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs uppercase text-slate-400 mb-1">Description (Optional)</label>
                <textarea rows={2} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Category</label>
                  <input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} placeholder="e.g. Services, Hardware" className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Unit of Measure</label>
                  <input value={form.unit} onChange={e=>setForm({...form, unit: e.target.value})} placeholder="pcs, kg, hour..." className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Purchase Cost (₹)</label>
                  <input type="number" step="0.01" min="0" value={form.purchase_rate} onChange={e=>setForm({...form, purchase_rate: e.target.value})} className="w-full font-mono bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-primary mb-1">Selling Price (₹)</label>
                  <input type="number" step="0.01" min="0" value={form.default_rate} onChange={e=>setForm({...form, default_rate: e.target.value})} className="w-full font-mono bg-background-dark/50 border border-primary/30 rounded-lg px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 text-white py-3 rounded-lg hover:bg-white/10 transition uppercase tracking-widest text-xs font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-background-dark py-3 rounded-lg hover:bg-primary/90 transition uppercase tracking-widest text-xs font-bold">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
