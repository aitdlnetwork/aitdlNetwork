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

  // Partner Portal
  partner_hero_badge: string;
  partner_hero_title: string;
  partner_hero_desc: string;
  partner_value_nodes_title: string;
  partner_value_nodes_desc: string;
  partner_value_security_title: string;
  partner_value_security_desc: string;
  partner_value_localized_title: string;
  partner_value_localized_desc: string;
  partner_tier_tech_title: string;
  partner_tier_tech_desc: string;
  partner_tier_ref_title: string;
  partner_tier_ref_desc: string;
  partner_tier_ent_title: string;
  partner_tier_ent_desc: string;
  partner_form_title: string;
  partner_form_desc: string;
  partner_form_name: string;
  partner_form_email: string;
  partner_form_org: string;
  partner_form_type: string;
  partner_form_comments: string;
  partner_form_submit: string;
  partner_form_success_title: string;
  partner_form_success_desc: string;

  // CRM Admin/Student
  crm_admin_title: string;
  crm_admin_revenue: string;
  crm_admin_students: string;
  crm_admin_uptime: string;
  crm_admin_manage_btn: string;
  crm_admin_invoice_btn: string;
  crm_admin_paid_btn: string;
  crm_status_paid: string;
  crm_status_pending: string;

  // Additional Layout Keys
  footer_link_partners: string;
  footer_link_founders: string;
  dashboard_node_overview: string;
  dashboard_crm: string;
  login_title: string;
  login_subtitle: string;
  login_email: string;
  login_pass: string;
  login_btn: string;
  login_no_account: string;
  login_signup: string;
  profile_title: string;
  profile_role: string;
  profile_since: string;
  profile_signout: string;
  login_direct_access: string;
  login_bypass: string;
  nav_demo: string;
  nav_client_portal: string;
  nav_dashboard: string;
  nav_text_size: string;
  footer_secure_transactions: string;
  footer_encrypted_server: string;
  footer_terms: string;
  footer_privacy: string;
  footer_sovereign_version: string;
  footer_designed_by: string;
  footer_connect_btn: string;
  crm_enlisted_course: string;
  crm_batch_timings: string;
  crm_admission_ledger: string;
  crm_financial_ledger: string;
  crm_sync_statements: string;
  crm_days_mon_fri: string;
  crm_status_active: string;
  db_workspace_nodes: string;
  db_node_analytics: string;
  db_node_settings: string;
  db_secure_session: string;
  db_decommission: string;
  db_overview_subtitle: string;
  db_crm_subtitle: string;
  db_live_users: string;
  db_api_requests: string;
  db_system_audit: string;
  db_infra_nodes: string;
  crm_admin_leads: string;
  crm_admin_inquiries: string;
  crm_admin_filter_placeholder: string;
  crm_admin_table_id: string;
  crm_admin_table_clearance: string;
  crm_admin_table_status: string;
  crm_admin_table_action: string;
  crm_admin_modal_provision: string;
  crm_admin_modal_name: string;
  crm_admin_modal_email: string;
  crm_admin_modal_deploy: string;
  crm_admin_msg_provisioned: string;
  crm_admin_msg_decommissioned: string;
  crm_admin_msg_revenue_confirmed: string;
  crm_admin_leads_org: string;
  crm_admin_leads_contact: string;
  crm_admin_leads_tier: string;
  crm_admin_respond: string;
  profile_rotate_seed_msg: string;
  profile_rotate_success_msg: string;
  profile_rotate_request_btn: string;
  cta_cancel: string;
  
  // UI Granular Keys
  ui_loading_nodes: string;
  ui_no_matches: string;
  ui_no_leads: string;
  ui_unassigned_node: string;
  ui_btn_review: string;
  ui_btn_delete: string;
  ui_label_account: string;
  ui_label_active: string;
  ui_individual: string;
  
  // Auth & Final UI Keys
  login_msg_success: string;
  login_msg_error: string;
  login_reset: string;
  ui_text_size: string;
  
  // Partner Specific Final Keys
  partner_form_apply_another: string;
  partner_type_tech: string;
  partner_type_ref: string;
  partner_type_ent: string;
  partner_tiers_title: string;
  partner_points_tech: string[];
  partner_points_ref: string[];
  partner_points_ent: string[];
  partner_placeholder_comments: string;
  hero_trust_backups: string;
  hero_trust_nodes: string;
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
    footer_link_portfolio: "Deployments",
    partner_hero_badge: "Ecosystem Alpha",
    partner_hero_title: "Architect the Future of Sovereign Tech",
    partner_hero_desc: "AITDL Network is seeking technical nodes and commercial partners to deploy indigenous infrastructure.",
    partner_value_nodes_title: "Sovereign Nodes",
    partner_value_nodes_desc: "Deploy local-first infrastructure that guarantees data privacy.",
    partner_value_security_title: "Zero-Trust Security",
    partner_value_security_desc: "Implement AES-256 encrypted gateways and secure protocols.",
    partner_value_localized_title: "Localized Reach",
    partner_value_localized_desc: "Deep integration with regional languages for inclusive digital scaling.",
    partner_tier_tech_title: "Technical Node Partner",
    partner_tier_tech_desc: "Certified implementation of LMS and CRM nodes.",
    partner_tier_ref_title: "Strategic Referral Node",
    partner_tier_ref_desc: "Earn recurring revenue by expanding the network footprint.",
    partner_tier_ent_title: "Enterprise Solutions",
    partner_tier_ent_desc: "Large-scale NGO and Government digital transformation projects.",
    partner_form_title: "Connect with the Network",
    partner_form_desc: "Finalize your node status by submitting this application.",
    partner_form_name: "Full Name",
    partner_form_email: "Email Node",
    partner_form_org: "Organization / Title",
    partner_form_type: "Collaboration Type",
    partner_form_comments: "Initial Intel / Comments",
    partner_form_submit: "Submit to Core",
    partner_form_success_title: "Application Received",
    partner_form_success_desc: "A representative will reach out within 24 standard terminal hours.",
    crm_admin_title: "Administrative Control",
    crm_admin_revenue: "Total Revenue Node",
    crm_admin_students: "Total Student Nodes",
    crm_admin_uptime: "System Uptime",
    crm_admin_manage_btn: "Manage Student",
    crm_admin_invoice_btn: "Provision Invoice",
    crm_admin_paid_btn: "Mark as Paid",
    crm_status_paid: "Paid",
    crm_status_pending: "Pending",
    footer_link_partners: "Partner Portal",
    footer_link_founders: "Founders",
    dashboard_node_overview: "Node Overview",
    dashboard_crm: "CRM Dashboard",
    login_title: "Network Authentication",
    login_subtitle: "Access Sovereign Digital Infrastructure",
    login_email: "Node identifier (Email)",
    login_pass: "Encryption Key (Password)",
    login_btn: "Authorize Access",
    login_no_account: "No Node Allocation?",
    login_signup: "Apply for Node",
    profile_title: "Node Profile",
    profile_role: "Current Clearance",
    profile_since: "Node Active Since",
    profile_signout: "Deauthorize Session",
    login_direct_access: "Direct Mock Access:",
    login_bypass: "Bypass Auth Pipeline",
    nav_demo: "Demo",
    nav_client_portal: "Client Portal",
    nav_dashboard: "Dashboard",
    nav_text_size: "Text Size",
    footer_secure_transactions: "SECURE TRANSACTIONS",
    footer_encrypted_server: "256-Bit Encrypted Secure Server Gateway",
    footer_terms: "Terms",
    footer_privacy: "Privacy",
    footer_sovereign_version: "Sovereign Node v1.2",
    footer_designed_by: "Designed & Architected by Jawahar R Mallah",
    footer_connect_btn: "Connect",
    crm_enlisted_course: "Current Enlisted Course",
    crm_batch_timings: "Batch Timings",
    crm_admission_ledger: "Admission Ledger Date",
    crm_financial_ledger: "Financial Ledger Nodes",
    crm_sync_statements: "Sync Statements",
    crm_days_mon_fri: "IST Mon-Fri",
    crm_status_active: "Active Loop",
    db_workspace_nodes: "Workspace Nodes",
    db_node_analytics: "Node Analytics",
    db_node_settings: "Nodes Settings",
    db_secure_session: "Secure Session Active",
    db_decommission: "Decommission Session",
    db_overview_subtitle: "Sovereign infrastructure continuous delivery diagnostics.",
    db_crm_subtitle: "Sovereign client and node asset administration workspace.",
    db_live_users: "Live Active Users",
    db_api_requests: "API Requests / Total",
    db_system_audit: "System Audit Stream",
    db_infra_nodes: "Infrastructure Nodes",
    crm_admin_leads: "Partner Leads",
    crm_admin_inquiries: "Inbound Partner Inquiries",
    crm_admin_filter_placeholder: "Filter node identifier...",
    crm_admin_table_id: "Identifier",
    crm_admin_table_clearance: "Clearance",
    crm_admin_table_status: "Status",
    crm_admin_table_action: "Action",
    crm_admin_modal_provision: "Provision Node",
    crm_admin_modal_name: "Identifier Name",
    crm_admin_modal_email: "Network Email",
    crm_admin_modal_deploy: "Deploy",
    crm_admin_msg_provisioned: "Node Provisioned Successfully.",
    crm_admin_msg_decommissioned: "Node Decommissioned.",
    crm_admin_msg_revenue_confirmed: "Revenue Confirmed: Node updated.",
    crm_admin_leads_org: "Partner Org",
    crm_admin_leads_contact: "Contact",
    crm_admin_leads_tier: "Tier",
    crm_admin_respond: "Respond",
    profile_rotate_seed_msg: "Generating New Cipher Seed...",
    profile_rotate_success_msg: "Cipher Key Successfully Rotated",
    profile_rotate_request_btn: "Request Cipher Key Rotation",
    cta_cancel: "Cancel",
    ui_loading_nodes: "Synchronizing node network...",
    ui_no_matches: "No matches in current segment.",
    ui_no_leads: "No inbound leads captured yet.",
    ui_unassigned_node: "Unassigned Node",
    ui_btn_review: "REVIEW",
    ui_btn_delete: "DELETE",
    ui_label_account: "account",
    ui_label_active: "ACTIVE",
    ui_individual: "Individual",
    login_msg_success: "Access Authorized: Synchronization active.",
    login_msg_error: "System Exception: Connection Interrupted.",
    login_reset: "Reset",
    ui_text_size: "Text Size",
    partner_form_apply_another: "Apply for another tier",
    partner_type_tech: "Technical Implementation",
    partner_type_ref: "Referral Partnership",
    partner_type_ent: "Enterprise Collaboration",
    partner_tiers_title: "Partnership Tiers",
    partner_points_tech: ["Server Provisioning", "Local Support", "Custom Integrations"],
    partner_points_ref: ["Lead Generation", "Network Advocacy", "Commission Structure"],
    partner_points_ent: ["Co-branding Space", "Dedicated SA", "Tender Support"],
    partner_placeholder_comments: "How do you plan to scale with AITDL?",
    hero_trust_backups: "Sovereign infrastructure backups",
    hero_trust_nodes: "Fully sandboxed local nodes"
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
    footer_link_portfolio: "तैनाती",
    partner_hero_badge: "पारिस्थितिकी तंत्र अल्फा",
    partner_hero_title: "संप्रभु तकनीक के भविष्य का निर्माण करें",
    partner_hero_desc: "AITDL नेटवर्क स्वदेशी बुनियादी ढांचे को तैनात करने के लिए तकनीकी नोड्स और भागीदारों की तलाश कर रहा है।",
    partner_value_nodes_title: "संप्रभु नोड्स",
    partner_value_nodes_desc: "स्थानीय-प्रथम बुनियादी ढांचा तैनात करें जो डेटा गोपनीयता की गारंटी देता है।",
    partner_value_security_title: "जीरो-ट्रस्ट सुरक्षा",
    partner_value_security_desc: "AES-256 एन्क्रिप्टेड गेटवे और सुरक्षित प्रोटोकॉल लागू करें।",
    partner_value_localized_title: "स्थानीय पहुँच",
    partner_value_localized_desc: "समावेशी डिजिटल विकास के लिए क्षेत्रीय भाषाओं के साथ गहरा एकीकरण।",
    partner_tier_tech_title: "तकनीकी नोड पार्टनर",
    partner_tier_tech_desc: "एलएमएस और सीआरएम नोड्स का प्रमाणित कार्यान्वयन।",
    partner_tier_ref_title: "रणनीतिक रेफरल नोड",
    partner_tier_ref_desc: "नेटवर्क पदचिह्न का विस्तार करके आवर्ती राजस्व अर्जित करें।",
    partner_tier_ent_title: "एंटरप्राइज समाधान",
    partner_tier_ent_desc: "बड़े पैमाने पर एनजीओ और सरकारी डिजिटल परिवर्तन परियोजनाएं।",
    partner_form_title: "नेटवर्क से जुड़ें",
    partner_form_desc: "इस आवेदन को जमा करके अपनी नोड स्थिति को अंतिम रूप दें।",
    partner_form_name: "पूरा नाम",
    partner_form_email: "ईमेल नोड",
    partner_form_org: "संगठन / पद",
    partner_form_type: "सहयोग का प्रकार",
    partner_form_comments: "प्रारंभिक जानकारी / टिप्पणियाँ",
    partner_form_submit: "कोर में जमा करें",
    partner_form_success_title: " आवेदन प्राप्त हुआ",
    partner_form_success_desc: "एक प्रतिनिधि 24 मानक घंटों के भीतर संपर्क करेगा।",
    crm_admin_title: "प्रशासनिक नियंत्रण",
    crm_admin_revenue: "कुल राजस्व नोड",
    crm_admin_students: "कुल छात्र नोड",
    crm_admin_uptime: "सिस्टम अपटाइम",
    crm_admin_manage_btn: "छात्र प्रबंधित करें",
    crm_admin_invoice_btn: "इनवॉइस प्रदान करें",
    crm_admin_paid_btn: "पेड के रूप में चिह्नित करें",
    crm_status_paid: "सफल भुगतान",
    crm_status_pending: "लंबित",
    footer_link_partners: "पार्टनर पोर्टल",
    footer_link_founders: "हमारे संस्थापक",
    dashboard_node_overview: "नोड ओवरव्यू",
    dashboard_crm: "सीआरएम डैशबोर्ड",
    login_title: "नेटवर्क प्रमाणीकरण",
    login_subtitle: "संप्रभु डिजिटल बुनियादी ढांचे तक पहुंचें",
    login_email: "नोड पहचानकर्ता (ईमेल)",
    login_pass: "एन्क्रिप्शन कुंजी (पासवर्ड)",
    login_btn: "पहुंच अधिकृत करें",
    login_no_account: "कोई नोड आवंटन नहीं?",
    login_signup: "नोड के लिए आवेदन करें",
    profile_title: "नोड प्रोफ़ाइल",
    profile_role: "वर्तमान निकासी (Clearance)",
    profile_since: "नोड सक्रियता तिथि",
    profile_signout: "सत्र वि-अधिकृत करें",
    login_direct_access: "प्रत्यक्ष मॉक एक्सेस:",
    login_bypass: "बायपास ऑथ पाइपलाइन",
    nav_demo: "डेमो",
    nav_client_portal: "क्लाइंट पोर्टल",
    nav_dashboard: "डैशबोर्ड",
    nav_text_size: "पाठ का आकार",
    footer_secure_transactions: "सुरक्षित लेनदेन",
    footer_encrypted_server: "256-बिट एन्क्रिप्टेड सुरक्षित सर्वर गेटवे",
    footer_terms: "शर्तें",
    footer_privacy: "गोपनीयता",
    footer_sovereign_version: "संप्रभु नोड v1.2",
    footer_designed_by: "डिजाइन और आर्किटेक्ट: जवाहर आर मल्लाह",
    footer_connect_btn: "संपर्क करें",
    crm_enlisted_course: "वर्तमान नामांकित पाठ्यक्रम",
    crm_batch_timings: "बैच का समय",
    crm_admission_ledger: "प्रवेश खाता तिथि",
    crm_financial_ledger: "वित्तीय खाता नोड्स",
    crm_sync_statements: "बयान सिंक करें",
    crm_days_mon_fri: "IST सोम-शुक्र",
    crm_status_active: "सक्रिय लूप",
    db_workspace_nodes: "कार्यक्षेत्र नोड्स",
    db_node_analytics: "नोड एनालिटिक्स",
    db_node_settings: "नोड सेटिंग्स",
    db_secure_session: "सुरक्षित सत्र सक्रिय",
    db_decommission: "सत्र समाप्त करें",
    db_overview_subtitle: "संप्रभु बुनियादी ढांचा निरंतर वितरण निदान।",
    db_crm_subtitle: "संप्रभु क्लाइंट और नोड संपत्ति प्रशासन कार्यक्षेत्र।",
    db_live_users: "लाइव सक्रिय उपयोगकर्ता",
    db_api_requests: "कुल एपीआई अनुरोध",
    db_system_audit: "सिस्टम ऑडिट स्ट्रीम",
    db_infra_nodes: "इन्फ्रास्ट्रक्चर नोड्स",
    crm_admin_leads: "पार्टनर लीड्स",
    crm_admin_inquiries: "इनबाउंड पार्टनर पूछताछ",
    crm_admin_filter_placeholder: "नोड पहचानकर्ता फ़िल्टर करें...",
    crm_admin_table_id: "पहचानकर्ता",
    crm_admin_table_clearance: "निकासी",
    crm_admin_table_status: "स्थिति",
    crm_admin_table_action: "कार्रवाई",
    crm_admin_modal_provision: "नोड प्रावधान",
    crm_admin_modal_name: "पहचानकर्ता का नाम",
    crm_admin_modal_email: "नेटवर्क ईमेल",
    crm_admin_modal_deploy: "तैनात करें",
    crm_admin_msg_provisioned: "नोड सफलतापूर्वक प्रावधानित।",
    crm_admin_msg_decommissioned: "नोड सेवामुक्त कर दिया गया।",
    crm_admin_msg_revenue_confirmed: "राजस्व की पुष्टि: नोड अपडेट किया गया।",
    crm_admin_leads_org: "पार्टनर संस्था",
    crm_admin_leads_contact: "संपर्क करें",
    crm_admin_leads_tier: "श्रेणी",
    crm_admin_respond: "जवाब दें",
    profile_rotate_seed_msg: "नया सिफर बीज उत्पन्न किया जा रहा है...",
    profile_rotate_success_msg: "सिफर कुंजी सफलतापूर्वक घुमाई गई",
    profile_rotate_request_btn: "सिफर कुंजी रोटेशन का अनुरोध करें",
    cta_cancel: "रद्द करें",
    ui_loading_nodes: "नोड नेटवर्क सिंक हो रहा है...",
    ui_no_matches: "वर्तमान खंड में कोई मिलान नहीं।",
    ui_no_leads: "अभी तक कोई लीड प्राप्त नहीं हुई।",
    ui_unassigned_node: "अनिर्धारित नोड",
    ui_btn_review: "समीक्षा",
    ui_btn_delete: "हटाएं",
    ui_label_account: "खाता",
    ui_label_active: "सक्रिय",
    ui_individual: "व्यक्तिगत",
    login_msg_success: "पहुंच अधिकृत: सिंक्रोनाइज़ेशन सक्रिय।",
    login_msg_error: "सिस्टम अपवाद: कनेक्शन बाधित।",
    login_reset: "रीसेट करें",
    ui_text_size: "पाठ का आकार",
    partner_form_apply_another: "दूसरे स्तर के लिए आवेदन करें",
    partner_type_tech: "तकनीकी कार्यान्वयन",
    partner_type_ref: "रेफरल साझेदारी",
    partner_type_ent: "एंटरप्राइज सहयोग",
    partner_tiers_title: "साझेदारी स्तर",
    partner_points_tech: ["सर्वर प्रावधान", "स्थानीय सहायता", "कस्टम एकीकरण"],
    partner_points_ref: ["लीड जेनरेशन", "नेटवर्क एडवोकेसी", "कमीशन संरचना"],
    partner_points_ent: ["को-ब्रांडिंग स्पेस", "समर्पित एसए", "निविदा सहायता"],
    partner_placeholder_comments: "आप AITDL के साथ स्केलिंग की योजना कैसे बनाते हैं?",
    hero_trust_backups: "संप्रभु बुनियादी ढांचा बैकअप",
    hero_trust_nodes: "पूरी तरह से सैंडबॉक्स्ड स्थानीय नोड्स"
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
    stat_systems: "तन्त्राणि విన్यासः",
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
    footer_link_portfolio: "विन्यास कार्यम्",
    partner_hero_badge: "परिसंस्था अल्फा",
    partner_hero_title: "संप्रभु तन्त्रस्य भविष्यं रचयत",
    partner_hero_desc: "AITDL जालम् स्वदेशी तन्त्र विन्यासाय तकनीकी नोड्स भागिनः च अन्वेषयति।",
    partner_value_nodes_title: "संप्रभु नोड्स",
    partner_value_nodes_desc: "स्थानीय-प्रथम तन्त्र विन्यासः यः दत्तांश गोपनीयतायाः गारण्टीं ददाति।",
    partner_value_security_title: "शून्य-विश्वास सुरक्षा",
    partner_value_security_desc: "AES-256 एन्क्रिप्टेड गेटवे सुरक्षा नियमाः च प्रवर्तयन्तु।",
    partner_value_localized_title: "स्थानीय व्याप्तिः",
    partner_value_localized_desc: "समावेशी डिजिटल विकासाय क्षेत्रीय भाषाभिः सह गभीरं एकीकरणम्।",
    partner_tier_tech_title: "तकनीकी नोड सहभागी",
    partner_tier_tech_desc: "एलएमएस सीआरएम नोड्स च प्रमाणित कार्यान्वयनम्।",
    partner_tier_ref_title: "रणनीतिक सन्दर्भ नोड",
    partner_tier_ref_desc: "जालस्य विस्तारं कृत्वा आवर्ती राजस्वं अर्जयत।",
    partner_tier_ent_title: "एंटरप्राइज समाधानम्",
    partner_tier_ent_desc: "विशाल स्तरीय एनजीओ सरकारी डिजिटल परिवर्तन प्रकल्पाः।",
    partner_form_title: "जालेन सह सम्पर्कं कुर्वन्तु",
    partner_form_desc: "एतत् आवेदनं प्रदाय स्वस्य नोड स्थितिं अन्तिमं कुर्वन्तु।",
    partner_form_name: "पूर्ण नाम",
    partner_form_email: "ईमेल नोड",
    partner_form_org: "संस्था / पदम्",
    partner_form_type: "सहयोग प्रकारः",
    partner_form_comments: "प्रारंभिक सूचना / टिप्पणी",
    partner_form_submit: "मुख्य केन्द्रे प्रेषयन्तु",
    partner_form_success_title: "आवेदनं प्राप्तम्",
    partner_form_success_desc: "प्रतिनिधिः २४ घण्टाभ्यः अन्तः सम्पर्कं करिष्यति।",
    crm_admin_title: "प्रशासनिक नियन्त्रणम्",
    crm_admin_revenue: "कुल राजस्व नोड",
    crm_admin_students: "कुल छात्र नोड",
    crm_admin_uptime: "तन्त्र अपटाइम",
    crm_admin_manage_btn: "छात्र प्रबन्धनम्",
    crm_admin_invoice_btn: "इनवॉइस प्रबन्धनम्",
    crm_admin_paid_btn: "पेड इति चिह्नितम् कुर्वन्तु",
    crm_status_paid: "दत्तम्",
    crm_status_pending: "लम्बितम्",
    footer_link_partners: "सहयोगी द्वारम्",
    footer_link_founders: "अस्माकं संस्थापकाः",
    dashboard_node_overview: "नोड दृश्यम्",
    dashboard_crm: "सीआरएम फलकम्",
    login_title: "जाल प्रमाणीकरणम्",
    login_subtitle: "संप्रभु डिजिटल संरचनायां प्रवेशः",
    login_email: "नोड परिचय (ईमेल)",
    login_pass: "गूढसङ्केतः (पासवर्ड)",
    login_btn: "प्रवेशः अधिकृत",
    login_no_account: "नोड आवंटनं नास्ति?",
    login_signup: "नोड आवेदनं कुर्वन्तु",
    profile_title: "नोड विवरणम्",
    profile_role: "वर्तमान स्तरः",
    profile_since: "सक्रियता कालः",
    profile_signout: "सत्र वि-अधिकार",
    login_direct_access: "प्रत्यक्ष प्रवेशः:",
    login_bypass: "सुरक्षा बायपास कुरु",
    nav_demo: "प्रदर्शनम्",
    nav_client_portal: "ग्राहक द्वारम्",
    nav_dashboard: "मुख्य फलकम्",
    nav_text_size: "पाठ आकारः",
    footer_secure_transactions: "सुरक्षित व्यवहारः",
    footer_encrypted_server: "२५५-बिट् गूढसन्देश सुरक्षित सर्वर द्वारम्",
    footer_terms: "नियमाः",
    footer_privacy: "गोपनीयता",
    footer_sovereign_version: "संप्रभु नोड v1.2",
    footer_designed_by: "संरचनाकारः: जवाहर आर मल्लाह",
    footer_connect_btn: "सम्पर्कः",
    crm_enlisted_course: "वर्तमान पाठ्यक्रमः",
    crm_batch_timings: "बैच समयः",
    crm_admission_ledger: "प्रवेश तिथिः",
    crm_financial_ledger: "वित्तीय लेखाः",
    crm_sync_statements: "विवरणं सिङ्क् कुर्वन्तु",
    crm_days_mon_fri: "IST सोम-शुक्र",
    crm_status_active: "सक्रिय चक्रम्",
    db_workspace_nodes: "कार्यक्षेत्र नोड्स",
    db_node_analytics: "नोड विश्लेषणम्",
    db_node_settings: "नोड विन्यासः",
    db_secure_session: "सुरक्षित सत्रम् सक्रियम्",
    db_decommission: "सत्रम् समाप्तम्",
    db_overview_subtitle: "संप्रभु संरचना व्यवस्थापनम्।",
    db_crm_subtitle: "ग्राहक नोड प्रशासन कार्यक्षेत्रम्।",
    db_live_users: "सक्रिय उपयोक्तारः",
    db_api_requests: "कुल एपीआई अनुरोधः",
    db_system_audit: "तन्त्र ऑडिट धारा",
    db_infra_nodes: "आधारभूत नोड्स",
    crm_admin_leads: "सहयोगी लीड्स्",
    crm_admin_inquiries: "आगन्तुक पृच्छा",
    crm_admin_filter_placeholder: "नोड अन्वेषणम्...",
    crm_admin_table_id: "परिचय",
    crm_admin_table_clearance: "अनुमतिः",
    crm_admin_table_status: "स्थितिः",
    crm_admin_table_action: "कार्यम्",
    crm_admin_modal_provision: "नोड निर्माणम्",
    crm_admin_modal_name: "नोड नाम",
    crm_admin_modal_email: "नेटवर्क पत्रम्",
    crm_admin_modal_deploy: "नियोजनम्",
    crm_admin_msg_provisioned: "नोड सफलतापूर्वक निर्मितम्।",
    crm_admin_msg_decommissioned: "नोड सेवामुक्तम्।",
    crm_admin_msg_revenue_confirmed: "राजस्व पुष्टि: नोड अद्यतनम्।",
    crm_admin_leads_org: "सहयोगी संस्था",
    crm_admin_leads_contact: "सम्पर्कः",
    crm_admin_leads_tier: "स्तरः",
    crm_admin_respond: "प्रत्युत्तरम्",
    profile_rotate_seed_msg: "नूतन बीजम् उत्पादयति...",
    profile_rotate_success_msg: "कुंजी सफलतापूर्वक परिवर्तिता",
    profile_rotate_request_btn: "कुंजी परिवर्तनार्थं अनुरोधः",
    cta_cancel: "निरस्तम्",
    ui_loading_nodes: "नोड संजालस्य समकालीकरणं भवति...",
    ui_no_matches: "अस्मिन् भागे कोऽपि मेलः नास्ति।",
    ui_no_leads: "अद्यापि कोऽपि आगमः नास्ति।",
    ui_unassigned_node: "अनिर्धारित नोड",
    ui_btn_review: "पुनरावलोकनम्",
    ui_btn_delete: "लोपः",
    ui_label_account: "लेखा",
    ui_label_active: "सक्रिय",
    ui_individual: "व्यक्तिगत",
    login_msg_success: "प्रवेशः अधिकृतः: समकालीकरणं सक्रियम्।",
    login_msg_error: "तन्त्र अपवादः: संयोजनं विच्छिन्नम्।",
    login_reset: "पुनः स्थापनम्",
    ui_text_size: "पाठ आकारः",
    partner_form_apply_another: "अन्यस्तराय आवेदनं कुर्वन्तु",
    partner_type_tech: "तकनीकी कार्यान्वयनम्",
    partner_type_ref: "सन्दर्भ साझेदारी",
    partner_type_ent: "महानिगम सहयोगः",
    partner_tiers_title: "सहयोग स्तराः",
    partner_points_tech: ["सर्वर प्रावधान", "स्थानीय सहयोगः", "विन्यास एकीकरणम्"],
    partner_points_ref: ["लीड जेनरेशन", "नेटवर्क एडवोकेसी", "कमीशन संरचना"],
    partner_points_ent: ["को-ब्रांडिंग स्थानम्", "समर्पित एसए", "निविदा सहयोगः"],
    partner_placeholder_comments: "भवान् AITDL इत्यनेन सह कथं स्केलिंग् योजनां करोति?",
    hero_trust_backups: "संप्रभु संरचना बैकअप",
    hero_trust_nodes: "पूर्णतया सैंडबॉक्स्ड स्थानीय नोड्स"
  }
};
