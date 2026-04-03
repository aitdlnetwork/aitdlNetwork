/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Pencil, Trash2, Plus, Users, Search } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  addr: string;
  gst: string;
  price_group: string;
}

export default function ClientsPanel() {
  const { db, persistDB } = useERPDatabase();
  const [entityType, setEntityType] = useState<'clients' | 'vendors'>('clients');
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [priceGroups, setPriceGroups] = useState<string[]>([]);
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', addr: '', gst: '', price_group: '' });

  const loadEntities = useCallback(() => {
    if (!db) return;
    try {
      const q = search.toLowerCase();
      const cols = entityType === 'clients' ? 'id, name, email, phone, addr, gst, price_group' : 'id, name, email, phone, addr, gst';
      const res = db.exec(`SELECT ${cols} FROM ${entityType} ORDER BY name`);
      if (res[0]) {
        const rows = res[0].values.map(r => ({
          id: r[0] as number,
          name: r[1] as string || '',
          email: r[2] as string || '',
          phone: r[3] as string || '',
          addr: r[4] as string || '',
          gst: r[5] as string || '',
          price_group: r[6] as string || ''
        })).filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
        setClients(rows);
      } else {
        setClients([]);
      }
    } catch (e) {
      console.error(e);
    }
    try {
      const pRes = db.exec(`SELECT value FROM business_profile WHERE key = 'inv_price_groups'`);
      if (pRes[0]) {
         const pgStr = pRes[0].values[0][0] as string || '';
         setPriceGroups(pgStr.split(',').map(s => s.split(':')[0].trim()).filter(Boolean));
      }
    } catch(e) {}
  }, [db, search, entityType]);

  useEffect(() => {
    loadEntities();
  }, [loadEntities]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    if (editingId) {
      if (entityType === 'clients') {
        db.run(`UPDATE clients SET name=?, email=?, phone=?, addr=?, gst=?, price_group=? WHERE id=?`, [form.name, form.email, form.phone, form.addr, form.gst, form.price_group, editingId]);
      } else {
        db.run(`UPDATE vendors SET name=?, email=?, phone=?, addr=?, gst=? WHERE id=?`, [form.name, form.email, form.phone, form.addr, form.gst, editingId]);
      }
    } else {
      if (entityType === 'clients') {
        db.run(`INSERT INTO clients (name, email, phone, addr, gst, price_group) VALUES(?,?,?,?,?,?)`, [form.name, form.email, form.phone, form.addr, form.gst, form.price_group]);
      } else {
        db.run(`INSERT INTO vendors (name, email, phone, addr, gst) VALUES(?,?,?,?,?)`, [form.name, form.email, form.phone, form.addr, form.gst]);
      }
    }
    persistDB();
    setIsModalOpen(false);
    loadEntities();
  };

  const handleDelete = (id: number) => {
    if (!db) return;
    if (confirm(`Delete this ${entityType === 'clients' ? 'client' : 'vendor'}?`)) {
      db.run(`DELETE FROM ${entityType} WHERE id=?`, [id]);
      persistDB();
      loadEntities();
    }
  };

  const openForm = (client?: Client) => {
    if (client) {
      setEditingId(client.id);
      setForm({ name: client.name, email: client.email, phone: client.phone, addr: client.addr, gst: client.gst, price_group: client.price_group || '' });
    } else {
      setEditingId(null);
      setForm({ name: '', email: '', phone: '', addr: '', gst: '', price_group: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Entities & CRM</h2>
          <p className="text-slate-400 text-sm">Manage your customers and suppliers to auto-fill documents.</p>
        </div>
        <button onClick={() => openForm()} className="bg-primary text-background-dark font-bold px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-primary/90">
          <Plus size={16} /> New {entityType === 'clients' ? 'Client' : 'Vendor'}
        </button>
      </div>
      
      <div className="flex bg-white/5 border border-white/10 rounded-sm p-1 w-fit">
        <button 
          onClick={() => setEntityType('clients')} 
          className={`px-6 py-2 rounded-sm text-sm tracking-widest uppercase font-bold transition ${entityType === 'clients' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white'}`}>
          Clients (Sales)
        </button>
        <button 
          onClick={() => setEntityType('vendors')} 
          className={`px-6 py-2 rounded-sm text-sm tracking-widest uppercase font-bold transition ${entityType === 'vendors' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white'}`}>
          Vendors (Purchases)
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${entityType}...`} 
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500" 
          />
        </div>
        
        {clients.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <Users size={48} className="mb-4 text-slate-600" />
            <p>No {entityType} found in your database.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4 font-bold">{entityType === 'clients' ? 'Client' : 'Vendor'} / Company</th>
                <th className="px-6 py-4 font-bold">Contact</th>
                <th className="px-6 py-4 font-bold">Tax / GST</th>
                {entityType === 'clients' && <th className="px-6 py-4 font-bold text-center">Price Group</th>}
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {clients.map(c => (
                <tr key={c.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[200px]">{entityType === 'clients' ? 'Billing Address: ' : 'Supply Address: '}{c.addr}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs">{c.email || '—'}</div>
                    <div className="text-xs text-slate-500">{c.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{c.gst || '—'}</td>
                  {entityType === 'clients' && (
                    <td className="px-6 py-4 text-center">
                       {c.price_group ? <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-1 rounded-sm text-[10px] font-bold tracking-widest uppercase">{c.price_group}</span> : <span className="text-slate-600 text-xs">—</span>}
                    </td>
                  )}
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button onClick={() => openForm(c)} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-sm"><Pencil size={14}/></button>
                    <button onClick={() => handleDelete(c.id)} className="p-2 text-red-400 hover:text-red-300 bg-white/5 hover:bg-red-400/10 rounded-sm"><Trash2 size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#12122a] border border-white/10 w-full max-w-md rounded-sm overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">{editingId ? `Edit ${entityType}` : `Add ${entityType}`}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-400 mb-1">Company / Name</label>
                <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 mb-1">Phone</label>
                  <input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-slate-400 mb-1">{entityType === 'clients' ? 'Billing Address' : 'Supplier Address'}</label>
                <textarea rows={2} value={form.addr} onChange={e=>setForm({...form, addr: e.target.value})} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs uppercase text-slate-400 mb-1">GSTIN / Tax ID</label>
                <input value={form.gst} onChange={e=>setForm({...form, gst: e.target.value})} className="w-full font-mono bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white outline-none focus:border-primary" />
              </div>
              
              {entityType === 'clients' && priceGroups.length > 0 && (
                <div className="bg-purple-500/10 p-4 border border-purple-500/30 rounded-sm mt-4">
                   <label className="block text-[10px] uppercase font-black tracking-widest text-purple-400 mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[14px]">price_change</span> Assign Price Policy / Group</label>
                   <select value={form.price_group} onChange={e=>setForm({...form, price_group: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-sm px-4 py-2 text-white text-xs outline-none focus:border-purple-500">
                      <option value="">-- Standard Pricing --</option>
                      {priceGroups.map(pg => <option key={pg} value={pg}>{pg}</option>)}
                   </select>
                </div>
              )}
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white/5 text-white py-2 rounded-sm hover:bg-white/10 transition uppercase tracking-widest text-xs font-bold">Cancel</button>
                <button type="submit" className="flex-1 bg-primary text-background-dark py-2 rounded-sm hover:bg-primary/90 transition uppercase tracking-widest text-xs font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
