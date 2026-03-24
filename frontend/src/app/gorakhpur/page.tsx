/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import React from 'react';
import GorakhpurClient from './GorakhpurClient';

export const metadata: Metadata = {
  title: 'Smart Software & LMS in Gorakhpur | AITDL Network',
  description: 'LMS, POS Billing, Coaching Management, and Enterprise AI solutions designed for institutions and businesses in Gorakhpur, Golghar, and UP.',
  keywords: ['LMS Gorakhpur', 'Coaching software Golghar', 'POS billing Gorakhpur', 'School management UP'],
};

export default function GorakhpurPage() {
  return <GorakhpurClient />;
}
