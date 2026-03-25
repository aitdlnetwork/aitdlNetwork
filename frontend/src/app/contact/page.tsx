/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import ContactClient from './ContactClient';

export const metadata: Metadata = generateSEO({
  title: "Contact AITDL — Smart School ERP & POS Solutions India",
  description: "Get a free demo for your coaching institute, school or retail business. Contact AITDL Network for custom ERP, LMS and AI software solutions.",
  path: "/contact",
  keywords: ["contact AITDL", "school software demo", "coaching software pricing", "POS billing demo"]
});

export default function ContactPage() {
  return <ContactClient />;
}
