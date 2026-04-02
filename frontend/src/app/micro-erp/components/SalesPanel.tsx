/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Plus, Search, FileText, Trash2, Edit2 } from 'lucide-react';
import InvoiceEditor from './InvoiceEditor';

export default function SalesPanel() {
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
      // bills schema: id, bill_number, doc_type, status, to_name, issue_date, total, currency
      const res = db.exec(`SELECT id, bill_number, doc_type, to_name, issue_date, total, status, currency FROM bills ORDER BY id DESC`);
      if (res[0]) {
        const rows = res[0].values.map((r: any[]) => ({
          id: r[0] as number,
          num: r[1] as string || '',
          type: r[2] as string || '',
          client: r[3] as string || '',
          date: r[4] as string || '',
          total: r[5] as number || 0,
          status: r[6] as string || 'draft',
          currency: r[7] as string || '₹'
        })).filter((b) => 
          b.num.toLowerCase().includes(q) || 
          b.client.toLowerCase().includes(q)
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

      // 1. Record in financial_ledger
      db.run(`INSERT INTO financial_ledger (entity_id, entity_type, type, amount, currency, reference_doc, notes, created_at) 
              VALUES (?, 'CLIENT', 'RECEIPT', ?, ?, ?, 'Invoice Payment', ?)`,
              [selectedBill.client_id || 0, amount, selectedBill.currency, selectedBill.num, paymentDate]);

      // 2. Update bill status to 'paid' (or logic for partial)
      db.run(`UPDATE bills SET status='paid', updated_at=datetime('now') WHERE id=?`, [selectedBill.id]);

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
    if (confirm('Permanently delete this invoice?')) {
      db.run(`DELETE FROM inventory_ledger WHERE reference_doc=(SELECT bill_number FROM bills WHERE id=?)`, [id]);
      db.run(`DELETE FROM bills WHERE id=?`, [id]);
      persistDB();
      loadBills();
    }
  };

  const createNewBill = () => {
    setEditingBillId(null);
    setView('editor');
  };

  const editBill = (id: number) => {
    setEditingBillId(id);
    setView('editor');
  };

  const closeEditor = () => {
    setView('list');
  };

  if (view === 'editor') {
    return <InvoiceEditor billId={editingBillId} onClose={closeEditor} />;
  }

  // Calculate stats
  const totalBills = bills.length;
  const paidBills = bills.filter(b => b.status === 'paid').length;
  const revenue = bills.filter(b => b.status === 'paid').reduce((s, b) => s + (b.total || 0), 0);
  const pending = bills.filter(b => b.status === 'sent' || b.status === 'overdue').reduce((s, b) => s + (b.total || 0), 0);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Sales & Invoicing</h2>
          <p className="text-slate-400 text-sm">Create quotations, generate invoices, and track revenue.</p>
        </div>
        <button onClick={createNewBill} className="bg-primary text-background-dark font-bold px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-primary/90">
          <Plus size={16} /> New Document
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Docs</div>
          <div className="text-2xl font-display text-white">{totalBills}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Paid Docs</div>
          <div className="text-2xl font-display text-white">{paidBills}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Collected Revenue</div>
          <div className="text-2xl font-display text-primary">₹{revenue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Pending Dues</div>
          <div className="text-2xl font-display text-red-400">₹{pending.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice number or client name..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500" 
          />
        </div>
        
        {bills.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <FileText size={48} className="mb-4 text-slate-600" />
            <p>No invoices found. Create your first document.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-4 font-bold">Document</th>
                <th className="px-6 py-4 font-bold">Client</th>
                <th className="px-6 py-4 font-bold">Issue Date</th>
                <th className="px-6 py-4 font-bold text-right">Total Amount</th>
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
                  <td className="px-6 py-4 font-bold text-sm text-white">{b.client || '—'}</td>
                  <td className="px-6 py-4 font-mono text-xs">{b.date || '—'}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-primary">
                    {b.currency}{b.total?.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm border ${
                      b.status === 'paid' ? 'bg-green-400/10 text-green-400 border-green-400/20' : 
                      b.status === 'sent' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' : 
                      b.status === 'overdue' ? 'bg-red-400/10 text-red-400 border-red-400/20' : 
                      'bg-slate-400/10 text-slate-400 border-slate-400/20'
                    }`}>
                      {b.status || 'draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button onClick={() => editBill(b.id)} className="px-3 py-1 flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-sm hover:border-white/20 border border-transparent"><Edit2 size={12}/> Edit</button>
                    <button 
                      onClick={() => handleRecordPayment(b)}
                      title="Record Payment"
                      className="px-3 py-1 flex items-center gap-1 text-xs text-green-400 hover:text-green-300 bg-green-400/5 hover:bg-green-400/10 rounded-sm border border-green-400/20"
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
                   <h3 className="text-white font-display font-bold uppercase tracking-widest text-sm">Record Receipt</h3>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Payment for {selectedBill.num}</p>
                </div>
                <button onClick={() => setShowPaymentModal(false)} className="text-slate-500 hover:text-white transition-colors">
                   <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-6">
                 <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Total Outstanding</div>
                    <div className="text-2xl font-display font-black text-white">{selectedBill.currency}{selectedBill.total?.toLocaleString('en-IN')}</div>
                 </div>

                 <div className="space-y-4">
                    <div>
                       <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2">Amount Received ({selectedBill.currency})</label>
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
                       Confirm Receipt & Update Ledger
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
