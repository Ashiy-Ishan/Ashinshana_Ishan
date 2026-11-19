import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const THEME_OPTIONS = [
  { id: 'light', name: 'Light Mode' },
  { id: 'dark', name: 'Dark Mode' },
  { id: 'neo', name: 'Neo Mode' }
];

const THEME_STORAGE_KEY = 'ashiy_portfolio_theme';
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)';

export const ThemeProvider = ({ children }) => {
  const [preference, setPreference] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return THEME_OPTIONS.some((option) => option.id === saved) ? saved : null;
  });
  const [systemTheme, setSystemTheme] = useState(() =>
    window.matchMedia?.(SYSTEM_THEME_QUERY)?.matches ? 'dark' : 'light'
  );
  const theme = preference || systemTheme;

  useEffect(() => {
    if (preference) return;

    const media = window.matchMedia?.(SYSTEM_THEME_QUERY);
    if (!media) return;

    const updateTheme = ({ matches }) => setSystemTheme(matches ? 'dark' : 'light');
    updateTheme(media);
    media.addEventListener?.('change', updateTheme);
    return () => media.removeEventListener?.('change', updateTheme);
  }, [preference]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (THEME_OPTIONS.some((option) => option.id === newTheme)) {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setPreference(newTheme);
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
