// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [liveUsers, setLiveUsers] = useState(142);
  const [apiRequests, setApiRequests] = useState(84291);

  // Live counter tickers for a dynamic feel statically
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
      setApiRequests(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { name: 'Live Endpoint Nodes', value: '42 / 45', status: 'Optimal', icon: 'hub' },
    { name: 'System Uptime', value: '99.99%', status: 'Secured', icon: 'verified_user' },
    { name: 'Encrypted Backups', value: 'Auto-Vault', status: 'Synced', icon: 'backup' }
  ];

  const logs = [
    { time: '10:42:15', category: 'LMS', message: 'Stream node #3 dynamically allocated to standard scaling loop.', status: 'success' },
    { time: '10:40:02', category: 'ABHA', message: 'Patient records secure decryption sync dispatch completed.', status: 'success' },
    { time: '10:35:12', category: 'POS', message: 'Offline sync buffer flushed to multi-tenant region database.', status: 'info' },
    { time: '10:31:00', category: 'Cloud', message: 'DDoS filter rules re-indexed for sub-millisecond edge edge delivery.', status: 'success' }
  ];

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8 z-10 relative animate-fade-in mb-12">
      
      {/* Mini Sidebar Nav */}
      <div className="w-full lg:w-64 flex flex-col gap-2 glass-card p-4 rounded-xl border border-white/5 bg-background-dark/30 h-fit">
        <div className="p-2 mb-4">
          <span className="text-primary font-display font-bold text-sm tracking-widest uppercase">Admin Workspace</span>
        </div>
        <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
          <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
        </Link>
        <button className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-white/5 text-sm font-medium transition-all text-left">
          <span className="material-symbols-outlined text-[20px]">analytics</span> Analytics
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg text-slate-400 hover:bg-white/5 text-sm font-medium transition-all text-left">
          <span className="material-symbols-outlined text-[20px]">settings</span> Nodes Settings
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Header Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-white font-display text-2xl md:text-3xl font-bold">Node Overview</h1>
            <p className="text-slate-400 text-xs md:text-sm font-body mt-1">Sovereign infrastructure continuous delivery diagnostics.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs bg-[#00FF9D]/10 text-[#00FF9D] px-3 py-1 rounded-full border border-[#00FF9D]/20">
              <span className="size-2 rounded-full bg-[#00FF9D] animate-pulse"></span> Network ID: AITDL-2083
            </span>
          </div>
        </div>

        {/* Dynamic Key Stat Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-transparent pointer-events-none"></div>
            <span className="text-slate-400 text-xs font-body">Live Active Users</span>
            <span className="text-white font-display text-3xl font-bold tracking-tight transition-all duration-300">
              {liveUsers}
            </span>
          </div>
          <div className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1">
            <span className="text-slate-400 text-xs font-body">API Requests / Total</span>
            <span className="text-white font-display text-2xl md:text-3xl font-bold tracking-tight font-mono text-primary">
              {apiRequests.toLocaleString()}
            </span>
          </div>
          {stats.slice(0, 2).map((stat, idx) => (
            <div key={idx} className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1">
              <span className="text-slate-400 text-xs font-body">{stat.name}</span>
              <span className="text-white font-display text-xl md:text-2xl font-bold tracking-tight">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Operations Card Logs */}
          <div className="lg:col-span-2 glass-card p-6 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col gap-4">
            <h3 className="text-white font-display font-bold text-lg">System Audit Stream</h3>
            <div className="flex flex-col gap-3">
              {logs.map((log, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col md:flex-row justify-between md:items-center gap-2 animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-slate-800 text-slate-400">
                      {log.time}
                    </span>
                    <span className="text-xs font-display font-medium text-primary-light">
                      [{log.category}]
                    </span>
                    <span className="text-slate-300 text-xs md:text-sm font-body leading-relaxed">
                      {log.message}
                    </span>
                  </div>
                  <span className="text-[10px] items-center gap-1 text-[#00FF9D] font-mono hidden md:flex">
                    <span className="size-1 rounded-full bg-[#00FF9D]"></span> status.ok
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics checklist */}
          <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col gap-4 bg-background-dark/30">
            <h3 className="text-white font-display font-bold text-lg">Infrastructure nodes</h3>
            <div className="flex flex-col gap-4 mt-2">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-display font-medium">{stat.name}</p>
                      <p className="text-slate-500 text-[11px] font-body">{stat.status}</p>
                    </div>
                  </div>
                  <span className="text-white font-mono text-sm font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
