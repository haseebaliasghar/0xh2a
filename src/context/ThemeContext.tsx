'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  isTerminal: boolean;
  mounted: boolean;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme-mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isTerminal, setIsTerminal] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setIsTerminal(saved === 'terminal');
    }
    setMounted(true);
  }, []);

  // Save preference when changed
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, isTerminal ? 'terminal' : 'recruiter');
    }
  }, [isTerminal, mounted]);

  const toggleMode = () => {
    setIsTerminal((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isTerminal, mounted, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
