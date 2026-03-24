/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

export interface TranslationDict {
  nav_about: string;
  nav_services: string;
  nav_portfolio: string;
  nav_contact: string;
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  cta_demo: string;
}

export const translations: Record<string, TranslationDict> = {
  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_contact: "Contact",
    hero_badge: "SOVEREIGN INFRASTRUCTURE & AI",
    hero_title: "Secure Enterprise Intelligence at Scale",
    hero_subtitle: "Architecting deep learning pipelines and sovereign ecosystems for scalable operational loads.",
    cta_demo: "Access Systems"
  },
  hi: {
    nav_about: "हमारे बारे में",
    nav_services: "सेवाएं",
    nav_portfolio: "पोर्टफोलियो",
    nav_contact: "संपर्क",
    hero_badge: "संप्रभु इन्फ्रास्ट्रक्चर और एआई",
    hero_title: "सुरक्षित एंटरप्राइज इंटेलिजेंस",
    hero_subtitle: "बड़े परिचालन भार के लिए सुरक्षित डीप लर्निंग पाइपलाइनों और संप्रभु पारिस्थितिक तंत्र का निर्माण।",
    cta_demo: "सिस्टम एक्सेस"
  },
  sa: {
    nav_about: "विषये",
    nav_services: "सेवाः",
    nav_portfolio: "कार्यम्",
    nav_contact: "सम्पर्कः",
    hero_badge: "सर्वभौम तन्त्रज्ञानम् एआई",
    hero_title: "सुरक्षित उद्योग प्रज्ञा तन्त्रम्",
    hero_subtitle: "उच्च स्तरस्य कार्यभाराय गणन तन्त्राणां रचना।",
    cta_demo: "तन्त्र प्रवेशः"
  }
};
