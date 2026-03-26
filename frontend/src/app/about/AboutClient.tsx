/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';
import { usePathname } from 'next/navigation';
import SEOHead from '@/components/SEOHead';

const valuesData: Record<string, { title: string; description: string; icon: string }[]> = {
  en: [
    {
      title: "Deep Innovation",
      description: "We don't just build software; we architect adaptive algorithms and deep learning pipelines that evolve as you scale.",
      icon: "psychology"
    },
    {
      title: "Sovereign Privacy",
      description: "Absolute data governance. Encrypted backups, fully sandboxed enterprise nodes aligned with strictly locally compliance.",
      icon: "encrypted"
    },
    {
      title: "High Availability",
      description: "Always online. Scaling setups engineered to bypass single points of failure with redundant delivery framework.",
      icon: "cloud"
    }
  ],
  hi: [
    {
      title: "गहरा नवाचार",
      description: "हम सिर्फ सॉफ्टवेयर नहीं बनाते; हम एडेप्टिव एल्गोरिदम और डीप लर्निंग पाइपलाइन डिजाइन करते हैं जो आपके साथ विकसित होती हैं।",
      icon: "psychology"
    },
    {
      title: "संप्रभु गोपनीयता",
      description: "पूर्ण डेटा प्रशासन। एन्क्रिप्टेड बैकअप, पूरी तरह से सैंडबॉक्स वाले एंटरप्राइज नोड्स स्थानीय अनुपालन के अनुरूप।",
      icon: "encrypted"
    },
    {
      title: "उच्च उपलब्धता",
      description: "हमेशा ऑनलाइन। अतिरेक के साथ विफलताओं के एकल बिंदुओं को बायपास करने के लिए इंजीनियर किया गया सेटअप।",
      icon: "cloud"
    }
  ],
  sa: [
    {
      title: "नूतन प्रयोगः",
      description: "वयं केवलं तन्त्रं न रचयामः; वयं विवेक स्वचालनम् व्यवस्थां रचयामः।",
      icon: "psychology"
    },
    {
      title: "स्वायत्त गोपनीयता",
      description: "पूर्ण डेटा प्रशासनम्। एन्क्रिप्टेड बैकअप व्यवस्थापनम्।",
      icon: "encrypted"
    },
    {
      title: "उच्च उपलब्धता",
      description: "सर्वदा ऑनलाइन। दोष निवारणार्थं व्यवस्थापनम्।",
      icon: "cloud"
    }
  ]
};

export default function About() {
  const { language } = useI18n();
  const pathname = usePathname();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const values = valuesData[langKey];

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  return (
    <div className="min-h-screen pt-40 pb-32 bg-mesh relative overflow-hidden">
      <SEOHead path={pathname} />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="flex flex-col gap-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase w-fit">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              OUR MISSION
            </div>
            <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl leading-[1.0] tracking-tighter text-white">
              <span className="text-gradient inline-block">{t("AI-First.", "एआई-प्रथम.", "एआई-प्रथम.")}</span> <br />
              <span className="text-gradient-primary inline-block font-black tracking-tighter">{t("Sovereign Core.", "मुख्य इन्फ्रास्ट्रक्चर.", "मुख्य इन्फ्रास्ट्रक्चर.")}</span>
            </h1>
            <p className="text-slate-400 text-xl lg:text-2xl font-body leading-relaxed border-l-2 border-primary/20 pl-8 max-w-2xl">
              {t(
                "We architect and deploy secure, intelligent software nodes for planetary scalability. Our mission is to transform complex enterprise friction into elegant, automated continuous intelligence streams.",
                "हम स्केलेबिलिटी के लिए सुरक्षित, बुद्धिमान सिस्टम डिजाइन और तैनात करते हैं। हमारा मिशन जटिल उद्यम चुनौतियों को सुरुचिपूर्ण, स्वचालित पाइपलाइनों में बदलना है।",
                "वयं स्केलेबिलिटी कृते सुरक्षितान् प्रबन्धयामः। अस्माकं लक्ष्यं जटिलसमस्यानां सरलीकरणम्।"
              )}
            </p>
          </div>
          
          <div className="relative group animate-float">
            <div className="absolute inset-[-40px] bg-primary/10 blur-[120px] -z-10 rounded-full animate-pulse-slow"></div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden glass-premium p-4 border border-white/10 shadow-2xl rotate-[3deg] group-hover:rotate-0 transition-all duration-1000">
              <Image 
                src="/images/about_nodes.png" 
                alt="Sovereign AI Network Nodes Illustration" 
                fill 
                className="object-cover opacity-80 brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60"></div>
              {/* Watermark */}
              <div className="absolute bottom-6 right-8 text-white/20 font-display font-black text-[10px] tracking-[0.4em] uppercase pointer-events-none z-20 select-none">
                AITDL NETWORK
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          {values.map((val, idx) => (
            <div key={idx} className="glass-premium p-12 rounded-[2.5rem] flex flex-col gap-8 border border-white/5 bg-background-dark/30 hover:border-primary/40 transition-all duration-700 group animate-slide-up hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)]" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="size-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-500 shadow-inner overflow-hidden relative">
                 <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <span className="material-symbols-outlined text-4xl relative z-10">{val.icon}</span>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-3xl text-white group-hover:text-primary transition-colors tracking-tight">{val.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed group-hover:text-slate-200 transition-colors font-body">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-premium p-12 md:p-24 rounded-[4rem] border border-white/10 bg-background-dark/50 flex flex-col md:flex-row items-center gap-16 mb-24 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none group-hover:opacity-100 opacity-30 transition-opacity duration-1000"></div>
          
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-[3.5rem] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 relative shadow-2xl animate-float group-hover:scale-105 transition-all duration-1000 rotate-3 group-hover:rotate-0">
            <Image 
              src="/images/avatar_jrm.png" 
              alt="Lead Architect JRM" 
              fill 
              className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-1000"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             {/* Watermark */}
             <div className="absolute bottom-6 right-8 text-white/20 font-display font-black text-[10px] tracking-[0.4em] uppercase pointer-events-none z-20 select-none">
                AITDL NETWORK
              </div>
          </div>
          
          <div className="flex flex-col gap-8 z-10 text-center md:text-left">
            <div className="space-y-4">
              <div className="inline-flex">
                <span className="px-5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-display font-black tracking-[0.3em] uppercase">
                  {t("Sovereign Architect", "संप्रभु वास्तुकार", "सर्वभौम वास्तुकारः")}
                </span>
              </div>
              <h2 className="text-white font-display text-5xl md:text-7xl font-black tracking-tight leading-none">{t("JRM", "जेआरएम", "जेआरएम")}</h2>
              <div className="flex items-center gap-4">
                <p className="text-primary/60 font-display font-black text-xs tracking-[0.4em] uppercase">(Jawahar R Mallah)</p>
                <div className="size-1 rounded-full bg-slate-800"></div>
                <Link 
                  href="https://x.com/aitdlnetwork" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <svg className="size-3 text-slate-500 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-[9px] font-display font-black tracking-[0.2em] text-slate-500 group-hover:text-primary transition-colors uppercase">@aitdlnetwork</span>
                </Link>
              </div>
            </div>
            <p className="text-slate-400 text-xl md:text-2xl leading-relaxed max-w-4xl font-body font-light italic border-l-4 border-primary/20 pl-8">
              {t(
                "A software technologist with 21+ years of deep engineering experience (2005–present), JRM has architected enterprise-grade systems across POS, ERP, and Accounting. As the Founder of AITDL, his parallel study of Educational Software mirrors ancient algorithmic sutras computationally optimal for tomorrow's AI.",
                "21+ वर्षों के गहरे इंजीनियरिंग अनुभव वाले सॉफ्टवेयर प्रौद्योगिकीविद्, जेआरएम ने पीओएस, ईआरपी और अकाउंटिंग में उन्नत सिस्टम डिजाइन किए हैं। एआई टीडीएल के संस्थापक के रूप में, उनका अध्ययन प्राचीन एल्गोरिदम को भविष्य की एआई के लिए इष्टतम मानता है।",
                "21+ वर्षाणां अनुभवयुक्तः तन्त्रज्ञान विशेषज्ञः, जेआरएम महोदयः पीओएस ईआरपी इत्यादि व्यवस्था प्रबन्धनम् कृतवान्।"
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:64px_64px] opacity-30"></div>
    </div>
  );
}
