/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Plus, Search, ShoppingCart, Trash2, Edit2, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import PurchaseEditor from './PurchaseEditor';

interface Bill {
  id: number;
  num: string;
  type: string;
  vendor: string;
  vendor_id?: number;
  date: string;
  total: number;
  status: string;
  currency: string;
}

export default function PurchasesPanel() {
  const { db, persistDB } = useERPDatabase();
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState('');

  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingBillId, setEditingBillId] = useState<number | null>(null);

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentSaving, setPaymentSaving] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const paymentSavingRef = useRef(false); // sync guard

  const loadBills = useCallback(() => {
    if (!db) return;
    try {
      const q = search.toLowerCase();
      const res = db.exec(`SELECT id, bill_number, doc_type, to_name, vendor_id, issue_date, total, status, currency FROM purchases ORDER BY id DESC`);
      if (res[0]) {
        const rows = res[0].values.map((r: unknown[]) => ({
          id: r[0] as number,
          num: r[1] as string || '',
          type: r[2] as string || '',
          vendor: r[3] as string || '',
          vendor_id: r[4] as number,
          date: r[5] as string || '',
          total: r[6] as number || 0,
          status: r[7] as string || 'draft',
          currency: r[8] as string || '₹'
        })).filter((b: Bill) =>
          (b.num && b.num.toLowerCase().includes(q)) ||
          (b.vendor && b.vendor.toLowerCase().includes(q))
        );
        setBills(rows);
      } else {
        setBills([]);
      }
    } catch (e) { console.error(e); }
  }, [db, search]);

  useEffect(() => {
    if (view === 'list') setTimeout(() => loadBills(), 0);
  }, [view, loadBills]);

  // ── Open payment modal — block if already settled ───────────────────────
  const handleRecordPayment = (bill: Bill) => {
    if (bill.status === 'paid') {
      alert(`Order ${bill.num} is already SETTLED. No further payment can be recorded.`);
      return;
    }
    setSelectedBill(bill);
    setPaymentAmount(bill.total.toString());
    setPaymentError(null);
    setPaymentSuccess(false);
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setShowPaymentModal(true);
  };

  // ── Save payment — fully controlled ────────────────────────────────────
  const savePayment = () => {
    if (!db || !selectedBill || paymentSavingRef.current) return;

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setPaymentError('Enter a valid amount greater than zero.');
      return;
    }

    // ── Duplicate guard: check if a PAYMENT already exists for this order ──
    const existingPayment = db.exec(
      `SELECT COUNT(*) FROM financial_ledger WHERE reference_doc=? AND type='PAYMENT'`,
      [selectedBill.num]
    );
    const existingCount = existingPayment[0]?.values[0]?.[0] as number || 0;
    if (existingCount > 0) {
      setPaymentError(`A payment for "${selectedBill.num}" already exists in the ledger. Delete it first to re-record.`);
      return;
    }

    paymentSavingRef.current = true;
    setPaymentSaving(true);
    setPaymentError(null);

    try {
      // 1. Insert PAYMENT into financial_ledger
      db.run(
        `INSERT INTO financial_ledger (entity_id, entity_type, type, amount, currency, reference_doc, notes, created_at)
         VALUES (?, 'VENDOR', 'PAYMENT', ?, ?, ?, 'Vendor Settlement', ?)`,
        [selectedBill.vendor_id || 0, amount, selectedBill.currency, selectedBill.num, paymentDate]
      );

      // 2. Mark purchase as paid
      db.run(`UPDATE purchases SET status='paid', updated_at=datetime('now') WHERE id=?`, [selectedBill.id]);

      persistDB();
      setPaymentSuccess(true);

      setTimeout(() => {
        paymentSavingRef.current = false;
        setPaymentSaving(false);
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        loadBills();
      }, 1500);
    } catch (e: unknown) {
      paymentSavingRef.current = false;
      setPaymentSaving(false);
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setPaymentError('Failed to record payment: ' + msg);
    }
  };

  const handleDelete = (id: number) => {
    if (!db) return;
    if (confirm('Permanently delete this purchase order and all its ledger entries?')) {
      try {
        db.run(`DELETE FROM inventory_ledger WHERE reference_doc=(SELECT bill_number FROM purchases WHERE id=?)`, [id]);
        db.run(`DELETE FROM financial_ledger WHERE reference_doc=(SELECT bill_number FROM purchases WHERE id=?)`, [id]);
        db.run(`DELETE FROM purchases WHERE id=?`, [id]);
        persistDB();
        loadBills();
      } catch (e) { console.error(e); alert('Delete failed.'); }
    }
  };

  if (view === 'editor') {
    return <PurchaseEditor billId={editingBillId} onClose={() => setView('list')} />;
  }

  const totalBills = bills.length;
  const executedBills = bills.filter(b => b.status === 'received' || b.status === 'paid').length;
  const payable = bills.filter(b => b.status === 'sent' || b.status === 'received').reduce((s, b) => s + (b.total || 0), 0);
  const totalSpend = bills.filter(b => b.status === 'paid').reduce((s, b) => s + (b.total || 0), 0);

  const isSettled = (b: Bill) => b.status === 'paid';

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-1">Purchases & Procurement</h2>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Generate Purchase Orders and log incoming supplier bills.</p>
        </div>
        <button onClick={() => { setEditingBillId(null); setView('editor'); }} className="bg-primary text-background-dark font-bold px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-primary/90">
          <Plus size={16} /> New PO / Bill
        </button>
      </div>

      {/* Stats */}
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
          <div className="text-2xl font-display text-red-400">₹{payable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Settled</div>
          <div className="text-2xl font-display text-primary">₹{totalSpend.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-3">
          <Search size={18} className="text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order number or vendor name..." className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500" />
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
                    {b.currency}{b.total?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
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
                    <button onClick={() => { setEditingBillId(b.id); setView('editor'); }} className="px-3 py-1 flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-sm border border-transparent hover:border-white/20">
                      <Edit2 size={12} /> Edit
                    </button>
                    {/* Settle button — greyed out if already paid */}
                    <button
                      onClick={() => handleRecordPayment(b)}
                      title={isSettled(b) ? 'Already settled' : 'Record Vendor Payment'}
                      className={`px-3 py-1 flex items-center gap-1 text-xs rounded-sm border transition-all ${
                        isSettled(b)
                          ? 'text-slate-600 bg-white/3 border-white/5 cursor-not-allowed opacity-50'
                          : 'text-primary hover:text-primary bg-primary/5 hover:bg-primary/10 border-primary/20 cursor-pointer'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">payments</span>
                      {isSettled(b) ? 'Settled' : 'Settle'}
                    </button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 text-red-400 hover:text-red-300 bg-white/5 hover:bg-red-400/10 rounded-sm">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Payment Modal ─────────────────────────────────────────────────── */}
      {showPaymentModal && selectedBill && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-6">
          <div className="bg-[#12122a] border border-amber-400/20 w-full max-w-md p-8 rounded-sm shadow-2xl animate-scaleIn">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-white font-display font-bold uppercase tracking-widest text-sm">Vendor Settlement</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Payment for {selectedBill.num}</p>
              </div>
              <button onClick={() => { if (!paymentSaving) setShowPaymentModal(false); }} className="text-slate-500 hover:text-white transition-colors" disabled={paymentSaving}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {paymentSuccess ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <CheckCircle size={48} className="text-amber-400" />
                <div className="text-amber-400 font-bold text-sm uppercase tracking-widest">Payment Recorded</div>
                <div className="text-xs text-slate-500">Ledger updated. Order marked as Paid.</div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-sm border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Total Payable</div>
                  <div className="text-2xl font-display font-black text-white">{selectedBill.currency}{selectedBill.total?.toLocaleString('en-IN')}</div>
                </div>

                {paymentError && (
                  <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-sm text-xs">
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{paymentError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2">Amount Paid ({selectedBill.currency})</label>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={e => setPaymentAmount(e.target.value)}
                      disabled={paymentSaving}
                      className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-3 text-white focus:border-amber-400 outline-none text-xl font-mono disabled:opacity-50"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2">Payment Date</label>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={e => setPaymentDate(e.target.value)}
                      disabled={paymentSaving}
                      className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-amber-400 outline-none text-sm disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={savePayment}
                    disabled={paymentSaving}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-background-dark font-display font-black uppercase tracking-widest text-[10px] py-4 rounded-sm hover:bg-amber-400 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {paymentSaving ? <><Loader2 size={14} className="animate-spin" /> Processing...</> : 'Confirm Settlement & Update Ledger'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
