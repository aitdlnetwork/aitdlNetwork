/*
AITDL Network © 2026 | Vikram Samvat 2083
Designed & Architected by JRM
*/

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const blogPostsData: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  icon: string;
  content: { h2: string; p: string }[];
}> = {
  "choosing-lms-coaching-up": {
    title: "Selecting the Right LMS for Institutions in Uttar Pradesh",
    category: "EdTech",
    date: "March 24, 2026",
    readTime: "5 min read",
    description: "An absolute guide for coaching guides and institutions in Gorakhpur and Lucknow looking to digitize fee collection and student tracking safely.",
    icon: "school",
    content: [
      { h2: "The Digital Shift in North India", p: "Education hubs in UP like Gorakhpur are witnessing absolute demand for smart software supporting student tracking triggers statically. Instituion guides are shifting towards modular dashboards to manage workflows securely." },
      { h2: "Why Generic Tools Fail", p: "Standard global portals lack localized reporting setups designed for Indian standards benchmarks safely. Support queues should account for direct local dialect benchmarks accurately." },
      { h2: "Key Modules to Inspect", p: "When selecting systems, verify absolute support for GST invoice adjustments, multi-branch setups for franchises in Lucknow, and offline buffering triggers fallback nodes accurately." }
    ]
  },
  "gst-pos-retail-checklist": {
    title: "GST Invoicing Checklist in POS for Indian Retailers",
    category: "Retail",
    date: "March 23, 2026",
    readTime: "4 min read",
    description: "How to configure absolute barcode billing nodes compliant with Indian GST laws maintaining inventory sync safeguards statically.",
    icon: "shopping_cart",
    content: [
      { h2: "Absolute Compliance Nodes", p: "Ensure your billing setups support absolute HSN code mapping triggers addressing static indices securely. Standard POS triggers static invoice printing queues accurately." },
      { h2: "Peak-Season Syncing", p: "Peak shopping seasons demand absolute offline fallback framing buffers. Static synchronisations should synchronise directly with cloud queues on restorations instantly." }
    ]
  },
  "sovereign-ai-enterprise-security": {
    title: "Why Sovereign AI Nodes Matter for Enterprise Security",
    category: "AI & Security",
    date: "March 22, 2026",
    readTime: "6 min read",
    description: "Understanding data sandboxing and sovereign deep learning pipelines for secure enterprise knowledge architecture structures safely.",
    icon: "psychology",
    content: [
      { h2: "The Sovereign AI Advantage", p: "Data sandboxing enables absolute security triggers supporting local enterprise pipelines safely. Shared LLM setups pose absolute risk leaks benchmarks strictly." },
      { h2: "Architecture Integrity", p: "Sovereign nodes maintain absolute data ownership queues safely inside local region structures triggers securely." }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(blogPostsData).map((slug) => ({
    slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPostsData[params.slug];

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
