import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicy }) => {
  const { t, config, isUrdu } = useTemplate();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* Emblem Badge */}
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-950 text-white flex items-center justify-center font-bold shadow-md border border-white/20 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/25 pointer-events-none" />
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 relative z-10 drop-shadow-xs"
                >
                  <path
                    d="M24 5.5L25.4 8.7L28.8 9.2L26.3 11.6L26.9 15L24 13.3L21.1 15L21.7 11.6L19.2 9.2L22.6 8.7L24 5.5Z"
                    fill="#FCD34D"
                  />
                  <circle
                    cx="24"
                    cy="27"
                    r="13.5"
                    stroke="url(#oaRingGradFooter)"
                    strokeWidth="2.75"
                    strokeDasharray="68 18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 16.5L17.2 34.5H21.2L22.6 30.5H25.4L26.8 34.5H30.8L24 16.5Z"
                    fill="#FFFFFF"
                  />
                  <rect
                    x="21.2"
                    y="27.8"
                    width="5.6"
                    height="2"
                    rx="1"
                    fill="#FCD34D"
                  />
                  <defs>
                    <linearGradient id="oaRingGradFooter" x1="10" y1="13" x2="38" y2="41" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FDE68A" />
                      <stop offset="0.4" stopColor="#FFFFFF" />
                      <stop offset="1" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-amber-400 text-slate-950 font-black text-[7px] leading-none flex items-center justify-center border border-white">
                  R
                </span>
              </div>

              <div>
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-display block leading-tight">
                  {config.agencyName}
                </span>
                <span className="text-[10px] tracking-wider uppercase text-emerald-400 font-semibold block mt-0.5">
                  {isUrdu ? 'مستند اور قانونی ایمپلائمنٹ سروسز' : 'Employment Services & Staffing (R)'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {t.footerDesc}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'نادرا اور شناختی تصدیق شدہ' : 'CNIC Verified Candidates'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <span>{isUrdu ? 'متبادل وارنٹی' : 'Replacement Warranty'}</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navHome}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navServices}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navJobs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navProcess}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navGallery}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.navReviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('google-drive')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-semibold"
                >
                  📁 {t.navVault}
                </button>
              </li>
            </ul>
          </div>

          {/* Staff Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isUrdu ? 'اسٹاف کی کیٹیگریز' : 'Staff Categories'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-start"
                >
                  {isUrdu ? 'گھریلو ملازمہ و صفائی عملہ' : 'Housemaids & Cleaning Staff'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-start"
                >
                  {isUrdu ? 'بے بی سٹر و نینی' : 'Babysitters & Nannies'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-start"
                >
                  {isUrdu ? 'مریضوں و بزرگوں کی دیکھ بھال' : 'Patient Care & Nursing Attendants'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-start"
                >
                  {isUrdu ? 'ماہر باورچی و شیف' : 'Female & Male Master Cooks'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-start"
                >
                  {isUrdu ? 'ڈرائیورز و سیکیورٹی گارڈز' : 'Personal Drivers & Security Guards'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-start"
                >
                  {isUrdu ? 'فلپائنی و نائیجیرین عملہ' : 'Filipino & Nigerian Domestic Staff'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hire-staff')}
                  className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  → {isUrdu ? 'آن لائن اسٹاف حاصل کریں' : 'Hire Staff Online Now'}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Agency Contacts */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {isUrdu ? 'رابطہ و رہنمائی' : 'Contact & Support'}
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={`tel:${config.phoneRaw}`}
                className="flex items-center gap-2 text-white font-mono font-bold hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{config.phoneDisplay}</span>
              </a>

              <button
                onClick={() =>
                  openWhatsAppChat(
                    isUrdu
                      ? 'السلام علیکم اوپنز ایسوسی ایٹ، مجھے اسٹاف کے متعلق رہنمائی درکار ہے۔'
                      : 'Salam Openz Associate, I need assistance regarding staff recruitment.'
                  )
                }
                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-start"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.whatsapp247}</span>
              </button>

              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{config.email}</span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isUrdu ? config.addressUr : config.addressEn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {config.agencyName}. {t.allRightsReserved}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer underline"
            >
              {t.privacyPolicy}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer underline"
            >
              {t.termsConditions}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onOpenPolicy('disclaimer')}
              className="hover:text-slate-300 transition-colors cursor-pointer underline"
            >
              {t.replacementPolicy}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
