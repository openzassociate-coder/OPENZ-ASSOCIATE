import React from 'react';
import { FileEdit, Users, PhoneCall, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';
import { useTemplate } from '../context/TemplateContext';

interface RecruitmentProcessProps {
  onStartHiring: () => void;
}

export const RecruitmentProcess: React.FC<RecruitmentProcessProps> = ({ onStartHiring }) => {
  const { t, isUrdu, theme } = useTemplate();

  const steps = [
    {
      num: '01',
      title: isUrdu ? '1. ضرورت کا اندراج' : t.step1Title,
      sub: isUrdu ? 'کلائنٹ اپنی ضرورت اور بجٹ درج کرواتا ہے' : 'Client submits staff requirement & budget',
      desc: t.step1Desc,
      icon: FileEdit,
    },
    {
      num: '02',
      title: isUrdu ? '2. امیدواروں کا چناؤ' : t.step2Title,
      sub: isUrdu ? 'ضرورت کے مطابق موزوں پروفائلز شارٹ لسٹ ہوتی ہیں' : 'Suitable pre-vetted candidates selected',
      desc: t.step2Desc,
      icon: Users,
    },
    {
      num: '03',
      title: isUrdu ? '3. براہ راست انٹرویو' : t.step3Title,
      sub: isUrdu ? 'کلائنٹ امیدوار کا فون یا روبرو انٹرویو کرتا ہے' : 'Direct client interview via phone or in-person',
      desc: t.step3Desc,
      icon: PhoneCall,
    },
    {
      num: '04',
      title: isUrdu ? '4. حتمی انتخاب و دستاویزات' : t.step4Title,
      sub: isUrdu ? 'نادرا اور شناختی کارڈ کی قانونی تصدیق' : 'NADRA, CNIC & guarantor documentation',
      desc: t.step4Desc,
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: isUrdu ? '5. جوائننگ اور گارنٹی' : t.step5Title,
      sub: isUrdu ? 'ملازم کام شروع کرتا ہے اور ریپلیسمنٹ بیک اپ' : 'Staff joining with replacement support',
      desc: t.step5Desc,
      icon: UserCheck,
    },
  ];

  const getPrimaryCtaClasses = () => {
    if (theme === 'navy') return 'bg-blue-400 hover:bg-blue-300 text-slate-950';
    if (theme === 'slate') return 'bg-amber-400 hover:bg-amber-300 text-slate-950';
    return 'bg-emerald-400 hover:bg-emerald-300 text-slate-950';
  };

  return (
    <section id="process" className="py-16 sm:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase mb-2">
            <span>{t.processBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isUrdu ? 'آسان اور شفاف 5 مراحل' : 'Transparent 5 Steps'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            {t.processTitle}
          </h2>
          <p className="mt-3 text-base text-slate-300">
            {t.processDesc}
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative group hover:border-emerald-500/50 hover:bg-slate-800 transition-all shadow-sm"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-display text-emerald-400 font-mono">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-700/80 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>

                  <p className="text-xs font-medium text-emerald-300/90 mb-3 italic">
                    "{step.sub}"
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -end-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-800 to-slate-900 border border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-white">
              {isUrdu
                ? 'کیا آپ کو گھر یا دفتر کے لیے تصدیق شدہ اسٹاف درکار ہے؟'
                : 'Ready to hire verified domestic or office staff?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {isUrdu
                ? 'صرف 1 منٹ میں فارم پر کریں اور آج ہی مصدقہ امیدواروں کی تفصیلات حاصل کریں۔'
                : 'Submit your requirement in 60 seconds and receive pre-screened candidate profiles today.'}
            </p>
          </div>
          <button
            onClick={onStartHiring}
            className={`px-6 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap ${getPrimaryCtaClasses()}`}
          >
            {t.startHiringNowBtn}
          </button>
        </div>
      </div>
    </section>
  );
};
