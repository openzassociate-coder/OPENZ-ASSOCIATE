import React, { useState } from 'react';
import { STAFF_SERVICES } from '../data/staffData';
import { StaffCategoryGroup, StaffServiceItem } from '../types';
import { Check, ArrowRight, UserCheck, MessageCircle, Crown } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface ServicesSectionProps {
  onSelectRoleForHire: (roleTitle: string) => void;
}

const URDU_SERVICE_TITLES: Record<string, { title: string; desc: string; duties: string[] }> = {
  housemaid: {
    title: 'گھریلو ملازمہ / ماسی (Housemaids)',
    desc: 'صفائی، جھاڑو، پونچھا، برتن، کپڑے دھلائی اور استری کے لیے ایماندار اور محنتی گھریلو خواتین عملہ۔',
    duties: ['پورے گھر کی جامع صفائی اور جھاڑو پونچھا', 'کچن کی دیکھ بھال اور برتن دھونا', 'کپڑوں کی دھلائی اور منظم استری', 'بستر اور الماریوں کی روزمرہ ترتیب'],
  },
  babysitter: {
    title: 'بے بی سٹر (Babysitters)',
    desc: 'نومولود اور چھوٹے بچوں کی دیکھ بھال، فیڈر بنانا، ڈائپر تبدیل کرنا اور حفاظت کی ذمہ دار تربیت یافتہ خواتین۔',
    duties: ['بچوں کے فیڈر اور حفظانِ صحت کا خیال', 'ڈائپر بدلنا اور ہلکا غسل کروانا', 'بچوں کے ساتھ محفوظ کھیل اور آرام دہ نیند', 'گھر میں ہر وقت چوکنا نگرانی'],
  },
  nanny: {
    title: 'نینی / گورنس (Nannies)',
    desc: 'تعلیم یافتہ اور تجربہ کار چائلڈ کیئر نینی جو بچوں کی تربیت، ہوم ورک، آداب اور اسکول روٹین سنبھالتی ہیں۔',
    duties: ['بچوں کی مکمل روزمرہ روٹین اور اسکول تیاری', 'صحت مند ناشتہ اور کھانا تیار کرنا', 'ابتدائی تعلیم اور اخلاقی تربیت', 'ڈاکٹر یا کلاسز کے لیے بچوں کی ہمراہی'],
  },
  'patient-care-staff': {
    title: 'مریضوں اور بزرگوں کی نگہداشت (Patient Care)',
    desc: 'بزرگ والدین، بعد از آپریشن اور بستر پر موجود مریضوں کے لیے صابر، بااخلاق اور تربیت یافتہ فی میل اٹینڈنٹس۔',
    duties: ['مریض کی روزمرہ صفائی، سپنج باتھ اور ڈائپر', 'ڈاکٹر کے نسخے کے مطابق بروقت ادویات کی فراہمی', 'بلڈ پریشر اور شوگر وغیرہ کی روزانہ مانیٹرنگ', 'فزیوتھراپی میں مدد اور ہمدردانہ دیکھ بھال'],
  },
  'female-cook': {
    title: 'خواتین باورچی / شیف (Female Cooks)',
    desc: 'روایتی پاکستانی دیسی کھانے، گول روٹی، پراٹھے، چکن، دالیں اور ڈائٹ کے مطابق کھانا پکانے کی ماہر۔',
    duties: ['ناشتہ، دوپہر اور رات کا لذیذ و تازہ کھانا', 'پاکستانی سالن، بریانی، سبزیاں اور گرما گرم روٹیاں', 'شوگر اور بلڈ پریشر کے مریضوں کا پرہیزی کھانا', 'کچن اور برتنوں کی مکمل صفائی کا خیال'],
  },
  driver: {
    title: 'ڈرائیورز (فیملی اور دفتری)',
    desc: 'لائسنس یافتہ، پرامن اور تصدیق شدہ ڈرائیور برائے فیملی، اسکول پک اینڈ ڈراپ اور دفتری آمدورفت۔',
    duties: ['محفوظ ڈرائیونگ اور مستند پاکستانی ڈرائیونگ لائسنس', 'اسکول اور دفتری اوقات کی بروقت پابندی', 'گاڑی کی صفائی اور روزمرہ مانیٹرنگ', 'شہر کے تمام اہم راستوں اور روٹس سے مکمل واقفیت'],
  },
  'security-guard': {
    title: 'سیکیورٹی گارڈز (Security Guards)',
    desc: 'گھر، فلیٹ، کوٹھی اور دفاتر کی حفاظت کے لیے مستعد، نادرا اور پولیس سے تصدیق شدہ سیکیورٹی گارڈز۔',
    duties: ['مین گیٹ پر آنے جانے والوں کا اندارج اور چیکنگ', 'سی سی ٹی وی مانیٹرنگ اور احاطے کا گشت', 'ہنگامی حالات میں بروقت دفاعی اقدام', 'سخت نظم و ضبط اور ڈیوٹی کی پابندی'],
  },
  'office-boy': {
    title: 'آفس بوائے / پیون (Office Boys)',
    desc: 'کارپوریٹ دفاتر، کلینکس اور چیمبرز کے لیے چاک و چوبند عملہ، چائے، پانی، فوٹو کاپی اور دفتری صفائی۔',
    duties: ['اسٹاف اور مہمانوں کے لیے چائے، کافی اور لنچ سروس', 'دفتری فائلز اور فوٹو کاپی کی بروقت ترسیل', 'دفتر اور ڈیسک کی مکمل صاف ستھری حالت', 'بینک اور کوریئر کے بیرونی امور میں معاونت'],
  },
  helper: {
    title: 'ہیلپر / جنرل لیبر (Helpers)',
    desc: 'گھر کے بھاری کام، گارڈن کی دیکھ بھال، سامان کی شفٹنگ اور گودام وغیرہ کے لیے توانا ہیلپرز۔',
    duties: ['سامان کی نقل و حمل اور بھاری کاموں میں مدد', 'لان کی کٹائی اور گارڈن کی پانی وغیرہ سے نگہداشت', 'چھت اور پانی کے ٹینک کی صفائی', 'سینئر ملازمین کے ساتھ معاونتی خدمات'],
  },
  'male-cook': {
    title: 'مردانہ کک / ماسٹر شیف (Male Cooks)',
    desc: 'بڑے گھرانوں، دعوتوں اور فارم ہاؤس کے لیے ماہر شیف برائے کڑاہی، باربی کیو، مغلئی اور بریانی۔',
    duties: ['مغلئی، بی بی کیو، مٹن، چکن اور چائنیز پکوان', 'بڑی فیملیز اور دعوتوں کا وسیع انتظام', 'گوشت اور کچن کا حفظانِ صحت کے اصولوں پر انتظام', 'عید اور تہواروں پر خصوصی کیٹرنگ'],
  },
  'filipino-staff': {
    title: 'فلپائنی اسٹاف (Filipino Staff)',
    desc: 'روانی سے انگریزی بولنے والا، بچوں کے لیے جدید چائلڈ کیئر اور یورپی معیار کی ہاؤس کیپنگ کا ماہر بین الاقوامی اسٹاف۔',
    duties: ['بچوں کے ساتھ انگریزی میں گفتگو کا ماحول', 'اعلیٰ بین الاقوامی معیار کی صفائی اور ہاؤس کیپنگ', 'بچوں کے اسکول اور مونٹیسوری امور میں رہنمائی', 'شائستہ، بااخلاق اور پرسکون گھریلو طرزِ عمل'],
  },
  'nigerian-staff': {
    title: 'نائیجیرین عملہ (Nigerian Staff)',
    desc: 'بڑے ولاز، بنگلوں اور اسٹیٹ مینجمنٹ کے لیے محنتی اور بااعتماد میل اور فی میل انگریزی داں عملہ۔',
    duties: ['بڑے احاطوں اور کوٹھیوں کی وسیع صفائی', 'انگریزی بول چال کے ساتھ منظم کام', 'گھریلو خدمات کے لیے توانا اور محنتی صلاحیت', 'طویل مدتی رہائشی بنیادوں پر وابستگی'],
  },
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectRoleForHire }) => {
  const [activeTab, setActiveTab] = useState<StaffCategoryGroup>('all');
  const { t, isUrdu, theme } = useTemplate();

  const filteredServices =
    activeTab === 'all'
      ? STAFF_SERVICES
      : STAFF_SERVICES.filter((s) => s.category === activeTab);

  const getThemeButtonClass = () => {
    if (theme === 'navy') return 'bg-blue-700 hover:bg-blue-800 text-white';
    if (theme === 'slate') return 'bg-slate-900 hover:bg-slate-800 text-white';
    return 'bg-emerald-700 hover:bg-emerald-800 text-white';
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            <span>{t.servicesBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isUrdu ? 'خواتین، مردانہ اور غیر ملکی عملہ' : 'Female, Male & International Staff'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.servicesTitle}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {t.servicesDesc}
          </p>
        </div>

        {/* Dedicated VIP Section Notice */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 border border-amber-500/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {isUrdu ? 'خصوصی پریمیئم سروسز' : 'Executive & Diplomatic Staff'}
              </p>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {isUrdu ? 'کیا آپ کو پریمیئم فلپائنی، نائیجیرین یا وی آئی پی عملہ درکار ہے؟' : 'Looking for Premium Filipino, Nigerian or Executive Staff?'}
              </h3>
            </div>
          </div>
          <a
            href="#premium-staff"
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer"
          >
            <span>{isUrdu ? 'پریمیئم اسٹاف سیکشن دیکھیں' : 'Explore Premium Staff Section'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Category Segmented Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-xl mb-10 w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabAll} ({STAFF_SERVICES.length})
          </button>
          <button
            onClick={() => setActiveTab('female')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'female'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabFemale}
          </button>
          <button
            onClick={() => setActiveTab('male')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'male'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabMale}
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'international'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tabInternational}
          </button>
        </div>

        {/* Services Grid with Photos, Short Description, and "Hire Now" button */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service: StaffServiceItem) => {
            const urduInfo = URDU_SERVICE_TITLES[service.id];
            const displayTitle = isUrdu && urduInfo ? urduInfo.title : service.title;
            const displayDesc = isUrdu && urduInfo ? urduInfo.desc : service.description;
            const displayDuties = isUrdu && urduInfo ? urduInfo.duties : service.duties;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
              >
                {/* Photo */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs">
                      {isUrdu
                        ? service.workType === 'Live-in'
                          ? 'رہائشی (Live-in)'
                          : service.workType === 'Live-out'
                          ? 'ڈے ٹائم (Live-out)'
                          : 'رہائشی و ڈے ٹائم دونوں'
                        : service.workType}
                    </span>
                    <span className="font-semibold text-emerald-300 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isUrdu ? 'تصدیق شدہ عملہ' : 'Verified Staff'}</span>
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                      <span className="capitalize font-medium text-emerald-800">
                        {service.category === 'female'
                          ? isUrdu
                            ? 'خواتین شعبہ'
                            : 'Female Division'
                          : service.category === 'male'
                          ? isUrdu
                            ? 'مردانہ شعبہ'
                            : 'Male Division'
                          : isUrdu
                          ? 'غیر ملکی عملہ'
                          : 'Expat Staff'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{isUrdu ? 'تصدیق شدہ پول' : 'Verified Pool'}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 font-display mb-2 group-hover:text-emerald-800 transition-colors">
                      {displayTitle}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {displayDesc}
                    </p>

                    {/* Typical Duties */}
                    <div className="border-t border-slate-100 pt-3 mb-5 space-y-1.5">
                      <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                        {t.keyDuties}
                      </p>
                      {displayDuties.slice(0, 3).map((duty, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{duty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions: Hire Now & WhatsApp Inquire */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => onSelectRoleForHire(service.title)}
                      className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${getThemeButtonClass()}`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{t.hireNowBtn}</span>
                    </button>
                    <button
                      onClick={() =>
                        openWhatsAppChat(
                          isUrdu
                            ? `السلام علیکم اوپنز ایسوسی ایٹ، مجھے *${displayTitle}* درکار ہے۔ برائے مہربانی دستیاب امیدواروں کی پروفائلز شیئر کریں۔`
                            : `Salam Openz Associate, I am interested in hiring *${service.title}*. Please share available candidate profiles.`
                        )
                      }
                      className="p-2.5 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors cursor-pointer"
                      title={t.quickInquiry}
                      aria-label={`WhatsApp inquiry for ${service.title}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Notice */}
        <div className="mt-12 p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">{t.customStaffNotice}</h4>
            <p className="text-xs text-slate-600">{t.customStaffDesc}</p>
          </div>
          <button
            onClick={() => onSelectRoleForHire(isUrdu ? 'خصوصی گھریلو عملہ' : 'Custom Household Staff')}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-2xs"
          >
            <span>{t.requestCustomStaff}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
