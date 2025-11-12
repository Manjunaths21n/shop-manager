import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Languages = 'kn' | 'en';

export interface IAppContext {
  language: Languages;
  onLanguageChange: (value: Languages) => void;
  translate: (path: string) => string;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Languages>('en');
  const locales = useRef<Record<string, any>>({})

  const onLanguageChange = useCallback((value: Languages) => {
    setLanguage(value);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}/app.json`);
        locales.current = await response.json();
      } catch (error) {
        console.error("Error loading locale:", error);
      }
    };
    loadTranslations();
  }, [language]);

  const translate = useCallback((path: string) => {
  if (!locales.current) return path;
  const keys = path.split('.');
  let result: any = locales.current;
  for (const key of keys) {
    if (result && Object.prototype.hasOwnProperty.call(result, key)) {
      result = result[key];
    } else {
      return path;
    }
  }
  return typeof result === 'string' ? result : path;
}, [locales]);

  const contextValue: IAppContext = useMemo(() => (
    { language, onLanguageChange, translate }
  ), [language, translate, onLanguageChange]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppContextProvider");
  return ctx;
};
