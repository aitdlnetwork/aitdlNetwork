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

export default function Contact() {
  const { language } = useI18n();
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
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side */}
        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {t("Get a Free Demo for Your Coaching Institute or Business", "कोचिंग या व्यवसाय के लिए निःशुल्क डेमो प्राप्त करें", "कोचिंग संस्थानाय व्यापाराय वा निःशुल्क प्रदर्शनम् प्राप्नुवन्तु")}
            </h1>
            <p className="text-slate-400 font-body text-lg max-w-md">
              {t(
                "Transform your operations with enterprise-grade AI. Let's build your custom solution today.",
                "एंटरप्राइज-ग्रेड एआई के साथ अपने संचालन को बदलें। आइए आज आपका समाधान बनाएं।",
                "एंटरप्राइज-ग्रेड एआई तन्त्रेण कार्यप्रबन्धनं परिवर्तयन्तु।"
              )}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <a className="w-full rounded-xl p-6 flex items-center justify-between bg-[#00FF9D]/10 border border-[#00FF9D]/30 transition-all hover:bg-[#00FF9D]/20 group relative overflow-hidden" href="https://wa.me/919323023007" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-lg bg-[#00FF9D] flex items-center justify-center text-black shadow-lg">
                  <span className="material-symbols-outlined scale-125">chat</span>
                </div>
                <div className="text-left">
                  <h2 className="text-[#00FF9D] text-xl font-bold leading-tight">{t("Primary Support", "मुख्य सहायता", "मुख्य सहायता")}</h2>
                  <p className="text-slate-200 text-sm font-body font-medium">{t("Immediate response", "तुरंत प्रतिक्रिया", "शीघ्र प्रतिक्रिया")} • +91 93230 23007</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#00FF9D] group-hover:translate-x-2 transition-transform relative z-10 text-3xl">arrow_forward</span>
            </a>

            <a className="w-full rounded-xl p-6 flex items-center justify-between bg-primary/10 border border-primary/30 transition-all hover:bg-primary/20 group relative overflow-hidden" href="https://wa.me/919324117007" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary shadow-lg">
                  <span className="material-symbols-outlined scale-125">chat</span>
                </div>
                <div className="text-left">
                  <h2 className="text-primary text-xl font-bold leading-tight">{t("Chat with Pushpa", "पुष्पा के साथ चैट करें", "पुष्पा महोदया सह वार्तालापम्")}</h2>
                  <p className="text-slate-200 text-sm font-body font-medium">{t("Secondary Support", "सहायक सहायता", "सहायक सहायता")} • +91 93241 17007</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform relative z-10 text-3xl">arrow_forward</span>
            </a>

            <a className="w-full rounded-xl p-6 flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 transition-all hover:bg-emerald-500/20 group relative overflow-hidden" href="tel:+919323023007">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5 font-body">{t("Direct Voice Line", "सीधी वॉइस लाइन", "प्रत्यक्ष वाणी व्यवस्था")}</p>
                  <h2 className="text-white text-lg font-mono font-medium tracking-tight">+91 93230 23007</h2>
                </div>
              </div>
              <span className="material-symbols-outlined text-emerald-400 group-hover:translate-x-2 transition-transform relative z-10 text-2xl">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="glass-card rounded-2xl p-8 lg:p-10 border-t-2 border-t-primary/20 relative overflow-hidden">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in gap-4">
              <div className="size-16 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="text-white font-display font-bold text-2xl">{t("Request Initiated!", "अनुरोध शुरू किया गया!", "अनुरोधः आरब्धः!")}</h3>
              <p className="text-slate-400 text-sm max-w-sm mb-4">{t("Redirecting you to WhatsApp connect instantly.", "व्हाट्सएप पर पुनर्निर्देशित किया जा रहा है...", "व्हाट्सएप प्रति प्रेषणम्...")}</p>
              <button onClick={() => setIsSuccess(false)} className="text-xs text-primary underline">{t("Fill form again", "फिर से फॉर्म भरें", "पुनः फॉर्म पूरयन्तु")}</button>
            </div>
          ) : (
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="relative group">
                <input 
                  className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors" 
                  id="name" 
                  placeholder="Name" 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="name">{t("Your Name", "आपका नाम", "भवान् नाम")}</label>
              </div>
              <div className="relative group">
                <input 
                  className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors" 
                  id="email" 
                  placeholder="Email" 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="email">{t("Business Email", "व्यवसायिक ईमेल", "व्यापार ईमेल")}</label>
              </div>
              <div className="relative group mt-2">
                <textarea 
                  className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors resize-none" 
                  id="project" 
                  placeholder="Tell us" 
                  required 
                  rows={4}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                ></textarea>
                <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="project">{t("How can we help you?", "हम आपकी सहायता कैसे कर सकते हैं?", "वयं कथं सहायतां कर्तुं शक्नुमः?")}</label>
              </div>
              <div className="space-y-4">
                <button 
                  className="w-full bg-primary text-black font-bold py-4 rounded-lg tracking-wide uppercase text-sm hover:bg-primary/90 flex items-center justify-center gap-2 transition-all group disabled:opacity-50" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? t('INITIALIZING...', 'प्रारंभ किया जा रहा है...', 'आरभ्यते...') : t('INITIALIZE DEMO', 'डेमो शुरू करें', 'प्रदर्शनम् आरभध्वम्')}</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">bolt</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
