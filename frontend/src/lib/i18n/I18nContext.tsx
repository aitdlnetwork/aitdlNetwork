/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationDict } from './translations';

export type Language = 'en' | 'hi' | 'sa';

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationDict) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aitdl_lang') as Language;
      if (saved && ['en', 'hi', 'sa'].includes(saved)) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aitdl_lang', lang);
    }
  };

  const t = (key: keyof TranslationDict): string => {
    const dict = translations[language] || translations['en'];
    return dict[key] || translations['en'][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
