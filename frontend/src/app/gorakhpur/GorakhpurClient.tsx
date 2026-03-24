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
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden md:block">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-60" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#00FF9D]/5 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      </div>

      {/* Hero */}
      <div className="text-center mb-16 flex flex-col items-center">
        <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wider mb-3">
          {t("LOCAL NODE: GORAKHPUR (U.P.)", "स्थानीय नोड: गोरखपुर (उ.प्र.)", "स्थानीय नोड: गोरखपुर (उ.प्र.)")}
        </span>
        <h1 className="text-white font-display text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight max-w-2xl text-gradient">
          {t("Smart Software Solutions for Gorakhpur", "गोरखपुर के लिए स्मार्ट सॉफ्टवेयर उत्पाद", "गोरखपुर नगरार्थं स्मार्ट उत्पादम्")}
        </h1>
        <p className="text-muted text-lg font-body max-w-xl leading-relaxed">
          {t(
            "Sovereign LMS, POS Billing, and coaching management setups designed targeting institutional efficiency around Golghar and Civil Lines.",
            "गोलघर और सिविल लाइंस के पास संस्थागत दक्षता के लिए डिज़ाइन किया गया संप्रभु एलएमएस, पीओएस बिलिंग और कोचिंग प्रबंधन।",
            "गोलघर सिविल लाइंस संस्था दक्षता व्यवस्थापनार्थं स्वायत्त व्यवस्था।"
          )}
        </p>
        <div className="flex items-center gap-4 mt-8 flex-wrap justify-center">
          <Link href="/contact" className="btn-primary flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-background-dark font-display font-semibold text-[14px]">
            {t("Get Local Demo", "लोकल डेमो प्राप्त करें", "लोकल प्रदर्शनम्")}
          </Link>
          <a href="tel:+919323023007" className="btn-secondary flex items-center gap-2 h-12 px-6 rounded-lg bg-white/5 font-display font-semibold text-[14px] border border-white/10 hover:border-primary/30 transition-all">
            <span className="material-symbols-outlined text-primary">call</span> +91 93230 23007
          </a>
        </div>
      </div>

      {/* Grid of regional node specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {localServices.map((svc, idx) => (
          <div key={idx} className="glass-card p-6 rounded-xl flex flex-col gap-4 border border-white/5 bg-background-dark/30 hover:border-primary/30 transition-all duration-300">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">{svc.icon}</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">{svc.title}</h3>
            <p className="text-slate-400 text-sm md:text-base font-body leading-relaxed">{svc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
