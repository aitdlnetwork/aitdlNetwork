/*
AITDL Network
Artificial Intelligence Technology & Deep Learning

Designed & Architected by JRM

Contact:
aitdl.com
aitdlnetwork@outlook.com
jawahar.mallah@gmail.com

Copyright © AITDL Network 2026 | Vikram Samvat 2083
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-[72px] transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-8 text-primary transition-transform group-hover:scale-105">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-text-primary">AITDL Network</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Services</Link>
          <Link href="/portfolio" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Portfolio</Link>
          <Link href="/contact" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Contact</Link>
          <Link href="/contact" className="btn-primary flex items-center justify-center h-10 px-5 rounded-lg bg-primary text-background-dark font-display font-semibold text-[14px]">Get Free Demo</Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-muted hover:text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 glass-nav border-t border-white/5 py-4 px-6 flex flex-col gap-4 shadow-xl">
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text-primary py-2">Services</Link>
          <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text-primary py-2">Portfolio</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-text-primary py-2">Contact</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary flex items-center justify-center h-12 w-full rounded-lg bg-primary text-background-dark font-display font-semibold text-[15px] mt-2">Get Free Demo</Link>
        </div>
      )}
    </nav>
  );
}
