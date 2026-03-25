/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

const localServicesData: Record<string, { icon: string; title: string; desc: string }[]> = {
  en: [
    { icon: 'school', title: 'Coaching Management', desc: 'Secure student portal, automated fee tracking, and online tests for institutions near Golghar.' },
    { icon: 'shopping_cart', title: 'Retail POS Billing', desc: 'Fast barcode billing and GST ready invoicing for retail counters in Civil Lines.' },
    { icon: 'account_balance', title: 'School ERP & LMS', desc: 'Enterprise learning architecture and parent-teacher communication portals.' }
  ],
  hi: [
    { icon: 'school', title: 'कोचिंग प्रबंधन', desc: 'गोलघर के पास के संस्थानों के लिए सुरक्षित छात्र पोर्टल, स्वचालित शुल्क ट्रैकिंग।' },
    { icon: 'shopping_cart', title: 'खुदरा पीओएस बिलिंग', desc: 'सिविल लाइंस में खुदरा काउंटरों के लिए तेजी से बारकोड बिलिंग और जीएसटी चालान।' },
    { icon: 'account_balance', title: 'स्कूल ईआरपी और एलएमएस', desc: 'एंटरप्राइज लर्निंग आर्किटेक्चर और पैरेंट-टीचर कम्युनिकेशन पोर्टल।' }
  ],
  sa: [
    { icon: 'school', title: 'कोचिंग प्रबन्धनम्', desc: 'गोलघर संस्था प्रबन्धनार्थं छात्र व्यवस्था।' },
    { icon: 'shopping_cart', title: 'पीओएस बिलिंग', desc: 'सिविल लाइंस विक्रय प्रबन्धनार्थं बिलिंग तन्त्रम्।' },
    { icon: 'account_balance', title: 'विद्या ईआरपी एलएमएस', desc: 'शिक्षण व्यवस्था व्यवस्थापनम्।' }
  ]
};

export default function GorakhpurClient() {
  const { language } = useI18n();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const localServices = localServicesData[langKey];

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 animate-fade-in">
        {/* Local Node Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase mb-8 shadow-[0_0_20px_rgba(13,227,242,0.1)] animate-pulse-slow">
            <span className="size-2 rounded-full bg-primary animate-ping"></span>
            {t("LOCAL NODE: GORAKHPUR (U.P.)", "स्थानीय नोड: गोरखपुर (उ.प्र.)", "स्थानीय नोड: गोरखपुर (उ.प्र.)")}
          </div>
          
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-8 tracking-tight leading-[1.1] max-w-4xl">
            <span className="text-gradient inline-block">{t("Smart Software", "स्मार्ट सॉफ्टवेयर", "स्मार्ट तन्त्रम्")}</span> <br />
            <span className="text-gradient-primary inline-block">{t("for Gorakhpur", "गोरखपुर के लिए", "गोरखपुर नगरार्थं")}</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl font-body max-w-2xl leading-relaxed border-t border-white/5 pt-8">
            {t(
              "Sovereign LMS, POS Billing, and coaching management setups designed targeting institutional efficiency around Golghar and Civil Lines.",
              "गोलघर और सिविल लाइंस के पास संस्थागत दक्षता के लिए डिज़ाइन किया गया संप्रभु एलएमएस, पीओएस बिलिंग और कोचिंग प्रबंधन।",
              "गोलघर सिविल लाइंस संस्था दक्षता व्यवस्थापनार्थं स्वायत्त व्यवस्था।"
            )}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            <Link href="/contact" className="px-10 py-5 rounded-2xl bg-primary text-background-dark font-display font-black text-sm tracking-widest uppercase hover:translate-y-[-4px] active:scale-95 transition-all shadow-[0_0_40px_rgba(13,227,242,0.3)]">
              {t("Get Local Demo", "लोकल डेमो प्राप्त करें", "लोकल प्रदर्शनम्")}
            </Link>
            <a href="tel:+919323023007" className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-display font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-3 group">
              <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform">call</span>
              +91 93230 23007
            </a>
          </div>
        </div>

        {/* Localized Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {localServices.map((svc, idx) => (
            <div 
              key={idx} 
              className="glass-premium p-10 rounded-3xl flex flex-col gap-6 border border-white/5 bg-background-dark/30 hover:border-primary/40 transition-all duration-700 group animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-500 shadow-xl">
                <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white group-hover:text-primary transition-colors">{svc.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed font-body group-hover:text-slate-300 transition-colors">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* GBP Connection / Physical Node Map Placeholder Feel */}
        <div className="glass-card rounded-[2.5rem] p-12 border border-white/5 bg-background-dark/30 relative overflow-hidden group mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-display font-bold text-3xl">Gorakhpur Corporate Node</h3>
              <p className="text-slate-400 font-body">Visit us locally for institutional strategy & deployment talks.</p>
            </div>
            <div className="flex flex-col gap-1 items-end text-right">
              <span className="text-primary font-display font-black text-xs tracking-widest uppercase mb-2">Physical Location</span>
              <p className="text-white font-body text-sm max-w-xs">{t("Dwarika Puri, Gorakhnath, Gorakhpur, UP - 273015", "द्वारिका पुरी, गोरखनाथ, गोरखपुर, यूपी - 273015", "द्वारिका पुरी, गोरखनाथ, गोरखपुर, यूपी - 273015")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
