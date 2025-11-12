import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Languages = 'kn' | 'en';
export const languageKeys= {
  kn: 'kn',
  en: 'en'
};

export interface IAppContext {
  language: Languages;
  onLanguageChange: (value: Languages) => void;
  translate: (path: string) => string;
}

const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Languages>('en');
  const localesWithLanguage = useRef<Record<Languages, any>>({ en: {}, kn: {} })

  const onLanguageChange = useCallback((value: Languages) => {
    setLanguage(value);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      const languageKeys: Languages[] = ['kn', 'en']
      try {
        for (const languageKey of languageKeys) {
          const response = await fetch(`/locales/${languageKey}/app.json`);
          localesWithLanguage.current[languageKey] = await response.json();
        }
        console.log(localesWithLanguage.current);
      } catch (error) {
        console.error("Error loading locale:", error);
      }
    };
    loadTranslations();
  }, []);

  const translate = useCallback((path: string) => {
    const keys = path.split('.');
    let result: any = localesWithLanguage.current[language];
    for (const key of keys) {
      if (result && Object.prototype.hasOwnProperty.call(result, key)) {
        result = result[key];
      } else {
        return path;
      }
    }
    return typeof result === 'string' ? result : path;
  }, [language]);

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
