import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="glass-card px-3 py-2 text-sm font-medium text-white bg-black/20 backdrop-blur border border-white/20 rounded-lg focus:outline-none cursor-pointer"
    >
      {Object.entries(themes).map(([key, t]) => (
        <option key={key} value={key} className="bg-gray-800 text-white">
          {t.name}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;