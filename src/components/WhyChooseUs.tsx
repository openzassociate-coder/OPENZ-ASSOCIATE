import React from 'react';
import {
  Briefcase,
  Users2,
  Globe2,
  Zap,
  SlidersHorizontal,
  Headphones,
  FileCheck2,
} from 'lucide-react';
import { useTemplate } from '../context/TemplateContext';

export const WhyChooseUs: React.FC = () => {
  const { t, config, isUrdu } = useTemplate();

  const features = [
    {
      title: isUrdu ? 'پیشہ ورانہ اور باضابطہ سروس' : 'Professional Recruitment Service',
      desc: isUrdu
        ? 'باقاعدہ قانونی رجسٹریشن، نادرا بائیو میٹرک تصدیق اور شفاف تحریری معاہدہ۔'
        : 'Formally organized recruitment with transparent documentation, background checks, and clear replacement policies.',
      icon: Briefcase,
    },
    {
      title: isUrdu ? 'متعدد شعبہ جات کا عملہ' : 'Multiple Staff Categories',
      desc: isUrdu
        ? 'ماسی، نینی، بے بی سٹر، مریضوں کی دیکھ بھال، ڈرائیورز، کک اور سیکیورٹی گارڈز ایک ہی چھت تلے۔'
        : 'Single destination for female domestic maids, nannies, cooks, male chauffeurs, security guards, and international talent.',
      icon: Users2,
    },
    {
      title: isUrdu ? 'ملک گیر سروس نیٹ ورک' : 'Pakistan-Wide Service Network',
      desc: isUrdu
        ? 'لاہور، کراچی، اسلام آباد، راولپنڈی، فیصل آباد، ملتان، سیالکوٹ اور دیگر تمام بڑے شہروں میں دستیابی۔'
        : 'Serving high-density communities in Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and surrounding districts.',
      icon: Globe2,
    },
    {
      title: isUrdu ? 'فوری رسپانس اور بروقت فراہمی' : 'Quick Response & Fast Dispatch',
      desc: isUrdu
        ? 'درخواست ملنے کے بعد چند ہی گھنٹوں میں موزوں امیدواروں کی پروفائلز کی فراہمی اور انٹرویو۔'
        : 'Prompt coordination within hours of receiving requirements. Rapid interview scheduling so households do not stay unattended.',
      icon: Zap,
    },
    {
      title: isUrdu ? 'آپ کی ضروریات کے عین مطابق انتخاب' : 'Client Requirement Based Matching',
      desc: isUrdu
        ? 'آپ کے گھریلو مزاج، بچوں کی عمر، کام کے اوقات اور بجٹ کے مطابق بہترین ملازم کا چناؤ۔'
        : 'We match candidates based on specific religious/cultural dietary preferences, family size, child age, and shift schedules.',
      icon: SlidersHorizontal,
    },
    {
      title: isUrdu ? '24 گھنٹے واٹس ایپ و کال سپورٹ' : '24/7 WhatsApp & Call Support',
      desc: isUrdu
        ? `کسی بھی ہنگامی رہنمائی، تبدیلی یا سوال کے لیے ہماری ہیلپ لائن (${config.phoneDisplay}) ہر وقت حاضر ہے۔`
        : `Direct hotline access (${config.phoneDisplay}) for emergency queries, attendance checks, and customer assistance.`,
      icon: Headphones,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
            <span>{t.whyBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{config.agencyName}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            {t.whyTitle}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.whyDesc}
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Factual Transparency & Privacy Protocol Note */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-emerald-700 text-white rounded-xl shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              {isUrdu
                ? 'قانونی جانچ پڑتال اور رازداری کا اعلیٰ معیار'
                : 'Our Documented Verification & Privacy Standard'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {isUrdu
                ? 'ہم ہر امیدوار کا نادرا شناختی کارڈ، سابقہ ملازمت کا ریکارڈ، رہائشی پتہ اور ضامن کی تصدیق جمع کرتے ہیں۔ تمام کلائنٹس اور امیدواروں کا ڈیٹا مکمل رازداری کے ساتھ محفوظ رکھا جاتا ہے۔'
                : 'We collect and verify candidate CNIC records, local address affidavits, guarantor references, and prior service records. Personal data is treated strictly with confidentiality.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
