import React from 'react';
import { ShieldCheck, Briefcase, MessageCircle, Phone, CheckCircle2, MapPin, Users2, Clock } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenHireModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, config, isUrdu, theme } = useTemplate();

  const getPrimaryBtnClasses = () => {
    if (theme === 'navy') {
      return 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold';
    }
    if (theme === 'slate') {
      return 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold';
    }
    return 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold';
  };

  const getSubtitleColor = () => {
    if (theme === 'navy') return 'text-blue-300';
    if (theme === 'slate') return 'text-amber-400';
    return 'text-emerald-400';
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Photography with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_employment_pakistan_1790732633789.jpg"
          alt="Openz Associate Recruitment Office Pakistan"
          className="w-full h-full object-cover opacity-25 filter brightness-90 contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-3xl">
          {/* Registered Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{t.heroBadge}</span>
          </div>

          {/* Primary Brand & Banner */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight mb-4">
            {config.agencyName}
          </h1>

          <p className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-4 flex items-center flex-wrap gap-2 ${getSubtitleColor()}`}>
            <span>{isUrdu ? t.heroSubtitle : config.agencySubtitle}</span>
            <span className="text-2xl" role="img" aria-label="Pakistan Flag">🇵🇰</span>
          </p>

          {/* 4 Required Hero Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 my-8">
            <button
              onClick={() => onNavigate('hire-staff')}
              className={`px-6 py-3.5 text-sm sm:text-base rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap ${getPrimaryBtnClasses()}`}
            >
              <Users2 className="w-5 h-5" />
              <span>{t.heroBtnHire}</span>
            </button>

            <button
              onClick={() => onNavigate('jobs')}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span>{t.heroBtnJobs}</span>
            </button>

            <button
              onClick={() =>
                openWhatsAppChat(
                  isUrdu
                    ? `السلام علیکم اوپنز ایسوسی ایٹ، میں اپنے گھر / دفتر کے لیے اسٹاف کی فراہمی کے بارے میں معلومات لینا چاہتا ہوں۔`
                    : `Salam Openz Associate, I want to inquire about available staff for my home / office in Pakistan.`
                )
              }
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.heroBtnWhatsapp}</span>
            </button>

            <a
              href={`tel:${config.phoneRaw}`}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-transparent hover:bg-white/10 border border-slate-600 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              <span>{t.heroBtnCall}</span>
            </a>
          </div>

          {/* Tagline */}
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-base sm:text-lg font-medium text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{t.heroTagline}</span>
            </p>
          </div>
        </div>

        {/* Factual Trust Metrics Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800/90 text-emerald-400 border border-slate-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t.heroTrust1Title}</p>
              <p className="text-xs text-slate-400">{t.heroTrust1Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800/90 text-emerald-400 border border-slate-700 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t.heroTrust2Title}</p>
              <p className="text-xs text-slate-400">{t.heroTrust2Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800/90 text-emerald-400 border border-slate-700 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t.heroTrust3Title}</p>
              <p className="text-xs text-slate-400">{t.heroTrust3Desc}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800/90 text-emerald-400 border border-slate-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{t.heroTrust4Title}</p>
              <p className="text-xs text-slate-400">{t.heroTrust4Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
