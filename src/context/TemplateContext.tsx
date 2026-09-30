import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationDictionary } from '../translations';
import {
  AGENCY_PHONE_DISPLAY,
  AGENCY_PHONE_RAW,
  AGENCY_WHATSAPP_NUMBER,
  AGENCY_EMAIL,
} from '../utils/whatsapp';

export type TemplateTheme = 'emerald' | 'navy' | 'slate';

export interface AgencyConfig {
  agencyName: string;
  agencySubtitle: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsAppNumber: string;
  email: string;
  addressUr: string;
  addressEn: string;
}

export const DEFAULT_AGENCY_CONFIG: AgencyConfig = {
  agencyName: 'OPENZ ASSOCIATE & EMPLOYMENT SERVICES (R)',
  agencySubtitle: 'Reliable Staff Solutions Across Pakistan',
  phoneDisplay: AGENCY_PHONE_DISPLAY,
  phoneRaw: AGENCY_PHONE_RAW,
  whatsAppNumber: AGENCY_WHATSAPP_NUMBER,
  email: AGENCY_EMAIL,
  addressUr: 'لاہور، پاکستان (تمام بڑے شہروں کراچی، اسلام آباد، راولپنڈی، فیصل آباد، ملتان وغیرہ میں سروسز دستیاب ہیں)',
  addressEn: 'Lahore, Pakistan (Services active in Karachi, Islamabad, Rawalpindi, Faisalabad, Multan & across Pakistan)',
};

interface TemplateContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: TemplateTheme;
  setTheme: (theme: TemplateTheme) => void;
  config: AgencyConfig;
  updateConfig: (newConfig: Partial<AgencyConfig>) => void;
  resetConfig: () => void;
  t: TranslationDictionary;
  isUrdu: boolean;
  isTemplateBarOpen: boolean;
  setIsTemplateBarOpen: (open: boolean) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check persisted language, default to 'ur' since user requested in Urdu: "مجھے صرف ایک ویب سائٹ کا ٹیمپلیٹ بنا دو۔"
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('openz_template_lang');
    return saved === 'en' || saved === 'ur' ? saved : 'ur';
  });

  const [theme, setThemeState] = useState<TemplateTheme>(() => {
    const saved = localStorage.getItem('openz_template_theme');
    return saved === 'navy' || saved === 'slate' || saved === 'emerald' ? saved : 'emerald';
  });

  const [config, setConfigState] = useState<AgencyConfig>(() => {
    const saved = localStorage.getItem('openz_template_config');
    if (saved) {
      try {
        return { ...DEFAULT_AGENCY_CONFIG, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_AGENCY_CONFIG;
      }
    }
    return DEFAULT_AGENCY_CONFIG;
  });

  const [isTemplateBarOpen, setIsTemplateBarOpen] = useState(true);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('openz_template_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ur' ? 'en' : 'ur');
  };

  const setTheme = (newTheme: TemplateTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('openz_template_theme', newTheme);
  };

  const updateConfig = (newConfig: Partial<AgencyConfig>) => {
    setConfigState((prev) => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('openz_template_config', JSON.stringify(updated));
      return updated;
    });
  };

  const resetConfig = () => {
    setConfigState(DEFAULT_AGENCY_CONFIG);
    setThemeState('emerald');
    localStorage.removeItem('openz_template_config');
    localStorage.removeItem('openz_template_theme');
  };

  // Sync document dir and lang attributes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    if (language === 'ur') {
      document.body.classList.add('font-urdu');
    } else {
      document.body.classList.remove('font-urdu');
    }
  }, [language]);

  const t = translations[language];
  const isUrdu = language === 'ur';

  return (
    <TemplateContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        config,
        updateConfig,
        resetConfig,
        t,
        isUrdu,
        isTemplateBarOpen,
        setIsTemplateBarOpen,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};
