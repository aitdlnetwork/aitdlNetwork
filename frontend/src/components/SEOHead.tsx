"use client";

import { useEffect } from 'react';

const pageMeta: Record<string, { title: string; description: string; canonical: string }> = {
  '/': {
    title: 'AITDL Network – School Management & Coaching LMS Software India',
    description: 'AITDL Network provides school management software, coaching institute LMS, POS billing, and AI-powered EdTech platforms across India. Free demo available.',
    canonical: 'https://aitdl.in/',
  },
  '/about': {
    title: 'About AITDL Network | 19+ Years Enterprise Software Expertise',
    description: 'Meet JRM (Jawahar R Mallah), founder of AITDL Network. 19+ years architecting POS, ERP and EdTech systems across India from Mumbai and Gorakhpur.',
    canonical: 'https://aitdl.in/about',
  },
  '/services': {
    title: 'EdTech LMS, School Software & POS Solutions | AITDL Network',
    description: "Explore AITDL Network's full suite: EdTech ecosystems, coaching LMS, POS billing, gym management, NGO portals and adaptive AI learning for Indian businesses.",
    canonical: 'https://aitdl.in/services',
  },
  '/portfolio': {
    title: 'Deployed Projects & Client Systems | AITDL Network Portfolio',
    description: 'View live deployments by AITDL Network — school management systems, coaching software, retail POS and more across India.',
    canonical: 'https://aitdl.in/portfolio',
  },
  '/blog': {
    title: 'EdTech & Business Software Insights | AITDL Network Blog',
    description: 'Deep dives into school software selection, GST billing for Indian retailers, and sovereign AI infrastructure for enterprise growth.',
    canonical: 'https://aitdl.in/blog',
  },
  '/contact': {
    title: 'Contact AITDL Network | Mumbai & Gorakhpur Office',
    description: 'Get in touch with AITDL Network for a free demo of our EdTech LMS, school management or POS billing software. Offices in Mumbai and Gorakhpur, UP.',
    canonical: 'https://aitdl.in/contact',
  },
  '/gorakhpur': {
    title: 'AITDL Network Gorakhpur – School & Coaching Software Uttar Pradesh',
    description: "AITDL Network's Gorakhpur node serves schools, coaching institutes and businesses in Uttar Pradesh with LMS, fee management and POS systems.",
    canonical: 'https://aitdl.in/gorakhpur',
  },
};

interface SEOHeadProps {
  path: string;
  customTitle?: string;
  customDescription?: string;
}

export default function SEOHead({ path, customTitle, customDescription }: SEOHeadProps) {
  const meta = pageMeta[path] || pageMeta['/'];
  const title = customTitle || meta.title;
  const description = customDescription || meta.description;
  const canonical = meta.canonical;

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setCanonical(canonical);
  }, [path, title, description, canonical]);

  return null;
}

function setMeta(name: string, content: string, attr: string = 'name') {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
