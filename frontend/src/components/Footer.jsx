/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import React from 'react';

export default function Footer() {
  return (
    <footer className="h-[80px] w-full border-t border-white/10 mt-auto flex items-center justify-center px-6 glass-nav border-b-0 border-l-0 border-r-0 rounded-none shadow-none bg-opacity-30">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-slate-500">
        <div className="font-display font-bold text-slate-400 tracking-wider">AITDL NETWORK</div>
        <div className="text-center">
          Designed & Architected by AITDL NETWORK<br/>
          &copy; 2026 | Vikram Samvat 2083
        </div>
        <div className="flex items-center gap-4">
          <a aria-label="X (Twitter)" className="hover:text-primary transition-colors flex items-center" href="#">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </a>
          <a aria-label="LinkedIn" className="hover:text-primary transition-colors flex items-center" href="#">
            <span className="material-symbols-outlined text-[20px]">work</span>
          </a>
          <a aria-label="GitHub" className="hover:text-primary transition-colors flex items-center" href="#">
            <span className="material-symbols-outlined text-[20px]">code</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
