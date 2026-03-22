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

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-fade-in relative">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-[64px] leading-[1.1] tracking-[-0.02em] mb-6 max-w-4xl text-gradient">
            Smart Software for Education & Business Growth
          </h1>
          <p className="text-lg md:text-[20px] text-text-muted font-light mb-10 max-w-2xl leading-relaxed">
            We build LMS platforms, coaching management systems, POS billing software, and automation tools to help you scale faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-slide-up mb-16">
            <Link href="/contact" className="btn-primary w-full sm:w-auto flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-background-dark font-display font-semibold text-[15px] tracking-[0.01em]">
                Get Free Demo
            </Link>
            <Link href="/services" className="btn-secondary w-full sm:w-auto flex items-center justify-center h-12 px-8 rounded-lg bg-transparent font-display font-semibold text-[15px] tracking-[0.01em]">
                View Solutions
            </Link>
          </div>
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined text-primary text-lg">verified</span>
              <span className="text-sm font-medium">Built for Indian businesses</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined text-primary text-lg">bolt</span>
              <span className="text-sm font-medium">Fast deployment</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
              <span className="text-sm font-medium">Affordable and scalable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="relative z-10 py-24 px-6 bg-background-dark/50" id="services">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Who We Serve</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Coaching */}
            <div className="glass-card p-8 rounded-xl flex flex-col items-start gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h3 className="font-display font-bold text-xl">Coaching Institutes</h3>
              <p className="text-text-muted leading-relaxed">Streamline student management and fee tracking with our specialized tools.</p>
            </div>
            {/* Schools */}
            <div className="glass-card p-8 rounded-xl flex flex-col items-start gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">account_balance</span>
              </div>
              <h3 className="font-display font-bold text-xl">Schools & Training</h3>
              <p className="text-text-muted leading-relaxed">Modern LMS and digital infrastructure designed for enterprise-level learning.</p>
            </div>
            {/* Retail */}
            <div className="glass-card p-8 rounded-xl flex flex-col items-start gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
              </div>
              <h3 className="font-display font-bold text-xl">Retail & Businesses</h3>
              <p className="text-text-muted leading-relaxed">Fast POS and automated billing systems to handle high-volume sales seamlessly.</p>
            </div>
            {/* Gym */}
            <div className="glass-card p-8 rounded-xl flex flex-col items-start gap-4">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">fitness_center</span>
              </div>
              <h3 className="font-display font-bold text-xl">Gym & Fitness</h3>
              <p className="text-text-muted leading-relaxed">Membership management and automated alerts for your fitness community.</p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center h-14 px-10 rounded-lg bg-primary text-background-dark font-display font-semibold text-[16px]">
              Get Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-[60] size-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300" href="https://wa.me/1234567890">
        <svg className="size-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
        </svg>
      </a>
    </div>
  );
}
