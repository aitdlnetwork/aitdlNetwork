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

import Image from 'next/image';

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
    <div className="flex-1 w-full min-h-screen bg-mesh relative overflow-hidden flex flex-col justify-center items-center py-24">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>

      <div className="w-full max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 animate-fade-in">
        
        {/* Left: Cinematic Teaser */}
        <div className="hidden lg:flex flex-col gap-10 group">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-semibold text-[11px] tracking-widest uppercase w-fit">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              {t.login_msg_success ? 'SYSTEM PORTAL' : 'NETWORK PREVIEW'}
            </div>
            <h2 className="text-white font-display font-extrabold text-4xl md:text-5xl leading-tight tracking-tight">
              <span className="text-gradient inline-block">{t.login_title === 'Login' ? 'Access' : 'प्रवेश'}</span> <br />
              <span className="text-gradient-primary inline-block font-black">{t.login_title === 'Login' ? 'Institutional Intelligence.' : 'संस्थान बुद्धिमत्ता।'}</span>
            </h2>
            <p className="text-slate-400 text-lg font-normal leading-relaxed max-w-md border-l-2 border-primary/20 pl-8">
              {language === 'hi' 
                ? 'आपका संस्थान, आपका डेटा, आपका नियंत्रण। 2026 की अत्याधुनिक एआई तकनीक के साथ अपने भविष्य को संचालित करें।' 
                : 'Your institutional data, unified. Orchestrate your educational ecosystem with absolute 2026-grade automation and security.'}
            </p>
          </div>

          <div className="relative animate-float">
            <div className="absolute inset-[-60px] bg-primary/20 blur-[140px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 -z-10"></div>
            <div className="relative aspect-[16/10] glass-premium p-3 rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden scale-100 group-hover:scale-105 transition-all duration-1000 rotate-[-1deg] group-hover:rotate-0">
              <Image 
                src="/images/dashboard-teaser.png" 
                alt="Business Dashboard Preview" 
                fill 
                className="object-cover opacity-90 brightness-75 group-hover:brightness-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60"></div>
              
              {/* Overlay labels */}
              <div className="absolute bottom-10 left-10 flex flex-col gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-background-dark/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#00FF9D] animate-pulse"></span>
                  <span className="text-[11px] font-semibold text-white tracking-widest uppercase">Secure Encryption</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-background-dark/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
                   <span className="size-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
                  <span className="text-[11px] font-semibold text-white tracking-widest uppercase">System Sync: Active</span>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute bottom-6 right-8 text-white/20 font-display font-black text-[10px] tracking-[0.4em] uppercase pointer-events-none z-20 select-none">
                AITDL NETWORK
              </div>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="glass-premium w-full max-w-lg p-12 md:p-16 rounded-[3rem] border border-white/10 bg-background-dark/50 flex flex-col gap-10 backdrop-blur-2xl relative group animate-slide-up justify-self-center lg:justify-self-end">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="flex flex-col gap-4 text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-semibold text-[11px] tracking-widest uppercase mb-2 lg:mx-0 mx-auto">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              INSTITUTIONAL ACCESS
            </div>
            <h1 className="text-white font-display text-4xl font-bold tracking-tight">
              {t.login_title}
            </h1>
            <p className="text-slate-400 text-lg font-body leading-relaxed max-w-xs lg:mx-0 mx-auto">
              {t.login_subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
            <div className="relative group/field">
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-0 border-b-2 border-slate-800 px-0 py-6 text-white text-lg font-normal focus:ring-0 focus:border-primary transition-all placeholder-transparent"
              />
              <label className="absolute left-0 top-6 text-slate-500 font-semibold text-[11px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-500 peer-focus:-top-6 peer-focus:text-primary uppercase tracking-widest cursor-text">
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
                className="peer w-full bg-transparent border-0 border-b-2 border-slate-800 px-0 py-6 text-white text-lg font-normal focus:ring-0 focus:border-primary transition-all placeholder-transparent"
              />
              <label className="absolute left-0 top-6 text-slate-500 font-semibold text-[11px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-500 peer-focus:-top-6 peer-focus:text-primary uppercase tracking-widest cursor-text">
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

          <div className="border-t border-white/5 pt-8 text-center relative z-10 lg:text-left">
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-display font-black">
              {t.login_direct_access}  
              <button onClick={() => router.push('/dashboard')} className="text-primary font-black hover:text-white ml-2 transition-colors">
                {t.login_bypass}
              </button>
            </p>
          </div>

          {/* Notifications */}
          {notification && (
            <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 z-[200] px-8 py-4 rounded-2xl border flex items-center gap-4 animate-slide-up backdrop-blur-xl shadow-2xl ${
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
      </div>

      {/* Floating Elements for depth */}
      <div className="absolute top-1/4 -right-20 size-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 animate-float"></div>
      <div className="absolute bottom-1/4 -left-20 size-[300px] bg-[#00FF9D]/5 rounded-full blur-[80px] -z-10 animate-float"></div>
    </div>
  );
}

