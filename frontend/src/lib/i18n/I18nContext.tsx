/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, TranslationDict } from './translations';

export type Language = 'en' | 'hi' | 'sa' | 'mr' | 'gu' | 'pa' | 'ta' | 'te';

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <K extends keyof TranslationDict>(key: K) => TranslationDict[K];
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aitdl_lang') as Language;
      if (saved && ['en', 'hi', 'sa', 'mr', 'gu', 'pa', 'ta', 'te'].includes(saved)) {
        setTimeout(() => setLanguageState(saved), 0);
      }
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aitdl_lang', lang);
    }
  }, []);

  const t = useCallback(<K extends keyof TranslationDict>(key: K): TranslationDict[K] => {
    const dict = translations[language] || translations['en'];
    // Use fallback to English if key missing in current language
    const value = dict[key] !== undefined ? dict[key] : translations['en'][key];
    return (value !== undefined ? value : key) as TranslationDict[K];
  }, [language]);

  const contextValue = React.useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <I18nContext.Provider value={contextValue}>
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
