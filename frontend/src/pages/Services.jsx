/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import React, { useEffect } from 'react';

export default function Services() {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.stagger-fade-in');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 container mx-auto px-6 py-12 md:py-20 lg:py-24 max-w-[1200px]">
      <div className="mb-16 md:mb-24 flex flex-col items-center md:items-start stagger-fade-in">
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gradient mb-4 text-center md:text-left">
            Core Capabilities
        </h2>
        <p className="text-muted text-lg md:text-xl max-w-2xl text-center md:text-left">
            Our premium technical offerings tailored for enterprise-grade scalability and intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative">
        {/* Card 1 */}
        <div className="glass-card rounded-lg p-8 flex flex-col h-full min-h-[240px] relative overflow-hidden group stagger-fade-in" style={{animationDelay: '100ms'}}>
          <div className="mb-6 flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-surface-dark border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[28px]">school</span>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-end">
            <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-2">Education Solutions</h3>
            <p className="text-muted text-sm md:text-base leading-relaxed">LMS, Coaching Systems, and Student Management Portals designed for modern learning environments.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card rounded-lg p-8 flex flex-col h-full min-h-[240px] relative overflow-hidden group stagger-fade-in" style={{animationDelay: '200ms'}}>
          <div className="mb-6 flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-surface-dark border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[28px]">payments</span>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-end">
            <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-2">POS & Billing Software</h3>
            <p className="text-muted text-sm md:text-base leading-relaxed">Modern retail POS systems, automated invoicing, and inventory tracking for seamless business operations.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card rounded-lg p-8 flex flex-col h-full min-h-[240px] relative overflow-hidden group stagger-fade-in" style={{animationDelay: '300ms'}}>
          <div className="mb-6 flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-surface-dark border border-white/5 flex items-center justify-center text-[#00FF9D] group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[28px]">settings_suggest</span>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-end">
            <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-2">Automation & Digital Setup</h3>
            <p className="text-muted text-sm md:text-base leading-relaxed">Streamlining business workflows and complete digital transformation through integrated technical ecosystems.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-card rounded-lg p-8 flex flex-col h-full min-h-[240px] relative overflow-hidden group stagger-fade-in" style={{animationDelay: '400ms'}}>
          <div className="mb-6 flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-surface-dark border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[28px]">cloud</span>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-end">
            <h3 className="font-display font-bold text-xl md:text-2xl text-text-primary mb-2">Cloud & DevOps Infrastructure</h3>
            <p className="text-muted text-sm md:text-base leading-relaxed">Secure, scalable hosting and robust infrastructure ensuring high availability for your business applications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
