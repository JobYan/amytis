'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../../site.config';
import { translations, Language, TranslationKey } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(siteConfig.i18n.defaultLocale as Language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('amytis-language') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    } else {
      // Detect browser language and match against supported locales
      const browserLang = navigator.language.split('-')[0] as Language;
      if (translations[browserLang]) {
        setLanguageState(browserLang);
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('amytis-language', lang);
  };

  const t = (key: TranslationKey) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
