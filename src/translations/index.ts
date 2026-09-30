export type Language = 'ur' | 'en';

export interface TranslationDictionary {
  // Navigation & Topbar
  announcement: string;
  announcementSub: string;
  callNow: string;
  whatsapp247: string;
  navHome: string;
  navPremiumStaff: string;
  navServices: string;
  navJobs: string;
  navHireStaff: string;
  navJobSeekers: string;
  navProcess: string;
  navAbout: string;
  navGallery: string;
  navReviews: string;
  navVault: string;
  navContact: string;
  hireStaffOnline: string;

  // Template Bar
  templateBadge: string;
  templateTitle: string;
  templateSubtitle: string;
  customizeTemplate: string;
  changeTheme: string;
  switchLang: string;
  previewLive: string;
  resetDefaults: string;

  // Hero Section
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBtnHire: string;
  heroBtnJobs: string;
  heroBtnWhatsapp: string;
  heroBtnCall: string;
  heroTagline: string;
  heroTrust1Title: string;
  heroTrust1Desc: string;
  heroTrust2Title: string;
  heroTrust2Desc: string;
  heroTrust3Title: string;
  heroTrust3Desc: string;
  heroTrust4Title: string;
  heroTrust4Desc: string;

  // Premium Staff Section
  premiumBadge: string;
  premiumTitle: string;
  premiumSubtitle: string;
  premiumVipDesc: string;
  premiumInquireBtn: string;
  premiumBookProfileBtn: string;
  premiumGuarantee1: string;
  premiumGuarantee2: string;
  premiumGuarantee3: string;
  premiumGuarantee4: string;

  // Services Section
  servicesBadge: string;
  servicesTitle: string;
  servicesDesc: string;
  tabAll: string;
  tabFemale: string;
  tabMale: string;
  tabInternational: string;
  hireNowBtn: string;
  quickInquiry: string;
  keyDuties: string;
  customStaffNotice: string;
  customStaffDesc: string;
  requestCustomStaff: string;

  // Jobs Section
  jobsBadge: string;
  jobsTitle: string;
  jobsDesc: string;
  searchCityPlaceholder: string;
  filterAllRoles: string;
  openingsBadge: string;
  applyViaWhatsapp: string;
  registerAsCandidate: string;
  jobsBannerTitle: string;
  jobsBannerDesc: string;

  // Hire Form Section
  hireBadge: string;
  hireTitle: string;
  hireDesc: string;
  fullNameLabel: string;
  whatsappLabel: string;
  cityLabel: string;
  staffRoleLabel: string;
  genderPrefLabel: string;
  workTypeLabel: string;
  experienceLabel: string;
  salaryBudgetLabel: string;
  additionalReqLabel: string;
  submitHireBtn: string;
  hireSuccessTitle: string;
  hireSuccessDesc: string;
  sendToWhatsappBtn: string;
  newInquiryBtn: string;

  // Job Seeker Form Section
  jobSeekerBadge: string;
  jobSeekerTitle: string;
  jobSeekerDesc: string;
  seekerNameLabel: string;
  seekerAgeLabel: string;
  seekerCityLabel: string;
  seekerProfessionLabel: string;
  seekerExpLabel: string;
  seekerExpectedSalary: string;
  seekerWhatsappLabel: string;
  seekerUploadLabel: string;
  seekerNotesLabel: string;
  submitJobSeekerBtn: string;
  seekerSuccessTitle: string;
  seekerSuccessDesc: string;

  // About Section
  aboutBadge: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutFeature1Title: string;
  aboutFeature1Desc: string;
  aboutFeature2Title: string;
  aboutFeature2Desc: string;
  aboutFeature3Title: string;
  aboutFeature3Desc: string;
  aboutFeature4Title: string;
  aboutFeature4Desc: string;

  // Recruitment Process
  processBadge: string;
  processTitle: string;
  processDesc: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;
  startHiringNowBtn: string;

  // Why Choose Us
  whyBadge: string;
  whyTitle: string;
  whyDesc: string;

  // Gallery & Reviews
  galleryBadge: string;
  galleryTitle: string;
  galleryDesc: string;
  reviewsBadge: string;
  reviewsTitle: string;
  reviewsDesc: string;

  // Contact Section
  contactBadge: string;
  contactTitle: string;
  contactDesc: string;
  contactOfficeTitle: string;
  contactOfficeAddress: string;
  contactPhoneTitle: string;
  contactEmailTitle: string;
  contactHoursTitle: string;
  contactHoursValue: string;
  sendMessageBtn: string;

  // Footer & Policies
  footerDesc: string;
  quickLinks: string;
  serviceAreas: string;
  legalNotice: string;
  allRightsReserved: string;
  privacyPolicy: string;
  termsConditions: string;
  replacementPolicy: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  ur: {
    announcement: 'نادرا اور پولیس ویریفائیڈ گھریلو اور دفتری ملازمین کی فراہمی',
    announcementSub: 'پورے پاکستان کے تمام بڑے شہروں میں سروس دستیاب ہے 🇵🇰',
    callNow: 'فون کریں',
    whatsapp247: 'واٹس ایپ 24/7',
    navHome: 'ہوم',
    navPremiumStaff: 'پریمیئم اسٹاف',
    navServices: 'ہماری سروسز',
    navJobs: 'ملازمتیں',
    navHireStaff: 'اسٹاف ہائر کریں',
    navJobSeekers: 'نوکری کے خواہشمند',
    navProcess: 'طریقہ کار',
    navAbout: 'ہمارے بارے میں',
    navGallery: 'گیلری',
    navReviews: 'گاہکوں کی رائے',
    navVault: 'ڈرائیو پورٹل',
    navContact: 'رابطہ کریں',
    hireStaffOnline: 'آن لائن اسٹاف حاصل کریں',

    templateBadge: 'ویب سائٹ ٹیمپلیٹ موڈ',
    templateTitle: 'اوپنز ایسوسی ایٹ - جدید ایمپلائمنٹ ایجنسی ٹیمپلیٹ',
    templateSubtitle: 'یہ مکمل تیار شدہ ویب سائٹ ٹیمپلیٹ ہے، آپ رنگ، ایجنسی کی معلومات اور زبان باآسانی تبدیل کر سکتے ہیں۔',
    customizeTemplate: 'ٹیمپلیٹ میں ترمیم کریں',
    changeTheme: 'تھیم تبدیل کریں',
    switchLang: 'English میں دیکھیں',
    previewLive: 'لائیو پیش نظارہ',
    resetDefaults: 'ری سیٹ ڈیفالٹ',

    heroBadge: 'رجسٹرڈ اور مصدقہ ایمپلائمنٹ ایجنسی',
    heroTitle: 'اوپنز ایسوسی ایٹ اینڈ ایمپلائمنٹ سروسز (رجسٹرڈ)',
    heroSubtitle: 'پورے پاکستان میں بااعتماد، تصدیق شدہ اور تربیت یافتہ اسٹاف کی فراہمی',
    heroBtnHire: 'اسٹاف ہائر کریں',
    heroBtnJobs: 'دستیاب نوکریاں',
    heroBtnWhatsapp: 'واٹس ایپ رابطہ',
    heroBtnCall: 'کال کریں',
    heroTagline: 'تصدیق شدہ اور بااعتماد گھریلو اور پیشہ ورانہ عملہ 24 گھنٹے دستیاب ہے',
    heroTrust1Title: 'نادرا اور شناختی تصدیق',
    heroTrust1Desc: 'مکمل بائیو میٹرک و ضامن جانچ',
    heroTrust2Title: '24 سے 48 گھنٹے میں فراہمی',
    heroTrust2Desc: 'فوری شارٹ لسٹنگ اور انٹرویو',
    heroTrust3Title: 'ملک گیر نیٹ ورک',
    heroTrust3Desc: 'لاہور، اسلام آباد، کراچی و دیگر شہر',
    heroTrust4Title: 'ملازم کا متبادل (گارنٹی)',
    heroTrust4Desc: 'اطمینان بخش ریپلیسمنٹ پالیسی',

    // Premium Staff Section
    premiumBadge: 'خصوصی اور بین الاقوامی ڈویژن 💎',
    premiumTitle: 'پریمیئم اسٹاف سروسز (Premium Staff Services)',
    premiumSubtitle: 'وی آئی پی ولاز، سفارتی گھرانوں اور پرائیویٹ اسٹیٹس کے لیے اعلیٰ ترین تربیت یافتہ فلپائنی، نائیجیرین اور پیشہ ور گھریلو عملہ۔',
    premiumVipDesc: 'مکمل پاسپورٹ و ایمبیسی ویریفکیشن، نادرا کلیرنس، شائستہ آداب اور سخت رازداری کے اصولوں پر عمل درآمد۔',
    premiumInquireBtn: 'پریمیئم پروفائل حاصل کریں',
    premiumBookProfileBtn: 'وی آئی پی ہائرنگ شروع کریں',
    premiumGuarantee1: 'پاسپورٹ، ایمبیسی اور پولیس تصدیق شدہ',
    premiumGuarantee2: 'روانی سے انگریزی بول چال اور شائستہ اخلاق',
    premiumGuarantee3: 'بین الاقوامی پروٹوکول اور بچوں کی حفاظت',
    premiumGuarantee4: 'فوری وی آئی پی متبادل و تحریری معاہدہ',

    servicesBadge: 'ہماری سروسز',
    servicesTitle: 'جامع گھریلو اور پیشہ ورانہ ملازمین کی فراہمی',
    servicesDesc: 'ہر ملازم نادرا سے تصدیق شدہ اور باقاعدہ جانچ پڑتال کے بعد آپ کی ضرورت کے مطابق منتخب کیا جاتا ہے۔',
    tabAll: 'تمام سروسز',
    tabFemale: '👩 خواتین اسٹاف',
    tabMale: '👨 مردانہ اسٹاف',
    tabInternational: '🌍 غیر ملکی اسٹاف',
    hireNowBtn: 'ابھی منتخب کریں',
    quickInquiry: 'واٹس ایپ پر رابطہ',
    keyDuties: 'اہم ذمہ داریاں:',
    customStaffNotice: 'کیا آپ کو خاص عملہ یا جوڑے (میاں بیوی) کی ضرورت ہے؟',
    customStaffDesc: 'ہم پورے پاکستان میں فارم ہاؤس، دفاتر اور بڑے گھرانوں کے لیے خصوصی ٹیم بھی فراہم کرتے ہیں۔',
    requestCustomStaff: 'خصوصی اسٹاف درکار ہے',

    jobsBadge: 'ملازمت کے مواقع',
    jobsTitle: 'پاکستان بھر میں ملازمت کے تازہ ترین مواقع',
    jobsDesc: 'اگر آپ گھریلو یا دفتری شعبے میں محنتی ہیں تو فوری اچھی تنخواہ کے ساتھ باوقار نوکری حاصل کریں۔',
    searchCityPlaceholder: 'شہر کے لحاظ سے تلاش کریں (مثلاً لاہور، کراچی...)',
    filterAllRoles: 'تمام شعبے',
    openingsBadge: 'خالی آسامیاں',
    applyViaWhatsapp: 'واٹس ایپ پر درخواست دیں',
    registerAsCandidate: 'بطور امیدوار فارم پر کریں',
    jobsBannerTitle: 'کیا آپ اچھے اور محفوظ روزگار کی تلاش میں ہیں؟',
    jobsBannerDesc: 'ہمارے پاس ملک بھر سے روزانہ بنیادوں پر ویریفائیڈ ملازمتیں دستیاب ہوتی ہیں۔ بغیر کسی فیس کے اپنا نام درج کروائیں۔',

    hireBadge: 'کلائنٹ فارم',
    hireTitle: 'گھر یا دفتر کے لیے اسٹاف کی ضرورت کا فارم',
    hireDesc: 'فارم پر کریں، ہماری ٹیم فوری طور پر مناسب اور تصدیق شدہ ملازمین کی پروفائلز آپ کو بھیجے گی۔',
    fullNameLabel: 'آپ کا مکمل نام',
    whatsappLabel: 'واٹس ایپ نمبر (موبائل نمبر)',
    cityLabel: 'شہر کا نام و پتہ',
    staffRoleLabel: 'کس عملے کی ضرورت ہے؟',
    genderPrefLabel: 'جنس کی ترجیح',
    workTypeLabel: 'کام کی نوعیت (رہائشی یا ڈے ٹائم)',
    experienceLabel: 'مطلوبہ تجربہ',
    salaryBudgetLabel: 'تنخواہ کا بجٹ (ماہانہ)',
    additionalReqLabel: 'اضافی ہدایات یا تفصیلات',
    submitHireBtn: 'ضرورت جمع کروائیں اور واٹس ایپ پر رابطہ کریں',
    hireSuccessTitle: 'آپ کی درخواست موصول ہو گئی ہے!',
    hireSuccessDesc: 'ہماری ٹیم جلد آپ سے رابطہ کرے گی۔ فوری گفتگو کے لیے نیچے دیے گئے بٹن پر کلک کریں۔',
    sendToWhatsappBtn: 'واٹس ایپ پر میسج بھیجیں',
    newInquiryBtn: 'ایک اور درخواست جمع کروائیں',

    jobSeekerBadge: 'امیدواروں کے لیے',
    jobSeekerTitle: 'ملازمت کے خواہشمند حضرات کی رجسٹریشن',
    jobSeekerDesc: 'باوقار روزگار کے حصول کے لیے اپنے کوائف درج کروائیں۔ ہماری ٹیم آپ کا فوری انٹرویو طے کرے گی۔',
    seekerNameLabel: 'امیدوار کا نام',
    seekerAgeLabel: 'عمر (سالوں میں)',
    seekerCityLabel: 'موجودہ شہر یا علاقہ',
    seekerProfessionLabel: 'آپ کا ہنر / پیشہ',
    seekerExpLabel: 'کتنے سال کا تجربہ ہے؟',
    seekerExpectedSalary: 'متوقع تنخواہ (ماہانہ)',
    seekerWhatsappLabel: 'رابطہ نمبر / واٹس ایپ',
    seekerUploadLabel: 'شناختی کارڈ یا CV کی تصویر (اختیاری)',
    seekerNotesLabel: 'اپنے بارے میں کچھ اور بتائیں',
    submitJobSeekerBtn: 'رجسٹریشن جمع کروائیں',
    seekerSuccessTitle: 'رجسٹریشن کامیاب!',
    seekerSuccessDesc: 'آپ کی معلومات ہمارے ریکارڈ میں محفوظ ہو چکی ہیں۔ دستاویزات کی تصدیق کے بعد فوری رابطہ کیا جائے گا۔',

    aboutBadge: 'ہمارا تعارف',
    aboutTitle: 'اوپنز ایسوسی ایٹ - پاکستان کا بااعتماد روزگار پلیٹ فارم',
    aboutDesc1: 'اوپنز ایسوسی ایٹ اینڈ ایمپلائمنٹ سروسز (رجسٹرڈ) پاکستان بھر میں گھریلو اور کارپوریٹ ملازمین کی شفاف اور قانونی بھرتی کی سرکردہ ایجنسی ہے۔',
    aboutDesc2: 'ہمارا بنیادی مشن خاندانوں کو محفوظ اور تصدیق شدہ مدد فراہم کرنا اور محنتی افراد کو باعزت و محفوظ روزگار کے مواقع مہیا کرنا ہے۔',
    aboutFeature1Title: 'مکمل قانونی رجسٹریشن',
    aboutFeature1Desc: 'تمام تر عمل حکومتی قوانین اور دستاویزی اصولوں کے عین مطابق ہے۔',
    aboutFeature2Title: 'نادرا اور پولیس ویریفکیشن',
    aboutFeature2Desc: 'شناختی کارڈ اور سابقہ ریکارڈ کی جامع جانچ پڑتال۔',
    aboutFeature3Title: 'ریپلیسمنٹ گارنٹی',
    aboutFeature3Desc: 'عدم اطمینان کی صورت میں ایگریمنٹ کے مطابق متبادل اسٹاف۔',
    aboutFeature4Title: 'سپورٹ اور کسٹمر کیئر',
    aboutFeature4Desc: 'ہماری ٹیم ہائرنگ کے بعد بھی مسلسل رابطے اور سہولت کاری میں رہتی ہے۔',

    processBadge: 'بھرتی کا طریقہ کار',
    processTitle: 'آسان اور شفاف 5 مراحل پر مشتمل ہائرنگ',
    processDesc: 'ہم آپ کی آسانی کے لیے مرحلہ وار پیشہ ورانہ انداز میں عملہ فراہم کرتے ہیں۔',
    step1Title: '1. ضرورت درج کروائیں',
    step1Desc: 'آن لائن فارم یا واٹس ایپ کے ذریعے اپنی مطلوبہ خصوصیات اور بجٹ بتائیں۔',
    step2Title: '2. پروفائلز کی جانچ اور انتخاب',
    step2Desc: 'ہماری ٹیم ہمارے ڈیٹا بیس سے موزوں امیدواروں کی تفصیلات آپ کو فراہم کرے گی۔',
    step3Title: '3. انٹرویو (فون یا روبرو)',
    step3Desc: 'امیدوار کے ساتھ اپنی تسلی کے مطابق سوال جواب اور کام کے اوقات طے کریں۔',
    step4Title: '4. دستاویزی اور بائیو میٹرک تصدیق',
    step4Desc: 'شناختی کارڈ، ضامن کے کاغذات اور پولیس ریکارڈ کا تصدیقی معاہدہ تیار ہوتا ہے۔',
    step5Title: '5. تعیناتی اور سپورٹ',
    step5Desc: 'ملازم آپ کی خدمت پر حاضر ہوتا ہے اور ہم بعد از بھرتی سپورٹ جاری رکھتے ہیں۔',
    startHiringNowBtn: 'ابھی ہائرنگ کا عمل شروع کریں',

    whyBadge: 'ہمیں کیوں منتخب کریں؟',
    whyTitle: 'محفوظ گھر اور بااعتماد خدمت کے لیے اوپنز ایسوسی ایٹ',
    whyDesc: 'روایتی غیر منظم ذرائع کے مقابلے میں ہم مکمل دستاویزات اور ضمانت کے ساتھ خدمات دیتے ہیں۔',

    galleryBadge: 'دفتر اور ٹیم گیلری',
    galleryTitle: 'ہمارے دفاتر، اسٹاف ٹریننگ اور ٹیم کی جھلکیاں',
    galleryDesc: 'ہم حقیقی دفاتر اور تجربہ کار کونسلرز کے ساتھ خدمات سرانجام دیتے ہیں۔',

    reviewsBadge: 'کلائنٹس کی رائے',
    reviewsTitle: 'ہمارے مطمئن صارفین کے تاثرات',
    reviewsDesc: 'لاہور، اسلام آباد اور کراچی کے معزز خاندانوں اور اداروں کی مثبت آراء۔',

    contactBadge: 'رابطہ کی تفصیلات',
    contactTitle: 'ہم سے فوری رابطہ کریں',
    contactDesc: 'کسی بھی وقت کال کریں یا ہمارے واٹس ایپ پر پیغام بھیجیں۔ ہماری ٹیم رہنمائی کے لیے تیار ہے۔',
    contactOfficeTitle: 'مرکزی دفتر',
    contactOfficeAddress: 'لاہور (سروسز تمام بڑے شہروں کراچی، اسلام آباد، راولپنڈی، فیصل آباد، ملتان وغیرہ میں دستیاب ہیں)',
    contactPhoneTitle: 'فون نمبر',
    contactEmailTitle: 'ای میل ایڈریس',
    contactHoursTitle: 'اوقات کار',
    contactHoursValue: '24 گھنٹے واٹس ایپ اور کال سروس',
    sendMessageBtn: 'پیغام بھیجیں',

    footerDesc: 'اوپنز ایسوسی ایٹ اینڈ ایمپلائمنٹ سروسز (رجسٹرڈ) پاکستان کی مستند اور رجسٹرڈ ریکروٹمنٹ ایجنسی ہے جو قابل اعتماد اور تصدیق شدہ گھریلو و دفتری عملہ فراہم کرتی ہے۔',
    quickLinks: 'فوری لنکس',
    serviceAreas: 'سروس کے اہم شہر',
    legalNotice: 'قانونی نوٹس: تمام بھرتی شدہ ملازمین کی نادرا تصدیق اور معاہدہ لازمی ہے۔',
    allRightsReserved: 'جملہ حقوق محفوظ ہیں۔ اوپنز ایسوسی ایٹ اینڈ ایمپلائمنٹ سروسز (R)',
    privacyPolicy: 'پرائیویسی پالیسی',
    termsConditions: 'شرائط و ضوابط',
    replacementPolicy: 'ریپلیسمنٹ پالیسی',
  },
  en: {
    announcement: 'NADRA & CNIC Verified Domestic and Corporate Staffing',
    announcementSub: 'Active across all major cities of Pakistan 🇵🇰',
    callNow: 'Call Now',
    whatsapp247: 'WhatsApp 24/7',
    navHome: 'Home',
    navPremiumStaff: 'Premium Staff',
    navServices: 'Services',
    navJobs: 'Jobs',
    navHireStaff: 'Hire Staff',
    navJobSeekers: 'Job Seekers',
    navProcess: 'Process',
    navAbout: 'About Us',
    navGallery: 'Gallery',
    navReviews: 'Reviews',
    navVault: 'Vault / Portal',
    navContact: 'Contact',
    hireStaffOnline: 'Hire Staff Online',

    templateBadge: 'Website Template Mode',
    templateTitle: 'OPENZ ASSOCIATE - Modern Staffing Agency Template',
    templateSubtitle: 'Turnkey staffing website template. Easily customize colors, agency branding, phone numbers, and language.',
    customizeTemplate: 'Customize Template',
    changeTheme: 'Switch Theme',
    switchLang: 'اردو میں دیکھیں',
    previewLive: 'Live Preview',
    resetDefaults: 'Reset to Defaults',

    heroBadge: 'Registered & Documented Recruitment Agency',
    heroTitle: 'OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)',
    heroSubtitle: 'Reliable Staff Solutions Across Pakistan',
    heroBtnHire: 'Hire Staff',
    heroBtnJobs: 'Available Jobs',
    heroBtnWhatsapp: 'WhatsApp Us',
    heroBtnCall: 'Call Now',
    heroTagline: 'Verified & Reliable Domestic and Professional Staff Available 24/7',
    heroTrust1Title: 'NADRA & CNIC Vetted',
    heroTrust1Desc: 'Strict ID & guarantor checks',
    heroTrust2Title: '24–48h Rapid Dispatch',
    heroTrust2Desc: 'Fast matching & interview',
    heroTrust3Title: 'Pakistan-Wide Network',
    heroTrust3Desc: 'Lahore, Karachi, Islamabad & more',
    heroTrust4Title: 'Replacement Warranty',
    heroTrust4Desc: 'Peace of mind guarantee',

    // Premium Staff Section
    premiumBadge: 'Exclusive & International Division 💎',
    premiumTitle: 'Premium Staff Services',
    premiumSubtitle: 'Discreet, verified, and world-class personnel curated for discerning households, luxury villas, and diplomatic residences.',
    premiumVipDesc: 'Fully vetted with passport clearance, embassy documentation, NADRA biometric verification, refined domestic etiquette, and contractual discretion.',
    premiumInquireBtn: 'Request Candidate Profile',
    premiumBookProfileBtn: 'Start VIP Hiring',
    premiumGuarantee1: 'Embassy & Police Background Verified',
    premiumGuarantee2: 'Fluent English Communication & Etiquette',
    premiumGuarantee3: 'International Domestic & Childcare Standards',
    premiumGuarantee4: 'Rapid VIP Replacement Guarantee',

    servicesBadge: 'Our Dedicated Services',
    servicesTitle: 'Comprehensive Domestic & Professional Staffing',
    servicesDesc: 'Every candidate is registered, CNIC-verified, and matched strictly according to your household or corporate guidelines.',
    tabAll: 'All Categories',
    tabFemale: '👩 Female Staff',
    tabMale: '👨 Male Staff',
    tabInternational: '🌍 International Staff',
    hireNowBtn: 'Hire Now',
    quickInquiry: 'Quick Inquiry',
    keyDuties: 'Key Duties:',
    customStaffNotice: 'Need a custom staff requirement or married couple?',
    customStaffDesc: 'We arrange specialized household teams, farm-house caretakers, and shift guards across Pakistan.',
    requestCustomStaff: 'Request Custom Staff',

    jobsBadge: 'Careers & Vacancies',
    jobsTitle: 'Current Job Openings Across Pakistan',
    jobsDesc: 'Explore active domestic and professional staff vacancies with competitive market salaries and verified employers.',
    searchCityPlaceholder: 'Filter by city (e.g., Lahore, Islamabad, Karachi)...',
    filterAllRoles: 'All Categories',
    openingsBadge: 'Openings',
    applyViaWhatsapp: 'Apply via WhatsApp',
    registerAsCandidate: 'Register as Candidate',
    jobsBannerTitle: 'Looking for a Verified, Respectable Job in Pakistan?',
    jobsBannerDesc: 'Register your profile with Openz Associate for genuine, vetted household and commercial employment opportunities with zero extortion.',

    hireBadge: 'Client Requirement',
    hireTitle: 'Hire Verified Staff for Home or Office',
    hireDesc: 'Submit your requirement below. Our recruitment coordinators will instantly match suitable CNIC-vetted candidates and schedule direct interviews.',
    fullNameLabel: 'Your Full Name / Household',
    whatsappLabel: 'WhatsApp / Phone Number',
    cityLabel: 'City & Residential Area',
    staffRoleLabel: 'Staff Role Required',
    genderPrefLabel: 'Gender Preference',
    workTypeLabel: 'Work Engagement Type',
    experienceLabel: 'Required Experience',
    salaryBudgetLabel: 'Monthly Salary Budget (PKR)',
    additionalReqLabel: 'Specific Duties / Additional Instructions',
    submitHireBtn: 'Submit Requirement & Connect on WhatsApp',
    hireSuccessTitle: 'Inquiry Submitted Successfully!',
    hireSuccessDesc: 'Your request has been logged. Our dispatch team is ready. Click below to continue directly on WhatsApp.',
    sendToWhatsappBtn: 'Send Details via WhatsApp',
    newInquiryBtn: 'Submit Another Inquiry',

    jobSeekerBadge: 'For Candidates',
    jobSeekerTitle: 'Job Seeker Registration Portal',
    jobSeekerDesc: 'Are you seeking employment as a maid, babysitter, cook, driver, or patient caregiver? Register with verified identity.',
    seekerNameLabel: 'Full Name',
    seekerAgeLabel: 'Age (Years)',
    seekerCityLabel: 'Current City / Location',
    seekerProfessionLabel: 'Profession / Skill Category',
    seekerExpLabel: 'Total Experience (Years)',
    seekerExpectedSalary: 'Expected Monthly Salary (PKR)',
    seekerWhatsappLabel: 'WhatsApp / Contact Number',
    seekerUploadLabel: 'CNIC / Driving License / Certificate Photo (Optional)',
    seekerNotesLabel: 'Additional Skills / Background Information',
    submitJobSeekerBtn: 'Complete Candidate Registration',
    seekerSuccessTitle: 'Registration Successfully Received!',
    seekerSuccessDesc: 'Your candidate profile has been recorded. Our team will contact you for document verification and interview scheduling.',

    aboutBadge: 'About Our Agency',
    aboutTitle: 'OPENZ ASSOCIATE - Pakistan’s Trusted Employment Partner',
    aboutDesc1: 'OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R) is a registered staffing enterprise connecting Pakistani families and organizations with vetted, trustworthy human capital.',
    aboutDesc2: 'We eliminate the risks of informal domestic hiring through rigorous background screening, guarantor verification, and documented agreements.',
    aboutFeature1Title: 'Registered & Documented',
    aboutFeature1Desc: 'Compliant with legal operational standards and documented protocols.',
    aboutFeature2Title: 'NADRA & Police Screening',
    aboutFeature2Desc: 'Biometric verification, authentic CNIC checks, and background references.',
    aboutFeature3Title: 'Replacement Guarantee',
    aboutFeature3Desc: 'Prompt replacement provided under clear contractual guidelines if needed.',
    aboutFeature4Title: 'Dedicated Relationship Manager',
    aboutFeature4Desc: 'Ongoing coordination and conflict resolution throughout the tenure.',

    processBadge: 'Our 5-Step Process',
    processTitle: 'Rigorous 5-Step Recruitment Methodology',
    processDesc: 'From requirement intake to post-placement follow-up, our structured workflow ensures peace of mind.',
    step1Title: '1. Requirement Intake',
    step1Desc: 'We capture your specific home or commercial requirements, family setup, and working hours.',
    step2Title: '2. Candidate Screening & Matching',
    step2Desc: 'Our talent pool is filtered for relevant experience, demeanor, and clean track records.',
    step3Title: '3. Direct Client Interview',
    step3Desc: 'Meet candidates via telephone, video call, or physical meeting at our registered office.',
    step4Title: '4. Documentation & Verification',
    step4Desc: 'NADRA CNIC verification, guarantor agreements, and formal service contracts signed.',
    step5Title: '5. Placement & Ongoing Support',
    step5Desc: 'Candidate dispatches to your premises with structured support and replacement backup.',
    startHiringNowBtn: 'Start Hiring Process Now',

    whyBadge: 'Why Choose Openz',
    whyTitle: 'Built on Trust, Verification & Accountability',
    whyDesc: 'Unlike unregulated street brokers, Openz Associate operates with documented processes and legal verification.',

    galleryBadge: 'Office & Facilities',
    galleryTitle: 'Real Operations, Real People',
    galleryDesc: 'A look inside our recruitment infrastructure, interview chambers, and candidate onboarding.',

    reviewsBadge: 'Client Testimonials',
    reviewsTitle: 'Trusted by Families Across Pakistan',
    reviewsDesc: 'Read verified experiences from households in DHA, Bahria Town, Gulberg, and major commercial hubs.',

    contactBadge: 'Get in Touch',
    contactTitle: 'Contact Our Recruitment Desk',
    contactDesc: 'Speak directly with our staffing consultants or visit our office for personalized consultations.',
    contactOfficeTitle: 'Principal Office',
    contactOfficeAddress: 'Lahore, Pakistan (Operations active across Karachi, Islamabad, Rawalpindi, Faisalabad, Multan & more)',
    contactPhoneTitle: 'Direct Helpline',
    contactEmailTitle: 'Official Email',
    contactHoursTitle: 'Operating Hours',
    contactHoursValue: '24/7 WhatsApp & Phone Support Available',
    sendMessageBtn: 'Send Message',

    footerDesc: 'OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R) is Pakistan’s registered human resource and domestic staffing agency dedicated to safety, reliability, and dignified employment.',
    quickLinks: 'Quick Navigation',
    serviceAreas: 'Core Service Cities',
    legalNotice: 'Legal Notice: All staff placements require NADRA verification and formal legal agreements.',
    allRightsReserved: 'All rights reserved. OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
    replacementPolicy: 'Replacement Policy',
  },
};
