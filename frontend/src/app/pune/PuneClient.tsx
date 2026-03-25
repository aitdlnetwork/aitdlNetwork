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
    { icon: 'school', title: 'School ERP & LMS', desc: 'Secure student portal, grade sheets, and parent dashboards for educational hubs in Pune.' },
    { icon: 'psychology', title: 'Adaptive AI Learning', desc: 'Personalised study plans and AI-powered assessments for competitive coaching in Kothrud.' },
    { icon: 'local_hospital', title: 'Clinic Management', desc: 'Digital health records and pharmacy billing systems for clinics and hospitals in Hinjewadi.' }
  ],
  hi: [
    { icon: 'school', title: 'स्कूल ईआरपी और एलएमएस', desc: 'पुणे में शैक्षिक केंद्रों के लिए सुरक्षित छात्र पोर्टल, ग्रेड शीट और पेरेंट डैशबोर्ड।' },
    { icon: 'psychology', title: 'एडेप्टिव एआई लर्निंग', desc: 'कोथरुड में कोचिंग के लिए व्यक्तिगत अध्ययन योजना और एआई-संचालित मूल्यांकन।' },
    { icon: 'local_hospital', title: 'क्लिनिक प्रबंधन', desc: 'हिंजवडी में क्लीनिकों और अस्पतालों के लिए डिजिटल स्वास्थ्य रिकॉर्ड।' }
  ],
  sa: [
    { icon: 'school', title: 'विद्या ईआरपी एलएमएस', desc: 'पुणे पठन प्रबन्धनार्थं छात्र व्यवस्था।' },
    { icon: 'psychology', title: 'विवेक एआई पठनम्', desc: 'कोथरुड पठन प्रबन्धनार्थं एआई तन्त्रम्।' },
    { icon: 'local_hospital', title: 'चिकित्सालय प्रबन्धनम्', desc: 'हिंजवडी चिकित्सा प्रबन्धनार्थं व्यवस्था।' }
  ]
};

export default function PuneClient() {
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden md:block">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-60" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#00FF9D]/5 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      </div>

      <div className="text-center mb-16 flex flex-col items-center">
        <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wider mb-3">
          {t("LOCAL NODE: PUNE (MH)", "स्थानीय नोड: पुणे (महाराष्ट्र)", "स्थानीय नोड: पुणे (महाराष्ट्र)")}
        </span>
        <h1 className="text-white font-display text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight max-w-2xl text-gradient">
          {t("Smart Software Solutions for Pune", "पुणे के लिए स्मार्ट सॉफ्टवेयर उत्पाद", "पुणे नगरार्थं स्मार्ट उत्पादम्")}
        </h1>
        <p className="text-muted text-lg font-body max-w-xl leading-relaxed">
          {t(
            "Sovereign LMS, School ERP, and AI-powered learning setups designed for institutional efficiency in Kothrud, Hinjewadi, and Camp.",
            "कोथरुड, हिंजवडी और कैंप में संस्थागत दक्षता के लिए डिज़ाइन किया गया संप्रभु एलएमएस, स्कूल ईआरपी और एआई-संचालित शिक्षण उत्पाद।",
            "कोथरुड हिंजवडी संस्था दक्षता व्यवस्थापनार्थं स्वायत्त व्यवस्था।"
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
