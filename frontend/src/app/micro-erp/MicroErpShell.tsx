/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useState, useEffect } from 'react';
import { ERPDatabaseProvider, useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Settings, FileText, Users, Box, HardDrive, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react';
import BusinessProfile from './components/BusinessProfile';
import ClientsPanel from './components/ClientsPanel';
import ProductsPanel from './components/ProductsPanel';
import SalesPanel from './components/SalesPanel';
import PurchasesPanel from './components/PurchasesPanel';

function DashboardStats() {
  const { db } = useERPDatabase();
  if (!db) return null;

  return (
    <div className="p-8 text-slate-400 font-display uppercase tracking-widest text-xs">
       The Micro-ERP Engine is Online and ready.
       <br/><br/>
       <span className="text-[10px] opacity-50">Local Database: Sovereign Node Active.</span>
    </div>
  );
}

function ERPRouter() {
  const { isReady, bootStatus, error } = useERPDatabase();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (error) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center text-red-500 font-display">
        <AlertCircle className="mr-3" /> Failed to initialize Sovereign Engine: {error}
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center text-slate-400 font-display uppercase tracking-widest p-6 text-center">
        <RefreshCw className="animate-spin mb-4 text-primary" size={32} />
        <div className="mb-2">Booting Sovereign Node...</div>
        <div className="text-[10px] text-primary/60 mb-8 lowercase tracking-normal">{bootStatus}</div>
        
        <div className="max-w-xs space-y-4">
           <p className="text-[9px] normal-case text-slate-500 mb-6">If this takes more than 15 seconds, your local database might be too large or corrupted.</p>
           <button 
             onClick={() => { if(confirm("This will clear all local ERP data to fix the hang. Proceed?")) { localStorage.removeItem("billforge_erp_db"); window.location.reload(); } }}
             className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
           >
             Troubleshoot: Clear & Reset Node
           </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: HardDrive },
    { id: 'sales', label: 'Sales & Invoices', icon: FileText },
    { id: 'purchases', label: 'Purchases', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory Master', icon: Box },
    { id: 'clients', label: 'CRM / Entities', icon: Users },
    { id: 'settings', label: 'Business Profile', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background-dark text-slate-300 font-body overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#12122a] border-r border-white/5 flex flex-col pt-6">
        <div className="px-6 mb-8 flex items-center gap-3 group px-4">
          <div className="size-8 text-primary group-hover:scale-110 group-hover:rotate-[10deg] transition-all">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
            </svg>
          </div>
          <div>
            <div className="font-display font-black text-sm tracking-widest text-white uppercase group-hover:text-primary transition-colors">Micro-ERP</div>
            <div className="text-[9px] font-display uppercase tracking-[0.2em] text-slate-500">Local Node</div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-display tracking-widest uppercase transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(13,227,242,0.1)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/5 pb-8">
           <button onClick={() => window.location.href = '/'} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[10px] font-display tracking-widest uppercase text-slate-500 hover:text-white hover:bg-white/5 transition-all border border-transparent">
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Exit to AITDL Home
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#0b0c16] relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none opacity-50"></div>
        <div className="h-16 border-b border-white/5 flex items-center px-8 flex-shrink-0 z-10 bg-background-dark/50 backdrop-blur-md">
          <h1 className="font-display font-bold text-lg text-white uppercase tracking-wider">{tabs.find(t => t.id === activeTab)?.label}</h1>
        </div>
        <div className="flex-1 overflow-auto z-10">
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'sales' && <SalesPanel />}
          {activeTab === 'purchases' && <PurchasesPanel />}
          {activeTab === 'inventory' && <ProductsPanel />}
          {activeTab === 'clients' && <ClientsPanel />}
          {activeTab === 'settings' && <BusinessProfile />}
        </div>
      </div>
    </div>
  );
}

export default function MicroErpShell() {
  return (
    <ERPDatabaseProvider>
      <ERPRouter />
    </ERPDatabaseProvider>
  );
}
