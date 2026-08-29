// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const THEME_OPTIONS = [
  { id: 'neo', name: 'Neo Mode' },
  { id: 'dark', name: 'Dark Mode' }
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('ashiy_portfolio_theme');
    if (!saved || saved === 'light' || !THEME_OPTIONS.some(t => t.id === saved)) {
      return 'neo';
    }
    return saved || 'neo';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
    localStorage.setItem('ashiy_portfolio_theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (THEME_OPTIONS.some(t => t.id === newTheme)) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes: THEME_OPTIONS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
