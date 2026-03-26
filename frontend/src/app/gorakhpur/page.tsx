/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import GorakhpurClient from './GorakhpurClient';

export const metadata: Metadata = generateSEO({
  title: 'AITDL Network Gorakhpur – School & Coaching Software Uttar Pradesh',
  description: "AITDL Network's Gorakhpur node serves schools, coaching institutes and businesses in Uttar Pradesh with LMS, fee management and POS systems.",
  path: "/gorakhpur",
});

export default function GorakhpurPage() {
  return <GorakhpurClient />;
}
