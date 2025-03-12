import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

// Define available languages
export type Language = "en" | "fr" | "ar";

// Create language context
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: () => "ltr" | "rtl";
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
  dir: () => "ltr",
});

// Create language provider component
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or use browser language or default to English
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      return savedLanguage;
    }

    // Try to use browser language
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "fr") return "fr";
    if (browserLang === "ar") return "ar";

    return "en";
  });

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  // Direction function
  const dir = (): "ltr" | "rtl" => {
    return language === "ar" ? "rtl" : "ltr";
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
