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

export const metadata: Metadata = generateSEO({});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00F0FF',
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
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
