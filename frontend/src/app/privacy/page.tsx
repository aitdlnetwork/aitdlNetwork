/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function PrivacyPolicy() {
  const { language } = useI18n();

  const sectionsData: Record<string, { title: string; content: string }[]> = {
    en: [
      {
        title: "1. Data Collection Node",
        content: "We collect metadata and diagnostic node streams purely for edge latency optimizations and transparent continuous delivery synchronization setups."
      },
      {
        title: "2. Encryption Standards",
        content: "All client buffers and network packets are encrypted utilizing absolute AES-256 standard vaults locally complied with sovereign standards setup guidelines."
      },
      {
        title: "3. Retainment Policy",
        content: "Metadata log frames are recycled every 24 hours unless configured explicitly for long-term analytics dashboards node allocations setup."
      }
    ],
    hi: [
      {
        title: "1. डेटा संग्रह नोड",
        content: "हम विशुद्ध रूप से एज लेटेंसी अनुकूलन और पारदर्शी निरंतर वितरण सिंक्रनाइज़ेशन सेटअप के लिए मेटाडेटा और डायग्नोस्टिक नोड स्ट्रीम एकत्र करते हैं।"
      },
      {
        title: "2. एन्क्रिप्शन मानक",
        content: "सभी क्लाइंट बफर और नेटवर्क पैकेट पूर्ण एईएस-256 मानक वॉल्ट का उपयोग करके एन्क्रिप्ट किए गए हैं जो स्थानीय रूप से संप्रभु मानकों के अनुरूप हैं।"
      },
      {
        title: "3. रिटेनमेंट नीति",
        content: "मेटाडेटा लॉग फ्रेम हर 24 घंटे में रीसायकल किए जाते हैं जब तक कि लंबी अवधि के एनालिटिक्स डैशबोर्ड नोड आवंटन सेटअप के लिए स्पष्ट रूप से कॉन्फ़िगर न किया गया हो।"
      }
    ],
    sa: [
      {
        title: "१. डेटा संग्रहण केन्द्रम्",
        content: "वयं लेटेंसी न्यूनीकरणार्थं मेटाडेटा सङ्ग्रहं कुर्मः।"
      },
      {
        title: "२. एन्क्रिप्शन मापदण्डः",
        content: "सर्वे सन्देशाः एईएस-२५६ मापदण्डेन सुरक्षिताः सन्ति।"
      },
      {
        title: "३. धारण नीतिः",
        content: "लॉग फ्रेम्स प्रति २४ होरासु पुनः चक्रिताः भवन्ति।"
      }
    ]
  };

  const t = (en: string, hi: string, sa: string) => {
    if (language === 'hi') return hi;
    if (language === 'sa') return sa;
    return en;
  };

  const sections = sectionsData[language as keyof typeof sectionsData] || sectionsData.en;

  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in mb-12">
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-white font-display text-3xl md:text-4xl font-bold tracking-tight">
          {t("Privacy Policy", "गोपनीयता नीति", "गोपनीयता नीतिः")}
        </h1>
        <p className="text-slate-400 text-sm font-body">
          {t("Last updated: March 2026 | Vikram Samvat 2083", "अंतिम अपडेट: मार्च 2026 | विक्रम संवत 2083", "अंतिम परिवर्तनम्: मार्च २०२६ | विक्रम संवत् २०८३")}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map((sec, idx) => (
          <div key={idx} className="glass-card p-6 md:p-8 rounded-xl border border-white/5 bg-background-dark/30 flex flex-col gap-3">
            <h2 className="text-white font-display font-semibold text-lg md:text-xl">{sec.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-body">
              {sec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
