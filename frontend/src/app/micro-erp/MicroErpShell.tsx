/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useState, useEffect } from 'react';
import { ERPDatabaseProvider, useERPDatabase } from '@/lib/erp/DatabaseContext';
import { Settings, FileText, Users, Box, HardDrive, ShoppingCart, AlertCircle, RefreshCw, ChevronLeft, BookOpen, Book } from 'lucide-react';
import BusinessProfile from './components/BusinessProfile';
import ClientsPanel from './components/ClientsPanel';
import ProductsPanel from './components/ProductsPanel';
import SalesPanel from './components/SalesPanel';
import PurchasesPanel from './components/PurchasesPanel';
import LedgerPanel from './components/LedgerPanel';

// ─── Manual Panel ───────────────────────────────────────────────────────────
function ManualPanel() {
  const sections = [
    {
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { q: 'What is AITDL Micro-ERP?', a: 'A sovereign, offline-first ERP engine that runs entirely inside your browser using a WebAssembly SQLite engine. No server. No cloud. Your data never leaves your device.' },
        { q: 'How is data stored?', a: 'All data is persisted in your browser\'s LocalStorage as a compressed SQLite binary. Use the Export function in Business Profile to create portable backups (.sqlite).' },
        { q: 'How do I back up my data?', a: 'Navigate to Business Profile → click "Export Database". This downloads a dated .sqlite file you can keep offline or import back later.' },
      ]
    },
    {
      title: 'Sales & Invoicing',
      icon: '🧾',
      items: [
        { q: 'How do I create an invoice?', a: 'Go to Sales & Invoices → click "New Document". Select the document type (Invoice, Quotation, etc.), fill in client details, add line items, and save.' },
        { q: 'Supported document types?', a: 'Tax Invoice, Proforma Invoice, Quotation, Credit Note, and Delivery Challan. Each generates a print-ready PDF layout.' },
        { q: 'How do I record a payment?', a: 'In the Sales list, click the "Pay" button on any invoice. Enter the amount received and date — this logs a RECEIPT entry in the Financial Ledger and marks the invoice as Paid.' },
      ]
    },
    {
      title: 'Purchases & Procurement',
      icon: '📦',
      items: [
        { q: 'How do I record a purchase?', a: 'Go to Purchases → click "New Purchase". Select a vendor, add the items received, and save. Inventory is automatically credited via the Inventory Ledger.' },
        { q: 'Where do vendors come from?', a: 'Vendors are managed inside CRM / Entities. Add vendors there first before creating purchase orders.' },
      ]
    },
    {
      title: 'Inventory Master',
      icon: '🗃️',
      items: [
        { q: 'How is stock tracked?', a: 'Every saved Sale (OUT) and Purchase (IN) writes a record to the Inventory Ledger. The current stock shown is the cumulative net of all such entries per product.' },
        { q: 'How do I add a new product?', a: 'Go to Inventory Master → click "Add Product". Fill in name, SKU, unit, purchase rate, and selling rate. You can set a minimum stock alert threshold.' },
      ]
    },
    {
      title: 'CRM / Network Entities',
      icon: '👥',
      items: [
        { q: 'What is the difference between a Client and a Vendor?', a: 'Clients are entities you sell to (appear in Sales). Vendors are entities you buy from (appear in Purchases). Both are managed in the CRM / Entities panel.' },
        { q: 'Can I store GST and contact info?', a: 'Yes. Each entity record supports Name, Address, GSTIN, Email, Phone, and a Contact Person field.' },
      ]
    },
    {
      title: 'Ledger & Reports',
      icon: '📘',
      items: [
        { q: 'How do I view my cash balance?', a: 'Go to Ledger & Reports → Financial Cashbook. It displays all logged Receipts (Inflow) and Payments (Outflow) and calculates your Net Cash Position automatically.' },
        { q: 'How is the Stock Ledger different from the Inventory Master?', a: 'Inventory Master shows your current overall stock count. The Stock Ledger tab shows the chronological log of every individual stock addition (IN) and deduction (OUT) event over time.' },
      ]
    },
    {
      title: 'Keyboard & Focus',
      icon: '⌨️',
      items: [
        { q: 'What is Sovereign Focus Mode?', a: 'Pressing the configured hotkey (default: K) hides the sidebar and header for a distraction-free, full-screen workspace. Press the same key again to exit.' },
        { q: 'How do I change the Focus Mode hotkey?', a: 'Go to Business Profile → find the Shortcut / Stealth Key field and enter your preferred single key.' },
      ]
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-l-4 border-primary pl-6 py-2">
        <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">User Manual</h2>
        <p className="text-slate-500 text-xs font-display tracking-widest uppercase">AITDL Micro-ERP Engine — Quick Reference Guide</p>
      </div>

      {/* Architect card */}
      <div className="bg-primary/5 border border-primary/20 rounded-sm p-5 flex items-center gap-5">
        <div className="size-12 rounded-sm bg-primary/20 flex items-center justify-center text-primary shrink-0">
          <BookOpen size={22} />
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">System Architect</div>
          <div className="text-white font-display font-black text-base tracking-wide">Jawahar R Mallah</div>
          <div className="text-[10px] text-primary/70 tracking-widest">AITDL Network · aitdlnetwork@outlook.com</div>
        </div>
        <div className="ml-auto hidden sm:block">
          <span className="px-3 py-1 bg-primary text-background-dark text-[9px] font-black uppercase tracking-widest rounded-sm">v1.5 Sovereign</span>
        </div>
      </div>

      {/* FAQ Sections */}
      {sections.map((section, si) => (
        <div key={si} className="space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">{section.icon}</span>
            <h3 className="text-sm font-display font-black text-white uppercase tracking-widest">{section.title}</h3>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          {section.items.map((item, ii) => (
            <div key={ii} className="bg-white/3 border border-white/8 hover:border-primary/20 rounded-sm p-5 transition-all group">
              <div className="flex items-start gap-3">
                <div className="size-5 rounded-sm bg-primary/15 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/25 transition-colors">Q</div>
                <div>
                  <div className="text-sm font-bold text-white mb-2">{item.q}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{item.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Footer note */}
      <div className="text-center text-[10px] text-slate-600 uppercase tracking-widest pt-4 border-t border-white/5">
        AITDL Network © 2026 · Vikram Samvat 2083 · All data is sovereign and stored locally.
      </div>
    </div>
  );
}

function DashboardStats() {
  const { db } = useERPDatabase();
  const [stats, setStats] = useState({
    sales: 0,
    purchases: 0,
    inventory: 0,
    clients: 0
  });

  useEffect(() => {
    if (!db) return;
    try {
      const salesRes = db.exec("SELECT COUNT(*) FROM bills");
      const purcRes = db.exec("SELECT COUNT(*) FROM purchases");
      const invRes = db.exec("SELECT COUNT(*) FROM products");
      const clientRes = db.exec("SELECT COUNT(*) FROM clients");

      const newStats = {
        sales: salesRes[0]?.values[0][0] as number || 0,
        purchases: purcRes[0]?.values[0][0] as number || 0,
        inventory: invRes[0]?.values[0][0] as number || 0,
        clients: clientRes[0]?.values[0][0] as number || 0
      };
      
      // Use requestAnimationFrame to avoid synchronous setState inside effect warning
      requestAnimationFrame(() => {
        setStats(newStats);
      });
    } catch(e) {
      console.error(e);
    }
  }, [db]);

  if (!db) return null;

  const statCards = [
    { label: 'Active Invoices', value: stats.sales, icon: FileText, color: 'text-primary' },
    { label: 'Procurement Orders', value: stats.purchases, icon: ShoppingCart, color: 'text-amber-400' },
    { label: 'Stock Master', value: stats.inventory, icon: Box, color: 'text-green-400' },
    { label: 'Network Entities', value: stats.clients, icon: Users, color: 'text-blue-400' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
       <div className="border-l-4 border-primary pl-6 py-2">
          <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Sovereign Workspace Overview</h2>
          <p className="text-slate-500 text-xs font-display tracking-widest uppercase">AITDL Micro-ERP Engine v1.5 // Private Ledger Online</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, i) => (
            <div key={i} className="bg-[#12122a] border border-white/10 p-6 rounded-sm group hover:border-primary/30 transition-all">
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 bg-white/5 rounded-sm ${card.color}`}>
                     <card.icon size={20} />
                  </div>
                  <div className="text-[10px] text-slate-500 font-display font-bold uppercase tracking-widest">Global</div>
               </div>
               <div className="text-3xl font-display font-black text-white mb-1">{card.value}</div>
               <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{card.label}</div>
            </div>
          ))}
       </div>

       <div className="bg-primary/5 border border-primary/20 p-6 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="size-10 bg-primary/20 rounded-sm flex items-center justify-center text-primary">
                <HardDrive size={24} />
             </div>
             <div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">Engine Integrity: Optimized</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Sovereign WASM Engine is running at peak performance on your local workspace.</div>
             </div>
          </div>
          <div className="hidden md:block">
             <span className="px-3 py-1 bg-primary text-background-dark text-[10px] font-black uppercase tracking-widest rounded-sm">Verified Workspace</span>
          </div>
       </div>
    </div>
  );
}

function ERPRouter() {
  const { isReady, bootStatus, error, db } = useERPDatabase();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [hotkey, setHotkey] = useState('k'); // Default shortcut: Ctrl+K or k

  // Load configuration from SQLite
  useEffect(() => {
    if (!db) return;
    try {
      const res = db.exec("SELECT value FROM business_profile WHERE key='shortcut_stealth'");
      if (res[0]) {
        const val = res[0].values[0][0] as string;
        setTimeout(() => setHotkey(val), 0);
      }
    } catch(e) { console.error(e); }
  }, [db]);

  // Global Hotkey Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger if key matches (case insensitive) and not in an input field
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName);
      if (!isInput && e.key.toLowerCase() === hotkey.toLowerCase()) {
        setFocusMode(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hotkey]);

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
        <div className="mb-2">Booting Sovereign Workspace...</div>
        <div className="text-[10px] text-primary/60 mb-8 lowercase tracking-normal">{bootStatus}</div>
        
        <div className="max-w-xs space-y-4">
           <p className="text-[9px] normal-case text-slate-500 mb-6">If this takes more than 15 seconds, your local database might be too large or corrupted.</p>
           <button 
             onClick={() => { if(confirm("This will clear all local ERP data to fix the hang. Proceed?")) { localStorage.removeItem("billforge_erp_db"); window.location.reload(); } }}
             className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-[10px] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
           >
             Troubleshoot: Clear & Reset Workspace
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
    { id: 'ledger', label: 'Ledger & Reports', icon: Book },
    { id: 'settings', label: 'Business Profile', icon: Settings },
    { id: 'manual', label: 'Manual', icon: BookOpen },
  ];

  return (
    <div className={`flex h-screen bg-background-dark text-slate-300 font-body overflow-hidden ${focusMode ? 'fixed inset-0 z-[9999]' : ''}`}>
      {/* Sidebar - Hidden in Focus Mode OR when collapsed */}
      {!focusMode && (
        <div className={`bg-[#12122a] border-r border-white/5 flex flex-col pt-6 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden opacity-0 invisible'}`}>
          <div className="px-6 mb-8 flex items-center gap-3 group px-4">
            <div className="size-8 text-primary group-hover:scale-110 group-hover:rotate-[10deg] transition-all">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="whitespace-nowrap">
              <div className="font-display font-black text-sm tracking-widest text-white uppercase group-hover:text-primary transition-colors">Micro-ERP</div>
              <div className="text-[9px] font-display uppercase tracking-[0.2em] text-slate-500">Private Workspace</div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-xs font-display tracking-widest uppercase transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(13,227,242,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <tab.icon size={16} className="shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/5 pb-8 space-y-3">
            {/* Architect credit */}
            <div className="px-2 py-3 rounded-sm bg-primary/5 border border-primary/10">
              <div className="text-[8px] text-slate-600 uppercase tracking-widest font-bold mb-1">System Architect</div>
              <div className="text-[11px] text-white font-display font-black tracking-wide truncate">Jawahar R Mallah</div>
              <div className="text-[8px] text-primary/60 tracking-wider truncate">AITDL Network</div>
            </div>
            <button onClick={() => window.location.href = '/'} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm text-[10px] font-display tracking-widest uppercase text-slate-500 hover:text-white hover:bg-white/5 transition-all border border-transparent">
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                Exit to AITDL Home
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#0b0c16] relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none opacity-50"></div>
        
        {/* Header - Hidden in Focus Mode unless specifically needed */}
        {!focusMode && (
          <div className="h-16 border-b border-white/5 flex items-center px-8 flex-shrink-0 z-10 bg-background-dark/50 backdrop-blur-md gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-sm bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
              title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
              <ChevronLeft size={18} className={`transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} />
            </button>
            <h1 className="font-display font-bold text-lg text-white uppercase tracking-wider">{tabs.find(t => t.id === activeTab)?.label}</h1>
          </div>
        )}

        {/* Focus Mode Overlay Indicator (Subtle) */}
        {focusMode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-sm text-[9px] uppercase tracking-widest pointer-events-none animate-pulse">
            Sovereign Focus Mode Active | Press &apos;{hotkey}&apos; to Exit
          </div>
        )}

        <div className="flex-1 overflow-auto z-10">
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'sales' && <SalesPanel />}
          {activeTab === 'purchases' && <PurchasesPanel />}
          {activeTab === 'inventory' && <ProductsPanel />}
          {activeTab === 'clients' && <ClientsPanel />}
          {activeTab === 'ledger' && <LedgerPanel />}
          {activeTab === 'settings' && <BusinessProfile />}
          {activeTab === 'manual' && <ManualPanel />}
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
