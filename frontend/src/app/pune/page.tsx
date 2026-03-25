/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import React from 'react';
import PuneClient from './PuneClient';

export const metadata: Metadata = {
  title: 'School ERP & Learning Management System in Pune | AITDL Network',
  description: 'Automated school management, LMS, and clinic software for businesses in Pune, Kothrud, and Hinjewadi.',
  keywords: ['LMS Pune', 'School ERP Pune', 'Coaching software Kothrud', 'Education technology Pune'],
};

export default function PunePage() {
  return <PuneClient />;
}
