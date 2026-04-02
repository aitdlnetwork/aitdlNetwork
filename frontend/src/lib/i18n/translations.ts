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
  footer_col_nodes: string;
  footer_addr_gorakhpur: string;
  footer_addr_mumbai: string;

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
  hero_trust_security: string;

  // SmritiERP Multilingual Core
  erp_overview: string;
  erp_sales: string;
  erp_purchases: string;
  erp_inventory: string;
  erp_crm: string;
  erp_ledger: string;
  erp_settings: string;
  erp_manual: string;
  erp_private_workspace: string;
  erp_exit_home: string;
  erp_architect_title: string;
  
  // ERP Business Profile Panel
  erp_profile_title: string;
  erp_profile_subtitle: string;
  erp_profile_export: string;
  erp_profile_import: string;
  erp_profile_save: string;

  // ERP Sales Panel
  erp_sales_title: string;
  erp_sales_subtitle: string;
  erp_sales_new_doc: string;
  erp_sales_total_docs: string;
  erp_sales_paid_docs: string;
  erp_sales_collected_rev: string;
  erp_sales_pending_dues: string;

  // ERP Sidebar Components
  erp_notes_title: string;
  erp_notes_placeholder: string;
  erp_quote_title: string;
  erp_made_for_bharat: string;
  erp_status_pending: string;
  erp_status_in_process: string;
  erp_status_completed: string;
  erp_status_void: string;

  // ERP PWA Installation
  erp_install_title: string;
  erp_install_desc: string;
  erp_install_btn: string;

  // ERP Advanced Tasks
  erp_task_modal_title: string;
  erp_task_modal_edit: string;
  erp_task_content: string;
  erp_task_description: string;
  erp_task_priority: string;
  erp_task_due_date: string;
  erp_task_category: string;
  erp_task_save: string;
  erp_priority_low: string;
  erp_priority_medium: string;
  erp_priority_high: string;
  erp_priority_urgent: string;
  erp_category_general: string;
  erp_category_sales: string;
  erp_category_purchase: string;
  erp_category_personal: string;
  erp_sidebar_workspace: string;
  erp_sidebar_focus: string;
  erp_sidebar_system: string;
}

export const translations: Record<string, any> = {
  en: {
    nav_about: "About",
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_contact: "Contact",
    hero_badge: "SOVEREIGN INFRASTRUCTURE & AI",
    hero_title: "Advanced Coaching & School ERP",
    hero_subtitle: "The ultimate AI-powered operating system for coaching institutes, schools, and modern retail hubs.",
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
    footer_col_nodes: "Regional Offices",
    footer_addr_gorakhpur: "Golghar, Gorakhpur, UP - 273001",
    footer_addr_mumbai: "Andheri East, Mumbai, MH - 400069",
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
    partner_hero_badge: "Enterprise Ecosystem",
    partner_hero_title: "Architect the Future of Institutional Tech",
    partner_hero_desc: "AITDL Network is seeking technical partners and commercial associates to deploy advanced infrastructure.",
    partner_value_nodes_title: "Secure Portals",
    partner_value_nodes_desc: "Deploy local-first infrastructure that guarantees data privacy.",
    partner_value_security_title: "Enterprise Security",
    partner_value_security_desc: "Implement AES-256 encrypted gateways and secure protocols.",
    partner_value_localized_title: "Localized Reach",
    partner_value_localized_desc: "Deep integration with regional languages for inclusive digital scaling.",
    partner_tier_tech_title: "Technical Implementation Partner",
    partner_tier_tech_desc: "Certified implementation of LMS and CRM services.",
    partner_tier_ref_title: "Strategic Referral Partner",
    partner_tier_ref_desc: "Earn recurring revenue by expanding the network footprint.",
    partner_tier_ent_title: "Enterprise Solutions",
    partner_tier_ent_desc: "Large-scale NGO and Government digital transformation projects.",
    partner_form_title: "Connect with the Network",
    partner_form_desc: "Finalize your partner status by submitting this application.",
    partner_form_name: "Full Name",
    partner_form_email: "Email Address",
    partner_form_org: "Organization / Title",
    partner_form_type: "Collaboration Type",
    partner_form_comments: "Message / Comments",
    partner_form_submit: "Submit Application",
    partner_form_success_title: "Application Received",
    partner_form_success_desc: "A representative will reach out within 24 standard terminal hours.",
    crm_admin_title: "Administrative Control",
    crm_admin_revenue: "Total Revenue",
    crm_admin_students: "Total Students",
    crm_admin_uptime: "System Health",
    crm_admin_manage_btn: "Manage Student",
    crm_admin_invoice_btn: "Provision Invoice",
    crm_admin_paid_btn: "Mark as Paid",
    crm_status_paid: "Paid",
    crm_status_pending: "Pending",
    footer_link_partners: "Partner Portal",
    footer_link_founders: "Founders",
    dashboard_node_overview: "Overview",
    dashboard_crm: "Management Portal",
    login_title: "Portal Access",
    login_subtitle: "Professional Institutional Infrastructure",
    login_email: "Email Address",
    login_pass: "Security Password",
    login_btn: "Authorize Access",
    login_no_account: "New Institute?",
    login_signup: "Register Now",
    profile_title: "Profile",
    profile_role: "Account Type",
    profile_since: "Member Since",
    profile_signout: "Log Out",
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
    crm_financial_ledger: "Invoices",
    crm_sync_statements: "Refresh Statements",
    crm_days_mon_fri: "Mon-Fri (IST)",
    crm_status_active: "Active",
    db_workspace_nodes: "Dashboard",
    db_node_analytics: "Analytics",
    db_node_settings: "Settings",
    db_secure_session: "Session",
    db_decommission: "Log Out",
    db_overview_subtitle: "Real-time system health and connectivity diagnostics.",
    db_crm_subtitle: "Your account and course management hub",
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
    crm_admin_modal_provision: "Add New User",
    crm_admin_modal_name: "Full Name",
    crm_admin_modal_email: "Email Address",
    crm_admin_modal_deploy: "Add User",
    crm_admin_msg_provisioned: "User added successfully.",
    crm_admin_msg_decommissioned: "User account removed.",
    crm_admin_msg_revenue_confirmed: "Payment confirmed: Account updated.",
    crm_admin_leads_org: "Compnay / Org",
    crm_admin_leads_contact: "Contact Email",
    crm_admin_leads_tier: "Plan",
    crm_admin_respond: "Reply",
    profile_rotate_seed_msg: "Resetting Security Key...",
    profile_rotate_success_msg: "Security Key Reset Successful",
    profile_rotate_request_btn: "Reset Security Key",
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
    hero_trust_nodes: "Fully sandboxed local nodes",
    hero_trust_security: "Enterprise-grade SSL & Encryption",
    erp_overview: "Overview",
    erp_sales: "Sales & Invoices",
    erp_purchases: "Purchases",
    erp_inventory: "Inventory Master",
    erp_crm: "CRM / Entities",
    erp_ledger: "Ledger & Reports",
    erp_settings: "Business Profile",
    erp_manual: "Manual",
    erp_private_workspace: "Private Workspace",
    erp_exit_home: "Exit to AITDL Home",
    erp_architect_title: "System Architect",
    erp_profile_title: "Business Intelligence Profile",
    erp_profile_subtitle: "Configure your local workspace identity.",
    erp_profile_export: "Export Workspace File (.sqlite)",
    erp_profile_import: "Restore your Data",
    erp_profile_save: "Save & Synchronize",
    erp_sales_title: "Sales & Invoicing",
    erp_sales_subtitle: "Manage billing, receipts, and receivables.",
    erp_sales_new_doc: "New Document",
    erp_sales_total_docs: "Total Docs",
    erp_sales_paid_docs: "Paid Docs",
    erp_sales_collected_rev: "Collected Revenue",
    erp_sales_pending_dues: "Pending Dues",
    erp_install_title: "Install SmritiERP",
    erp_install_desc: "Install SmritiERP for 100% Offline Access.",
    erp_install_btn: "Install Now",
    erp_notes_title: "Daily SmiritiNotes",
    erp_notes_placeholder: "Capturing a thought...",
    erp_quote_title: "Today's Quote",
    erp_made_for_bharat: "Made for Bharat",
    erp_status_pending: "Pending",
    erp_status_in_process: "In Process",
    erp_status_completed: "Completed",
    erp_status_void: "Void/Rejected",
    erp_task_modal_title: "Add New Task",
    erp_task_modal_edit: "Edit Task",
    erp_task_content: "Task Title",
    erp_task_description: "Notes / Description",
    erp_task_priority: "Priority",
    erp_task_due_date: "Due Date",
    erp_task_category: "Category",
    erp_task_save: "Save Task",
    erp_priority_low: "Low",
    erp_priority_medium: "Medium",
    erp_priority_high: "High",
    erp_priority_urgent: "Urgent",
    erp_category_general: "General",
    erp_category_sales: "Sales",
    erp_category_purchase: "Purchase",
    erp_category_personal: "Personal",
    erp_sidebar_workspace: "Workspace",
    erp_sidebar_focus: "Daily Focus",
    erp_sidebar_system: "Workspace Config"
  },
  hi: {
    nav_about: "हमारे बारे में",
    nav_services: "सेवाएं",
    nav_portfolio: "पोर्टफोलियो",
    nav_contact: "संपर्क",
    hero_badge: "संप्रभु इन्फ्रास्ट्रक्चर और एआई",
    hero_title: "एडवांस्ड कोचिंग और स्कूल ईआरपी",
    hero_subtitle: "कोचिंग संस्थानों, स्कूलों और आधुनिक खुदरा केंद्रों के लिए अंतिम एआई-संचालित ऑपरेटिंग सिस्टम।",
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
    footer_col_nodes: "क्षेत्रीय नोड्स",
    footer_addr_gorakhpur: "गोलघर, गोरखपुर, यूपी - 273001",
    footer_addr_mumbai: "अंधेरी ईस्ट, मुंबई, एमएच - 400069",
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
    profile_title: "प्रोफ़ाइल",
    profile_role: "खाते का प्रकार",
    profile_since: "सदस्यता की तिथि",
    profile_signout: "लॉग आउट करें",
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
    crm_financial_ledger: "इनवॉइस",
    crm_sync_statements: "विवरण रिफ्रेश करें",
    crm_days_mon_fri: "सोम-शुक्र (IST)",
    crm_status_active: "सक्रिय",
    db_workspace_nodes: "डैशबोर्ड",
    db_node_analytics: "एनालिटिक्स",
    db_node_settings: "सेटिंग्स",
    db_secure_session: "सत्र",
    db_decommission: "लॉग आउट करें",
    db_overview_subtitle: "प्रणाली स्वास्थ्य और कनेक्टिविटी की स्थिति।",
    db_crm_subtitle: "छात्र और पाठ्यक्रम प्रबंधन केंद्र",
    db_live_users: "लाइव सक्रिय उपयोगकर्ता",
    db_api_requests: "कुल एपीआई अनुरोध",
    db_system_audit: "सिस्टम लॉग्स",
    db_infra_nodes: "इन्फ्रास्ट्रक्चर अवलोकन",
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
    profile_rotate_seed_msg: "सुरक्षा कुंजी रीसेट की जा रही है...",
    profile_rotate_success_msg: "सुरक्षा कुंजी सफलतापूर्वक रीसेट की गई",
    profile_rotate_request_btn: "सुरक्षा कुंजी रीसेट करें",
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
    hero_trust_nodes: "पूरी तरह से सैंडबॉक्स्ड स्थानीय नोड्स",
    hero_trust_security: "एंटरप्राइज-ग्रेड एसएसएल और एन्क्रिप्शन",
    erp_overview: "अवलोकन",
    erp_sales: "बिक्री और चालान",
    erp_purchases: "खरीदारी विवरण",
    erp_inventory: "इन्वेंटरी स्टॉक",
    erp_crm: "संस्थाएं और सीआरएम",
    erp_ledger: "खाता और रिपोर्ट",
    erp_settings: "व्यापार प्रोफाइल",
    erp_manual: "मार्गदर्शिका",
    erp_private_workspace: "निजी कार्यक्षेत्र",
    erp_exit_home: "AITDL होम पर जाएं",
    erp_architect_title: "सिस्टम आर्किटेक्ट",
    erp_profile_title: "व्यावसायिक खुफिया प्रोफ़ाइल",
    erp_profile_subtitle: "अपनी स्थानीय कार्यक्षेत्र पहचान कॉन्फ़िगर करें।",
    erp_profile_export: "कार्यक्षेत्र फ़ाइल निर्यात करें (.sqlite)",
    erp_profile_import: "अपना डेटा पुनर्स्थापित करें",
    erp_profile_save: "सहेजें और समन्वयित करें",
    erp_sales_title: "बिक्री और चालान",
    erp_sales_subtitle: "बिलिंग, रसीदें और प्राप्तियां प्रबंधित करें।",
    erp_sales_new_doc: "नया दस्तावेज़",
    erp_sales_total_docs: "कुल दस्तावेज़",
    erp_sales_paid_docs: "भुगतान किए गए दस्तावेज़",
    erp_sales_collected_rev: "एकत्रित राजस्व",
    erp_sales_pending_dues: "लंबित बकाया",
    erp_install_title: "SmritiERP इंस्टॉल करें",
    erp_install_desc: "100% ऑफलाइन उपयोग के लिए स्मृति ईआरपी प्राप्त करें।",
    erp_install_btn: "अभी इंस्टॉल करें",
    erp_notes_title: "दैनिक स्मृतिनोट्स",
    erp_notes_placeholder: "एक विचार लिखें...",
    erp_quote_title: "आज का सुविचार",
    erp_made_for_bharat: "भारत के लिए निर्मित",
    erp_status_pending: "लंबित",
    erp_status_in_process: "प्रगति में",
    erp_status_completed: "पूर्ण",
    erp_status_void: "अस्वीकृत",
    erp_task_modal_title: "नया कार्य जोड़ें",
    erp_task_modal_edit: "कार्य संपादित करें",
    erp_task_content: "कार्य शीर्षक",
    erp_task_description: "नोट्स / विवरण",
    erp_task_priority: "प्राथमिकता",
    erp_task_due_date: "नियत तिथि",
    erp_task_category: "श्रेणी",
    erp_task_save: "कार्य सहेजें",
    erp_priority_low: "कम",
    erp_priority_medium: "मध्यम",
    erp_priority_high: "उच्च",
    erp_priority_urgent: "अति आवश्यक",
    erp_category_general: "सामान्य",
    erp_category_sales: "बिक्री",
    erp_category_purchase: "खरीद",
    erp_category_personal: "व्यक्तिगत",
    erp_sidebar_workspace: "कार्यक्षेत्र",
    erp_sidebar_focus: "दैनिक फोकस",
    erp_sidebar_system: "कार्यक्षेत्र कॉन्फ़िगरेशन"
  },

  sa: {
    nav_about: "विषये",
    nav_services: "सेवाः",
    nav_portfolio: "कार्यम्",
    nav_contact: "सम्पर्कः",
    hero_badge: "सर्वभौम तन्त्रज्ञानम् एआई",
    hero_title: "प्रगत शिक्षण विद्यालय व्यवस्थापनम्",
    hero_subtitle: "शिक्षण संस्थानां कृते सर्वोत्तमम् एआई-संचालितं कार्यतन्त्रम्।",
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
    footer_col_nodes: "क्षेत्रीय नोड्स",
    footer_addr_gorakhpur: "गोलघर, गोरखपुर, यूपी - २७३००१",
    footer_addr_mumbai: "अंधेरी पूर्व, मुम्बई, एमएच - ४०००६९",
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
    profile_title: "विवरणम्",
    profile_role: "खाता स्तरः",
    profile_since: "सदस्यता कालः",
    profile_signout: "लॉग आउट",
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
    crm_financial_ledger: "इनवॉइस",
    crm_sync_statements: "विवरणं पुनः स्थापयन्तु",
    crm_days_mon_fri: "सोम-शुक्र (IST)",
    crm_status_active: "सक्रिय",
    db_workspace_nodes: "मुख्य फलकम्",
    db_node_analytics: "विश्लेषणम्",
    db_node_settings: "विन्यासः",
    db_secure_session: "सत्रम्",
    db_decommission: "लॉग आउट",
    db_overview_subtitle: "तन्त्र स्वास्थ्यम्।",
    db_crm_subtitle: "छात्र प्रबन्धनम्।",
    db_live_users: "सक्रिय उपयोक्तारः",
    db_api_requests: "कुल एपीआई अनुरोधः",
    db_system_audit: "तन्त्र लॉग्स",
    db_infra_nodes: "आधारभूत व्यवस्था",
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
    profile_rotate_seed_msg: "सुरक्षा कुंजी परिवर्तिका...",
    profile_rotate_success_msg: "कुंजी सफलतापूर्वक परिवर्तिता",
    profile_rotate_request_btn: "सुरक्षा कुंजी परिवर्तनार्थं अनुरोधः",
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
    hero_trust_nodes: "पूर्णतया सैंडबॉक्स्ड स्थानीय नोड्स",
    hero_trust_security: "एंटरप्राइज-स्तर एसएसएल सुरक्षा",
    erp_overview: "अवलोकनम्",
    erp_sales: "विक्रय एवं चालान",
    erp_purchases: "क्रय विवरणम्",
    erp_inventory: "सामग्री प्रबन्धनम्",
    erp_crm: "संस्था सीआरएम च",
    erp_ledger: "खाता एवं विवरणम्",
    erp_settings: "व्यापार प्रोफाइल",
    erp_manual: "मार्गदर्शिका",
    erp_private_workspace: "निजी कार्यक्षेत्रम्",
    erp_exit_home: "AITDL मुख्यपृष्ठे गच्छन्तु",
    erp_architect_title: "तन्त्र संरचनाकारः",
    erp_profile_title: "व्यावसायिक खुफिया प्रोफाइल",
    erp_profile_subtitle: "स्वस्य स्थानीय कार्यक्षेत्रस्य परिचयं रचयन्तु।",
    erp_profile_export: "कार्यक्षेत्राधारितं निर्यातं कुर्वन्तु (.sqlite)",
    erp_profile_import: "स्वस्य दत्तांशं पुनः स्थापयन्तु",
    erp_profile_save: "संरक्षन्तु समन्वयन्तु च",
    erp_sales_title: "विक्रय एवं चालान",
    erp_sales_subtitle: "बिलिङ्ग, रसीदं, प्राप्तं च प्रबन्धयन्तु।",
    erp_sales_new_doc: "नूतन प्रलेखः",
    erp_sales_total_docs: "कुल प्रलेखाः",
    erp_sales_paid_docs: "दत्त्त प्रलेखाः",
    erp_sales_collected_rev: "संग्रहित राजस्व",
    erp_sales_pending_dues: "लम्बित देयम्",
    erp_install_title: "SmritiERP संस्थापयन्तु",
    erp_install_desc: "100% ऑफलाइन उपयोगाय स्मृति ईआरपी स्थापय।",
    erp_install_btn: "अधुना स्थापयन्तु",
    erp_notes_title: "दैनिक स्मृति-टिप्पणी",
    erp_notes_placeholder: "विचारस्य संग्रहणं करोति...",
    erp_quote_title: "सूक्ति-सुधा",
    erp_made_for_bharat: "भारतार्थं निर्मितम्",
    erp_status_pending: "प्रतीक्षितम्",
    erp_status_in_process: "प्रक्रियायाम्",
    erp_status_completed: "पूर्णम्",
    erp_status_void: "निरस्तम्"
  },
  mr: {
    nav_about: "आमच्याबद्दल",
    hero_title: "शाळा व्यवस्थापन आणि शैक्षणिक ऑटोमेशन",
    hero_subtitle: "भारतीय शैक्षणिक संस्थांसाठी 'सॉवरेन' आणि खासगी क्लाउड-नेटिव्ह सॉफ्टवेअर.",
    erp_overview: "अवलोकन",
    erp_sales: "विक्री आणि बीजक",
    erp_purchases: "खरेदी",
    erp_inventory: "इन्व्हेंटरी मास्टर",
    erp_crm: "CRM / घटक",
    erp_ledger: "लेजर आणि अहवाल",
    erp_settings: "व्यवसाय प्रोफाइल",
    erp_manual: "मार्गदर्शिका",
    erp_private_workspace: "खाजगी कार्यक्षेत्र",
    erp_exit_home: "AITDL होम वर जा",
    erp_architect_title: "सिस्टम आर्किटेक्ट",
    nav_services: "सेवा",
    nav_portfolio: "पोर्टफोलिओ",
    nav_contact: "संपर्क",
    nav_dashboard: "डॅशबोर्ड",
    footer_link_login: "लॉगिन",
    footer_link_analytics: "विश्लेषण",
    footer_link_support: "मदत केंद्र",
    footer_link_partners: "भागीदार",
    footer_link_founders: "संस्थापक",
    erp_profile_title: "तथ्य विश्लेषण प्रोफाइल",
    erp_profile_subtitle: "आपली स्थानिक कार्यक्षेत्र ओळख कॉन्फिगर करा.",
    erp_profile_export: "कार्यक्षेत्र फाईल निर्यात करा (.sqlite)",
    erp_profile_import: "डेटा पुनर्संचयित करा",
    erp_profile_save: "जतन आणि सिंक्रोनाइझ करा",
    erp_sales_title: "विक्री आणि इनव्हॉइसिंग",
    erp_sales_subtitle: "बिलिंग, पावत्या आणि येणी व्यवस्थापित करा.",
    erp_sales_new_doc: "नवीन दस्तऐवज",
    erp_sales_total_docs: "एकूण दस्तऐवज",
    erp_sales_paid_docs: "भरलेले दस्तऐवज",
    erp_sales_collected_rev: "एकत्रित महसूल",
    erp_sales_pending_dues: "लंबित येणी",
    erp_install_title: "डेस्कटॉप नोड इंस्टॉल करा",
    erp_install_desc: "100% ऑफलाइन वापरासाठी स्मृती ERP मिळवा.",
    erp_install_btn: "आता इंस्टॉल करा",
    erp_notes_title: "दैनिक स्मृतिनोट्स",
    erp_notes_placeholder: "एक विचार लिहा...",
    erp_quote_title: "आजचा सुविचार",
    erp_made_for_bharat: "भारतासाठी निर्मित",
    erp_status_pending: "प्रलंबित",
    erp_status_in_process: "प्रक्रियेत",
    erp_status_completed: "पूर्ण",
    erp_status_void: "अस्वीकृत"
  },
  gu: {
    nav_about: "અમારા વિશે",
    hero_title: "શાળા વ્યવસ્થાપન અને શૈક્ષણિક ઓટોમેશન",
    hero_subtitle: "ભારતીય શૈક્ષણિક સંસ્થાઓ માટે 'સાર્વભૌમ' અને ખાનગી ક્લાઉડ-નેટિવ સોફ્ટવેર.",
    erp_overview: "ઝાંખી",
    erp_sales: "વેચાણ અને ઇન્વોઇસ",
    erp_purchases: "ખરીદી",
    erp_inventory: "ઇન્વેન્ટરી માસ્ટર",
    erp_crm: "CRM / સંસ્થાઓ",
    erp_ledger: "લેજર અને અહેવાલો",
    erp_settings: "બિઝનેસ પ્રોફાઇલ",
    erp_manual: "માર્ગદર્શિકા",
    erp_private_workspace: "ખાનગી કાર્યસ્થળ",
    erp_exit_home: "AITDL હોમ પર જાઓ",
    erp_architect_title: "સિસ્ટમ આર્કિટેક્ટ",
    nav_services: "સેવાઓ",
    nav_portfolio: "પોર્ટફોલિયો",
    nav_contact: "સંપર્ક",
    nav_dashboard: "ડેશબોર્ડ",
    footer_link_login: "લોગિન",
    footer_link_analytics: "એનાલિટિક્સ",
    footer_link_support: "સપોર્ટ",
    footer_link_partners: "ભાગીદારો",
    footer_link_founders: "સ્થાપકો",
    erp_profile_title: "બિઝનેસ ઇન્ટેલિજન્સ પ્રોફાઇલ",
    erp_profile_subtitle: "તમારી સ્થાનિક વર્કસ્પેસ ઓળખ ગોઠવો.",
    erp_profile_export: "વર્કસ્પેસ ફાઇલ નિકાસ કરો (.sqlite)",
    erp_profile_import: "તમારો ડેટા પુનઃસ્થાપિત કરો",
    erp_profile_save: "સાચવો અને સિંક્રનાઇઝ કરો",
    erp_sales_title: "વેચાણ અને ઇન્વોઇસિંગ",
    erp_sales_subtitle: "બિલિંગ, રસીદો અને લેણાંનું સંચાલન કરો.",
    erp_sales_new_doc: "નવો દસ્તાવેજ",
    erp_sales_total_docs: "કુલ દસ્તાવેજો",
    erp_sales_paid_docs: "ચૂકવેલ દસ્તાવેજો",
    erp_sales_collected_rev: "એકત્રિત મહેસૂલ",
    erp_sales_pending_dues: "બાકી લેણાં",
    erp_install_title: "ડેસ્કટોપ નોડ ઇન્સ્ટોલ કરો",
    erp_install_desc: "100% ઑફલાઇન ઉપયોગ માટે સ્મૃતિ ERP મેળવો.",
    erp_install_btn: "હમણાં ઇન્સ્ટોલ કરો",
    erp_notes_title: "દૈનિક સ્મૃતિનોટ્સ",
    erp_notes_placeholder: "એક વિચાર લખો...",
    erp_quote_title: "આજનો સુવિચાર",
    erp_made_for_bharat: "ભારત માટે નિર્મિત",
    erp_status_pending: "બાકી",
    erp_status_in_process: "પ્રક્રિયામાં",
    erp_status_completed: "પૂર્ણ",
    erp_status_void: "અસ્વીકૃત"
  },
  pa: {
    nav_about: "ਸਾਡੇ ਬਾਰੇ",
    hero_title: "ਸਕੂਲ ਪ੍ਰਬੰਧਨ ਅਤੇ ਵਿਦਿਅਕ ਆਟੋਮੇਸ਼ਨ",
    hero_subtitle: "ਭਾਰਤੀ ਵਿਦਿਅਕ ਸੰਸਥਾਵਾਂ ਲਈ 'ਸਾਵਰੇਨ' ਅਤੇ ਪ੍ਰਾਈਵੇਟ ਕਲਾਉਡ-ਨੇਟਿਵ ਸਾਫਟਵੇਅਰ।",
    erp_overview: "ਸੰਖੇਪ",
    erp_sales: "ਵਿਕਰੀ ਅਤੇ ਇਨਵੌਇਸ",
    erp_purchases: "ਖਰੀਦਦਾਰੀ",
    erp_inventory: "ਇਨਵੈਂਟਰੀ ਮਾਸਟਰ",
    erp_crm: "CRM / ਇਕਾਈਆਂ",
    erp_ledger: "ਲੇਜ਼ਰ ਅਤੇ ਰਿਪੋਰਟਾਂ",
    erp_settings: "ਬਿਜ਼ਨਸ ਪ੍ਰੋਫਾਈਲ",
    erp_manual: "ਮੈਨੂਅਲ",
    erp_private_workspace: "ਨਿੱਜੀ ਵਰਕਸਪੇਸ",
    erp_exit_home: "AITDL ਹੋਮ 'ਤੇ ਜਾਓ",
    erp_architect_title: "ਸਿਸਟਮ ਆਰਕੀਟੈਕਟ",
    nav_services: "ਸੇਵਾਵਾਂ",
    nav_portfolio: "ਪੋਰਟਫੋਲੀਓ",
    nav_contact: "ਸੰਪਰਕ",
    nav_dashboard: "ਡੈਸ਼ਬੋਰਡ",
    footer_link_login: "ਲੌਗਇਨ",
    footer_link_analytics: "ਐਨਾਲਿਟਿਕਸ",
    footer_link_support: "ਸਹਾਇਤਾ",
    footer_link_partners: "ਭਾਈਵਾਲ",
    footer_link_founders: "ਸੰਸਥਾਪਕ",
    erp_profile_title: "ਬਿਜ਼ਨਸ ਇੰਟੈਲੀਜੈਂਸ ਪ੍ਰੋਫਾਈਲ",
    erp_profile_subtitle: "ਆਪਣੀ ਸਥਾਨਕ ਵਰਕਸਪੇਸ ਪਛਾਣ ਨੂੰ ਕੌਂਫਿਗਰ ਕਰੋ।",
    erp_profile_export: "ਵਰਕਸਪੇਸ ਫਾਈਲ ਐਕਸਪੋਰਟ ਕਰੋ (.sqlite)",
    erp_profile_import: "ਆਪਣਾ ਡੇਟਾ ਰੀਸਟੋਰ ਕਰੋ",
    erp_profile_save: "ਸੇਵ ਅਤੇ ਸਿੰਕ੍ਰੋਨਾਈਜ਼ ਕਰੋ",
    erp_sales_title: "ਵਿਕਰੀ ਅਤੇ ਇਨਵੌਇਸਿੰਗ",
    erp_sales_subtitle: "ਬਿਲਿੰਗ, ਰਸੀਦਾਂ ਅਤੇ ਬਕਾਏ ਪ੍ਰਬੰਧਿਤ ਕਰੋ।",
    erp_sales_new_doc: "ਨਵਾਂ ਦਸਤਾਵੇਜ਼",
    erp_sales_total_docs: "ਕੁੱਲ ਦਸਤਾਵੇਜ਼",
    erp_sales_paid_docs: "ਭੁਗਤਾਨ ਕੀਤੇ ਦਸਤਾਵੇਜ਼",
    erp_sales_collected_rev: "ਇਕੱਠਾ ਹੋਇਆ ਮਾਲੀਆ",
    erp_sales_pending_dues: "ਬਕਾਇਆ",
    erp_install_title: "ਡੈਸਕਟੌਪ ਨੋਡ ਸਥਾਪਿਤ ਕਰੋ",
    erp_install_desc: "100% ਔਫਲਾਈન ਵਰਤੋਂ ਲਈ ਸਮ੍ਰਿਤੀ ERP ਪ੍ਰਾਪਤ ਕਰੋ।",
    erp_install_btn: "ਹੁਣੇ ਇੰਸਟਾਲ ਕਰੋ",
    erp_notes_title: "ਰੋਜ਼ਾਨਾ ਸਮ੍ਰਿਤੀ ਨੋਟਸ",
    erp_notes_placeholder: "ਇੱਕ ਵਿਚਾਰ ਲਿਖੋ...",
    erp_quote_title: "ਅੱਜ ਦਾ ਵਿਚਾਰ",
    erp_made_for_bharat: "ਭਾਰਤ ਲਈ ਬਣਾਇਆ",
    erp_status_pending: "ਬਾਕੀ",
    erp_status_in_process: "ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ",
    erp_status_completed: "ਪੂਰਾ",
    erp_status_void: "ਰੱਦ"
  },
  ta: {
    nav_about: "எங்களைப் பற்றி",
    hero_title: "பள்ளி மேலாண்மை மற்றும் கல்வி ஆட்டோமேஷன்",
    hero_subtitle: "இந்திய கல்வி நிறுவனங்களுக்கான 'சவரன்' மற்றும் தனியார் கிளவுட் மென்பொருள்.",
    erp_overview: "கண்ணோட்டம்",
    erp_sales: "விற்பனை மற்றும் இன்வாய்ஸ்கள்",
    erp_purchases: "கொள்முதல்",
    erp_inventory: "சரக்கு இருப்பு மேலாண்மை",
    erp_crm: "CRM / நிறுவனங்கள்",
    erp_ledger: "பேரேடு மற்றும் அறிக்கைகள்",
    erp_settings: "வணிக சுயவிவரம்",
    erp_manual: "கையேடு",
    erp_private_workspace: "தனிப்பட்ட பணியிடம்",
    erp_exit_home: "AITDL முகப்பிற்குச் செல்",
    erp_architect_title: "முறைமை வடிவமைப்பாளர்",
    nav_services: "சேவைகள்",
    nav_portfolio: "போர்ட்ஃபோலியோ",
    nav_contact: "தொடர்பு",
    nav_dashboard: "டாஷ்போர்டு",
    footer_link_login: "உள்நுழை",
    footer_link_analytics: "பகுப்பாய்வு",
    footer_link_support: "ஆதரவு",
    footer_link_partners: "பங்குதாரர்கள்",
    footer_link_founders: "நிறுவனர்கள்",
    erp_profile_title: "வணிக நுண்ணறிவு சுயவிவரம்",
    erp_profile_subtitle: "உங்கள் உள்ளூர் பணியிட அடையாளத்தை உள்ளமைக்கவும்.",
    erp_profile_export: "பணியிடக் கோப்பை ஏற்றுமதி செய் (.sqlite)",
    erp_profile_import: "உங்கள் தரவை மீட்டமைக்கவும்",
    erp_profile_save: "சேமி மற்றும் ஒத்திசை",
    erp_sales_title: "விற்பனை மற்றும் விலைப்பட்டியல்",
    erp_sales_subtitle: "பில்லிங், ரசீதுகள் மற்றும் பெறத்தக்கவைகளை நிர்வகிக்கவும்.",
    erp_sales_new_doc: "புதிய ஆவணம்",
    erp_sales_total_docs: "மொத்த ஆவணங்கள்",
    erp_sales_paid_docs: "செலுத்தப்பட்ட ஆவணங்கள்",
    erp_sales_collected_rev: "சேகரிக்கப்பட்ட வருவாய்",
    erp_sales_pending_dues: "நிலுவைத் தொகைகள்",
    erp_install_title: "டெஸ்க்டாப் முனையத்தை நிறுவு",
    erp_install_desc: "100% ஆஃப்லைன் பயன்பாட்டிற்காக ஸ்மிருதி ஈஆர்பியைப் பெறுங்கள்.",
    erp_install_btn: "இப்பொழுதே நிறுவு",
    erp_notes_title: "தினசரி ஸ்மிருதி குறிப்புகள்",
    erp_notes_placeholder: "ஒரு குறிப்பை எழுதவும்...",
    erp_quote_title: "இன்றைய பொன்மொழி",
    erp_made_for_bharat: "பாரதத்திற்காக உருவாக்கப்பட்டது",
    erp_status_pending: "நிலுவையில் உள்ளது",
    erp_status_in_process: "செயல்பாட்டில் உள்ளது",
    erp_status_completed: "முடிந்தது",
    erp_status_void: "ரத்து செய்யப்பட்டது"
  },
  te: {
    nav_about: "మా గురించి",
    hero_title: "పాఠశాల నిర్వహణ మరియు విద్యా ఆటోమేషన్",
    hero_subtitle: "భారతీయ విద్యా సంస్థల కోసం 'సార్వభౌమ' మరియు ప్రైవేట్ క్లౌడ్ సాఫ్ట్‌వేర్.",
    erp_overview: "అవలోకనం",
    erp_sales: "అమ్మకాలు మరియు ఇన్‌వాయిస్‌లు",
    erp_purchases: "కొనుగోళ్లు",
    erp_inventory: "ఇన్వెంటరీ మాస్టర్",
    erp_crm: "CRM / సంస్థలు",
    erp_ledger: "లెడ్జర్ మరియు నివేదికలు",
    erp_settings: "బిజినెస్ ప్రొఫైల్",
    erp_manual: "మాన్యువల్",
    erp_private_workspace: "ప్రైవేట్ వర్క్‌స్పేస్",
    erp_exit_home: "AITDL హోమ్‌కు వెళ్లండి",
    erp_architect_title: "సిస్టమ్ ఆర్కిటెక్ట్",
    nav_services: "సేవలు",
    nav_portfolio: "పోర్ట్‌ఫోలియో",
    nav_contact: "సంప్రదించండి",
    nav_dashboard: "డ్యాష్‌బోర్డ్",
    footer_link_login: "లాగిన్",
    footer_link_analytics: "విశ్లేషణలు",
    footer_link_support: "మద్దతు",
    footer_link_partners: "భాగస్వాములు",
    footer_link_founders: "వ్యవస్థాపకులు",
    erp_profile_title: "బిజినెస్ ఇంటెలిజెన్స్ ప్రొఫైల్",
    erp_profile_subtitle: "మీ స్థానిక వర్క్‌స్పేస్ గుర్తింపును కాన్ఫిగర్ చేయండి.",
    erp_profile_export: "వర్క్‌స్పేస్ ఫైల్‌ను ఎగుమతి చేయండి (.sqlite)",
    erp_profile_import: "మీ డేటాను పునరుద్ధరించండి",
    erp_profile_save: "సేవ్ మరియు సింక్రొనైజ్",
    erp_sales_title: "అమ్మకాలు మరియు ఇన్‌వాయిస్",
    erp_sales_subtitle: "బిల్లింగ్, రసీదులు మరియు బకాయిలను నిర్వహించండి.",
    erp_sales_new_doc: "కొత్త పత్రం",
    erp_sales_total_docs: "మొత్తం పత్రాలు",
    erp_sales_paid_docs: "చెల్లించిన పత్రాలు",
    erp_sales_collected_rev: "సేకరించిన ఆదాయం",
    erp_sales_pending_dues: "పెండింగ్ బకాయిలు",
    erp_install_title: "డెస్క్‌టాప్ నోడ్ ఇన్‌స్టాల్ చేయండి",
    erp_install_desc: "100% ఆఫ్‌లైన్ ఉపయోగం కోసం స్మృతి ERP పొందండి.",
    erp_install_btn: "ఇప్పుడే ఇన్‌స్టాల్ చేయండి",
    erp_notes_title: "రోజువారీ స్మృతి నోట్స్",
    erp_notes_placeholder: "ఒక భావాన్ని రాయండి...",
    erp_quote_title: "నేటి సూక్తి",
    erp_made_for_bharat: "భారత్ కోసం నిర్మించబడింది",
    erp_status_pending: "పెండింగ్",
    erp_status_in_process: "ప్రక్రియలో ఉంది",
    erp_status_completed: "పూర్తయింది",
    erp_status_void: "రద్దు చేయబడింది"
  }
};
