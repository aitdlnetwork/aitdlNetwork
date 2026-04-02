/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

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

import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateSEO } from '@/lib/seo/seo';
import Script from 'next/script';
import { I18nProvider } from '@/lib/i18n/I18nContext';
import { AccessibilityProvider } from '@/lib/accessibility/AccessibilityContext';

export const metadata: Metadata = generateSEO({});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Exact Snippet */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MW8ZLVVF');
          `}
        </Script>

        {/* ERPEngine: WASM Glue Layer — Pre-loaded for Sovereign Engine Speed */}
        <Script src="/sql-wasm.js" strategy="beforeInteractive" />
        
        {/* SEO Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data */}
        <Script id="ld-organization" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AITDL Network",
            "url": "https://aitdl.in",
            "logo": "https://aitdl.in/images/logo.png",
            "description": "Enterprise software for schools, coaching institutes, retail & NGOs across India. AI-powered EdTech and sovereign infrastructure solutions.",
            "foundingDate": "2007",
            "founder": {
              "@type": "Person",
              "name": "Jawahar R Mallah",
              "jobTitle": "Lead Architect & Founder",
              "url": "https://aitdl.in/founders"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "url": "https://aitdl.in/contact",
              "availableLanguage": ["English", "Hindi"]
            },
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "Andheri East",
                "addressLocality": "Mumbai",
                "addressRegion": "MH",
                "postalCode": "400069",
                "addressCountry": "IN"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "Golghar",
                "addressLocality": "Gorakhpur",
                "addressRegion": "UP",
                "postalCode": "273001",
                "addressCountry": "IN"
              }
            ],
            "sameAs": [
              "https://github.com/aitdlnetwork",
              "https://aitdl.in"
            ]
          })}
        </Script>

        <Script id="ld-local-business" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AITDL Network – Gorakhpur Node",
            "image": "https://aitdl.in/images/og-cover.png",
            "url": "https://aitdl.in/gorakhpur",
            "telephone": "+91-XXXXXXXXXX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Golghar",
              "addressLocality": "Gorakhpur",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "273001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 26.7606,
              "longitude": 83.3732
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "priceRange": "₹₹",
            "@id": "https://aitdl.in/gorakhpur"
          })}
        </Script>

        <Script id="ld-software" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AITDL EdTech Ecosystem",
            "applicationCategory": "EducationApplication",
            "operatingSystem": "Web",
            "url": "https://aitdl.in/services/edtech-ecosystems",
            "description": "LMS, virtual classrooms, fee automation and student management for schools and coaching centres in India.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "description": "Free demo available"
            },
            "provider": {
              "@type": "Organization",
              "name": "AITDL Network",
              "url": "https://aitdl.in"
            }
          })}
        </Script>

        <Script id="ld-website" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AITDL Network",
            "url": "https://aitdl.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://aitdl.in/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>

        <Script id="ld-breadcrumb" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aitdl.in/" }
            ]
          })}
        </Script>

        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Space+Grotesk:wght@600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MW8ZLVVF"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden pt-[72px]">
          <AccessibilityProvider>
            <I18nProvider>
              {/* Ambient Space Glow - Background */}
              <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] hidden md:block"></div>
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[100px] hidden md:block"></div>
                <div className="absolute hidden md:block inset-0 bg-hero-glow"></div>
              </div>
              
              <Header />
              <main className="flex-1 w-full z-10 relative">
                {children}
              </main>
              <Footer />
            </I18nProvider>
          </AccessibilityProvider>

          {/* Runtime Watermarks & Fingerprinting scripts */}
          <script dangerouslySetInnerHTML={{
            __html: `
              // 2. RUNTIME WATERMARK (ANTI-COPY PSYCHOLOGY)
              (function () {
                const watermark = document.createElement('div');
                watermark.innerText = "AITDL Network";
                watermark.style.position = "fixed";
                watermark.style.bottom = "10px";
                watermark.style.right = "10px";
                watermark.style.opacity = "0.05";
                watermark.style.fontSize = "12px";
                watermark.style.pointerEvents = "none";
                watermark.style.zIndex = "9999";
                document.body.appendChild(watermark);
              })();

              // 3. CODE FINGERPRINTING (ADVANCED)
              async function generateAndLogFingerprint() {
                try {
                  const content = new TextEncoder().encode(Date.now().toString() + "AITDL_NETWORK");
                  const hashBuffer = await crypto.subtle.digest('SHA-256', content);
                  const hashArray = Array.from(new Uint8Array(hashBuffer));
                  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                  console.log("AITDL Build ID:", hashHex);
                  console.log("AITDL Network © 2026 | Vikram Samvat 2083");
                  console.log("Designed & Architected by JRM");
                } catch (e) {
                  console.log("AITDL Build Secure ID:", Date.now().toString(36));
                  console.log("AITDL Network © 2026 | Vikram Samvat 2083");
                  console.log("Designed & Architected by JRM");
                }
              }
              generateAndLogFingerprint();

              // 4. LICENSE ENFORCEMENT CHECK
              if (!window.location.hostname.includes("aitdl.com") && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
                console.warn("⚠ Unauthorized usage detected - AITDL Network");
              }
            `
          }} />
        </div>
      </body>
    </html>
  );
}
