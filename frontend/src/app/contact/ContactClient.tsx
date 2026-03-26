/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

/*
AITDL Network
Artificial Intelligence Technology & Deep Learning

Designed & Architected by JRM

Contact:
aitdl.com
aitdlnetwork@outlook.com
jawahar.mallah@gmail.com

Copyright © AITDL Network 2026 | Vikram Samvat 2083
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

"use client";

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { usePathname } from 'next/navigation';
import NodeMap from '@/components/NodeMap';
import SEOHead from '@/components/SEOHead';

export default function Contact() {
  const { language } = useI18n();
  const pathname = usePathname();
  const [formData, setFormData] = useState({ name: '', email: '', project: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const langKey = language === 'hi' || language === 'sa' ? language : 'en';

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Dynamic WhatsApp Pre-fill Link
    const message = `Hi AITDL Network,%0A%0AI would like to request a demo.%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.project}`;
    const whatsappUrl = `https://wa.me/919323023007?text=${message}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-mesh relative overflow-hidden">
      <SEOHead path={pathname} />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
          {/* Left Side: Contact Nodes */}
          <div className="flex flex-col gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase w-fit">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                UPLINK READY
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white leading-[1.05]">
                <span className="text-gradient inline-block">{t("Get a Free", "निःशुल्क", "निःशुल्क")}</span> <br />
                <span className="text-gradient-primary inline-block font-black tracking-tighter">{t("Intelligence Demo", "डेमो लें", "प्रदर्शनम्")}</span>
              </h1>
              <p className="text-slate-400 font-body text-xl max-w-lg leading-relaxed border-l-2 border-primary/20 pl-8">
                {t(
                  "Transform your operations with enterprise-grade AI. Let's build your custom sovereign node today.",
                  "एंटरप्राइज-ग्रेड एआई के साथ अपने संचालन को बदलें। आइए आज आपका समाधान बनाएं।",
                  "एंटरप्राइज-ग्रेड एआई तन्त्रेण कार्यप्रबन्धनं परिवर्तयन्तु।"
                )}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <a className="glass-premium p-10 flex items-center justify-between group transition-all duration-700 hover:border-[#00FF9D]/40 rounded-[2.5rem]" href="https://wa.me/919323023007" target="_blank" rel="noreferrer">
                <div className="flex items-center gap-8">
                  <div className="size-20 rounded-3xl bg-[#00FF9D]/10 border border-[#00FF9D]/20 flex items-center justify-center text-[#00FF9D] group-hover:bg-[#00FF9D] group-hover:text-background-dark transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <span className="material-symbols-outlined text-4xl">chat</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-white text-3xl font-display font-bold leading-tight group-hover:text-[#00FF9D] transition-colors">{t("Primary Support", "मुख्य सहायता", "मुख्य सहायता")}</h2>
                    <p className="text-slate-500 text-sm font-display font-black uppercase tracking-widest mt-2">{t("Immediate Response", "तुरंत प्रतिक्रिया", "शीघ्र प्रतिक्रिया")} • +91 93230 23007</p>
                  </div>
                </div>
                <div className="size-12 rounded-full border border-white/10 flex items-center justify-center text-[#00FF9D] group-hover:bg-[#00FF9D]/10 group-hover:translate-x-2 transition-all">
                  <span className="material-symbols-outlined text-3xl">east</span>
                </div>
              </a>

              <a className="glass-premium p-10 flex items-center justify-between group transition-all duration-700 hover:border-primary/40 rounded-[2.5rem]" href="https://wa.me/919324117007" target="_blank" rel="noreferrer">
                <div className="flex items-center gap-8">
                  <div className="size-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-500 shadow-[0_0_30px_rgba(13,227,242,0.1)]">
                    <span className="material-symbols-outlined text-4xl">chat</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-white text-3xl font-display font-bold leading-tight group-hover:text-primary transition-colors">{t("Operations Node", "पुष्पा के साथ चैट करें", "पुष्पा महोदया सह वार्तालापम्")}</h2>
                    <p className="text-slate-500 text-sm font-display font-black uppercase tracking-widest mt-2">{t("Secondary Support", "सहायक सहायता", "सहायक सहायता")} • +91 93241 17007</p>
                  </div>
                </div>
                <div className="size-12 rounded-full border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:translate-x-2 transition-all">
                   <span className="material-symbols-outlined text-3xl">east</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="glass-premium rounded-[3.5rem] p-12 lg:p-20 border border-white/10 bg-background-dark/50 relative overflow-hidden group animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in gap-8 relative z-10">
                <div className="size-32 rounded-[2.5rem] bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-[0_0_80px_rgba(13,227,242,0.3)] animate-pulse-slow border border-primary/20 rotate-6">
                  <span className="material-symbols-outlined text-7xl">verified</span>
                </div>
                <h3 className="text-white font-display font-bold text-4xl tracking-tight">{t("Uplink Established", "अनुरोध दर्ज किया गया!", "अनुरोधः अभिलिखितः!")}</h3>
                <p className="text-slate-400 text-xl max-w-sm mb-6 leading-relaxed">{t("Redirecting you to our secure WhatsApp node for instant connectivity.", "त्वरित संपर्क के लिए आपको हमारे सुरक्षित व्हाट्सएप नोड पर पुनर्निर्देशित किया जा रहा है।", "त्वरित-योजनाय वयं भवतं सुरक्षित-व्हाट्सएप-केन्द्रं प्रति प्रेषयामः।")}</p>
                <button onClick={() => setIsSuccess(false)} className="text-xs font-display font-black text-primary hover:text-white transition-colors underline underline-offset-[12px] uppercase tracking-[0.3em]">{t("Re-initialize Form", "फिर से फॉर्म भरें", "पुनः फॉर्म पूरयन्तु")}</button>
              </div>
            ) : (
              <form className="flex flex-col gap-12 relative z-10" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-slate-500 font-display font-black text-[9px] tracking-[0.2em] uppercase">
                    <span className="size-1.5 rounded-full bg-primary/40"></span>
                    SECURITY CLEARANCE: VERIFIED
                  </div>
                </div>

                <div className="relative group/field">
                  <input 
                    className="peer w-full bg-transparent border-0 border-b-2 border-slate-800 px-0 py-6 text-white text-2xl font-body focus:ring-0 focus:border-primary placeholder-transparent transition-all" 
                    id="name" 
                    placeholder="Name" 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <label className="absolute left-0 top-6 text-slate-500 font-display font-black text-xs transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:font-bold peer-placeholder-shown:top-6 peer-focus:-top-8 peer-focus:text-primary uppercase tracking-[0.2em] cursor-text" htmlFor="name">{t("Identity Name", "आपका नाम", "भवान् नाम")}</label>
                </div>

                <div className="relative group/field">
                  <input 
                    className="peer w-full bg-transparent border-0 border-b-2 border-slate-800 px-0 py-6 text-white text-2xl font-body focus:ring-0 focus:border-primary placeholder-transparent transition-all" 
                    id="email" 
                    placeholder="Email" 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <label className="absolute left-0 top-6 text-slate-500 font-display font-black text-xs transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:font-bold peer-placeholder-shown:top-6 peer-focus:-top-8 peer-focus:text-primary uppercase tracking-[0.2em] cursor-text" htmlFor="email">{t("Encrypted Email", "व्यवसायिक ईमेल", "व्यापार ईमेल")}</label>
                </div>

                <div className="relative group/field">
                  <textarea 
                    className="peer w-full bg-transparent border-0 border-b-2 border-slate-800 px-0 py-6 text-white text-2xl font-body focus:ring-0 focus:border-primary placeholder-transparent transition-all resize-none" 
                    id="project" 
                    placeholder="Tell us" 
                    required 
                    rows={2}
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  ></textarea>
                  <label className="absolute left-0 top-6 text-slate-500 font-display font-black text-xs transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:font-bold peer-placeholder-shown:top-6 peer-focus:-top-8 peer-focus:text-primary uppercase tracking-[0.2em] cursor-text" htmlFor="project">{t("Intelligence Request", "हम कैसे मदद कर सकते हैं?", "वयं कथं सहायतां कुर्मः?")}</label>
                </div>

                <div className="pt-8">
                  <button 
                    className="w-full h-24 bg-primary text-background-dark font-display font-black rounded-3xl tracking-[0.3em] uppercase text-sm hover:translate-y-[-6px] hover:shadow-[0_20px_60px_rgba(13,227,242,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-6 group/btn disabled:opacity-50" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span className="text-xl">{isSubmitting ? t('SYNCHRONIZING...', 'प्रारंभ किया जा रहा है...', 'आरभ्यते...') : t('INITIALIZE UPLINK', 'डेमो शुरू करें', 'प्रदर्शनम् आरभध्वम्')}</span>
                    <div className="size-12 rounded-2xl bg-background-dark/10 flex items-center justify-center group-hover/btn:bg-background-dark group-hover/btn:text-primary transition-all duration-500 shadow-inner">
                      <span className="material-symbols-outlined text-3xl animate-pulse">cloud_upload</span>
                    </div>
                  </button>
                  <p className="text-center text-[10px] text-slate-600 font-display font-bold mt-6 uppercase tracking-widest">{t("End-to-End Encrypted Secure Connection", "एंड-टू-एंड एन्क्रिप्टेड सुरक्षित कनेक्शन", "अन्त-तः-अन्त एन्क्रिप्टेड सुरक्षित सम्पर्कः")}</p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Global Infrastructure Section */}
        <div className="mt-40 mb-20 animate-slide-up">
           <div className="flex flex-col items-center justify-center text-center gap-6 mb-12">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.3em] uppercase">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                NODE VISUALIZATION
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
                {t("National", "राष्ट्रीय", "राष्ट्रीयिय")} <span className="text-gradient-primary">Infrastructure.</span>
              </h2>
              <p className="text-slate-400 text-lg font-body max-w-2xl">
                {t(
                  "Explore our sovereign data nodes spanning across strategic regional clusters. Each node operates with absolute independent security and centralized intelligence sync.",
                  "रणनीतिक क्षेत्रीय समूहों में फैले हमारे संप्रभु डेटा नोड्स का अन्वेषण करें। प्रत्येक नोड पूर्ण स्वतंत्र सुरक्षा और केंद्रित इंटेलिजेंस सिंक के साथ काम करता है।",
                  "अभिनव-तन्त्र-केन्द्राणि पश्यन्तु। प्रत्येकं केन्द्रं पूर्ण-सुरक्षया सह कार्यं करोति।"
                )}
              </p>
           </div>
           
           <div className="relative glass-premium p-8 rounded-[4rem] border border-white/5 bg-background-dark/20 overflow-hidden shadow-inner">
              <NodeMap />
           </div>
        </div>
      </div>
    </div>
  );
}
