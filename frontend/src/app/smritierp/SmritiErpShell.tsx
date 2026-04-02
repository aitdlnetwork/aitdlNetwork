/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import React, { useState, useEffect } from 'react';
import { ERPDatabaseProvider, useERPDatabase } from '@/lib/erp/DatabaseContext';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Settings, FileText, Users, Box, HardDrive, ShoppingCart, AlertCircle, RefreshCw, ChevronLeft, BookOpen, Book, MessageSquare, Clock, CheckCircle, XCircle, Trash2, Heart, Lightbulb, Flag, Calendar } from 'lucide-react';
import BusinessProfile from './components/BusinessProfile';
import ClientsPanel from './components/ClientsPanel';
import ProductsPanel from './components/ProductsPanel';
import SalesPanel from './components/SalesPanel';
import PurchasesPanel from './components/PurchasesPanel';
import LedgerPanel from './components/LedgerPanel';
import TaskModal from './components/TaskModal';

const quotes = [
  "Action is the foundational key to all success. — Pablo Picasso",
  "The secret of getting ahead is getting started. — Mark Twain",
  "Success is not final; failure is not fatal: It is the courage to continue that counts.",
  "Don't count the days, make the days count. — Muhammad Ali",
  "Your time is limited, don't waste it living someone else's life. — Steve Jobs",
  "Udyamena hi sidhyanti karyani na manorathaih. — Sanskrit Proverb",
  "Business is the art of extracting money from the pocket of another.",
  "Great things are done by a series of small things brought together. — Vincent Van Gogh"
];

// ─── Manual Panel ───────────────────────────────────────────────────────────
function ManualPanel() {
  const sections = [
    {
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { q: 'What is AITDL SmritiERP?', a: 'A sovereign, offline-first ERP engine that runs entirely inside your browser using a WebAssembly SQLite engine. No server. No cloud. Your data never leaves your device.' },
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
        <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">SmritiERP User Manual</h2>
        <p className="text-slate-500 text-xs font-display tracking-widest uppercase">SMRITIERP Core — Quick Reference Guide</p>
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
          <p className="text-slate-500 text-xs font-display tracking-widest uppercase">AITDL SMRITIERP v1.5 // Sovereign Memory Core</p>
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
  const { t } = useI18n();
  const { isReady, bootStatus, error, db, persistDB } = useERPDatabase();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [hotkey, setHotkey] = useState('k');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // PWA Install Listener
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

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

  // ─── SmritiNotes State & Logic ─────────────────────────────────────────────
  const [notes, setNotes] = useState<any[]>([]);
  const [noteInput, setNoteInput] = useState('');
  const [quote, setQuote] = useState(quotes[0]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  const fetchNotes = () => {
    if (!db || !isReady) return;
    try {
      const res = db.exec("SELECT id, content, priority, due_date, category, description, status, created_at FROM smriti_notes ORDER BY created_at DESC LIMIT 20");
      if (res[0]) {
        const rows = res[0].values.map(v => ({
          id: v[0],
          content: v[1],
          priority: v[2],
          due_date: v[3],
          category: v[4],
          description: v[5],
          status: v[6],
          created_at: v[7]
        }));
        setNotes(rows);
      } else {
        setNotes([]);
      }
    } catch(e) { console.error("Notes fetch error:", e); }
  };

  useEffect(() => {
    fetchNotes();
    // Rotate quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [db, isReady]);

  const addNote = () => {
    if (!noteInput.trim() || !db) return;
    try {
      db.run("INSERT INTO smriti_notes (content, status) VALUES (?, 'pending')", [noteInput]);
      setNoteInput('');
      fetchNotes();
      persistDB();
    } catch(e) { console.error(e); }
  };

  const cycleStatus = (id: number, current: string) => {
    if (!db) return;
    const flow = ['pending', 'in_process', 'completed', 'void'];
    const next = flow[(flow.indexOf(current) + 1) % flow.length];
    try {
      db.run("UPDATE smriti_notes SET status=?, updated_at=datetime('now') WHERE id=?", [next, id]);
      fetchNotes();
      persistDB();
    } catch(e) { console.error(e); }
  };

  const deleteNote = (id: number) => {
    if (!db || !confirm("Delete task?")) return;
    try {
      db.run("DELETE FROM smriti_notes WHERE id=?", [id]);
      fetchNotes();
      persistDB();
    } catch(e) { console.error(e); }
  };

  const saveTask = (form: any) => {
    if (!db || !form.content.trim()) return;
    try {
      if (editingTask) {
        db.run(
          "UPDATE smriti_notes SET content=?, description=?, priority=?, due_date=?, category=?, updated_at=datetime('now') WHERE id=?",
          [form.content, form.description, form.priority, form.due_date, form.category, editingTask.id]
        );
      } else {
        db.run(
          "INSERT INTO smriti_notes (content, description, priority, due_date, category, status) VALUES (?, ?, ?, ?, ?, 'pending')",
          [form.content, form.description, form.priority, form.due_date, form.category]
        );
      }
      fetchNotes();
      persistDB();
    } catch(e) { console.error(e); }
  };

  const openTaskModal = (task?: any) => {
    setEditingTask(task || null);
    setIsTaskModalOpen(true);
  };

  // ─── Global Hotkey Listener ─────────────────────────────────────────────
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

  const businessTabs = [
    { id: 'dashboard', label: t('erp_overview'), icon: HardDrive },
    { id: 'sales', label: t('erp_sales'), icon: FileText },
    { id: 'purchases', label: t('erp_purchases'), icon: ShoppingCart },
    { id: 'inventory', label: t('erp_inventory'), icon: Box },
    { id: 'clients', label: t('erp_crm'), icon: Users },
    { id: 'ledger', label: t('erp_ledger'), icon: Book },
  ];

  const systemTabs = [
    { id: 'settings', label: t('erp_settings'), icon: Settings },
    { id: 'manual', label: t('erp_manual'), icon: BookOpen },
  ];

  const allTabs = [...businessTabs, ...systemTabs];

  return (
    <div className={`flex h-screen bg-background-dark text-slate-300 font-body overflow-hidden ${focusMode ? 'fixed inset-0 z-[9999]' : ''}`}>
      {/* Sidebar - Always visible, even in Focus Mode (unless explicitly collapsed) */}
      <div className={`bg-[#12122a] border-r border-white/5 flex flex-col pt-6 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden opacity-0 invisible'}`}>
          <div className="px-6 mb-8 flex items-center gap-3 group px-4">
            <div className="size-8 text-primary group-hover:scale-110 group-hover:rotate-[10deg] transition-all">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <div className="whitespace-nowrap">
              <div className="font-display font-black text-sm tracking-widest text-white uppercase group-hover:text-primary transition-colors">SMRITI<span className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">ERP</span></div>
              <div className="text-[9px] font-display uppercase tracking-[0.2em] text-slate-500">{t('erp_private_workspace')}</div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
            {/* Business Modules Section */}
            <div className="px-4 py-2">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-2">{t('erp_sidebar_workspace')}</div>
              <div className="space-y-1">
                {businessTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[10px] font-display tracking-widest uppercase transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <tab.icon size={14} className="shrink-0" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Focus / Tasks Section - ELEVATED */}
            <div className="px-4 py-4 border-t border-white/5">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-3 flex items-center justify-between">
                {t('erp_sidebar_focus')}
                <div className="size-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              
              <div className="mx-2 rounded-sm border border-white/5 bg-[#0f0f1d]/50 overflow-hidden">
                <div className="p-2 space-y-2">
                  <button 
                    onClick={() => openTaskModal()}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary border border-primary/20 rounded-sm hover:bg-primary hover:text-background-dark transition-all group"
                  >
                    <Flag size={14} className="group-hover:animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t('erp_task_modal_title')}</span>
                  </button>

                  <div className="space-y-1.5 max-h-[180px] overflow-y-auto no-scrollbar pt-1">
                    {notes.map(n => (
                      <div key={n.id} className="group relative flex items-start gap-2 p-2 rounded-sm bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all cursor-pointer overflow-hidden">
                        <div className={`absolute top-0 left-0 w-0.5 h-full ${
                          n.priority === 'urgent' ? 'bg-red-500' :
                          n.priority === 'high' ? 'bg-amber-500' :
                          n.priority === 'medium' ? 'bg-blue-400' : 'bg-slate-500'
                        }`} />
                        <button onClick={(e) => { e.stopPropagation(); cycleStatus(n.id, n.status); }} className={`mt-0.5 shrink-0 transition-colors ${n.status === 'completed' ? 'text-green-500' : n.status === 'in_process' ? 'text-blue-400' : n.status === 'void' ? 'text-red-500' : 'text-slate-500 hover:text-slate-300'}`}>
                           {n.status === 'completed' ? <CheckCircle size={10} /> : n.status === 'in_process' ? <Clock size={10} /> : n.status === 'void' ? <XCircle size={10} /> : <div className="size-2.5 border-2 border-current rounded-full" />}
                        </button>
                        <div className="flex-1 min-w-0" onClick={() => openTaskModal(n)}>
                          <p className={`text-[10px] font-bold leading-tight break-words ${n.status === 'completed' ? 'line-through text-slate-500 opacity-50' : 'text-slate-300'}`}>{n.content}</p>
                          {n.category && <div className="text-[7px] text-primary/40 uppercase font-black tracking-widest mt-0.5 flex items-center gap-1"><div className="size-1 rounded-full bg-primary/20" /> {t(('erp_category_' + n.category) as any)}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* System Section */}
            <div className="px-4 py-2 border-t border-white/5">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-2">{t('erp_sidebar_system')}</div>
              <div className="space-y-1">
                {systemTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-[10px] font-display tracking-widest uppercase transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <tab.icon size={14} className="shrink-0" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Quote Card */}
            <div className="px-4 py-6 mt-auto">
              <div className="p-3 rounded-sm bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden group">
                <div className="absolute -right-2 -bottom-2 text-primary/10 group-hover:scale-150 transition-transform">
                  <Lightbulb size={32} />
                </div>
                <div className="text-[7px] text-primary/60 uppercase tracking-[0.2em] font-black mb-1 flex items-center gap-1">
                   <div className="size-1 bg-primary animate-pulse" /> {t('erp_quote_title' as any)}
                </div>
                <p className="text-[9px] text-slate-400 leading-relaxed italic font-body">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </div>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5 space-y-3 bg-[#0a0a1a]">
            {deferredPrompt && (
              <button onClick={handleInstall} className="w-full flex items-center gap-3 p-3 rounded-sm bg-primary border border-primary/20 hover:scale-[1.02] transition-all">
                <div className="size-8 bg-background-dark/20 rounded-sm flex items-center justify-center text-background-dark">
                  <span className="material-symbols-outlined text-[18px]">install_desktop</span>
                </div>
                <div className="text-left">
                  <div className="text-[9px] text-background-dark font-black uppercase tracking-widest leading-none mb-1">{t('erp_install_title')}</div>
                  <div className="text-[7px] text-background-dark/70 font-bold uppercase tracking-widest leading-none">Offline Access</div>
                </div>
              </button>
            )}

            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2 rounded-sm bg-white/3 border border-white/5 overflow-hidden">
                <div className="text-[7px] text-slate-600 uppercase tracking-widest font-bold mb-0.5">{t('erp_architect_title')}</div>
                <div className="text-[10px] text-white font-display font-black tracking-wide truncate">Jawahar R Mallah</div>
              </div>
              <button onClick={() => window.location.href = '/'} className="size-10 flex items-center justify-center rounded-sm bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all border border-white/10" title={t('erp_exit_home')}>
                  <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>

            <div className="pt-1 flex flex-col items-center">
               <div className="flex items-center gap-2 mb-1 group">
                 <div className="size-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[8px] group-hover:rotate-[360deg] transition-transform duration-1000">🇮🇳</div>
                 <span className="text-[8px] font-display font-black uppercase tracking-[0.2em] text-slate-600 group-hover:text-primary transition-colors">{t('erp_made_for_bharat')}</span>
               </div>
               <div className="text-[6px] text-slate-700 uppercase tracking-[0.2em]">Sovereign Node v1.5</div>
            </div>
          </div>
        </div>

        <TaskModal 
          isOpen={isTaskModalOpen} 
          onClose={() => setIsTaskModalOpen(false)} 
          onSave={saveTask} 
          editingTask={editingTask} 
        />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#0b0c16] relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none opacity-50"></div>
        
        {/* Header - Always visible to provide the Sidebar Toggle and active panel title */}
        <div className="h-16 border-b border-white/5 flex items-center px-8 flex-shrink-0 z-10 bg-background-dark/50 backdrop-blur-md gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-sm bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
            title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          >
            <ChevronLeft size={18} className={`transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} />
          </button>
          <h1 className="font-display font-bold text-lg text-white uppercase tracking-wider">{allTabs.find(t => t.id === activeTab)?.label}</h1>
        </div>

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

export default function SmritiErpShell() {
  return (
    <ERPDatabaseProvider>
      <ERPRouter />
    </ERPDatabaseProvider>
  );
}
