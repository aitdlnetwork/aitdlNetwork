/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
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

  // Stats
  stat_students: string;
  stat_systems: string;
  stat_uptime: string;
  stat_trusted_in: string;

  // Who We Serve
  serve_title: string;
  serve_coaching: string;
  serve_coaching_desc: string;
  serve_schools: string;
  serve_schools_desc: string;
  serve_retail: string;
  serve_retail_desc: string;
  serve_gym: string;
  serve_gym_desc: string;
  serve_hiking: string;
  serve_hiking_desc: string;
  serve_realestate: string;
  serve_realestate_desc: string;
  serve_ngo: string;
  serve_ngo_desc: string;
  serve_ai: string;
  serve_ai_desc: string;
  cta_free_demo: string;

  // Footer Tagline
  footer_tagline: string;

  // Footer Headers
  footer_col_services: string;
  footer_col_office: string;
  footer_col_corporate: string;
  footer_col_legal: string;

  // Footer Links - Services
  footer_link_aiml: string;
  footer_link_enterprise: string;
  footer_link_cloud: string;
  footer_link_viewall: string;

  // Footer Links - Office
  footer_link_login: string;
  footer_link_analytics: string;
  footer_link_support: string;

  // Footer Links - Corporate
  footer_link_mission: string;
  footer_link_knowledge: string;
  footer_link_gorakhpur: string;
  footer_link_fee: string;
  footer_link_attendance: string;
  footer_link_portfolio: string;
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
    cta_demo: "Access Systems",
    stat_students: "Students Managed",
    stat_systems: "Live Systems Deployed",
    stat_uptime: "Uptime Performance",
    stat_trusted_in: "Trusted in",
    serve_title: "Who We Serve",
    serve_coaching: "Coaching Institutes",
    serve_coaching_desc: "Streamline student management and fee tracking with our specialized tools.",
    serve_schools: "Schools & Training",
    serve_schools_desc: "Modern LMS and digital infrastructure designed for enterprise-level learning.",
    serve_retail: "Retail & Businesses",
    serve_retail_desc: "Fast POS and automated billing systems to handle high-volume sales seamlessly.",
    serve_gym: "Gym & Fitness",
    serve_gym_desc: "Membership management and automated alerts for your fitness community.",
    serve_hiking: "Hiking & Trekking",
    serve_hiking_desc: "Booking management, equipment tracking, and safety alerts for outdoor adventure operators.",
    serve_realestate: "Real Estate & Property",
    serve_realestate_desc: "Tenant portals, lease automation, and ticketing frameworks for modern building managers.",
    serve_ngo: "NGOs & Societies",
    serve_ngo_desc: "Donor management, fundraising tracking, and member-portals for non-profits and housing societies.",
    serve_ai: "Adaptive AI Learning",
    serve_ai_desc: "Personalized study paths, smart quizzes, and teacher self-evaluation portals for student self-learning.",
    cta_free_demo: "Get Free Demo",
    footer_tagline: "Architecting intelligent sovereign infrastructures and secure deep learning pipelines for enterprise scalability.",
    footer_col_services: "Core Services",
    footer_col_office: "Client Office",
    footer_col_corporate: "Corporate",
    footer_col_legal: "Legal",
    footer_link_aiml: "AI & ML Pipelines",
    footer_link_enterprise: "Enterprise Systems",
    footer_link_cloud: "Cloud Solutions",
    footer_link_viewall: "View All",
    footer_link_login: "Sovereign Login",
    footer_link_analytics: "Analytics Workspace",
    footer_link_support: "Request Support",
    footer_link_mission: "Our Mission",
    footer_link_knowledge: "Knowledge Base",
    footer_link_gorakhpur: "Gorakhpur Node",
    footer_link_fee: "Fee Calculator",
    footer_link_attendance: "Attendance Tool",
    footer_link_portfolio: "Deployments"
  },
  hi: {
    nav_about: "हमारे बारे में",
    nav_services: "सेवाएं",
    nav_portfolio: "पोर्टफोलियो",
    nav_contact: "संपर्क",
    hero_badge: "संप्रभु इन्फ्रास्ट्रक्चर और एआई",
    hero_title: "सुरक्षित एंटरप्राइज इंटेलिजेंस",
    hero_subtitle: "बड़े परिचालन भार के लिए सुरक्षित डीप लर्निंग पाइपलाइनों और संप्रभु पारिस्थितिक तंत्र का निर्माण।",
    cta_demo: "सिस्टम एक्सेस",
    stat_students: "छात्र व्यवस्थित",
    stat_systems: "लाइव सिस्टम तैनात",
    stat_uptime: "अपटाइम प्रदर्शन",
    stat_trusted_in: "भरोसा है",
    serve_title: "हम किसकी सेवा करते हैं",
    serve_coaching: "कोचिंग संस्थान",
    serve_coaching_desc: "हमारे विशेष साधनों से छात्र प्रबंधन और शुल्क ट्रैकिंग को सुव्यवस्थित करें।",
    serve_schools: "स्कूल और प्रशिक्षण",
    serve_schools_desc: "एंटरप्राइज-स्तरीय सीखने के लिए डिज़ाइन किया गया आधुनिक एलएमएस और डिजिटल बुनियादी ढांचा।",
    serve_retail: "खुदरा और व्यवसाय",
    serve_retail_desc: "उच्च मात्रा में बिक्री को संभालने के लिए तेज पीओएस और स्वचालित बिलिंग सिस्टम।",
    serve_gym: "जिम और फिटनेस",
    serve_gym_desc: "आपके फिटनेस समुदाय के लिए सदस्यता प्रबंधन और स्वचालित अलर्ट।",
    serve_hiking: "हाइकिंग और ट्रेकिंग",
    serve_hiking_desc: "आउटडोर एडवेंचर ऑपरेटरों के लिए बुकिंग प्रबंधन और सुरक्षा अलर्ट।",
    serve_realestate: "रियल एस्टेट और संपत्ति",
    serve_realestate_desc: "किराएदार पोर्टल और आधुनिक भवन प्रबंधकों के लिए टिकटिंग ढांचा।",
    serve_ngo: "एनजीओ और सोसायटियां",
    serve_ngo_desc: "गैर-लाभकारी संस्थाओं और आवास समितियों के लिए दाता प्रबंधन और धन उगाहने की ट्रैकिंग।",
    serve_ai: "एडेप्टिव एआई लर्निंग",
    serve_ai_desc: "छात्रों के स्व-शिक्षण के लिए व्यक्तिगत अध्ययन मार्ग और स्मार्ट क्विज़।",
    cta_free_demo: "नि:शुल्क डेमो प्राप्त करें",
    footer_tagline: "एंटरप्राइज स्केलेबिलिटी के लिए बुद्धिमान संप्रभु बुनियादी ढांचे और सुरक्षित डीप लर्निंग पाइपलाइनों का निर्माण।",
    footer_col_services: "मुख्य सेवाएं",
    footer_col_office: "क्लाइंट ऑफिस",
    footer_col_corporate: "कॉर्पोरेट",
    footer_col_legal: "कानूनी",
    footer_link_aiml: "एआई और एमएल पाइपलाइन्स",
    footer_link_enterprise: "एंटरप्राइज सिस्टम",
    footer_link_cloud: "क्लाउड सॉल्यूशंस",
    footer_link_viewall: "सभी देखें",
    footer_link_login: "संप्रभु लॉगिन",
    footer_link_analytics: "एनालिटिक्स वर्कस्पेस",
    footer_link_support: "सहायता का अनुरोध करें",
    footer_link_mission: "हमारा मिशन",
    footer_link_knowledge: "ज्ञानकोष",
    footer_link_gorakhpur: "गोरखपुर नोड",
    footer_link_fee: "शुल्क कैलकुलेटर",
    footer_link_attendance: "उपस्थिति उपकरण",
    footer_link_portfolio: "तैनाती"
  },
  sa: {
    nav_about: "विषये",
    nav_services: "सेवाः",
    nav_portfolio: "कार्यम्",
    nav_contact: "सम्पर्कः",
    hero_badge: "सर्वभौम तन्त्रज्ञानम् एआई",
    hero_title: "सुरक्षित उद्योग प्रज्ञा तन्त्रम्",
    hero_subtitle: "उच्च स्तरस्य कार्यभाराय गणन तन्त्राणां रचना।",
    cta_demo: "तन्त्र प्रवेशः",
    stat_students: "छात्राः व्यवस्थिताः",
    stat_systems: "तन्त्राणि విన్యాసః",
    stat_uptime: "अपटाइम प्रदर्शनम्",
    stat_trusted_in: "सम्पर्कः अस्ति",
    serve_title: "वयं सेवा कुर्मः",
    serve_coaching: "कोचिंग संस्थाः",
    serve_coaching_desc: "छात्र प्रबन्धनं शुल्क ट्रैकिंग सरल कुर्मः।",
    serve_schools: "विद्यालय प्रशिक्षणम्",
    serve_schools_desc: "आधुनिक एलएमएस डिजिटल व्यवस्था व्यवस्थापनम्।",
    serve_retail: "विक्रय व्यापारम्",
    serve_retail_desc: "उच्च विक्रय व्यवस्थापनार्थं पीओएस बिलिंग तन्त्रम्।",
    serve_gym: "जिम फिटनेस च",
    serve_gym_desc: "सदस्य प्रबन्धनं स्वचालित अलर्ट व्यवस्था च।",
    serve_hiking: "हाइकिंग ट्रेकिंग",
    serve_hiking_desc: "सुरक्षा अलर्ट व्यवस्था प्रबन्धनम्।",
    serve_realestate: "रियल एस्टेट संपत्तिः",
    serve_realestate_desc: "किरायेदार पोर्टल्स व्यवस्थापनम्।",
    serve_ngo: "एनजीओ सोसायट्यः",
    serve_ngo_desc: "दान प्रबन्धन व्यवस्था च।",
    serve_ai: "विवेक एआई पठनम्",
    serve_ai_desc: "स्व-पठनार्थं व्यक्तिगत मार्ग निर्माणम्।",
    cta_free_demo: "निःशुल्क प्रदर्शनम् लभत",
    footer_tagline: "सर्वभौम तन्त्र व्यवस्थापनम् स्वायत्त स्वचालनम् च।",
    footer_col_services: "मुख्य सेवाः",
    footer_col_office: "ग्राहक कार्यालयम्",
    footer_col_corporate: "कॉर्पोरेट",
    footer_col_legal: "विधि",
    footer_link_aiml: "एआई एमएल पाइपलाइन्स्",
    footer_link_enterprise: "व्यवसाय व्यवस्था",
    footer_link_cloud: "मेघ समाधानम्",
    footer_link_viewall: "सर्वं पश्यन्तु",
    footer_link_login: "सर्वभौम प्रवेशः",
    footer_link_analytics: "विश्लेषण कार्यक्षेत्रम्",
    footer_link_support: "अनुरोध प्राप्त करें",
    footer_link_mission: "अस्माकं ध्येयम्",
    footer_link_knowledge: "ज्ञानकोषः",
    footer_link_gorakhpur: "गोरखपुर नोड",
    footer_link_fee: "शुल्क गणकः",
    footer_link_attendance: "उपस्थिति गणकः",
    footer_link_portfolio: "विन्यास कार्यम्"
  }
};
