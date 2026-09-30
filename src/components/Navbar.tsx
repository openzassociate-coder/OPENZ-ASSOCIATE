import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Languages } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenHireModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenHireModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, config, isUrdu, toggleLanguage, theme } = useTemplate();

  const navLinks = [
    { id: 'home', label: t.navHome },
    { id: 'premium-staff', label: t.navPremiumStaff },
    { id: 'services', label: t.navServices },
    { id: 'jobs', label: t.navJobs },
    { id: 'hire-staff', label: t.navHireStaff },
    { id: 'job-seekers', label: t.navJobSeekers },
    { id: 'process', label: t.navProcess },
    { id: 'about', label: t.navAbout },
    { id: 'gallery', label: t.navGallery },
    { id: 'reviews', label: t.navReviews },
    { id: 'google-drive', label: t.navVault },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const getThemeBg = () => {
    if (theme === 'navy') return 'bg-blue-700 hover:bg-blue-800 text-white';
    if (theme === 'slate') return 'bg-slate-900 hover:bg-slate-800 text-white';
    return 'bg-emerald-700 hover:bg-emerald-800 text-white';
  };

  const getThemeBadgeBg = () => {
    if (theme === 'navy') return 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950 text-white shadow-blue-900/20';
    if (theme === 'slate') return 'bg-gradient-to-br from-slate-800 via-slate-900 to-black text-amber-400 shadow-slate-950/30';
    return 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-950 text-white shadow-emerald-900/25';
  };

  const getBrandHighlightGradient = () => {
    if (theme === 'navy') return 'from-blue-700 via-blue-800 to-indigo-900';
    if (theme === 'slate') return 'from-slate-900 via-slate-800 to-amber-600';
    return 'from-emerald-700 via-teal-800 to-emerald-900';
  };

  const getSubtitleThemeColor = () => {
    if (theme === 'navy') return 'text-blue-700';
    if (theme === 'slate') return 'text-amber-600';
    return 'text-emerald-700';
  };

  const renderBrandTitle = () => {
    const name = config.agencyName || 'OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)';
    if (name.toUpperCase().includes('OPENZ ASSOCIATE')) {
      const rest = name.replace(/OPENZ\s+ASSOCIATE/i, '').replace(/\(R\)/i, '').trim();
      return (
        <span className="flex items-center gap-1.5 flex-wrap">
          <span className={`bg-gradient-to-r ${getBrandHighlightGradient()} bg-clip-text text-transparent font-black tracking-tight`}>
            OPENZ
          </span>
          <span className="text-slate-900 font-extrabold tracking-tight">
            ASSOCIATE
          </span>
          {rest && (
            <span className="text-slate-600 font-semibold text-xs sm:text-sm hidden lg:inline">
              {rest}
            </span>
          )}
          <span className="inline-flex items-center text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 tracking-normal shadow-2xs">
            (R)
          </span>
        </span>
      );
    }
    return <span className="text-slate-900 font-extrabold">{name}</span>;
  };

  const getThemeActiveText = () => {
    if (theme === 'navy') return 'text-blue-700 font-semibold';
    if (theme === 'slate') return 'text-slate-900 font-bold';
    return 'text-emerald-700 font-semibold';
  };

  const getThemeIndicator = () => {
    if (theme === 'navy') return 'bg-blue-600';
    if (theme === 'slate') return 'bg-amber-500';
    return 'bg-emerald-600';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-100">{t.announcement}</span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-300">{t.announcementSub}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <a
              href={`tel:${config.phoneRaw}`}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-mono">{config.phoneDisplay}</span>
            </a>

            <button
              onClick={() =>
                openWhatsAppChat(
                  isUrdu
                    ? 'السلام علیکم، مجھے پاکستان میں گھریلو / دفتری اسٹاف کے بارے میں معلومات درکار ہیں۔'
                    : 'Salam Openz Associate, I need assistance regarding staff hiring in Pakistan.'
                )
              }
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">{t.whatsapp247}</span>
            </button>

            {/* Quick Lang Switch in header */}
            <button
              onClick={toggleLanguage}
              className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 cursor-pointer"
              title="Toggle Language"
            >
              <Languages className="w-3 h-3" />
              <span>{isUrdu ? 'EN' : 'اردو'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-start group flex items-center gap-2.5 sm:gap-3 cursor-pointer py-1"
        >
          {/* Logo Emblem Badge (Selector 1) */}
          <div
            className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg border border-white/20 overflow-hidden shrink-0 ${getThemeBadgeBg()}`}
          >
            {/* Subtle gloss reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/25 pointer-events-none" />

            {/* Custom High-Fidelity Vector Insignia */}
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 sm:w-9 sm:h-9 relative z-10 drop-shadow-xs"
            >
              {/* Star at Top Apex */}
              <path
                d="M24 5.5L25.4 8.7L28.8 9.2L26.3 11.6L26.9 15L24 13.3L21.1 15L21.7 11.6L19.2 9.2L22.6 8.7L24 5.5Z"
                fill="#FCD34D"
              />

              {/* Stylized Outer Monogram Ring "O" */}
              <circle
                cx="24"
                cy="27"
                r="13.5"
                stroke="url(#oaRingGrad)"
                strokeWidth="2.75"
                strokeDasharray="68 18"
                strokeLinecap="round"
              />

              {/* The Architectural "A" Monogram */}
              <path
                d="M24 16.5L17.2 34.5H21.2L22.6 30.5H25.4L26.8 34.5H30.8L24 16.5Z"
                fill="#FFFFFF"
              />
              {/* Inner Apex cutout of "A" */}
              <path
                d="M23.1 28.2H24.9L24 24.6L23.1 28.2Z"
                fill="#0F172A"
                opacity="0.35"
              />
              {/* Golden Crossbar Accent */}
              <rect
                x="21.2"
                y="27.8"
                width="5.6"
                height="2"
                rx="1"
                fill="#FCD34D"
              />

              {/* Three foundation pearls */}
              <circle cx="16" cy="38" r="1.25" fill="#FCD34D" opacity="0.9" />
              <circle cx="24" cy="39" r="1.5" fill="#FCD34D" />
              <circle cx="32" cy="38" r="1.25" fill="#FCD34D" opacity="0.9" />

              <defs>
                <linearGradient id="oaRingGrad" x1="10" y1="13" x2="38" y2="41" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE68A" />
                  <stop offset="0.4" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Micro Registered (R) Badge on bottom-right corner */}
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 font-black text-[7.5px] leading-none flex items-center justify-center border border-white shadow-xs">
              R
            </span>
          </div>

          {/* Brand Name Typography Container */}
          <div className="flex flex-col">
            {/* Brand Title (Selector 2) */}
            <span className="text-base sm:text-lg lg:text-[1.18rem] font-extrabold tracking-tight text-slate-900 font-display block leading-tight">
              {renderBrandTitle()}
            </span>
            <span className={`text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold block mt-0.5 flex items-center gap-1.5 ${getSubtitleThemeColor()}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block shrink-0"></span>
              <span>
                {isUrdu ? 'مستند اور تصدیق شدہ ایمپلائمنٹ سروسز' : 'Employment Services (R)'}
              </span>
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-4 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive ? getThemeActiveText() : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${getThemeIndicator()}`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`tel:${config.phoneRaw}`}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.callNow}</span>
          </a>
          <button
            onClick={onOpenHireModal}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${getThemeBg()}`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.hireStaffOnline}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-1 mb-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-start px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenHireModal();
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 text-sm font-semibold text-center rounded-lg transition-colors ${getThemeBg()}`}
            >
              {t.hireStaffOnline}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${config.phoneRaw}`}
                className="py-2 px-3 text-xs font-semibold text-center text-slate-700 border border-slate-300 rounded-lg flex items-center justify-center gap-1.5 hover:bg-slate-50"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono">{config.phoneDisplay}</span>
              </a>
              <button
                onClick={() => {
                  openWhatsAppChat(
                    isUrdu
                      ? 'السلام علیکم، مجھے پاکستان میں اسٹاف ہائرنگ کے بارے میں معلومات دیں۔'
                      : 'Salam Openz Associate, I need to hire staff in Pakistan.'
                  );
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 text-xs font-semibold text-center text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center gap-1.5 hover:bg-emerald-100"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.whatsapp247}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
