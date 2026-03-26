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
  title: 'Contact AITDL Network | Mumbai & Gorakhpur Office',
  description: 'Get in touch with AITDL Network for a free demo of our EdTech LMS, school management or POS billing software. Offices in Mumbai and Gorakhpur, UP.',
  path: "/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
