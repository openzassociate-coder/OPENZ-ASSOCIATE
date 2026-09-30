import React from 'react';
import { ShieldCheck, MapPin, Users, Award, CheckCircle, Clock } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/staffData';
import { useTemplate } from '../context/TemplateContext';

export const AboutSection: React.FC = () => {
  const { t, config, isUrdu } = useTemplate();

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Credentials */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-2">
              <span>{t.aboutBadge}</span>
              <span aria-hidden="true">·</span>
              <span>{config.agencyName}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-6">
              {t.aboutTitle}
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>{config.agencyName}</strong> {t.aboutDesc1}
              </p>
              <p>
                {t.aboutDesc2}
              </p>
              <p>
                {isUrdu
                  ? 'لاہور، کراچی، اسلام آباد اور راولپنڈی سمیت پاکستان کے تمام بڑے شہروں میں ہماری خدمات دستیاب ہیں۔ مکمل بائیو میٹرک تصدیق اور ریپلیسمنٹ وارنٹی کے ساتھ ذہنی سکون حاصل کریں۔'
                  : 'Unlike informal intermediaries, Openz Associate operates with documented agreements, verified CNIC documentation, guarantor verification, and a transparent replacement warranty so families never face disruption.'}
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.aboutFeature1Title}</h4>
                  <p className="text-xs text-slate-500">{t.aboutFeature1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.aboutFeature3Title}</h4>
                  <p className="text-xs text-slate-500">{t.aboutFeature3Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.aboutFeature2Title}</h4>
                  <p className="text-xs text-slate-500">{t.aboutFeature2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.aboutFeature4Title}</h4>
                  <p className="text-xs text-slate-500">{t.aboutFeature4Desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Active Cities */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="/src/assets/images/gallery_office_team_1790732686202.jpg"
                alt="Openz Associate Recruitment Team Office"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-slate-900 text-white">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>{isUrdu ? 'مستند تصدیقی اور بھرتی ڈیسک' : 'Licensed Operations & Verification Desk'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isUrdu
                    ? 'ہمارے کونسلرز ذاتی طور پر امیدواروں کے شناختی کارڈ، ڈرائیونگ لائسنس اور سابقہ ریکارڈ کی جانچ کرتے ہیں۔'
                    : 'Our consultants personally examine candidate credentials, driving licenses, and previous household employment records.'}
                </p>
              </div>
            </div>

            {/* Cities Served Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {isUrdu ? 'پاکستان کے جن شہروں میں سروس دستیاب ہے 🇵🇰' : 'Cities Served Across Pakistan 🇵🇰'}
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PAKISTAN_CITIES.map((city) => (
                  <span
                    key={city}
                    className="text-xs font-medium text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
