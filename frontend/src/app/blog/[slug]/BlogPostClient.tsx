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
  content: { h2: string; p: string }[];
}

export default function BlogPostClient({ postData }: { postData: Record<string, PostContent> }) {
  const { language } = useI18n();
  
  if (!postData) {
    notFound();
  }

  const post = postData[language] || postData['en'];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link href="/blog" className="text-primary flex items-center gap-2 hover:underline text-sm font-display font-bold">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Blog
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-10 border-b border-white/5 pb-8">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold">
            {post.category}
          </span>
          <span className="text-slate-500 text-xs font-body flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {post.readTime}
          </span>
        </div>
        <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold font-heading mt-2 leading-tight">
          {post.title}
        </h1>
        <p className="text-slate-400 text-sm font-body mt-2">Published on {post.date}</p>
      </div>

      {/* Content Sections */}
      <div className="flex flex-col gap-8 mb-16">
        {post.content.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <h2 className="text-white font-display font-semibold text-xl md:text-2xl mt-4">
              {section.h2}
            </h2>
            <p className="text-slate-300 text-base font-body leading-relaxed">
              {section.p}
            </p>
          </div>
        ))}
      </div>

      {/* Author/Footer */}
      <div className="glass-card p-6 rounded-2xl border border-white/5 bg-background-dark/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-display font-bold shadow-sm">
            J
          </div>
          <div>
            <h4 className="text-white font-display font-bold text-sm">Architected by JRM</h4>
            <p className="text-slate-500 text-xs font-body">Deep Learning & Enterprise Scalability</p>
          </div>
        </div>
        <Link href="/contact" className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold hover:bg-primary hover:text-background-dark transition-all">
          Discuss Solutions
        </Link>
      </div>
    </div>
  );
}
