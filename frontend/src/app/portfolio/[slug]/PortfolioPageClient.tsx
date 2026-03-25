/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

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
    <div className="min-h-screen pt-32 pb-24 bg-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link href="/portfolio" className="inline-flex items-center gap-3 text-slate-500 font-display font-black text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-all group">
            <div className="size-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">west</span>
            </div>
            {t("Back to Portfolio Fleet", "पोर्टफोलियो पर वापस", "पोर्टफोलियो प्रति गमनम्")}
          </Link>
        </div>

        {/* Project Header & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-display font-black tracking-widest uppercase">
                {project.category}
              </span>
              <div className="size-1 rounded-full bg-slate-700"></div>
              <span className="text-slate-500 text-[10px] font-display font-black tracking-widest uppercase">DEPLOYED NODE • 2026</span>
            </div>
            
            <h1 className="text-white font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gradient inline-block">{project.title}</span>
            </h1>
            
            <p className="text-slate-400 text-xl font-body leading-relaxed max-w-xl border-l-2 border-primary/20 pl-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-500 text-[10px] font-display font-black tracking-wider uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative group/hero">
            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover/hero:opacity-50 transition-all duration-1000 animate-pulse-slow"></div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-background-dark/50 shadow-2xl">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Challenge & Solution Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div className="glass-premium p-10 rounded-[2.5rem] border border-white/5 bg-background-dark/30 flex flex-col gap-6 group hover:border-red-500/30 transition-all duration-500 animate-slide-up">
            <div className="size-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 group-hover:bg-red-500 group-hover:text-background-dark transition-all duration-500">
              <span className="material-symbols-outlined text-3xl">error_outline</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">{t("The Growth Blocker", "चुनौती", "समस्या")}</h3>
            <p className="text-slate-400 text-lg font-body leading-relaxed">{project.challenge}</p>
          </div>

          <div className="glass-premium p-10 rounded-[2.5rem] border border-white/5 bg-background-dark/30 flex flex-col gap-6 group hover:border-[#00FF9D]/30 transition-all duration-500 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="size-14 rounded-2xl bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] border border-[#00FF9D]/20 group-hover:bg-[#00FF9D] group-hover:text-background-dark transition-all duration-500">
              <span className="material-symbols-outlined text-3xl">terminal</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">{t("Sovereign Solution", "समाधान", "समाधानम्")}</h3>
            <p className="text-slate-400 text-lg font-body leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Detailed Intelligence Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-24">
          <div className="lg:col-span-2 glass-premium p-12 rounded-[3rem] border border-white/10 bg-background-dark/50 animate-fade-in">
            <h3 className="font-display font-bold text-3xl text-white mb-10 tracking-tight flex items-center gap-4">
              <span className="size-3 rounded-full bg-primary animate-pulse"></span>
              {t("Technical Architecture", "टेक अवयव", "विशेषता च")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                    <span className="material-symbols-outlined text-lg">memory</span>
                  </div>
                  <p className="text-slate-300 text-sm font-body leading-relaxed">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-premium p-12 rounded-[3rem] border border-white/10 bg-background-dark/50 flex flex-col gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/20 text-[#00FF9D] font-display font-black text-[10px] tracking-[0.2em] uppercase w-fit">
              IMPACT METRICS
            </div>
            <div className="flex flex-col gap-6">
              {project.results.map((res, idx) => (
                <div key={idx} className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#00FF9D]/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-6 rounded-full bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D]">
                      <span className="material-symbols-outlined text-xs">analytics</span>
                    </div>
                    <span className="text-[10px] font-display font-black text-slate-500 tracking-widest uppercase">MEASURED OUTCOME</span>
                  </div>
                  <p className="text-white text-lg font-display font-bold leading-tight">{res}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
