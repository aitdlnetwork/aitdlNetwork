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
  const { db, persistDB, lastUpdated, exportDatabase, importDatabase } = useERPDatabase();
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
    dueDays: '30',
    shortcut_stealth: 'k'
  });
  const [toast, setToast] = useState('');

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (!file) return;
     if (confirm("Restore your Business Data? This will replace your current local records with the backup file. Proceed?")) {
        importDatabase(file).then(() => {
           setToast('Data Restored Successfully. Reloading...');
        }).catch((err: unknown) => {
           console.error(err);
           const msg = err instanceof Error ? err.message : 'Unknown error';
           setToast(`Restore Failed: ${msg}`);
        });
     }
  };

  useEffect(() => {
    if (!db) return;
    try {
      const res = db.exec(`SELECT key, value FROM business_profile`);
      if (res[0]) {
        const loaded: Record<string, string> = {};
        res[0].values.forEach((row) => {
          const key = row[0] as string;
          const val = row[1] as string;
          if (key) loaded[key] = val || '';
        });
        setTimeout(() => setFields(prev => ({ ...prev, ...loaded })), 0);
      }
    } catch(e) { console.error(e); }
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
      setToast('Sovereign Profile Updated & Synchronized.');
      setTimeout(() => setToast(''), 3000);
    } catch(e) {
      console.error(e);
      setToast('Sync Failed.');
    }
  };

  return (
    <div className="p-8 space-y-8 animate-fadeIn max-w-5xl mx-auto pb-24">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
           <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Business Intelligence Profile</h2>
           <p className="text-slate-500 text-xs font-display tracking-widest uppercase">Configure your local workspace identity.</p>
        </div>
        <div className="text-right">
           <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Workspace Status: <span className="text-green-400">Online</span></div>
           <div className="text-[9px] text-slate-600 uppercase tracking-widest">Last Write: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PRIVACY & STEALTH MODE (HIGH PRIORITY) */}
        <div className="md:col-span-2 bg-primary/5 p-6 border border-primary/20 rounded-sm space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 text-primary rounded-sm">
                   <span className="material-symbols-outlined text-[18px]">security</span>
                </div>
                <div>
                   <h3 className="text-primary font-bold uppercase tracking-widest text-xs">Sovereign Data Portability & Protocol</h3>
                   <p className="text-[9px] text-slate-500 uppercase tracking-widest">Zero-Knowledge Offline-First Infrastructure</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={exportDatabase}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                 >
                    <span className="material-symbols-outlined text-[14px]">download</span> Export Workspace File (.sqlite)
                 </button>
                 <label className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">upload</span> Restore your Data
                    <input type="file" onChange={handleImportFile} className="hidden" accept=".sqlite" />
                 </label>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 md:col-span-2">
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm italic">
                <p className="text-slate-400 text-xs leading-relaxed">
                  The AITDL SmritiERP operates on a &quot;Zero-Knowledge&quot; model. We do not sync, track, or possess your database. Use the tools below to manage your data portability. Your business is your own—not our cloud.&quot;
                </p>
              </div>
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                       <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
                       <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest">Privacy Protocol Active</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                       <div className="size-2 bg-primary rounded-full"></div>
                       <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Multi-Workspace Protocol: Bridge Mode Ready</span>
                    </div>
                 </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex flex-col justify-center">
                 <label className="block text-[10px] uppercase tracking-widest text-primary font-bold mb-3">Focus Mode Hotkey</label>
                 <div className="flex gap-2 items-center">
                    <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded-sm border border-white/5 uppercase">Key</span>
                    <input 
                      name="shortcut_stealth" 
                      maxLength={1}
                      value={fields.shortcut_stealth} 
                      onChange={handleChange} 
                      className="w-12 bg-background-dark/50 border border-primary/30 rounded-sm px-2 py-2 text-white focus:border-primary outline-none text-center font-bold uppercase" 
                      placeholder="K"
                    />
                    <div className="text-[9px] text-slate-400 leading-tight">
                       Hides all web UI. Toggle with [Ctrl+{fields.shortcut_stealth.toUpperCase()}].
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PROFILE BASICS */}
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-sm border border-white/10">
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
              <span className="size-1.5 bg-primary rounded-full"></span> Entity Identity
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Business Name</label>
                <input name="fromName" value={fields.fromName} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Tagline</label>
                <input name="fromTagline" value={fields.fromTagline} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Address</label>
                <textarea name="fromAddr" value={fields.fromAddr} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none h-24 resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* BANKING */}
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-sm border border-white/10">
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
               <span className="size-1.5 bg-primary rounded-full"></span> Financial Settlements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Beneficiary Name</label>
                <input name="bankName" value={fields.bankName} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Bank Name</label>
                <input name="bankBankName" value={fields.bankBankName} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Account No</label>
                <input name="bankAccNum" value={fields.bankAccNum} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">IFSC Code</label>
                <input name="bankIFSC" value={fields.bankIFSC} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Branch</label>
                <input name="bankBranch" value={fields.bankBranch} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">UPI ID</label>
                <input name="upiId" value={fields.upiId} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">UPI Name</label>
                <input name="upiName" value={fields.upiName} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* DEFAULT SETTINGS */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/5 p-6 rounded-sm border border-white/10">
          <h3 className="md:col-span-4 text-primary font-bold uppercase tracking-widest text-xs mb-2">Automated Parameters</h3>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Default Tax (%)</label>
            <input name="defaultTax" type="number" step="0.1" value={fields.defaultTax} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Default Discount (%)</label>
            <input name="defaultDiscount" type="number" step="0.1" value={fields.defaultDiscount} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Default Due Days</label>
            <input name="dueDays" type="number" value={fields.dueDays} onChange={handleChange} className="w-full bg-background-dark/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-primary outline-none" />
          </div>
          <div className="flex items-end">
             <button onClick={handleSave} className="w-full bg-primary text-background-dark font-bold font-display px-8 py-2 rounded-sm hover:bg-primary/90 transition-colors uppercase tracking-widest text-xs">
                Save & Synchronize
             </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 bg-green-500/20 border border-green-500 text-green-400 px-6 py-3 rounded-sm font-display uppercase tracking-widest text-xs animate-slideIn backdrop-blur-md">
           {toast}
        </div>
      )}
    </div>
  );
}
