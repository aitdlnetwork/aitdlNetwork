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

interface PostContent {
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  icon: string;
  image: string;
  keywords: string[];
  content: { h2: string; p: string }[];
}

export default function BlogPostClient({ postData }: { postData: Record<string, PostContent> }) {
  const { language } = useI18n();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  
  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const post = postData[language] || postData['en'] || Object.values(postData)[0];

  if (!post) {
    notFound();
  }

  const t = (en: string, hi: string, sa: string) => {
    if (language === 'hi') return hi;
    if (language === 'sa') return sa;
    return en;
  };

  // Cinematic Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "author": {
      "@type": "Person",
      "name": "Jawahar R Mallah",
      "url": "https://aitdl.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AITDL Network",
      "logo": {
        "@type": "ImageObject",
        "url": "https://aitdl.in/logo.png"
      }
    },
    "datePublished": post.date,
    "inLanguage": language,
    "keywords": post.keywords.join(", "),
    "articleSection": post.category
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Cinematic Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

    <div className="min-h-screen pt-32 pb-24 bg-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Cinematic Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_15px_rgba(13,227,242,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="w-full max-w-[900px] mx-auto px-6 relative z-10">
        {/* Navigation Context */}
        <div className="mb-12 animate-fade-in">
          <Link href="/blog" className="inline-flex items-center gap-3 text-slate-500 font-display font-black text-[10px] tracking-[0.2em] uppercase hover:text-primary transition-all group">
            <div className="size-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">west</span>
            </div>
            {t("Back to Knowledge Base", "ज्ञान केंद्र पर वापस", "ज्ञान-केन्द्रं प्रति गच्छतु")}
          </Link>
        </div>

        {/* Cinematic Header Section */}
        <div className="mb-16 animate-fade-in group">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-display font-black tracking-widest uppercase">
              {post.category}
            </span>
            <div className="size-1 rounded-full bg-slate-700"></div>
            <span className="text-slate-500 text-[10px] font-display font-black tracking-widest uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {post.readTime}
            </span>
          </div>

          <h1 className="text-white font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-10">
            <span className="text-gradient inline-block">{post.title}</span>
          </h1>

          <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center text-background-dark font-display font-black text-xl shadow-lg shadow-primary/20 rotate-3">
              J
            </div>
            <div className="flex flex-col">
              <span className="text-white text-lg font-display font-bold">Jawahar R Mallah</span>
              <span className="text-slate-500 text-xs font-display font-bold uppercase tracking-widest">{post.date}</span>
            </div>
          </div>
        </div>

        {/* Cinematic Hero */}
        <div className="mb-20 relative group/hero animate-fade-in">
          <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl opacity-0 group-hover/hero:opacity-50 transition-all duration-1000 animate-pulse-slow"></div>
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-background-dark/50 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
          </div>
        </div>

        {/* Deep Content Body */}
        <div className="flex flex-col gap-16 mb-24 max-w-[800px] mx-auto">
          {post.content.map((section, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-6 animate-slide-up group/section"
              style={{ animationDelay: `${0.1 * idx}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="w-1.5 h-12 bg-primary/20 rounded-full group-hover/section:bg-primary transition-all duration-700"></div>
                <h2 className="text-white font-display font-bold text-3xl md:text-4xl leading-tight group-hover/section:translate-x-2 transition-transform duration-500 text-gradient-primary">
                  {section.h2}
                </h2>
              </div>
              <p className="text-slate-300 text-xl font-body leading-relaxed md:leading-[1.8] pl-8 border-l border-white/5">
                {section.p}
              </p>
            </div>
          ))}
        </div>

        {/* Global Node Call-to-Action */}
        <div className="glass-premium p-12 md:p-16 rounded-[3rem] border border-white/10 bg-background-dark/50 relative overflow-hidden group animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-white font-display font-bold text-3xl md:text-4xl">{t("Ready to Scale?", "स्केल करने के लिए तैयार हैं?", "व्याप्तये उद्यताः किम्?") }</h3>
              <p className="text-slate-400 text-lg font-body max-w-md">Connect with us to deploy these sovereign architectures at your institution.</p>
            </div>
            <Link href="/contact" className="w-full md:w-auto px-12 py-6 rounded-2xl bg-primary text-background-dark font-display font-black text-sm tracking-[0.2em] uppercase hover:translate-y-[-4px] active:scale-95 transition-all shadow-[0_0_40px_rgba(13,227,242,0.3)] text-center">
              Partner Now
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
