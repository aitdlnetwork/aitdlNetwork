/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Antigravity AI
*/

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { translations } from '@/lib/i18n/translations';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar_url?: string;
  };
}

export default function ProfileView({ user }: ProfileProps) {
  const { language } = useI18n();
  const t = translations[language];
  const [rotating, setRotating] = useState(false);
  const [rotated, setRotated] = useState(false);

  const rotateKey = async () => {
    setRotating(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setRotating(false);
    setRotated(true);
    setTimeout(() => setRotated(false), 3000);
  };
  return (
    <div className="glass-card p-6 rounded-xl border border-white/5 bg-background-dark/30 flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-4 border-b border-white/5 pb-5">
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold font-display border border-primary/20">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-white font-display text-xl font-bold tracking-tight">{user.name}</h2>
          <p className="text-slate-400 text-sm font-body">{user.email}</p>
          <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-bold bg-primary/20 text-primary px-2.5 py-1 rounded-full border border-primary/30">
            • {user.role} {t.ui_label_account}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-slate-500 font-display text-[13px] font-bold uppercase tracking-widest">{t.profile_title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="border border-white/5 p-4 rounded-xl bg-white/5 flex flex-col gap-1 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-slate-500 font-body text-[13px]">{t.profile_role}</span>
            <span className="text-white font-normal font-display text-[14px] tracking-wide">{user.role.toUpperCase()}</span>
          </div>
          <div className="border border-white/5 p-4 rounded-xl bg-white/5 flex flex-col gap-1 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-slate-500 font-body text-[13px]">{t.profile_since}</span>
            <span className="text-white font-normal font-mono text-[14px] tracking-tight text-primary-light">V.S. 2083 {t.ui_label_active}</span>
          </div>
        </div>

        <button 
          onClick={rotateKey}
          disabled={rotating}
          className={`w-full p-3 rounded-lg border transition-all duration-300 text-center mt-2 text-xs font-medium font-display ${
            rotated 
              ? 'bg-[#00FF9D]/10 border-[#00FF9D]/30 text-[#00FF9D]' 
              : 'border-primary/10 hover:border-primary/40 bg-primary/5 text-primary'
          }`}
        >
          {rotating ? t.profile_rotate_seed_msg : rotated ? t.profile_rotate_success_msg : t.profile_rotate_request_btn}
        </button>
      </div>
    </div>
  );
}
