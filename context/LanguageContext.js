import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [languagePreference, setLanguagePreference] = useState('pl');

  return (
    <LanguageContext.Provider value={{ languagePreference, setLanguagePreference }}>
      {children}
    </LanguageContext.Provider>
  );
};
