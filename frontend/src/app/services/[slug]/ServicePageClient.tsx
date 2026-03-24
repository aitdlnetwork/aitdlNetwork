/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

/*
AITDL Network © 2026 | Vikram Samvat 2083
Designed & Architected by JRM
*/

'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useI18n } from '@/lib/i18n/I18nContext';

const servicesData: Record<string, Record<string, {
  title: string;
  category: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  techStack: string[];
}>> = {
  "edtech-ecosystems": {
    en: {
      title: "EdTech & LMS Ecosystems",
      category: "Education",
      description: "Multi-tenant learning platforms featuring virtual live classrooms and automated grading pipelines.",
      icon: "school",
      features: ["Auto-Grader & Quiz Pipelines", "Live Class Stream Integration", "Parent Dashboard Reporting"],
      benefits: ["Reduce teacher overhead by 40%", "Scale up to 10k concurrent students"],
      techStack: ["React", "WebRTC", "PostgreSQL"]
    },
    hi: {
      title: "एजटेक और एलएमएस इकोसिस्टम",
      category: "शिक्षा",
      description: "वर्चुअल लाइव क्लासरूम और स्वचालित ग्रेडिंग पाइपलाइनों वाले मल्टी-टेनेंट लर्निंग प्लेटफॉर्म।",
      icon: "school",
      features: ["ऑटो-ग्रेडर और क्विज़ पाइपलाइन्स", "लाइव क्लास स्ट्रीम इंटीग्रेशन", "पेरेंट डैशबोर्ड रिपोर्टिंग"],
      benefits: ["शिक्षक के ओवरहेड को 40% तक कम करें", "10k समवर्ती छात्रों तक स्केल करें"],
      techStack: ["React", "WebRTC", "PostgreSQL"]
    },
    sa: {
      title: "एजटेक एलएमएस व्यवस्था",
      category: "शिक्षा",
      description: "वर्चुअल लाइव कक्षा व्यवस्थापनम्।",
      icon: "school",
      features: ["क्विज़ व्यवस्था", "कक्षा प्रसारणम्", "अभिभावक डैशबोर्ड"],
      benefits: ["श्रम निवारणम् 40%", "10k छात्र प्रबन्धनम्"],
      techStack: ["React", "WebRTC", "PostgreSQL"]
    }
  },
  "pos-retail": {
    en: {
      title: "POS & Retail Billing Software",
      category: "Retail",
      description: "Fast-deployment barcode scanners, live inventory syncing, and offline-compatible fallback desktop pipelines.",
      icon: "shopping_cart",
      features: ["GST billing & Auto Invoicing", "Multi-Branch Inventory Sync", "Offline Mode Synchronization"],
      benefits: ["Checkout speeds boosted by 60%", "Prevent inventory leakages"],
      techStack: ["Next.js", "Electron", "SQLite"]
    },
    hi: {
      title: "पीओएस और खुदरा बिलिंग सॉफ्टवेयर",
      category: "खुदरा",
      description: "फास्ट-डिप्लॉयमेंट बारकोड स्कैनर, लाइव इन्वेंट्री सिंकिंग और ऑफलाइन-संगत डेस्कटॉप पाइपलाइन।",
      icon: "shopping_cart",
      features: ["जीएसटी बिलिंग और ऑटो इनवॉइसिंग", "मल्टी-ब्रांच इन्वेंटरी सिंक", "ऑफलाइन मोड सिंक्रोनाइज़ेशन"],
      benefits: ["चेकआउट गति 60% बढ़ी", "इन्वेंट्री रिसाव को रोकें"],
      techStack: ["Next.js", "Electron", "SQLite"]
    },
    sa: {
      title: "पीओएस बिलिंग तन्त्रम्",
      category: "विक्रय",
      description: "विक्रय प्रबन्धनार्थं बिलिंग व्यवस्थापनम्।",
      icon: "shopping_cart",
      features: ["जीएसटी बिलिंग", "इन्वेंट्री सिंक", "ऑफलाइन मोड"],
      benefits: ["गति वर्धनम् 60%", "इन्वेंट्री रक्षणम्"],
      techStack: ["Next.js", "Electron", "SQLite"]
    }
  },
  "academic-automation": {
    en: {
      title: "Academic Automation Systems",
      category: "Institutional",
      description: "Targeted digitisation pipelines handling schedule builders and secure grade sheet issuance.",
      icon: "account_balance",
      features: ["Admissions & ERP Pipelines", "Grade Issuance Framework", "Automatic Timetable Builders"],
      benefits: ["Go 100% paperless administration", "Eliminate response bottlenecks"],
      techStack: ["Nest.js", "React", "Docker"]
    },
    hi: {
      title: "अकादमिक स्वचालन प्रणाली",
      category: "संस्थागत",
      description: "शेड्यूल बिल्डर्स और सुरक्षित ग्रेड शीट जारी करने को संभालने वाली डिजिटलीकरण पाइपलाइन।",
      icon: "account_balance",
      features: ["प्रवेश और ईआरपी पाइपलाइन्स", "ग्रेड जारी करने का ढांचा", "स्वचालित टाइमटेबल बिल्डर्स"],
      benefits: ["100% पेपरलेस प्रशासन पर जाएं", "प्रतिक्रिया बाधाओं को खत्म करें"],
      techStack: ["Nest.js", "React", "Docker"]
    },
    sa: {
      title: "अकादमिक स्वचालनम्",
      category: "संस्थागत",
      description: "शिक्षण व्यवस्था व्यवस्थापनम् प्रबन्धनम्।",
      icon: "account_balance",
      features: ["प्रवेश ईआरपी", "अंकपत्र निर्माणम्", "समयसारणी निर्माणम्"],
      benefits: ["100% पेपरलेस", "सरल कार्यप्रबन्धनम्"],
      techStack: ["Nest.js", "React", "Docker"]
    }
  },
  "enterprise-cloud": {
    en: {
      title: "Enterprise Cloud & Infrastructure",
      category: "DevOps",
      description: "High-available infrastructure setup with transparent load-balancing proxies and encrypted cold storage hooks.",
      icon: "cloud",
      features: ["Transparent Auto-scalers", "DDoS & Web Application Firewall", "Encrypted Cold Backup Vaults"],
      benefits: ["Guaranteed 99.99% system uptime", "Strict data privacy regulations"],
      techStack: ["AWS", "Terraform", "Kubernetes"]
    },
    hi: {
      title: "एंटरप्राइज क्लाउड और इंफ्रास्ट्रक्चर",
      category: "DevOps",
      description: "लोड-बैलेंसिंग प्रॉक्सी और एन्क्रिप्टेड कोल्ड स्टोरेज के साथ उच्च उपलब्ध बुनियादी ढांचा सेटअप।",
      icon: "cloud",
      features: ["पारदर्शी ऑटो-स्केलर", "डीडीओएस और वेब एप्लिकेशन फ़ायरवॉल", "एन्क्रिप्टेड कोल्ड बैकअप वॉल्ट"],
      benefits: ["गारंटीकृत 99.99% सिस्टम अपटाइम", "सख्त डेटा गोपनीयता नियम"],
      techStack: ["AWS", "Terraform", "Kubernetes"]
    },
    sa: {
      title: "एंटरप्राइज क्लाउड व्यवस्था",
      category: "DevOps",
      description: "सुरक्षित डेटा प्रबन्धनम्।",
      icon: "cloud",
      features: ["ऑटो-स्केलर", "फ़ायरवॉल", "बैकअप वॉल्ट"],
      benefits: ["99.99% अपटाइम", "डेटा गोपनीयता"],
      techStack: ["AWS", "Terraform", "Kubernetes"]
    }
  },
  "real-estate-erp": {
    en: {
      title: "Real Estate ERP",
      category: "ERP",
      description: "Cloud ERP tailored for developers handling online payment locks and transparent ticketing frameworks.",
      icon: "real_estate_agent",
      features: ["Tenant Support Ticket boards", "Payment Lease setup hooks", "Maintenance Alert dispatch"],
      benefits: ["Accelerate rent collection", "Streamline operations"],
      techStack: ["Next.js", "Tailwind", "Supabase"]
    },
    hi: {
      title: "रियल एस्टेट ईआरपी",
      category: "ईआरपी",
      description: "ऑनलाइन भुगतान और पारदर्शी टिकटिंग फ्रेमवर्क संभालने वाले डेवलपर्स के लिए क्लाउड ईआरपी।",
      icon: "real_estate_agent",
      features: ["किराएदार समर्थन टिकट बोर्ड", "भुगतान पट्टा सेटअप", "रखरखाव चेतावनी प्रेषण"],
      benefits: ["किराया संग्रह में तेजी लाएं", "संचालन को सुव्यवस्थित करें"],
      techStack: ["Next.js", "Tailwind", "Supabase"]
    },
    sa: {
      title: "रियल एस्टेट ईआरपी",
      category: "ईआरपी",
      description: "भवन प्रबन्धनम्।",
      icon: "real_estate_agent",
      features: ["समर्थन टिकट", "भुगतान प्रबन्धनम्", "रखरखाव"],
      benefits: ["किराया संग्रह वृद्धि", "सरल प्रबन्धनम्"],
      techStack: ["Next.js", "Tailwind", "Supabase"]
    }
  },
  "ngo-society": {
    en: {
      title: "NGO & Housing Society portals",
      category: "Non-Profit",
      description: "Transparent portal setups targeting donation lock streams routing and secure member voting dashboards.",
      icon: "diversity_3",
      features: ["Auditable Donation streams", "Compliance Report dispatch", "Member digital voting hooks"],
      benefits: ["Full transparency compliance", "Enhance member trust metrics"],
      techStack: ["SvelteKit", "Node.js", "Prisma"]
    },
    hi: {
      title: "एनजीओ और हाउसिंग सोसाइटी पोर्टल",
      category: "गैर-लाभकारी",
      description: "पारदर्शी पोर्टल सेटअप लक्ष्यीकरण दान लॉक स्ट्रीम रूटिंग और सुरक्षित सदस्य मतदान डैशबोर्ड।",
      icon: "diversity_3",
      features: ["ऑडिट योग्य दान स्ट्रीम", "अनुपालन रिपोर्ट प्रेषण", "सदस्य डिजिटल वोटिंग हुक"],
      benefits: ["पूर्ण पारदर्शिता अनुपालन", "सदस्य विश्वास मेट्रिक्स बढ़ाएँ"],
      techStack: ["SvelteKit", "Node.js", "Prisma"]
    },
    sa: {
      title: "एनजीओ पोर्टलम्",
      category: "Non-Profit",
      description: "दान प्रबन्धनार्थं व्यवस्था।",
      icon: "diversity_3",
      features: ["दान स्ट्रीम", "अनुपालन रिपोर्ट", "डिजिटल मतदानम्"],
      benefits: ["पूर्ण पारदर्शिता", "विश्वासवर्धनम्"],
      techStack: ["SvelteKit", "Node.js", "Prisma"]
    }
  },
  "adaptive-ai": {
    en: {
      title: "Adaptive AI Self-Learning Engine",
      category: "Artificial Intelligence",
      description: "Advanced deep learning hooks generating itemized personalized study tracks dynamically tuned.",
      icon: "psychology",
      features: ["Personalised Study Roadmaps", "Weakness detection feedback", "AI Knowledge graph mapping"],
      benefits: ["Personalized learning indexing", "Boost scores by 25% avg"],
      techStack: ["Python", "PyTorch", "FastAPI"]
    },
    hi: {
      title: "एडेप्टिव एआई सेल्फ-लर्निंग इंजन",
      category: "क्रत्रिम बुद्धिमत्ता",
      description: "उन्नत डीप लर्निंग हुक व्यक्तिगत अध्ययन ट्रैक को गतिशील रूप से ट्यून करते हैं।",
      icon: "psychology",
      features: ["व्यक्तिगत अध्ययन रोडमैप", "कमजोरी का पता लगाना फीडबैक", "एआई नॉलेज ग्राफ मैपिंग"],
      benefits: ["व्यक्तिगत सीखना अनुक्रमण", "स्कोर 25% औसत बढ़ाएँ"],
      techStack: ["Python", "PyTorch", "FastAPI"]
    },
    sa: {
      title: "विवेक स्वचालनम् Engine",
      category: "Artificial Intelligence",
      description: "शिक्षण प्रबन्धनम्।",
      icon: "psychology",
      features: ["अध्ययन रोडमैप", "कमजोरी निवारणम्", "नॉलेज ग्राफ"],
      benefits: ["व्यक्तिगत सीखना", "गुणवत्ता वर्धनम्"],
      techStack: ["Python", "PyTorch", "FastAPI"]
    }
  },
  "healthcare-clinic": {
    en: {
      title: "Healthcare & Clinic Management",
      category: "Healthcare",
      description: "Secure outpatient logs tracking, pharmacy bill dispatch frameworks and WhatsApp reports forwards.",
      icon: "medical_services",
      features: ["ABHA framework compliant EMR", "Pharmacy Invoice triggers", "WhatsApp Report forwards"],
      benefits: ["reduce queue lines", "Clear pharmacy stock tracking"],
      techStack: ["Angular", "Spring Boot", "PostgreSQL"]
    },
    hi: {
      title: "हेल्थकेयर और क्लिनिक प्रबंधन",
      category: "हेल्थकेयर",
      description: "सुरक्षित आउट पेशेंट लॉग ट्रैकिंग, फार्मेसी बिल प्रेषण और व्हाट्सएप रिपोर्ट फॉरवर्ड।",
      icon: "medical_services",
      features: ["एबीएचए फ्रेमवर्क अनुरूप ईएमआर", "फार्मेसी चालान ट्रिगर", "व्हाट्सएप रिपोर्ट फॉरवर्ड"],
      benefits: ["कतारों को कम करें", "स्पष्ट फार्मेसी स्टॉक ट्रैकिंग"],
      techStack: ["Angular", "Spring Boot", "PostgreSQL"]
    },
    sa: {
      title: "हेल्थकेयर प्रबन्धनम्",
      category: "हेल्थकेयर",
      description: "चिकित्सा प्रबन्धनम्।",
      icon: "medical_services",
      features: ["ईएमआर व्यवस्था", "फार्मेसी चालान", "व्हाट्सएप रिपोर्ट"],
      benefits: ["कतार निवारणम्", "स्टॉक ट्रैकिंग"],
      techStack: ["Angular", "Spring Boot", "PostgreSQL"]
    }
  },
  "gym-fitness": {
    en: {
      title: "Gym & Fitness Management",
      category: "Fitness",
      description: "Automated direct debit setups, membership access logs, and visual workout calendars.",
      icon: "fitness_center",
      features: ["Membership Management", "Automated Fee Triggers", "Trainer Booking Calendar"],
      benefits: ["Reduce payment defaults by 35%", "Smooth member check-ins"],
      techStack: ["React", "Node.js", "MySQL"]
    },
    hi: {
      title: "जिम और फिटनेस प्रबंधन",
      category: "स्वास्थ्य लाभ",
      description: "स्वचालित डायरेक्ट डेबिट सेटअप, सदस्यता एक्सेस लॉग और विजुअल कसरत कैलेंडर।",
      icon: "fitness_center",
      features: ["सदस्यता प्रबंधन", "स्वचालित शुल्क ट्रिगर", "ट्रेनर बुकिंग कैलेंडर"],
      benefits: ["भुगतान डिफ़ॉल्ट को 35% कम करें", "सदस्य चेक-इन सुचारू करें"],
      techStack: ["React", "Node.js", "MySQL"]
    },
    sa: {
      title: "जिम प्रबन्धनम्",
      category: "Fitness",
      description: "सदस्यता प्रबन्धनम्।",
      icon: "fitness_center",
      features: ["सदस्यता प्रबंधन", "शुल्क ट्रिगर", "बुकिंग कैलेंडर"],
      benefits: ["भुगतान सरलीकरणम्", "सरल चेक-इन"],
      techStack: ["React", "Node.js", "MySQL"]
    }
  },
  "hiking-trekking": {
    en: {
      title: "Hiking & Trekking Management",
      category: "Outdoor",
      description: "Equipments booking tracking frames inventory lockers and safety alert dispatch setups.",
      icon: "terrain",
      features: ["Online Booking/Slating", "Equipment Rentals Tracker", "Safety Alert broadcast"],
      benefits: ["Streamline bookings", "Automated safety checklist"],
      techStack: ["Next.js", "Tailwind", "Supabase"]
    },
    hi: {
      title: "हाइकिंग और ट्रेकिंग प्रबंधन",
      category: "आउटडोर",
      description: "उपकरण बुकिंग ट्रैकिंग फ्रेम इन्वेंट्री लॉकर और सुरक्षा चेतावनी प्रेषण सेटअप।",
      icon: "terrain",
      features: ["ऑनलाइन बुकिंग/स्लेटिंग", "उपकरण किराया ट्रैकर", "सुरक्षा चेतावनी प्रसारण"],
      benefits: ["बुकिंग सुव्यवस्थित करें", "स्वचालित सुरक्षा चेकलिस्ट"],
      techStack: ["Next.js", "Tailwind", "Supabase"]
    },
    sa: {
      title: "हाइकिंग प्रबन्धनम्",
      category: "Outdoor",
      description: "बुकिंग प्रबन्धनम्।",
      icon: "terrain",
      features: ["ऑनलाइन बुकिंग", "किराया ट्रैकर", "सुरक्षा प्रसारण"],
      benefits: ["बुकिंग सरलीकरणम्", "सुरक्षा चेकलिस्ट"],
      techStack: ["Next.js", "Tailwind", "Supabase"]
    }
  }
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const { language } = useI18n();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const service = servicesData[slug]?.[langKey] || servicesData[slug]?.['en'];
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  const faqsData = {
    en: [
      { q: "Do you provide offline syncing?", a: "Yes, our systems include local-first buffering triggers which synchronise automatically." },
      { q: "Is operator training included?", a: "All setups include full administration setup training guidelines." },
      { q: "Can we customize reports?", a: "Yes, every dashboard is designed for modular flexibility." }
    ],
    hi: [
      { q: "क्या आप ऑफ़लाइन सिंकिंग प्रदान करते हैं?", a: "हाँ, हमारे सिस्टम में स्थानीय-प्रथम बफरिंग शामिल है जो स्वतः सिंक्रनाइज़ होती है।" },
      { q: "क्या ऑपरेटर प्रशिक्षण शामिल है?", a: "सभी सेटअप में पूर्ण प्रशासन प्रशिक्षण दिशानिर्देश शामिल हैं।" },
      { q: "क्या हम रिपोर्ट को कस्टमाइज़ कर सकते हैं?", a: "हाँ, हर डैशबोर्ड को मॉड्यूलर लचीलेपन के लिए डिज़ाइन किया गया है।" }
    ],
    sa: [
      { q: "किम् ऑफ़लाइन सिंकिंग सुविधा अस्ति?", a: "आम्, अस्माकं व्यवस्था स्वतः तुल्यकालनं करोति।" },
      { q: "किम् प्रशिक्षणम् शामिल अस्ति?", a: "आम्, सर्व व्यवस्था प्रबन्धनार्थं प्रशिक्षणम् अस्ति।" },
      { q: "किम् वयं रिपोर्ट कस्टमाइज़ कर्तुं शक्नुमः?", a: "आम्, सर्व डैशबोर्ड मॉड्यूलर अस्ति।" }
    ]
  };

  const faqs = faqsData[langKey] || faqsData['en'];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
          })
        }}
      />
      
      <div className="mb-8">
        <Link href="/services" className="text-primary flex items-center gap-2 hover:underline text-sm font-display font-bold">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span> {t("Back to Services", "सेवाओं पर वापस", "सेवा प्रति गमनम्")}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        <div className="flex flex-col gap-6">
          <div>
            <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wide">
              {service.category}
            </span>
            <h1 className="text-white font-display text-4xl md:text-5xl font-bold mt-2 leading-tight">
              {service.title}
            </h1>
          </div>
          <p className="text-muted text-lg font-body leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {service.techStack.map((tech, index) => (
              <span key={index} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-400 text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-background-dark font-display font-semibold text-[15px]">
              {t("Get Free Demo", "निःशुल्क डेमो प्राप्त करें", "निःशुल्क प्रदर्शनम्")}
            </Link>
          </div>
        </div>

        {/* Features Card list */}
        <div className="glass-card p-8 rounded-2xl flex flex-col gap-6 border-t-2 border-t-primary/20">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">{service.icon}</span>
          </div>
          <h3 className="font-display font-bold text-xl text-white">{t("Core Modules & Features", "मुख्य मॉड्यूल और विशेषताएं", "मुख्य विभाग विशेषता च")}</h3>
          <ul className="flex flex-col gap-3">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-muted text-sm md:text-base">
                <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="glass-card p-8 rounded-xl border border-white/5 bg-background-dark/30 mb-12">
        <h3 className="font-display font-bold text-2xl text-white mb-6 text-center">{t("Value Deliverables", "मूल्य वितरण", "मूल्य प्रबन्धनम्")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-start gap-4">
              <div className="size-8 rounded-md bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] flex-shrink-0">
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </div>
              <p className="text-muted text-sm leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto w-full mt-12 mb-8">
        <h3 className="font-display font-bold text-2xl text-white mb-6 text-center">{t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल", "अक्सर पूछे जाने वाले सवाल")}</h3>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl border border-white/5 bg-background-dark/20">
              <button 
                className="w-full flex items-center justify-between text-left text-white font-display font-semibold text-base group"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className={`material-symbols-outlined transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary' : 'text-slate-500 group-hover:text-primary'}`}>expand_more</span>
              </button>
              {openFaq === idx && (
                <p className="mt-3 text-sm text-slate-400 font-body leading-relaxed animate-fade-in pr-8">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

