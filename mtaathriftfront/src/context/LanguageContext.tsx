import React, { createContext, useState, type ReactNode } from "react";
import { translations } from "../translations/translation";

type Language = "en" | "sw";

interface LanguageContextType {
  language: Language;
  switchLanguage: () => void;
  translate: (text: string) => string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  switchLanguage: () => {},
  translate: (text) => text,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const switchLanguage = () => setLanguage(language === "en" ? "sw" : "en");

  const translate = (text: string) => {
    if (language === "sw") {
      return translations.sw[text] || text;
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};