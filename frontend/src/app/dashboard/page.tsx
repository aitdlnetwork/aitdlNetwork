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
    <div className="min-h-screen pt-24 pb-24 bg-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10 animate-fade-in">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-slate-500">
           <Link href="/" className="hover:text-primary transition-colors">AITDL</Link>
           <span className="material-symbols-outlined text-[10px]">chevron_right</span>
           <span className="text-primary">{activeTab === 'overview' ? 'Overview' : 'CRM Dashboard'}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sovereign Sidebar Nav */}
        <div className="w-full lg:w-80 flex flex-col glass-premium p-6 rounded-[2.5rem] border border-white/5 bg-background-dark/30 h-[calc(100vh-12rem)] sticky top-24">
          <div className="p-4 mb-6 border-b border-white/5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-widest uppercase mb-4">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              Workspace Node
            </div>
            <h2 className="text-white font-display font-bold text-xl tracking-tight">{t.db_workspace_nodes}</h2>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-display font-bold transition-all text-left group ${
                activeTab === 'overview' 
                  ? 'bg-primary text-background-dark shadow-[0_0_30px_rgba(13,227,242,0.3)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">dashboard</span> 
              <span>{t.dashboard_node_overview}</span>
              {activeTab === 'overview' && <span className="ml-auto size-2 rounded-full bg-background-dark animate-ping"></span>}
            </button>

            <button 
              onClick={() => setActiveTab('crm')}
              className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-display font-bold transition-all text-left group ${
                activeTab === 'crm' 
                  ? 'bg-primary text-background-dark shadow-[0_0_30px_rgba(13,227,242,0.3)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">hub</span> 
              <span>{t.dashboard_crm}</span>
              {activeTab === 'crm' && <span className="ml-auto size-2 rounded-full bg-background-dark animate-ping"></span>}
            </button>
          </div>

          <div className="my-6 h-px bg-white/5"></div>

          <div className="flex flex-col gap-1 px-2">
            <button className="flex items-center gap-4 p-3 rounded-xl text-slate-600 cursor-not-allowed text-xs font-display font-bold uppercase tracking-widest text-left group relative">
              <span className="material-symbols-outlined text-[18px]">insights</span> 
              {t.db_node_analytics}
              <span className="ml-auto material-symbols-outlined text-[14px] opacity-40">lock</span>
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-background-dark/90 border border-white/10 rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                Coming Soon
              </div>
            </button>
            <button className="flex items-center gap-4 p-3 rounded-xl text-slate-600 cursor-not-allowed text-xs font-display font-bold uppercase tracking-widest text-left group relative">
              <span className="material-symbols-outlined text-[18px]">settings_suggest</span> 
              {t.db_node_settings}
              <span className="ml-auto material-symbols-outlined text-[14px] opacity-40">lock</span>
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-background-dark/90 border border-white/10 rounded-lg text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                Upgrade to access
              </div>
            </button>
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <div className="h-px bg-white/5 mx-2"></div>
            <div className="flex flex-col gap-3 px-2">
              <div className="flex items-center gap-3">
                <div className="size-1.5 rounded-full bg-[#00FF9D] animate-pulse"></div>
                <span className="text-[9px] text-slate-600 font-display font-black uppercase tracking-[0.2em]">Session Active</span>
              </div>
              <button 
                onClick={handleSignOut}
                className="flex items-center justify-between group text-slate-500 hover:text-white transition-colors py-2"
              >
                <span className="text-[11px] font-display font-black uppercase tracking-[0.2em]">{t.db_decommission}</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Intelligence Panel */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* Header Command Summary */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
            <div className="space-y-2">
              <h1 className="text-white font-display text-4xl md:text-5xl font-bold tracking-tight">
                {activeTab === 'overview' ? t.dashboard_node_overview : t.dashboard_crm}
              </h1>
              <p className="text-slate-400 text-sm font-body max-w-lg">
                {activeTab === 'overview' ? t.db_overview_subtitle : t.db_crm_subtitle}
              </p>
            </div>

            <div className="flex items-center gap-6 p-4 px-6 rounded-2xl bg-background-dark/50 border border-white/5">
               <div className="flex flex-col items-end">
                 <span className="text-primary font-display font-black text-[10px] tracking-widest uppercase">{user.role} Authentication</span>
                 <span className="text-slate-500 text-[10px] font-mono tracking-tighter truncate max-w-[150px]" title={user.email.toUpperCase()}>
                   NODE://{user.email.toUpperCase()}
                 </span>
               </div>
               <div className="size-14 rounded-2xl bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-background-dark font-display font-extrabold text-2xl shadow-lg shadow-primary/20 rotate-3">
                 {user.name.charAt(0)}
               </div>
            </div>
          </div>

          {/* Dynamic Content Streams */}
          {activeTab === 'overview' ? (
            <div className="space-y-10">
              {/* Cinematic KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-premium p-8 rounded-[2rem] border border-white/5 flex flex-col gap-4 group hover:border-[#00FF9D]/30 transition-all">
                  <span className="text-slate-500 text-[10px] font-display font-black tracking-widest uppercase">{t.db_live_users}</span>
                  <div className="flex items-end gap-3">
                    <span className="text-white font-display text-5xl font-bold tracking-tighter tabular-nums group-hover:text-[#00FF9D] transition-colors">{liveUsers}</span>
                    <span className="text-[#00FF9D] text-xs font-display font-bold mb-2 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">trending_up</span> +12%
                    </span>
                  </div>
                </div>
                
                <div className="glass-premium p-8 rounded-[2rem] border border-white/5 flex flex-col gap-4 group hover:border-primary/30 transition-all">
                  <span className="text-slate-500 text-[10px] font-display font-black tracking-widest uppercase">{t.db_api_requests}</span>
                  <span className="text-primary font-display text-4xl font-bold tracking-tighter tabular-nums text-gradient-primary">
                    {apiRequests.toLocaleString()}
                  </span>
                </div>

                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="glass-premium p-8 rounded-[2rem] border border-white/5 flex flex-col gap-4 group hover:border-white/20 transition-all">
                    <span className="text-slate-500 text-[10px] font-display font-black tracking-widest uppercase">{stat.name}</span>
                    <span className="text-white font-display text-4xl font-bold tracking-tighter tabular-nums">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Real-time System Audit Stream */}
                <div className="xl:col-span-2 glass-premium p-10 rounded-[3rem] border border-white/10 bg-background-dark/20 space-y-8 min-h-[500px]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-display text-2xl font-bold tracking-tight">{t.db_system_audit}</h3>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] text-[10px] font-display font-black tracking-widest uppercase">
                      <span className="size-1.5 rounded-full bg-[#00FF9D] animate-ping"></span>
                      Live Stream
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {logs.map((log, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:translate-x-2 transition-all duration-500 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-lg bg-slate-900 border border-white/5 text-slate-500">
                          {log.time}
                        </span>
                        <div className="flex-1 space-y-1">
                          <p className="text-primary text-[10px] font-display font-black tracking-[0.2em] uppercase">{log.category}</p>
                          <p className="text-slate-300 text-sm font-body leading-relaxed">{log.message}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-[#00FF9D] text-[10px] font-mono uppercase bg-[#00FF9D]/5 px-3 py-1 rounded-full">
                          <span className="size-1.5 rounded-full bg-[#00FF9D]"></span>
                          Verified
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Infrastructure Nodes Overview */}
                <div className="glass-premium p-10 rounded-[3rem] border border-white/10 bg-background-dark/30 space-y-10">
                  <h3 className="text-white font-display text-2xl font-bold tracking-tight">{t.db_infra_nodes}</h3>
                  <div className="space-y-6">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 group hover:border-primary/30 transition-all flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-500">
                            <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                          </div>
                          <span className="text-[#00FF9D] text-[10px] font-display font-black uppercase tracking-widest">{stat.status}</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-slate-500 text-[10px] font-display font-black tracking-widest uppercase">{stat.name}</p>
                          <p className="text-white text-2xl font-display font-bold">{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-fade-in">
              <ProfileView user={user} />
              {user.role === 'admin' ? <AdminView user={user} /> : <StudentView user={user} />}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

