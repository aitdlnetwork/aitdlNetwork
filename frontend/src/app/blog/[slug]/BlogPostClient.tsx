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

      <div className="flex-1 w-full max-w-[800px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative">
        {/* Back to Blog */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <Link href="/blog" className="text-slate-400 flex items-center gap-2 hover:text-primary transition-colors text-sm font-display font-medium group">
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span> 
            Back to Knowledge Centre
          </Link>
        </div>

        {/* Hero Image */}
        <div className="mb-12 relative group animate-fade-in" style={{ animationDelay: '150ms' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-16 border-b border-white/5 pb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-display font-bold tracking-widest uppercase">
              {post.category}
            </span>
            <span className="text-slate-500 text-[11px] font-body flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {post.readTime}
            </span>
          </div>
          <h1 className="text-white font-display text-4xl md:text-5xl lg:text-6xl font-bold font-heading mt-4 leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display font-bold border border-primary/30">
              J
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-display font-bold">Jawahar R Mallah</span>
              <span className="text-slate-500 text-xs font-body">{post.date}</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-12 mb-20">
          {post.content.map((section, idx) => (
            <div 
              key={idx} 
              className="flex flex-col gap-4 animate-fade-in-up group"
              style={{ animationDelay: `${300 + (idx * 100)}ms` }}
            >
              <h2 className="text-white font-display font-bold text-2xl md:text-3xl mt-4 group-hover:text-primary transition-colors duration-300">
                {section.h2}
              </h2>
              <div className="h-1 w-12 bg-primary/20 group-hover:w-20 group-hover:bg-primary/50 transition-all duration-500 rounded-full"></div>
              <p className="text-slate-300 text-lg font-body leading-relaxed md:leading-loose">
                {section.p}
              </p>
            </div>
          ))}
        </div>

        {/* Cinematic Author/Footer Card */}
        <div className="glass-card p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-background-dark/40 to-primary/5 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center gap-6">
            <div className="size-20 rounded-2xl bg-gradient-to-tr from-primary to-primary/50 flex items-center justify-center text-background-dark text-3xl font-display font-black shadow-xl rotate-3">
              A
            </div>
            <div>
              <h4 className="text-white font-display font-bold text-xl mb-1">Architected by AITDL</h4>
              <p className="text-slate-400 text-sm font-body max-w-md">Engineering secure, sovereign software architectures for the next generation of Indian enterprise.</p>
            </div>
          </div>
          <Link href="/contact" className="w-full md:w-auto px-8 py-4 rounded-xl bg-primary text-background-dark text-sm font-display font-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
            Partner With Us
          </Link>
        </div>
      </div>
    </>
  );
}
