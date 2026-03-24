// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const projectData: Record<string, { 
  title: string; 
  category: string; 
  description: string; 
  challenge: string; 
  solution: string; 
  tags: string[]; 
  image: string;
  results: string[];
  features: string[];
}> = {
  "crm-dashboard": {
    title: "CRM Dashboard",
    category: "React / Node",
    description: "An enterprise-grade customer relationship management system with live analytics and automated lead tracking.",
    challenge: "Managing sales pipelines with legacy tools led to high lead leakage and delayed response times for representatives.",
    solution: "We designed a unified dashboard utilizing WebSockets for live feed updates, modular reporting structures, and automated follow-up triggers.",
    tags: ["React", "Node.js", "WebSockets", "Material UI"],
    image: "/images/portfolio_crm.png",
    results: [
      "No more lead leakages on support desk triggers",
      "Response times dropped from 24h setup to 1h average",
      "Unified pipeline analytics transparency boost",
      "SSO Securely federated backups synchronization loads",
      "Enterprise latency drop to sub-10ms latency buffers"
    ],
    features: [
      "Live lead tracker overview charts boards",
      "Offline compatibility synchronization",
      "Dynamic follow-up pipeline trigger loops",
      "Role-based node access controls setups",
      "Daily automated audit reports dispatch triggers",
      "Interactive analytics dashboard funnel streams"
    ]
  },
  "ai-chatbot": {
    title: "AI Chatbot System",
    category: "OpenAI / Python",
    description: "An intelligent support automated agent providing real-time queries answering with NLP tuning.",
    challenge: "Handling 10,000+ support tickets monthly with manually managed support desks creates unsustainable overhead costs.",
    solution: "Leveraged OpenAI LLM sets coupled with Pinecone vector DB queries for addressing domain-matched company document context reads fully automated.",
    tags: ["Python", "LangChain", "OpenAI", "Pinecone"],
    image: "/images/portfolio_chatbot.png",
    results: [
      "Supports 85% tickets resolution without human loop intervention",
      "Decreased support desk overhead dispatch costs by 50%",
      "Available 24/7 coverage sub-second query latency",
      "Multi-language sovereign model fallback support setup",
      "Zero-downtime scalability setups address allocations"
    ],
    features: [
      "RAG indexed company documentation vaults triggers",
      "Auto human-takeover ticket fallback loop dispatch",
      "Continuous NLP tuning triggers feedback dataset framing",
      "Continuous NLP tuning vectors synchronization setups",
      "Voice-to-text streams address allocations sets",
      "Fallback human routing automation dispatch triggers"
    ]
  },
  "business-website": {
    title: "Business Website",
    category: "Next.js / Tailwind",
    description: "High-conversion SEO optimized corporate workspace tailored for branding excellence.",
    challenge: "Original static pages loaded slowly and failed to rank across SERP results, missing organic client acquisitions effectively.",
    solution: "Built on Next.js setup combining Static Route generations for speed rendering coupled with Server-Side rendering for dynamic feeds hydration correctly.",
    tags: ["Next.js", "Tailwind CSS", "SEO", "Vercel"],
    image: "/images/portfolio_business.png",
    results: [
      "Lighthouse speeds performance benchmarks hit 98% avg scores",
      "Organic SEO traffic traffic multipliers up +200%",
      "Faster viewport hydrate times scale globally",
      "+200% Organic traffic trigger multipliers transparent",
      "100% Core Web Vitals score frames optimization rates"
    ],
    features: [
      "Static pages generation fallback configurations setup",
      "Tailwind pure speed layout triggers hydration framework",
      "Clean metadata tagging support index correctly",
      "A/B variant tests setup triggers dispatch pipelines",
      "CDN edge optimization static routers allocation",
      "Adaptive layout caching setups optimization setups"
    ]
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-xl flex flex-col gap-5 border border-white/5">
          <h3 className="font-display font-bold text-xl text-white">Deliverables & Tech Components</h3>
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
              Key KPIs & Value Metrics
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
