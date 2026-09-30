import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';
import { useTemplate } from '../context/TemplateContext';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { config, isUrdu } = useTemplate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating CTA buttons on bottom corner */}
      <div className="fixed bottom-5 end-4 sm:end-6 z-40 flex flex-col items-end gap-2.5">
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white text-slate-700 border border-slate-300 shadow-md flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* 📞 Call Now Fixed Button */}
        <a
          href={`tel:${config.phoneRaw}`}
          className="group flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 rounded-full shadow-lg border border-slate-700 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          aria-label="Call Openz Associate"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Phone className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-xs sm:text-sm font-bold pe-1">
            {isUrdu ? 'کال کریں' : 'Call Now'}
          </span>
        </a>

        {/* 🟢 WhatsApp Us Fixed Button */}
        <button
          onClick={() =>
            openWhatsAppChat(
              isUrdu
                ? 'السلام علیکم اوپنز ایسوسی ایٹ، مجھے فوری اسٹاف درکار ہے۔'
                : 'Salam Openz Associate, I need assistance regarding staff recruitment across Pakistan.'
            )
          }
          className="group flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer ring-2 ring-emerald-500/30"
          aria-label="WhatsApp Openz Associate"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-bold pe-1">
            {isUrdu ? 'واٹس ایپ' : 'WhatsApp Us'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping hidden sm:inline-block" />
        </button>
      </div>
    </>
  );
};
