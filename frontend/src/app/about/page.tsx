/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nContext';

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
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const values = valuesData[langKey];

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      {/* Short Intro Header with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-white font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            {t("AI-First.", "एआई-प्रथम.", "एआई-प्रथम.")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-muted">{t("Core Infrastructure.", "मुख्य इन्फ्रास्ट्रक्चर.", "मुख्य इन्फ्रास्ट्रक्चर.")}</span>
          </h1>
          <p className="text-muted text-lg md:text-xl font-body leading-relaxed border-l-2 border-primary/20 pl-4">
            {t(
              "We architect and deploy secure, intelligent systems for scalability. Our mission is to transform complex enterprise challenges into elegant, automated continuous pipelines utilizing cutting-edge engineering guidelines.",
              "हम स्केलेबिलिटी के लिए सुरक्षित, बुद्धिमान सिस्टम डिजाइन और तैनात करते हैं। हमारा मिशन जटिल उद्यम चुनौतियों को सुरुचिपूर्ण, स्वचालित पाइपलाइनों में बदलना है।",
              "वयं स्केलेबिलिटी कृते सुरक्षितान् प्रबन्धयामः। अस्माकं लक्ष्यं जटिलसमस्यानां सरलीकरणम्।"
            )}
          </p>
        </div>
        
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card border border-white/5 bg-background-dark/30 z-10 shadow-2xl">
          <Image 
            src="/images/about_nodes.png" 
            alt="Sovereign AI Network Nodes Illustration" 
            fill 
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {values.map((val, idx) => (
          <div key={idx} className="glass-card p-8 rounded-xl flex flex-col gap-4 border border-white/5 bg-background-dark/30 hover:border-primary/30 transition-all duration-300">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">{val.icon}</span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">{val.title}</h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              {val.description}
            </p>
          </div>
        ))}
      </div>

      {/* Founder / Architect Profile */}
      <div className="glass-card p-8 md:p-12 rounded-2xl border-t-2 border-t-primary/20 bg-background-dark/50 flex flex-col md:flex-row items-center gap-8 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 relative">
          <Image 
            src="/images/avatar_jrm.png" 
            alt="Lead Architect JRM" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 z-10">
          <div>
            <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wide">
              {t("Lead Architect", "लीड आर्किटेक्ट", "प्रधान वास्तुकारः")}
            </span>
            <h2 className="text-white font-display text-2xl md:text-3xl font-bold mt-2">JRM (Jawahar R Mallah)</h2>
          </div>
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl font-body">
            {t(
              "A software technologist with 19+ years of deep engineering experience (2007–present), JRM has architected enterprise-grade systems across POS, ERP, and Accounting. As the Founder of AITDL, his parallel study of Educational Software mirrors ancient algorithmic sutras computationally optimal for tomorrow's AI.",
              "19+ वर्षों के गहरे इंजीनियरिंग अनुभव वाले सॉफ्टवेयर प्रौद्योगिकीविद्, जेआरएम ने पीओएस, ईआरपी और अकाउंटिंग में उन्नत सिस्टम डिजाइन किए हैं। एआई टीडीएल के संस्थापक के रूप में, उनका अध्ययन प्राचीन एल्गोरिदम को भविष्य की एआई के लिए इष्टतम मानता है।",
              "19+ वर्षाणां अनुभवयुक्तः तन्त्रज्ञान विशेषज्ञः, जेआरएम महोदयः पीओएस ईआरपी इत्यादि व्यवस्था प्रबन्धनम् कृतवान्।"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
