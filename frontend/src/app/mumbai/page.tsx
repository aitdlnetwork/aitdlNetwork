/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import React from 'react';
import MumbaiClient from './MumbaiClient';

export const metadata: Metadata = {
  title: 'Coaching Institute Software in Mumbai | LMS & POS — AITDL',
  description: 'Leading coaching management software and POS billing for institutes and retailers in Mumbai, Andheri, Bandra, and Thane.',
  keywords: ['LMS Mumbai', 'Coaching software Andheri', 'POS billing Mumbai', 'School ERP Maharashtra'],
};

export default function MumbaiPage() {
  return <MumbaiClient />;
}
