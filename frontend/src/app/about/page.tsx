/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import AboutClient from './AboutClient';

export const metadata: Metadata = generateSEO({
  title: 'About AITDL Network | 19+ Years Enterprise Software Expertise',
  description: 'Meet JRM (Jawahar R Mallah), founder of AITDL Network. 19+ years architecting POS, ERP and EdTech systems across India from Mumbai and Gorakhpur.',
  path: "/about",
});

export default function AboutPage() {
  return <AboutClient />;
}
