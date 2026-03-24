/*
AITDL Network © 2026 | Vikram Samvat 2083
Designed & Architected by JRM
*/

'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const servicesData: Record<string, {
  title: string;
  category: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  techStack: string[];
}> = {
  "edtech-ecosystems": {
    title: "EdTech & LMS Ecosystems",
    category: "Education",
    description: "Multi-tenant learning platforms featuring virtual live classrooms, automated grading pipelines, and interactive student engagement engines designed to scale learning.",
    icon: "school",
    features: [
      "Auto-Grader & Quiz Pipelines",
      "Live Class Stream Integration",
      "Parent Dashboard Reporting",
      "Performance AI Analytics",
      "Multi-Branch Staff Management",
      "Offline Student Notes Sync setups"
    ],
    benefits: [
      "Reduce teacher overhead by 40%",
      "Scale up to 10k concurrent students",
      "Unified compliance with Indian standards"
    ],
    techStack: ["React", "WebRTC", "PostgreSQL", "Node.js"]
  },
  "pos-retail": {
    title: "POS & Retail Billing Software",
    category: "Retail",
    description: "Fast-deployment barcode scanners, live continuous inventory syncing across centers, and offline-compatible fallback desktop pipelines designed for high-traffic operations.",
    icon: "shopping_cart",
    features: [
      "GST billing & Auto Invoicing",
      "Multi-Branch Inventory Sync",
      "Offline Mode Synchronization",
      "Customer Loyalty Program hooks",
      "Digital Wallet & UPI Integration",
      "Dynamic Discount Trigger Rules"
    ],
    benefits: [
      "Checkout speeds boosted by 60%",
      "Prevent inventory leakages",
      "End-to-end accounting automation"
    ],
    techStack: ["Next.js", "Electron", "SQLite", "GraphQL"]
  },
  "academic-automation": {
    title: "Academic Automation Systems",
    category: "Institutional",
    description: "Targeted digitisation pipelines handling accurate multi-cycle schedule builders, secure grade sheet issuance, and comprehensive administrative portal overrides properly governed.",
    icon: "account_balance",
    features: [
      "Admissions & ERP Pipelines",
      "Grade Issuance Framework",
      "Automatic Timetable Builders",
      "Library Book Micro-tracking"
    ],
    benefits: [
      "Go 100% paperless administration",
      "Eliminate response bottlenecks",
      "Accurate compliance documentation"
    ],
    techStack: ["Nest.js", "React", "Docker", "S3"]
  },
  "enterprise-cloud": {
    title: "Enterprise Cloud & Infrastructure",
    category: "DevOps",
    description: "High-available infrastructure setup with transparent load-balancing proxies, multi-region database replicates, and encrypted cold storage hooks setup securely fully managed.",
    icon: "cloud",
    features: [
      "Transparent Auto-scalers",
      "DDoS & Web Application Firewall",
      "Encrypted Cold Backup Vaults",
      "Global CDN Edge Caching"
    ],
    benefits: [
      "Guaranteed 99.99% system uptime",
      "Strict data privacy regulations",
      "Sub-100ms globally API latency"
    ],
    techStack: ["AWS", "Terraform", "Kubernetes", "Redis"]
  },
  "real-estate-erp": {
    title: "Real Estate & Property Management",
    category: "ERP",
    description: "Cloud ERP tailored for developers handling online payment locks, transparent ticketing frameworks for modern tenants, and building security automated setups connected properly overviewed.",
    icon: "real_estate_agent",
    features: [
      "Tenant Support Ticket boards",
      "Payment Lease setup hooks",
      "Maintenance Alert dispatch",
      "Legal documents contract vaults"
    ],
    benefits: [
      "Accelerate rent collection",
      "Streamline vendor operations",
      "Boost tenant retention rates"
    ],
    techStack: ["Next.js", "Tailwind", "Supabase", "Stripe"]
  },
  "ngo-society": {
    title: "NGO & Housing Society portals",
    category: "Non-Profit",
    description: "Transparent portal setups targeting donation lock streams routing, compliance auditing dispatch fully logged and secure member voting dashboards structured governed.",
    icon: "diversity_3",
    features: [
      "Auditable Donation streams",
      "Compliance Report dispatch",
      "Member digital voting hooks",
      "Asset Maintenance boards"
    ],
    benefits: [
      "Full transparency compliance",
      "Enhance member trust metrics",
      "Automated tax receipt issuance"
    ],
    techStack: ["SvelteKit", "Node.js", "Prisma", "MySQL"]
  },
  "adaptive-ai": {
    title: "Adaptive AI Self-Learning Engine",
    category: "Artificial Intelligence",
    description: "Advanced deep learning hooks generating itemized personalized study tracks dynamically tuned using feedback loops adjusting accurate pacing speed correctly tuned properly structured viewable.",
    icon: "psychology",
    features: [
      "Personalised Study Roadmaps",
      "Weakness detection feedback",
      "Pacing speed adjustments",
      "AI Knowledge graph mapping"
    ],
    benefits: [
      "Personalized learning indexing",
      "Boost scores by 25% avg",
      "Accurate feedback loop streams"
    ],
    techStack: ["Python", "PyTorch", "FastAPI", "Next.js"]
  },
  "healthcare-clinic": {
    title: "Healthcare & Clinic Management",
    category: "Healthcare",
    description: "Secure, ABHA aligned outpatient logs tracking, pharmacy lock bills dispatch frameworks and secure diagnostic labs reports stream viewers connected fully overviewed safely setup indexed.",
    icon: "medical_services",
    features: [
      "ABHA framework compliant EMR",
      "Pharmacy Invoice triggers",
      "WhatsApp Report forwards",
      "OPD Queue Board displays"
    ],
    benefits: [
      "HIPAA guidelines compliance",
      "Reduce queue lines layout Wait",
      "Clear pharmacy stock tracking"
    ],
    techStack: ["Angular", "Spring Boot", "PostgreSQL", "Kafka"]
  },
  "gym-fitness": {
    title: "Gym & Fitness Management",
    category: "Fitness",
    description: "Automated direct debit setups, membership access logs, and visual workout calendars addressing community reporting fully overviewed statically.",
    icon: "fitness_center",
    features: [
      "Membership Management",
      "Automated Fee Triggers",
      "Trainer Booking Calendar",
      "Diet Plan Distribution"
    ],
    benefits: [
      "Reduce payment defaults by 35%",
      "Smooth member check-ins",
      "Boost renewal metrics effectively"
    ],
    techStack: ["React", "Node.js", "MySQL", "Razorpay"]
  },
  "hiking-trekking": {
    title: "Hiking & Trekking Management",
    category: "Outdoor",
    description: "Equipments booking tracking frames inventory lockers, safety alert dispatch setups itemized accurately overviewed safely setup indexed statically.",
    icon: "terrain",
    features: [
      "Online Booking/Slating",
      "Equipment Rentals Tracker",
      "Safety Alert broadcast",
      "Guide Batch Allocation",
      "Offline GPS Tracker Mapping",
      "Emergency SOS Broadcast Grids"
    ],
    benefits: [
      "Streamline peak-season bookings",
      "Automated safety checklist logs",
      "Efficient inventory rotation"
    ],
    techStack: ["Next.js", "Tailwind", "Supabase", "Twilio"]
  }
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const service = servicesData[slug];
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const faqs = [
    { q: "Do you provide offline syncing fallback frames?", a: "Yes, our systems include local-first buffering triggers that synchronise to sovereign clouds automatically on restoration." },
    { q: "Is operator training or setup assistance included?", a: "All setups include full administration setup training guidelines and comprehensive onboarding support setup hooks." },
    { q: "Can we customize standard reporting templates?", a: "Yes, every dashboard is designed for absolute modular flexibility tailored for regional operational requirements." }
  ];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      {/* FAQ Structured Data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
      {/* Back button */}
      <div className="mb-8">
        <Link href="/services" className="text-primary flex items-center gap-2 hover:underline text-sm font-display font-bold">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Services
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        {/* Header content */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wide">
              {service.category}
            </span>
            <h1 className="text-white font-display text-4xl md:text-5xl font-bold mt-2 leading-tight">
              {service.title}
            </h1>
          </div>
          <p className="text-muted text-lg font-body leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {service.techStack.map((tech, index) => (
              <span key={index} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-400 text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-background-dark font-display font-semibold text-[15px]">
              Get Free Demo
            </Link>
          </div>
        </div>

        {/* Features Card list */}
        <div className="glass-card p-8 rounded-2xl flex flex-col gap-6 border-t-2 border-t-primary/20">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">{service.icon}</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white">Core Modules & Features</h3>
          <ul className="flex flex-col gap-3">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-muted text-sm md:text-base">
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="glass-card p-8 rounded-xl border border-white/5 bg-background-dark/30 mb-12">
        <h3 className="font-display font-bold text-2xl text-white mb-6 text-center">Value Deliverables</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-start gap-4">
              <div className="size-8 rounded-md bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] flex-shrink-0">
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto w-full mt-12 mb-8">
        <h3 className="font-display font-bold text-2xl text-white mb-6 text-center">Frequently Asked Questions</h3>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl border border-white/5 bg-background-dark/20">
              <button 
                className="w-full flex items-center justify-between text-left text-white font-display font-semibold text-base group"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary' : 'text-slate-500 group-hover:text-primary'}`}>
                  expand_more
                </span>
              </button>
              {openFaq === idx && (
                <p className="mt-3 text-sm text-slate-400 font-body leading-relaxed animate-fade-in pr-8">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
