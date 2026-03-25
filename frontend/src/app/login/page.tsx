/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nContext';
import { translations } from '@/lib/i18n/translations';
import { createClient } from '@/utils/supabase/client';

export default function Login() {
  const { language } = useI18n();
  const t = translations[language];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    const supabase = createClient();
    if (!supabase) {
      // Fallback for demo
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setNotification({ 
          message: `${t.login_title} Error: ${error.message}`, 
          type: 'error' 
        });
        setIsLoading(false);
      } else {
        setNotification({ 
          message: t.login_msg_success, 
          type: 'success' 
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 800);
      }
    } catch (err) {
      setNotification({ message: t.login_msg_error, type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center px-6 py-24 z-10 relative animate-fade-in min-h-screen bg-mesh overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>

      <div className="glass-premium w-full max-w-lg p-12 md:p-16 rounded-[3rem] border border-white/10 bg-background-dark/50 flex flex-col gap-10 backdrop-blur-2xl relative group animate-slide-up">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity duration-1000"></div>

        <div className="flex flex-col gap-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase mx-auto mb-2">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            SOVEREIGN ACCESS
          </div>
          <h1 className="text-white font-display text-4xl font-bold tracking-tight">
            {t.login_title}
          </h1>
          <p className="text-slate-400 text-lg font-body leading-relaxed max-w-xs mx-auto">
            {t.login_subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
          <div className="relative group/field">
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full bg-transparent border-0 border-b-2 border-slate-800 px-0 py-6 text-white text-xl font-body focus:ring-0 focus:border-primary transition-all placeholder-transparent"
            />
            <label className="absolute left-0 top-6 text-slate-500 font-display font-black text-[10px] transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:font-bold peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-500 peer-focus:-top-6 peer-focus:text-primary uppercase tracking-[0.2em] cursor-text">
              {t.login_email}
            </label>
          </div>

          <div className="relative group/field">
            <div className="flex justify-between items-center absolute -top-6 right-0">
               <button type="button" className="text-primary text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                {t.login_reset}
              </button>
            </div>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full bg-transparent border-0 border-b-2 border-slate-800 px-0 py-6 text-white text-xl font-body focus:ring-0 focus:border-primary transition-all placeholder-transparent"
            />
            <label className="absolute left-0 top-6 text-slate-500 font-display font-black text-[10px] transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:font-bold peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-500 peer-focus:-top-6 peer-focus:text-primary uppercase tracking-[0.2em] cursor-text">
              {t.login_pass}
            </label>
          </div>

          <button 
            type="submit" disabled={isLoading}
            className="w-full h-20 rounded-3xl bg-primary text-background-dark font-display font-black text-sm tracking-[0.3em] uppercase flex items-center justify-center gap-4 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(13,227,242,0.4)] transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
          >
            {isLoading ? (
              <span className="size-6 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
            ) : (
              <>
                <span>{t.login_btn}</span> 
                <div className="size-10 rounded-2xl bg-background-dark/10 flex items-center justify-center group-hover/btn:bg-background-dark group-hover/btn:text-primary transition-all duration-500">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
              </>
            )}
          </button>
        </form>

        <div className="border-t border-white/5 pt-8 text-center relative z-10">
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-display font-black">
            {t.login_direct_access}  
            <button onClick={() => router.push('/dashboard')} className="text-primary font-black hover:text-white ml-2 transition-colors">
              {t.login_bypass}
            </button>
          </p>
        </div>

        {/* Notifications */}
        {notification && (
          <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 rounded-2xl border flex items-center gap-4 animate-slide-up backdrop-blur-xl shadow-2xl ${
            notification.type === 'success' 
              ? 'bg-[#00FF9D]/10 border-[#00FF9D]/20 text-[#00FF9D]' 
              : 'bg-red-500/10 border-red-500/20 text-red-500'
          }`}>
            <span className="material-symbols-outlined text-2xl">
              {notification.type === 'success' ? 'verified' : 'error'}
            </span>
            <span className="text-xs font-display font-black uppercase tracking-[0.2em]">{notification.message}</span>
          </div>
        )}
      </div>

      {/* Floating Elements for depth */}
      <div className="absolute top-1/4 -right-20 size-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-float"></div>
      <div className="absolute bottom-1/4 -left-20 size-[300px] bg-[#00FF9D]/5 rounded-full blur-[80px] -z-10 animate-float-delayed"></div>
    </div>
  );
}

