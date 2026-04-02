/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useEffect, useState } from 'react';
import { useERPDatabase } from '@/lib/erp/DatabaseContext';

export default function BusinessProfile() {
  const { db, persistDB } = useERPDatabase();
  const [fields, setFields] = useState({
    fromName: '',
    fromTagline: '',
    fromAddr: '',
    bankName: '',
    bankBankName: '',
    bankAccNum: '',
    bankIFSC: '',
    bankType: '',
    bankBranch: '',
    upiId: '',
    upiName: '',
    notes: '',
    footerMsg: '',
    signLabel: '',
    defaultTax: '0',
    defaultDiscount: '0',
    dueDays: '30'
  });
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!db) return;
    try {
      const res = db.exec(`SELECT key, value FROM business_profile`);
      if (res[0]) {
        const loaded: Record<string, string> = {};
        res[0].values.forEach(([key, val]) => {
          if (key) loaded[key as string] = (val as string) || '';
        });
        setFields(prev => ({ ...prev, ...loaded }));
      }
    } catch(e) {
      console.error(e);
    }
  }, [db]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!db) return;
    try {
      Object.entries(fields).forEach(([key, val]) => {
        db.run(`INSERT OR REPLACE INTO business_profile(key, value) VALUES(?, ?)`, [key, val]);
      });
      persistDB();
      setToast('Business Profile Saved!');
      setTimeout(() => setToast(''), 3000);
    } catch(e) {
      alert("Error saving profile");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">Business Identity</h2>
        <p className="text-slate-400 text-sm">Configure your default identity to automatically populate new invoices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Company Details</h3>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Company Name</label>
            <input name="fromName" value={fields.fromName} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Tagline / GST</label>
            <input name="fromTagline" value={fields.fromTagline} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Full Address</label>
            <textarea name="fromAddr" value={fields.fromAddr} onChange={handleChange} rows={3} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Bank Details</h3>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Account Holder</label>
            <input name="bankName" value={fields.bankName} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Bank Name</label>
              <input name="bankBankName" value={fields.bankBankName} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Account No</label>
              <input name="bankAccNum" value={fields.bankAccNum} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">IFSC Code</label>
              <input name="bankIFSC" value={fields.bankIFSC} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Branch</label>
              <input name="bankBranch" value={fields.bankBranch} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h3 className="md:col-span-3 text-primary font-bold uppercase tracking-widest text-xs mb-2">Default Settings (Auto-fill)</h3>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Default Tax (%)</label>
            <input name="defaultTax" type="number" step="0.1" value={fields.defaultTax} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Default Discount (%)</label>
            <input name="defaultDiscount" type="number" step="0.1" value={fields.defaultDiscount} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Default Due Days</label>
            <input name="dueDays" type="number" value={fields.dueDays} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-white/10 justify-between">
        <button onClick={handleSave} className="bg-primary text-background-dark font-bold font-display px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
          Save Profile
        </button>
        {toast && <span className="text-sm text-green-400">{toast}</span>}
      </div>
    </div>
  );
}
