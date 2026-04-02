/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Plus, Search, ShoppingCart, Trash2, Edit2 } from 'lucide-react';
import PurchaseEditor from './PurchaseEditor';

export default function PurchasesPanel() {
  const { db, persistDB } = useERPDatabase();
  const [bills, setBills] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  
  // View states: 'list', 'editor'
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingBillId, setEditingBillId] = useState<number | null>(null);

  // Payment States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (view === 'list') {
      loadBills();
    }
  }, [db, search, view]);

  const loadBills = () => {
    if (!db) return;
    try {
      const q = search.toLowerCase();
      // purchases schema: id, bill_number, doc_type, status, to_name, issue_date, total, currency
      const res = db.exec(`SELECT id, bill_number, doc_type, to_name, issue_date, total, status, currency FROM purchases ORDER BY id DESC`);
      if (res[0]) {
        const rows = res[0].values.map((r: any[]) => ({
          id: r[0], num: r[1], type: r[2], vendor: r[3],
          date: r[4], total: r[5], status: r[6], currency: r[7]
        })).filter((b: any) => 
          (b.num && b.num.toLowerCase().includes(q)) || 
          (b.vendor && b.vendor.toLowerCase().includes(q))
        );
        setBills(rows);
      } else {
        setBills([]);
      }
    } catch(e) {
      console.error(e);
    }
  };

  const handleRecordPayment = (bill: any) => {
    setSelectedBill(bill);
    setPaymentAmount(bill.total.toString());
    setShowPaymentModal(true);
  };

  const savePayment = () => {
    if (!db || !selectedBill) return;
    try {
      const amount = parseFloat(paymentAmount);
      if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount.");
        return;
      }

      // 1. Record in financial_ledger (ENTITY_TYPE: VENDOR, TYPE: PAYMENT)
      db.run(`INSERT INTO financial_ledger (entity_id, entity_type, type, amount, currency, reference_doc, notes, created_at) 
              VALUES (?, 'VENDOR', 'PAYMENT', ?, ?, ?, 'Vendor Settlement', ?)`,
              [selectedBill.vendor_id || 0, amount, selectedBill.currency, selectedBill.num, paymentDate]);

      // 2. Update purchase status to 'paid'
      db.run(`UPDATE purchases SET status='paid', updated_at=datetime('now') WHERE id=?`, [selectedBill.id]);

      persistDB();
      setShowPaymentModal(false);
      loadBills();
    } catch(e) {
      console.error(e);
      alert("Payment recording failed.");
    }
  };

  const handleDelete = (id: number) => {
    if (!db) return;
    if (confirm('Permanently delete this purchase document?')) {
      db.run(`DELETE FROM inventory_ledger WHERE reference_doc=(SELECT bill_number FROM purchases WHERE id=?)`, [id]);
      db.run(`DELETE FROM purchases WHERE id=?`, [id]);
      persistDB();
      loadBills();
    }
  };

  if (view === 'editor') {
    return <PurchaseEditor billId={editingBillId} onClose={() => setView('list')} />;
  }

  const totalBills = bills.length;
  // For purchases, 'received' or 'paid' indicates it's an executed order
  const executedBills = bills.filter(b => b.status === 'received' || b.status === 'paid').length;
  const payable = bills.filter(b => b.status === 'sent' || b.status === 'received').reduce((s, b) => s + (b.total || 0), 0);
  const totalSpend = bills.filter(b => b.status === 'paid').reduce((s, b) => s + (b.total || 0), 0);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Purchases & Procurement</h2>
          <p className="text-slate-400 text-sm">Generate Purchase Orders and log incoming supplier bills (Accounts Payable).</p>
        </div>
        <button onClick={() => { setEditingBillId(null); setView('editor'); }} className="bg-primary text-background-dark font-bold px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-primary/90">
          <Plus size={16} /> New PO / Bill
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Orders</div>
          <div className="text-2xl font-display text-white">{totalBills}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Executed Docs</div>
          <div className="text-2xl font-display text-white">{executedBills}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Accounts Payable</div>
          <div className="text-2xl font-display text-red-400">₹{payable.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Settled</div>
          <div className="text-2xl font-display text-primary">₹{totalSpend.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number or vendor name..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500" 
          />
        </div>
        
        {bills.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <ShoppingCart size={48} className="mb-4 text-slate-600" />
            <p>No purchase records found. Start your procurement process.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4 font-bold">Document</th>
                <th className="px-6 py-4 font-bold">Vendor</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold text-right">Amount</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bills.map((b, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold text-white tracking-wider">{b.num}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">{b.type}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-white">{b.vendor || '—'}</td>
                  <td className="px-6 py-4 font-mono text-xs">{b.date || '—'}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-primary">
                    {b.currency}{b.total?.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm border ${
                      b.status === 'paid' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                      b.status === 'received' ? 'bg-primary/10 text-primary border-primary/20' : 
                      'bg-slate-400/10 text-slate-400 border-slate-400/20'
                    }`}>
                      {b.status || 'draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button onClick={() => { setEditingBillId(b.id); setView('editor'); }} className="px-3 py-1 flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-sm border border-transparent hover:border-white/20"><Edit2 size={12}/> Edit</button>
                    <button 
                       onClick={() => handleRecordPayment(b)}
                       title="Settle Payment" 
                       className="px-3 py-1 flex items-center gap-1 text-xs text-primary hover:text-primary bg-primary/5 hover:bg-primary/10 rounded-sm border border-primary/20"
                    >
                       <span className="material-symbols-outlined text-[14px]">payments</span> Pay
                    </button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 text-red-400 hover:text-red-300 bg-white/5 hover:bg-red-400/10 rounded-sm"><Trash2 size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Payment Recording Modal */}
      {showPaymentModal && selectedBill && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-6">
           <div className="bg-[#12122a] border border-primary/20 w-full max-w-md p-8 rounded-sm shadow-2xl animate-scaleIn">
              <div className="flex justify-between items-center mb-6">
                <div>
                   <h3 className="text-white font-display font-bold uppercase tracking-widest text-sm">Vendor Settlement</h3>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Payment for {selectedBill.num}</p>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className="text-slate-500 hover:text-white transition-colors">
                   <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-6">
                 <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Total Payable</div>
                    <div className="text-2xl font-display font-black text-white">{selectedBill.currency}{selectedBill.total?.toLocaleString('en-IN')}</div>
                 </div>

                 <div className="space-y-4">
                    <div>
                       <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2">Amount Paid ({selectedBill.currency})</label>
                       <input 
                          type="number" 
                          value={paymentAmount} 
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:border-primary outline-none text-xl font-mono" 
                          autoFocus
                       />
                    </div>
                    <div>
                       <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2">Payment Date</label>
                       <input 
                          type="date" 
                          value={paymentDate} 
                          onChange={(e) => setPaymentDate(e.target.value)}
                          className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none text-sm" 
                       />
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button 
                      onClick={savePayment} 
                      className="flex-1 bg-primary text-background-dark font-display font-black uppercase tracking-widest text-[10px] py-4 rounded-sm hover:bg-primary/90 transition-all shadow-lg"
                    >
                       Confirm Settlement & Update Ledger
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
