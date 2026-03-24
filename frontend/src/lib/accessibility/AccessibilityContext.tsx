'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

const fontSizes: Record<FontSize, string> = {
  sm: '14px',
  md: '16px', // Default Next.js template
  lg: '18px',
  xl: '20px'
};

interface AccessibilityContextProps {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>('md');

  // Load from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aitdl_font_size') as FontSize;
      if (saved && fontSizes[saved]) {
        setFontSizeState(saved);
        document.documentElement.style.fontSize = fontSizes[saved];
      }
    }
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aitdl_font_size', size);
      document.documentElement.style.fontSize = fontSizes[size];
    }
  };

  return (
    <AccessibilityContext.Provider value={{ fontSize, setFontSize }}>
      <div className="transition-all duration-200">
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
