/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import HomeClient from './HomeClient';

export const metadata: Metadata = generateSEO({
  title: 'AITDL Network – School Management & Coaching LMS Software India',
  description: 'AITDL Network provides school management software, coaching institute LMS, POS billing, and AI-powered EdTech platforms across India. Free demo available.',
  path: '/',
});

export default function HomePage() {
  return <HomeClient />;
}
