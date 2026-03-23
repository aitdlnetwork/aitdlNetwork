// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

const projectData: Record<string, { title: string; category: string; description: string; challenge: string; solution: string; tags: string[]; image: string }> = {
  "crm-dashboard": {
    title: "CRM Dashboard",
    category: "React / Node",
    description: "An enterprise-grade customer relationship management system with live analytics and automated lead tracking.",
    challenge: "Managing sales pipelines with legacy tools led to high lead leakage and delayed response times for representatives.",
    solution: "We designed a unified dashboard utilizing WebSockets for live feed updates, modular reporting structures, and automated follow-up triggers.",
    tags: ["React", "Node.js", "WebSockets", "Material UI"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw2m2_Pkj6zhWdWc6XJi3XWk-nHBOQ90DYAZHbW1LUKIzrPgS3O8wJPKoKZfd2WtZ0lsnNdz1CfqrLG-zCnBqT5353hOHPxXCwBe0LNS-CYXE27bkEBj7NHEozdCRO4l6XTlKW6mLpmtzOr_xBlpZuAWvab93CPXgmDCJMZLbqkbCloyL0I7oeepm2G0lJdqG49aTx7zPwVg-d6WlZ1JvrnHMzwqwG7_hu2nfWS8PyWPgyZ84g4UBWUIu29fSewr07Slj5oq9fIemb"
  },
  "ai-chatbot": {
    title: "AI Chatbot System",
    category: "OpenAI / Python",
    description: "An intelligent support automated agent providing real-time queries answering with NLP tuning.",
    challenge: "Handling 10,000+ support tickets monthly with manually managed support desks creates unsustainable overhead costs.",
    solution: "Leveraged OpenAI LLM sets coupled with Pinecone vector DB queries for addressing domain-matched company document context reads fully automated.",
    tags: ["Python", "LangChain", "OpenAI", "Pinecone"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXyJyeiGllX44WNldXAVq28fK6EYB7uPocRxQanCwMTYzSz52Z7shCTQiVKc2OR14v4iGL6KrYQwn2ele-RR7vIThkKkYLpa-IY99GohqPf48-ytm4uOO1idNF2a7pqJyBkGo7StMCkFF8KpG2WEhdSEouq5iWynEwYZZbd_ys2PPaivaBYqTUfS2JmUe9l1AgudgCwc1SXyhkpDw-B9RnTRe05xP95jYpze2VHRiSM2tsYDfXQNypof24Y93tUPhN6ASCJcVjImLO"
  },
  "business-website": {
    title: "Business Website",
    category: "Next.js / Tailwind",
    description: "High-conversion SEO optimized corporate workspace tailored for branding excellence.",
    challenge: "Original static pages loaded slowly and failed to rank across SERP results, missing organic client acquisitions effectively.",
    solution: "Built on Next.js setup combining Static Route generations for speed rendering coupled with Server-Side rendering for dynamic feeds hydration correctly.",
    tags: ["Next.js", "Tailwind CSS", "SEO", "Vercel"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDzgZo0MA17uNkR0SuzziuBW7ZbA2X0mzm3hz34EL4lTMMhYg_xx7KkmBO0XHIniYcC7uDs96S2s7cWQmCr8wq7qQ6baiYUXEO7bNFiWS8IdSF7XyLUAdQExxf0W3_MlPjr3HvBQZxrYnAI_SfNzlkdErInzaihW1F2cuXASC_bchQ2C0dAtZfRLzOBFD2_pKdwdrkNX1qi2Treqz2vOPf5jnsQYL-QdRI2rUBhE_AWA5R4daAfv-SnhtMMHeAijmEosvU5whmx1Vc"
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'crm-dashboard' },
    { slug: 'ai-chatbot' },
    { slug: 'business-website' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectData[slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <div className="mb-8">
        <Link href="/portfolio" className="text-primary flex items-center gap-2 hover:underline text-sm font-display font-bold">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Portfolio
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        {/* Project Thumbnail */}
        <div className="glass-card rounded-2xl overflow-hidden aspect-video border border-white/5 relative group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{backgroundImage: `url('${project.image}')`}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Project Meta Details */}
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
        {/* Challenge */}
        <div className="glass-card p-8 rounded-xl flex flex-col gap-4 border-t-2 border-t-red-500/20">
          <div className="size-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white">The Challenge</h3>
          <p className="text-muted text-sm md:text-base leading-relaxed">
            {project.challenge}
          </p>
        </div>

        {/* Solution */}
        <div className="glass-card p-8 rounded-xl flex flex-col gap-4 border-t-2 border-t-[#00FF9D]/20">
          <div className="size-10 rounded-lg bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D]">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white">The Solution</h3>
          <p className="text-muted text-sm md:text-base leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>
    </div>
  );
}
