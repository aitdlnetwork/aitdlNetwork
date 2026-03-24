/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-fade-in relative z-10">
      <div className="flex flex-col items-center gap-6">
        {/* Error Code */}
        <h1 className="font-display font-extrabold text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-primary to-[#00FF9D]/20 tracking-tighter">
          404
        </h1>
        
        {/* Connection Lost Subtitle */}
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
          Connection Disruption
        </h2>
        
        <p className="text-sm md:text-base text-slate-400 font-body max-w-md leading-relaxed">
          The node or page index you are looking for has been moved in space, or doesn't exist.
        </p>

        {/* Back to Home Action */}
        <div className="mt-4">
          <Link href="/" className="btn-primary flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-background-dark font-display font-bold text-[15px] tracking-[0.02em]">
            Re-Initialize Home
          </Link>
        </div>
      </div>

      {/* Grid Pattern Background overlay - aesthetic flair */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
    </div>
  );
}
