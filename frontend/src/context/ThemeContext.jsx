import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app-theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const themes = {
    dark: {
      name: 'Dark',
      gradient: 'from-slate-900 via-purple-900 to-slate-900',
      card: 'bg-white/10 backdrop-blur-md border border-white/20',
      cardDark: 'bg-black/30 backdrop-blur-md border border-white/10',
      text: 'text-white',
      textMuted: 'text-white/60',
      accent: 'purple',
    },
    light: {
      name: 'Light',
      gradient: 'from-gray-100 via-white to-gray-100',
      card: 'bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg',
      cardDark: 'bg-gray-50/90 backdrop-blur-md border border-gray-200',
      text: 'text-gray-800',
      textMuted: 'text-gray-500',
      accent: 'blue',
    },
    corporate: {
      name: 'Corporate',
      gradient: 'from-blue-900 via-indigo-900 to-blue-900',
      card: 'bg-blue-900/20 backdrop-blur-md border border-blue-300/30',
      cardDark: 'bg-blue-950/40 backdrop-blur-md border border-blue-300/20',
      text: 'text-white',
      textMuted: 'text-blue-200/70',
      accent: 'blue',
    },
    minimal: {
      name: 'Minimal',
      gradient: 'from-gray-800 via-gray-900 to-gray-800',
      card: 'bg-gray-800/50 backdrop-blur-md border border-gray-700',
      cardDark: 'bg-gray-900/60 backdrop-blur-md border border-gray-700',
      text: 'text-gray-100',
      textMuted: 'text-gray-400',
      accent: 'gray',
    },
  };

  const currentTheme = themes[theme] || themes.dark;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};