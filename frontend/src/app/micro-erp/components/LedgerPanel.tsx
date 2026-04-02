/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Book, Search, ArrowUpRight, ArrowDownRight, Package, DollarSign } from 'lucide-react';

interface FinancialEntry {
  id: number;
  entityName: string;
  entityType: string;
  type: string;
  amount: number;
  currency: string;
  reference: string;
  notes: string;
  date: string;
}

interface StockEntry {
  id: number;
  productName: string;
  sku: string;
  type: string;
  qty: number;
  reference: string;
  date: string;
}

export default function LedgerPanel() {
  const { db } = useERPDatabase();
  const [activeTab, setActiveTab] = useState<'financial' | 'stock'>('financial');
  const [search, setSearch] = useState('');
  
  const [financialLog, setFinancialLog] = useState<FinancialEntry[]>([]);
  const [stockLog, setStockLog] = useState<StockEntry[]>([]);

  const loadData = useCallback(() => {
    if (!db) return;
    try {
      const q = search.toLowerCase();

      // 1. Load Financial Ledger
      const finRes = db.exec(`
        SELECT 
          f.id, 
          COALESCE(c.name, v.name, 'Unknown Entity') as entityName,
          f.entity_type,
          f.type,
          f.amount,
          f.currency,
          f.reference_doc,
          f.notes,
          f.created_at
        FROM financial_ledger f
        LEFT JOIN clients c ON f.entity_type = 'CLIENT' AND f.entity_id = c.id
        LEFT JOIN vendors v ON f.entity_type = 'VENDOR' AND f.entity_id = v.id
        ORDER BY f.id DESC
      `);

      if (finRes[0]) {
        const rows = finRes[0].values.map((r: any) => ({
          id: r[0],
          entityName: r[1] || 'Unknown',
          entityType: r[2] || '',
          type: r[3] || '',
          amount: r[4] || 0,
          currency: r[5] || '₹',
          reference: r[6] || '',
          notes: r[7] || '',
          date: r[8] || ''
        })).filter(f => 
          f.entityName.toLowerCase().includes(q) || 
          f.reference.toLowerCase().includes(q) ||
          f.type.toLowerCase().includes(q)
        );
        setFinancialLog(rows);
      } else {
        setFinancialLog([]);
      }

      // 2. Load Stock Ledger
      const stockRes = db.exec(`
        SELECT 
          i.id,
          p.name,
          p.sku,
          i.type,
          i.qty,
          i.reference_doc,
          i.created_at
        FROM inventory_ledger i
        LEFT JOIN products p ON i.product_id = p.id
        ORDER BY i.id DESC
      `);

      if (stockRes[0]) {
        const sRows = stockRes[0].values.map((r: any) => ({
          id: r[0],
          productName: r[1] || 'Deleted Product',
          sku: r[2] || '',
          type: r[3] || '',
          qty: r[4] || 0,
          reference: r[5] || '',
          date: r[6] || ''
        })).filter(s => 
          s.productName.toLowerCase().includes(q) || 
          s.reference.toLowerCase().includes(q) ||
          s.sku.toLowerCase().includes(q)
        );
        setStockLog(sRows);
      } else {
        setStockLog([]);
      }

    } catch(e) {
      console.error(e);
    }
  }, [db, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);


  // Calculates for Financial Tab
  const totalReceipts = financialLog.filter(f => f.type === 'RECEIPT').reduce((sum, f) => sum + f.amount, 0);
  const totalPayments = financialLog.filter(f => f.type === 'PAYMENT').reduce((sum, f) => sum + f.amount, 0);
  const cashBalance = totalReceipts - totalPayments; // Naive cash balance based on recorded ledger

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Ledger & Reports</h2>
          <p className="text-slate-400 text-sm">Review financial transactions and chronological stock movements.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/5 border border-white/10 rounded-sm p-1 w-fit">
        <button 
          onClick={() => setActiveTab('financial')} 
          className={`px-6 py-2 rounded-sm text-sm tracking-widest uppercase font-bold transition flex items-center gap-2 ${activeTab === 'financial' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white'}`}>
          <DollarSign size={16} /> Financial Cashbook
        </button>
        <button 
          onClick={() => setActiveTab('stock')} 
          className={`px-6 py-2 rounded-sm text-sm tracking-widest uppercase font-bold transition flex items-center gap-2 ${activeTab === 'stock' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white'}`}>
          <Package size={16} /> Stock Movements
        </button>
      </div>

      {/* Stats row for Financial ONLY */}
      {activeTab === 'financial' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total Inflow (Receipts)</div>
            <div className="text-2xl font-display text-green-400">₹{totalReceipts.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Total Outflow (Payments)</div>
            <div className="text-2xl font-display text-red-400">₹{totalPayments.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Net Cash Position</div>
            <div className={`text-2xl font-display ${cashBalance >= 0 ? 'text-primary' : 'text-red-400'}`}>
              ₹{cashBalance.toLocaleString('en-IN', {minimumFractionDigits: 2})}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden mt-4">
        <div className="p-4 border-b border-white/10 flex items-center bg-white/5 gap-3">
          <Search size={18} className="text-slate-400" />
          <input 
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab === 'financial' ? 'transactions' : 'stock entries'}...`} 
            className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500" 
          />
        </div>

        {/* FINANCIAL DATA TABLE */}
        {activeTab === 'financial' && (
          financialLog.length === 0 ? (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center">
              <Book size={48} className="mb-4 text-slate-600" />
              <p>No financial transactions recorded yet.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-bold">Timeline / Type</th>
                  <th className="px-6 py-4 font-bold">Target Entity</th>
                  <th className="px-6 py-4 font-bold">Reference Doc</th>
                  <th className="px-6 py-4 font-bold">Notes</th>
                  <th className="px-6 py-4 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {financialLog.map((f, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        {f.type === 'RECEIPT' ? <ArrowDownRight size={14} className="text-green-400" /> : <ArrowUpRight size={14} className="text-red-400" />}
                        <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm border ${f.type === 'RECEIPT' ? 'text-green-400 border-green-400/20 bg-green-400/10' : 'text-red-400 border-red-400/20 bg-red-400/10'}`}>{f.type}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">{new Date(f.date).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{f.entityName}</div>
                      <div className="text-[9px] uppercase tracking-widest text-slate-500">{f.entityType}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{f.reference || '—'}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-[200px] truncate">{f.notes || '—'}</td>
                    <td className={`px-6 py-4 text-right font-mono font-bold ${f.type === 'RECEIPT' ? 'text-green-400' : 'text-red-400'}`}>
                      {f.type === 'RECEIPT' ? '+' : '-'}{f.currency}{f.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {/* STOCK DATA TABLE */}
        {activeTab === 'stock' && (
          stockLog.length === 0 ? (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center">
              <Package size={48} className="mb-4 text-slate-600" />
              <p>No stock movement operations recorded yet.</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-bold">Timeline / Type</th>
                  <th className="px-6 py-4 font-bold">Item & SKU</th>
                  <th className="px-6 py-4 font-bold">Reference Doc</th>
                  <th className="px-6 py-4 font-bold text-right">Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stockLog.map((s, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        {s.type === 'IN' ? <ArrowDownRight size={14} className="text-green-400" /> : <ArrowUpRight size={14} className="text-amber-400" />}
                        <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm border ${s.type === 'IN' ? 'text-green-400 border-green-400/20 bg-green-400/10' : 'text-amber-400 border-amber-400/20 bg-amber-400/10'}`}>{s.type}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">{new Date(s.date).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{s.productName}</div>
                      {s.sku && <div className="text-[9px] font-mono text-slate-400 mt-0.5">{s.sku}</div>}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{s.reference || '—'}</td>
                    <td className={`px-6 py-4 text-right font-mono font-bold text-lg ${s.type === 'IN' ? 'text-green-400' : 'text-amber-400'}`}>
                      {s.type === 'IN' ? '+' : '-'}{s.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}
