/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
Modifications: Antigravity AI
*/

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nContext';
import { translations } from '@/lib/i18n/translations';
import ProfileView from '@/components/crm/ProfileView';
import StudentView from '@/components/crm/StudentView';
import AdminView from '@/components/crm/AdminView';
import { createClient } from '@/utils/supabase/client';

export default function Dashboard() {
  const [liveUsers, setLiveUsers] = useState(142);
  const [apiRequests, setApiRequests] = useState(84291);
  const { language } = useI18n();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'overview' | 'crm'>('overview');
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string; avatar_url?: string }>({
    name: 'Syncing User...',
    email: '...',
    role: 'client'
  });

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      if (!supabase) {
        setUser({
          name: 'Vikram Samvat',
          email: 'vikram@fit-solutions.com',
          role: 'client'
        });
        return;
      }

      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const userRole = authUser.user_metadata?.role || 'client';
          setUser({
            name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Authenticated User',
            email: authUser.email || '',
            role: userRole
          });
        } else {
          // If no user found, fallback for preview/demo
          setUser({
            name: 'Vikram Samvat',
            email: 'vikram@fit-solutions.com',
            role: 'client'
          });
        }
      } catch (err) {
        console.warn('Auth fetch error, fallback used:', err);
         setUser({
           name: 'Vikram Samvat',
           email: 'vikram@fit-solutions.com',
           role: 'client'
         });
      }
    }

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/login');
  };

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
          <span className="text-primary font-display font-bold text-sm tracking-widest uppercase">{t.db_workspace_nodes}</span>
        </div>
        
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all text-left ${
            activeTab === 'overview' 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'text-slate-400 hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">dashboard</span> {t.dashboard_node_overview}
        </button>

        <button 
          onClick={() => setActiveTab('crm')}
          className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all text-left ${
            activeTab === 'crm' 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'text-slate-400 hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">badge</span> {t.dashboard_crm}
        </button>

        <div className="border-t border-white/5 my-2"></div>

        <button className="flex items-center gap-3 p-3 rounded-lg text-slate-500 hover:bg-white/5 text-xs font-medium transition-all text-left">
          <span className="material-symbols-outlined text-[18px]">analytics</span> {t.db_node_analytics}
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg text-slate-500 hover:bg-white/5 text-xs font-medium transition-all text-left">
          <span className="material-symbols-outlined text-[18px]">settings</span> {t.db_node_settings}
        </button>

        <div className="mt-8 pt-4 border-t border-white/5 flex flex-col gap-2">
           <div className="flex items-center gap-2 px-3 pb-2">
             <div className="size-2 rounded-full bg-[#00FF9D] animate-pulse"></div>
             <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">{t.db_secure_session}</span>
           </div>
           <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400/5 text-xs font-medium transition-all text-left"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span> {t.db_decommission}
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Header Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-white font-display text-2xl md:text-3xl font-bold">
              {activeTab === 'overview' ? t.dashboard_node_overview : t.dashboard_crm}
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-body mt-1">
              {activeTab === 'overview' 
                ? t.db_overview_subtitle 
                : t.db_crm_subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
               <span className="text-white text-xs font-bold font-display uppercase tracking-wider">{user.role} CLI</span>
               <span className="text-slate-500 text-[9px] font-mono">NODE-083-{user.email.split('@')[0].toUpperCase()}</span>
             </div>
             <div className="size-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-display font-bold">
               {user.name.charAt(0)}
             </div>
          </div>
        </div>

        {/* Dynamic Workspace Rendering */}
        {activeTab === 'overview' ? (
          <>
            {/* Dynamic Key Stat Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF9D]/5 to-transparent pointer-events-none"></div>
                <span className="text-slate-400 text-xs font-body">{t.db_live_users}</span>
                <span className="text-white font-display text-3xl font-bold tracking-tight">
                  {liveUsers}
                </span>
              </div>
              <div className="glass-card p-5 rounded-xl border border-white/5 flex flex-col gap-1">
                <span className="text-slate-400 text-xs font-body">{t.db_api_requests}</span>
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
                <h3 className="text-white font-display font-bold text-lg">{t.db_system_audit}</h3>
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
                <h3 className="text-white font-display font-bold text-lg">{t.db_infra_nodes}</h3>
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
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <ProfileView user={user} />
            {user.role === 'admin' ? <AdminView user={user} /> : <StudentView user={user} />}
          </div>
        )}

      </div>
    </div>
  );
}

