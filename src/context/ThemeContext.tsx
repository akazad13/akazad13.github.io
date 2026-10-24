import React, { createContext, useContext } from 'react';

export type CoderTheme = 'emerald';

export interface ThemeConfig {
  id: CoderTheme;
  name: string;
  primaryColor: string;
  hoverColor: string;
  secondaryColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  bgCanvas: string;
  bgCard: string;
  glowColor: string;
}

export const CODER_THEME_CONFIG: ThemeConfig = {
  id: 'emerald',
  name: 'Emerald Mint',
  primaryColor: '#00b894',
  hoverColor: '#00a381',
  secondaryColor: '#00cec9',
  badgeBg: 'bg-[#00b894]/15',
  badgeText: 'text-[#00b894]',
  borderColor: 'border-[#233145]',
  bgCanvas: 'bg-[#0d1117]',
  bgCard: 'bg-[#161f2e]',
  glowColor: 'shadow-[#00b894]/20'
};

interface ThemeContextType {
  currentTheme: CoderTheme;
  themeConfig: ThemeConfig;
  setTheme: (theme: CoderTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'emerald',
  themeConfig: CODER_THEME_CONFIG,
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = {
    currentTheme: 'emerald' as CoderTheme,
    themeConfig: CODER_THEME_CONFIG,
    setTheme: () => {}
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCoderTheme = () => useContext(ThemeContext);

