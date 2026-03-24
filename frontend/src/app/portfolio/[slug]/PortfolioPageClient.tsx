'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nContext';

const projectData: Record<string, Record<string, { 
  title: string; 
  category: string; 
  description: string; 
  challenge: string; 
  solution: string; 
  tags: string[]; 
  image: string;
  results: string[];
  features: string[];
}>> = {
  "crm-dashboard": {
    en: {
      title: "CRM Dashboard",
      category: "React / Node",
      description: "An enterprise-grade customer relationship management system with live analytics.",
      challenge: "Managing sales pipelines with legacy tools led to high lead leakage and delayed response times.",
      solution: "We designed a unified dashboard utilizing WebSockets for live feed updates.",
      tags: ["React", "Node.js", "WebSockets"],
      image: "/images/portfolio_crm.png",
      results: ["No more lead leakages", "Response times dropped from 24h to 1h", "Unified pipeline analytics"],
      features: ["Live lead tracker overview charts", "Dynamic follow-up pipeline trigger loops", "Role-based node access"]
    },
    hi: {
      title: "सीआरएम डैशबोर्ड",
      category: "रिएक्ट / नोड",
      description: "लाइव एनालिटिक्स और स्वचालित लीड ट्रैकिंग के साथ एक उद्यम-ग्रेड ग्राहक संबंध प्रबंधन प्रणाली।",
      challenge: "विरासत उपकरणों के साथ बिक्री पाइपलाइनों का प्रबंधन करने से उच्च लीड रिसाव हुआ।",
      solution: "हमने लाइव फीड अपडेट के लिए वेबसोकेट्स का उपयोग करके एक एकीकृत डैशबोर्ड डिजाइन किया।",
      tags: ["React", "Node.js", "WebSockets"],
      image: "/images/portfolio_crm.png",
      results: ["कोई लीड रिसाव नहीं", "प्रतिक्रिया समय 24 घंटे से घटकर 1 घंटा हो गया", "एकीकृत पाइपलाइन एनालिटिक्स"],
      features: ["लाइव लीड ट्रैकर ओवरव्यू चार्ट", "डायनामिक फॉलो-अप पाइपलाइन", "भूमिका-आधारित पहुंच"]
    },
    sa: {
      title: "सीआरएम डैशबोर्डम्",
      category: "रिएक्ट / नोड",
      description: "सीआरएम प्रबन्धनार्थं व्यवस्था।",
      challenge: "पूर्व व्यवस्थायां बाधा अस्ति।",
      solution: "वयं एकीकृत डैशबोर्ड निर्माणम् कृतवान्।",
      tags: ["React", "Node.js", "WebSockets"],
      image: "/images/portfolio_crm.png",
      results: ["बाधा निवारणम्", "समय रक्षणम्", "एकीकृत प्रबन्धनम्"],
      features: ["लाइव ट्रैकर", "डायनामिक पाइपलाइन", "भूमिका आधारित प्रवेश"]
    }
  },
  "ai-chatbot": {
    en: {
      title: "AI Chatbot System",
      category: "OpenAI / Python",
      description: "An intelligent support automated agent providing real-time queries answering with NLP.",
      challenge: "Handling 10,000+ support tickets monthly with manual desks creates unsustainable overhead costs.",
      solution: "Leveraged OpenAI LLM sets coupled with Pinecone vector DB queries for static document reads.",
      tags: ["Python", "LangChain", "OpenAI"],
      image: "/images/portfolio_chatbot.png",
      results: ["Supports 85% tickets resolution without human", "Decreased support desk overhead by 50%"],
      features: ["RAG indexed documentation", "Auto human-takeover ticket fallback", "Continuous NLP tuning"]
    },
    hi: {
      title: "एआई चैटबॉट सिस्टम",
      category: "OpenAI / पाइथन",
      description: "एक बुद्धिमान समर्थन स्वचालित एजेंट जो एनएलपी के साथ वास्तविक समय के प्रश्नों का उत्तर देता है।",
      challenge: "मैन्युअल डेस्क के साथ मासिक 10,000+ टिकटों को संभालना टिकाऊ नहीं था।",
      solution: "ओपनएआई एलएलएम और पाइनकोन वेक्टर डीबी का उपयोग किया।",
      tags: ["Python", "LangChain", "OpenAI"],
      image: "/images/portfolio_chatbot.png",
      results: ["85% टिकट समाधान बिना मानव के", "ओवरहेड लागत 50% कम हुई"],
      features: ["आरएजी अनुक्रमित प्रलेखन", "ऑटो मानव-टेकओवर टिकट", "निरंतर एनएलपी ट्यूनिंग"]
    },
    sa: {
      title: "एआई चैटबॉट तन्त्रम्",
      category: "कृत्रिम बुद्धिमत्ता",
      description: "स्वचालित सहायिका व्यवस्था।",
      challenge: "अधिक संख्यायां टिकट प्रबन्धनम् कठिनम्।",
      solution: "विवेक तन्त्र प्रयोगम् कृतवान्।",
      tags: ["Python", "LangChain", "OpenAI"],
      image: "/images/portfolio_chatbot.png",
      results: ["85% समाधान स्वतः", "लागत निवारणम् 50%"],
      features: ["दस्तावेज़ प्रलेखन", "ऑटो-टेकओवर", "निरंतर ट्यूनिंग"]
    }
  },
  "business-website": {
    en: {
      title: "Business Website",
      category: "Next.js / Tailwind",
      description: "High-conversion SEO optimized corporate workspace tailored for branding.",
      challenge: "Original static pages loaded slowly and failed to rank across SERP results.",
      solution: "Built on Next.js setup combining Static Route generations for speed rendering.",
      tags: ["Next.js", "Tailwind CSS", "SEO"],
      image: "/images/portfolio_business.png",
      results: ["Lighthouse benchmarks hit 98% avg", "Organic SEO traffic up +200%"],
      features: ["Static pages generation fallback", "Tailwind pure speed layout", "Clean metadata tagging"]
    },
    hi: {
      title: "व्यावसायिक वेबसाइट",
      category: "Next.js / Tailwind",
      description: "ब्रांडिंग उत्कृष्टता के लिए तैयार हाई-कनवर्जन एसईओ अनुकूलित कॉर्पोरेट वर्कस्पेस।",
      challenge: "मूल स्थिर पृष्ठ धीरे-धीरे लोड होते थे और एसईआरपी परिणामों में रैंक करने में विफल रहे।",
      solution: "गति प्रतिपादन के लिए स्टेटिक रूट जनरेशन को मिलाकर नेक्स्ट.जेएस पर बनाया गया।",
      tags: ["Next.js", "Tailwind CSS", "SEO"],
      image: "/images/portfolio_business.png",
      results: ["लाइटहाउस बेंचमार्क 98% औसत", "ऑर्गेनिक एसईओ ट्रैफिक +200% ऊपर"],
      features: ["स्टेटिक पेज जनरेशन", "टेलविंड शुद्ध गति लेआउट", "स्वच्छ मेटाडेटा टैगिंग"]
    },
    sa: {
      title: "व्यावसायिक वेबसाइटम्",
      category: "Next.js / Tailwind",
      description: "विक्रय वर्धनार्थं उत्तम वेबसाइटम्।",
      challenge: "धीमी गति रैंकिंग समस्या।",
      solution: "नेक्स्ट.जेएस व्यवस्था प्रयोगम् कृतवान्।",
      tags: ["Next.js", "Tailwind CSS", "SEO"],
      image: "/images/portfolio_business.png",
      results: ["लाइटहाउस 98% उत्तम", "ट्रैफिक वृद्धि +200%"],
      features: ["स्टेटिक पृष्ठ निर्माणम्", "टेलविंड वेग गति", "मेटाडेटा टैगिंग"]
    }
  }
};

export default function PortfolioPageClient({ slug }: { slug: string }) {
  const { language } = useI18n();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const project = projectData[slug]?.[langKey] || projectData[slug]?.['en'];

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <div className="mb-8">
        <Link href="/portfolio" className="text-primary flex items-center gap-2 hover:underline text-sm font-display font-bold">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> {t("Back to Portfolio", "पोर्टफोलियो पर वापस", "पोर्टफोलियो प्रति गमनम्")}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        <div className="glass-card rounded-2xl overflow-hidden aspect-video border border-white/5 relative group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{backgroundImage: `url('${project.image}')`}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wide">
              {project.category}
            </span>
            <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-2 leading-tight">
              {project.title}
            </h1>
          </div>
          <p className="text-muted text-lg font-body leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-400 text-xs font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass-card p-8 rounded-xl flex flex-col gap-4 border-t-2 border-t-red-500/20">
          <div className="size-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white">{t("The Challenge", "चुनौती", "समस्या")}</h3>
          <p className="text-muted text-sm md:text-base leading-relaxed">{project.challenge}</p>
        </div>

        <div className="glass-card p-8 rounded-xl flex flex-col gap-4 border-t-2 border-t-[#00FF9D]/20">
          <div className="size-10 rounded-lg bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D]">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white">{t("The Solution", "समाधान", "समाधानम्")}</h3>
          <p className="text-muted text-sm md:text-base leading-relaxed">{project.solution}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-xl flex flex-col gap-5 border border-white/5">
          <h3 className="font-display font-bold text-xl text-white">{t("Deliverables & Tech Components", "डेलिवरेबल्स और टेक अवयव", "कार्य प्रबन्धनम् विशेषता च")}</h3>
          <ul className="flex flex-col gap-3">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 text-muted text-sm md:text-base">
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-8 rounded-xl border border-white/5 bg-background-dark/30">
          <div className="mb-4">
            <span className="px-3 py-1 rounded-md bg-[#00FF9D]/10 border border-[#00FF9D]/20 text-[#00FF9D] text-xs font-display font-bold tracking-wide">
              {t("Key KPIs & Value Metrics", "की केपीआई और मूल्य मेट्रिक्स", "मुख्य मेट्रिक्स")}
            </span>
          </div>
          <ul className="flex flex-col gap-4">
            {project.results.map((res, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-start gap-4">
                <div className="size-8 rounded-md bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] flex-shrink-0">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                </div>
                <p className="text-muted text-sm leading-relaxed">{res}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
