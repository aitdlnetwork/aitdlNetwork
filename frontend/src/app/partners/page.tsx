"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';
import { translations } from '@/lib/i18n/translations';
import { createClient } from '@/utils/supabase/client';

export default function PartnersPage() {
  const { language } = useI18n();
  const t = translations[language];
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: 'Technical Implementation',
    comments: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const supabase = createClient();
    if (!supabase) {
      console.warn('Supabase not available, using fallback.');
      setTimeout(() => setFormStatus('success'), 1000);
      return;
    }

    const { error } = await supabase.from('leads').insert([{
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      type: formData.type,
      comments: formData.comments
    }]);

    if (error) {
      console.error('Lead Submission Error:', error);
      // Fallback for demo if table doesn't exist yet
      setTimeout(() => setFormStatus('success'), 1000);
    } else {
      setFormStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-background-dark pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,211,211,0.08),transparent_70%)] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 size-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t.partner_hero_badge}
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl mb-6 text-gradient leading-tight tracking-tight">
            {t.partner_hero_title}
          </h1>
          <p className="text-lg text-slate-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.partner_hero_desc}
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: 'hub', title: t.partner_value_nodes_title, desc: t.partner_value_nodes_desc },
            { icon: 'security', title: t.partner_value_security_title, desc: t.partner_value_security_desc },
            { icon: 'language', title: t.partner_value_localized_title, desc: t.partner_value_localized_desc }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-body">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Content: Tiers & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Tiers */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-display font-bold text-white mb-4">{t.partner_tiers_title}</h2>
            {[
              { color: 'text-primary', title: t.partner_tier_tech_title, desc: t.partner_tier_tech_desc, points: t.partner_points_tech },
              { color: 'text-yellow-500', title: t.partner_tier_ref_title, desc: t.partner_tier_ref_desc, points: t.partner_points_ref },
              { color: 'text-purple-500', title: t.partner_tier_ent_title, desc: t.partner_tier_ent_desc, points: t.partner_points_ent }
            ].map((tier, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className={`size-2 rounded-full mt-2 ring-4 ring-white/5 bg-current ${tier.color}`}></div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">{tier.title}</h4>
                  <p className="text-sm text-slate-400 mb-4">{tier.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.points.map((p, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-500 font-medium">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Lead Form */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-primary/20 bg-white/[0.03] shadow-2xl relative overflow-hidden">
            {formStatus === 'success' ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">{t.partner_form_success_title}</h3>
                <p className="text-slate-400 mb-8">{t.partner_form_success_desc}</p>
                <button onClick={() => setFormStatus('idle')} className="text-primary font-bold hover:underline">{t.partner_form_apply_another}</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{t.partner_form_title}</h3>
                <p className="text-sm text-slate-400 mb-8">{t.partner_form_desc}</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t.partner_form_name}</label>
                        <input 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all" 
                          placeholder="J. Mallah" 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t.partner_form_email}</label>
                        <input 
                          required 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all" 
                          placeholder="jrm@aitdl.com" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t.partner_form_org}</label>
                      <input 
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all" 
                        placeholder="Tech Innovations Ltd." 
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t.partner_form_type}</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value={t.partner_type_tech} className="bg-[#0a0a0a]">{t.partner_type_tech}</option>
                        <option value={t.partner_type_ref} className="bg-[#0a0a0a]">{t.partner_type_ref}</option>
                        <option value={t.partner_type_ent} className="bg-[#0a0a0a]">{t.partner_type_ent}</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t.partner_form_comments}</label>
                      <textarea 
                        value={formData.comments}
                        onChange={(e) => setFormData({...formData, comments: e.target.value})}
                        className="bg-white/5 border border-white/10 rounded-xl h-32 p-4 text-sm focus:border-primary/50 text-white outline-none transition-all resize-none" 
                        placeholder={t.partner_placeholder_comments} 
                      />
                    </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    className="mt-4 h-14 rounded-xl bg-primary text-background-dark font-display font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,211,211,0.2)]"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="animate-spin border-2 border-background-dark border-t-transparent rounded-full size-5"></span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send_and_archive</span>
                        {t.partner_form_submit}
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
