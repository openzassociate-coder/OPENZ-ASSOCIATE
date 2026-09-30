import React from 'react';
import { Crown, Sparkles, ShieldCheck, Check, MessageCircle, ArrowRight, UserCheck, Star, Award, Phone } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface PremiumStaffSectionProps {
  onSelectRoleForHire: (roleTitle: string) => void;
}

interface PremiumStaffProfile {
  id: string;
  title: string;
  urduTitle: string;
  badge: string;
  urduBadge: string;
  image: string;
  arrangement: string;
  urduArrangement: string;
  description: string;
  urduDescription: string;
  highlights: string[];
  urduHighlights: string[];
  isExpat?: boolean;
}

const PREMIUM_PROFILES: PremiumStaffProfile[] = [
  {
    id: 'premium-filipino',
    title: 'Premium Filipino Staff',
    urduTitle: 'پریمیئم فلپائنی اسٹاف (Filipino Staff)',
    badge: 'International Gold Standard',
    urduBadge: 'بین الاقوامی گولڈ اسٹینڈرڈ',
    image: '/src/assets/images/filipino_staff_portrait_1790746945254.jpg',
    arrangement: 'Live-in Contract · Full Time',
    urduArrangement: 'رہائشی معاہدہ · مکمل وقت',
    description: 'World-renowned for exceptional domestic dedication, polite etiquette, fluent English communication, and European-standard housekeeping.',
    urduDescription: 'شائستہ اخلاق، روانی سے انگریزی بول چال، اعلیٰ یورپی معیار کی صفائی اور بچوں کی نگہداشت کے لیے عالمی شہرت یافتہ فلپائنی عملہ۔',
    highlights: [
      'Fluent English-speaking household environment',
      'Infant weaning, Montessori guidance & gentle childcare',
      'High-end European housekeeping & delicate fabric care',
      'Verified passport, visa & embassy documentation',
    ],
    urduHighlights: [
      'بچوں کے ساتھ انگریزی میں گفتگو کا بہترین ماحول',
      'چھوٹے بچوں کی نگہداشت، غذائیت اور مونٹیسوری امور',
      'اعلیٰ یورپی معیار کی صفائی اور قیمتی کپڑوں کی دیکھ بھال',
      'پاسپورٹ، ویزا اور دستاویزی تصدیق شدہ',
    ],
    isExpat: true,
  },
  {
    id: 'premium-nigerian',
    title: 'Premium Nigerian Staff',
    urduTitle: 'پریمیئم نائیجیرین عملہ (Nigerian Staff)',
    badge: 'Estate & Villa Specialists',
    urduBadge: 'اسٹیٹ اور ولا اسپیشلسٹ',
    image: '/src/assets/images/nigerian_staff_portrait_1790746959125.jpg',
    arrangement: 'Live-in Contract · Full Time',
    urduArrangement: 'رہائشی معاہدہ · مکمل وقت',
    description: 'Energetic, disciplined, and English-speaking personnel tailored for large family compounds, luxury farmhouses, and extensive villa management.',
    urduDescription: 'بڑے ولاز، کوٹھیوں اور فارم ہاؤسز کی وسیع دیکھ بھال کے لیے توانا، محنتی، شائستہ اور انگریزی داں میل اور فی میل نائیجیرین عملہ۔',
    highlights: [
      'Fluent English communication & courteous manners',
      'Large villa deep sanitization & compound maintenance',
      'Long-term live-in reliability with strong stamina',
      'Comprehensive security screening & biometric vetting',
    ],
    urduHighlights: [
      'روانی سے انگریزی گفتگو اور مؤدبانہ آداب',
      'بڑے بنگلوں، ولاز اور احاطے کی گہری صفائی ستھرائی',
      'طویل مدتی رہائشی بنیادوں پر وابستگی اور محنتی صلاحیت',
      'جامع بائیو میٹرک اور سیکیورٹی تصدیق',
    ],
    isExpat: true,
  },
  {
    id: 'professional-housemaids',
    title: 'Professional Housemaids',
    urduTitle: 'پیشہ ور گھریلو ملازمائیں (Housemaids)',
    badge: 'Five-Star Domestic Care',
    urduBadge: 'فائیو اسٹار ہوم کیئر',
    image: '/src/assets/images/service_domestic_nanny_1790732648632.jpg',
    arrangement: 'Live-in or Day Shift',
    urduArrangement: 'رہائشی یا ڈے شفٹ',
    description: 'Meticulously trained domestic housemaids specializing in deep sanitization, delicate garment ironing, wardrobe styling, and spotless upkeep.',
    urduDescription: 'پورے گھر کی جامع اور منظم صفائی، نازک کپڑوں کی دھلائی اور استری، کچن کی حفظانِ صحت اور الماریوں کی ترتیب کی ماہر خواتین۔',
    highlights: [
      'Comprehensive deep sanitization of luxury surfaces',
      'Wardrobe management, steaming & delicate fabric care',
      'Spotless kitchen sanitization & daily dish care',
      '100% NADRA CNIC & local guarantor verified',
    ],
    urduHighlights: [
      'ماربل، ٹائلز اور نفیس فرنیچر کی ماہرانہ صفائی',
      'الماریوں کی ترتیب، منظم کپڑے اور نفاست سے استری',
      'کچن اور برتنوں کی مکمل حفظانِ صحت کے اصولوں پر دیکھ بھال',
      'نادرا شناختی کارڈ اور ضامن سے مکمل تصدیق شدہ',
    ],
  },
  {
    id: 'premium-nannies',
    title: 'Premium Nannies / Babysitters',
    urduTitle: 'پریمیئم نینیز / بے بی سٹرز (Nannies)',
    badge: 'Early Childhood Specialists',
    urduBadge: 'چائلڈ کیئر اسپیشلسٹ',
    image: '/src/assets/images/filipino_staff_portrait_1790746945254.jpg',
    arrangement: 'Live-in · 24h Care or Shift',
    urduArrangement: 'رہائشی · 24 گھنٹے یا شفٹ',
    description: 'Dedicated and caring nannies prioritizing infant hygiene, cognitive stimulation, bedtime routines, balanced nutrition, and safety.',
    urduDescription: 'نومولود اور ننھے بچوں کی حفظانِ صحت، نیند کا شیڈول، متوازن غذا، ابتدائی ہوم ورک اور پیار بھری چوکنا نگرانی کی ذمہ دار خواتین۔',
    highlights: [
      'Newborn bottle sterilization & developmental milestones',
      'Positive cognitive routine, storytelling & screen-free play',
      'Nutritious meal scheduling & pediatric allergy awareness',
      'Compassionate, affectionate and patient demeanor',
    ],
    urduHighlights: [
      'فیڈر کی صفائی، ڈائپر کا بروقت خیال اور نیند کا نظم',
      'بچوں کے ساتھ محفوظ تعلیمی کھیل اور اخلاقی تربیت',
      'صحت بخش غذا اور کھانے پینے کے اوقات کی پابندی',
      'نہایت صابر، پیار کرنے والی اور چوکنا شخصیت',
    ],
  },
  {
    id: 'professional-cooks',
    title: 'Professional Cooks & Chefs',
    urduTitle: 'پیشہ ور باورچی و شیفس (Cooks & Chefs)',
    badge: 'Executive Culinary Arts',
    urduBadge: 'ماسٹر شیف اور کلنری آرٹس',
    image: '/src/assets/images/nigerian_staff_portrait_1790746959125.jpg',
    arrangement: 'Live-in · Executive Kitchen',
    urduArrangement: 'رہائشی · ایگزیکٹو کچن',
    description: 'Accomplished culinary professionals mastering authentic Pakistani gravies, BBQ, Continental menus, and customized dietary health plans.',
    urduDescription: 'روایتی لذیذ پاکستانی کھانے، باربی کیو، مٹن، بریانی، کانٹینینٹل پکوان اور پرہیزی ڈائٹ کے ماہر تربیت یافتہ باورچی اور شیف۔',
    highlights: [
      'Multi-cuisine mastery: Desi, Continental, BBQ & Chinese',
      'Strict kitchen hygiene, fresh ingredients & warm rotis',
      'Dietary plans: Diabetic, hypertensive, keto & low-oil',
      'Banqueting and large family dawat meal coordination',
    ],
    urduHighlights: [
      'دیسی، کانٹینینٹل، بی بی کیو، چائنیز اور مغلئی پکوان',
      'کچن کی مکمل صفائی، تازہ گوشت و سبزیوں کا نظم',
      'شوگر اور بلڈ پریشر کے مریضوں کا خصوصی پرہیزی کھانا',
      'دعوتوں، عید اور خاندانی تقریبات کا پروقار انتظام',
    ],
  },
  {
    id: 'patient-care-staff',
    title: 'Patient Care Staff',
    urduTitle: 'مریضوں اور بزرگوں کی دیکھ بھال (Patient Care)',
    badge: 'Certified Health Attendants',
    urduBadge: 'مصدقہ ہیلتھ اٹینڈنٹس',
    image: '/src/assets/images/service_patient_care_1790732659984.jpg',
    arrangement: '12h Shift or 24h Live-in',
    urduArrangement: '12 گھنٹے شفٹ یا 24 گھنٹے رہائشی',
    description: 'Trained, patient, and empathetic bedside attendants for post-operative recovery, elderly parents, and mobility support.',
    urduDescription: 'بزرگ والدین، بعد از آپریشن اور بستر پر موجود مریضوں کی باوقار دیکھ بھال کے لیے صابر، بااخلاق اور تربیت یافتہ اٹینڈنٹس۔',
    highlights: [
      'Bedside assistance, sponge bath, hygiene & diaper care',
      'Timely medicine dispensing according to doctor prescription',
      'Vital signs tracking (Blood pressure, sugar & pulse)',
      'Respectful companionship & physical mobility help',
    ],
    urduHighlights: [
      'سپنج باتھ، ڈائپر بدلنا، لباس اور بستر کی مکمل صفائی',
      'ڈاکٹر کے نسخے کے مطابق بروقت ادویات کی فراہمی',
      'بلڈ پریشر، شوگر اور نبض کی باقاعدہ روزانہ مانیٹرنگ',
      'ہمدردانہ رفاقت اور فزیوتھراپی میں مدد',
    ],
  },
  {
    id: 'trained-domestic-staff',
    title: 'Trained Domestic Staff',
    urduTitle: 'تربیت یافتہ گھریلو عملہ و کپلز (Domestic Staff)',
    badge: 'Comprehensive Household Support',
    urduBadge: 'جامع گھریلو معاونت و کپلز',
    image: '/src/assets/images/luxury_concierge_staff_1790746971212.jpg',
    arrangement: 'Live-in Quarters / Married Couple',
    urduArrangement: 'رہائشی کوارٹر / شادی شدہ جوڑے',
    description: 'Verified domestic couples, estate caretakers, and all-round stewards for villas, farmhouses, and multi-story residences.',
    urduDescription: 'بڑے ولاز اور فارم ہاؤسز کے لیے نادرا تصدیق شدہ میاں بیوی (جوڑے)، اسٹیٹ کیئرٹیکرز اور ہمہ جہت گھریلو مددگار۔',
    highlights: [
      'Domestic couples with verified Nikahnama & CNIC',
      'Combined housekeeping, cooking, driving & compound care',
      'Discreet, reliable, and family-oriented conduct',
      'Complete home maintenance and steward service',
    ],
    urduHighlights: [
      'نکاح نامہ اور نادرا سے تصدیق شدہ مستند میاں بیوی',
      'صفائی، کھانا پکانے، ڈرائیونگ اور گارڈن کی مشترکہ دیکھ بھال',
      'شریف، پرامن اور قابلِ اعتماد خاندانی ماحول',
      'گھر کے روزمرہ امور اور سامان کی منظم سنبھال',
    ],
  },
];

export const PremiumStaffSection: React.FC<PremiumStaffSectionProps> = ({ onSelectRoleForHire }) => {
  const { t, isUrdu, config } = useTemplate();

  const handleInquireWhatsApp = (profile: PremiumStaffProfile) => {
    const roleName = isUrdu ? profile.urduTitle : profile.title;
    const msg = isUrdu
      ? `*پریمیئم اسٹاف وی آئی پی انکوائری* 💎
*${config.agencyName}*
--------------------------------------
السلام علیکم، مجھے اپنے گھر کے لیے *${roleName}* (${profile.urduArrangement}) کی ضرورت ہے۔
برائے مہربانی دستیاب تصدیق شدہ امیدواروں کی پروفائلز اور تفصیلات شیئر فرمائیں۔`
      : `*VIP INQUIRY: PREMIUM STAFF SERVICES* 💎
*${config.agencyName}*
--------------------------------------
Salam Openz Associate, I am inquiring about *${profile.title}* (${profile.arrangement}) for my household.
Please share available vetted candidate profiles and placement terms.`;
    openWhatsAppChat(msg);
  };

  return (
    <section id="premium-staff" className="relative py-20 sm:py-28 bg-[#090D16] text-white overflow-hidden border-b border-amber-500/20">
      {/* Ambient Luxury Lighting Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-slate-900/40 to-transparent pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t.premiumBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              {t.premiumTitle}
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.premiumSubtitle}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {t.premiumVipDesc}
          </p>
        </div>

        {/* 4 Pillars of Executive Trust Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14">
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{t.premiumGuarantee1}</p>
              <p className="text-[11px] text-slate-400">{isUrdu ? 'مکمل قانونی دستاویزات' : 'NADRA & Embassy Vetted'}</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{t.premiumGuarantee2}</p>
              <p className="text-[11px] text-slate-400">{isUrdu ? 'شائستہ گھریلو آداب' : 'Refined Demeanor'}</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{t.premiumGuarantee3}</p>
              <p className="text-[11px] text-slate-400">{isUrdu ? 'یورپی و جدید طور طریقے' : 'Modern Standards'}</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{t.premiumGuarantee4}</p>
              <p className="text-[11px] text-slate-400">{isUrdu ? 'اطمینان بخش معاہدہ' : 'Contracted Peace of Mind'}</p>
            </div>
          </div>
        </div>

        {/* 7 Highlighted Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PREMIUM_PROFILES.map((profile) => {
            const displayTitle = isUrdu ? profile.urduTitle : profile.title;
            const displayBadge = isUrdu ? profile.urduBadge : profile.badge;
            const displayArrangement = isUrdu ? profile.urduArrangement : profile.arrangement;
            const displayDesc = isUrdu ? profile.urduDescription : profile.description;
            const displayHighlights = isUrdu ? profile.urduHighlights : profile.highlights;

            return (
              <div
                key={profile.id}
                className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <img
                      src={profile.image}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 start-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        <Crown className="w-3 h-3 text-amber-400" />
                        <span>{displayBadge}</span>
                      </span>
                    </div>

                    {/* Bottom Arrangement Tag */}
                    <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-xs border border-slate-700/60">
                        {displayArrangement}
                      </span>
                      <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 bg-amber-950/60 px-2 py-1 rounded-md border border-amber-500/30">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{isUrdu ? 'تصدیق شدہ' : 'Verified'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl font-extrabold text-white font-display mb-2 group-hover:text-amber-300 transition-colors">
                      {displayTitle}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3">
                      {displayDesc}
                    </p>

                    {/* Competency Highlights */}
                    <div className="border-t border-slate-800/90 pt-4 mb-4 space-y-2">
                      <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>{isUrdu ? 'خصوصیات و مہارت:' : 'Key Competencies:'}</span>
                      </p>
                      {displayHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span className="leading-snug">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/60 mt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => onSelectRoleForHire(profile.title)}
                    className="w-full sm:flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-950/30"
                  >
                    <UserCheck className="w-4 h-4 text-slate-950" />
                    <span>{t.premiumBookProfileBtn}</span>
                  </button>

                  <button
                    onClick={() => handleInquireWhatsApp(profile)}
                    className="w-full sm:w-auto p-2.5 text-amber-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400/60 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    title={t.premiumInquireBtn}
                    aria-label={`WhatsApp VIP inquiry for ${profile.title}`}
                  >
                    <MessageCircle className="w-4 h-4 text-amber-400" />
                    <span className="sm:hidden text-xs font-semibold">{t.premiumInquireBtn}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom VIP Concierge Desk */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 text-center md:text-start">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-4 h-4" />
              <span>{isUrdu ? 'وی آئی پی گھریلو مشاورتی ڈیسک' : 'VIP Concierge & Diplomatic Staffing'}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              {isUrdu
                ? 'کیا آپ کو مکمل گھریلو عملہ یا سفارتی رہائش گاہ کے لیے ٹیم درکار ہے؟'
                : 'Need a Full Household Team or Diplomatic Residence Package?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {isUrdu
                ? 'ہمارے سینئر ریکروٹمنٹ ڈائریکٹر سے براہ راست رازداری کے ساتھ رابطہ کریں۔ انٹرویوز اور شارٹ لسٹنگ ترجیحی بنیادوں پر کی جائے گی۔'
                : 'Speak directly with our Senior Placement Director in strict confidence. Dedicated portfolio presentation and interview scheduling within 24 hours.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${config.phoneRaw}`}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{t.callNow}</span>
            </a>
            <button
              onClick={() => {
                const msg = isUrdu
                  ? `السلام علیکم اوپنز ایسوسی ایٹ، مجھے وی آئی پی گھریلو اسٹاف پیکیج کے حوالے سے سینئر کنسلٹنٹ سے رہنمائی چاہیے۔`
                  : `Salam Openz Associate, I require a confidential VIP household staffing consultation for our residence.`;
                openWhatsAppChat(msg);
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>{isUrdu ? 'وی آئی پی واٹس ایپ رابطہ' : 'WhatsApp Concierge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
