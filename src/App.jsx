import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ZodiacList from "./components/ZodiacList/ZodiacList";
import ZodiacDetail from "./components/ZodiacDetail/ZodiacDetail";
import i18n from "./i18n/118n";
import "./App.scss";

function App() {
  const [selectedSign, setSelectedSign] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      const userLang =
        window.Telegram.WebApp.initDataUnsafe?.user?.language_code;

      if (userLang && userLang.startsWith("ru")) {
        i18n.changeLanguage("ru");
      } else {
        i18n.changeLanguage("en");
      }
    } else {
      console.error(
        "Telegram WebApp is not available. Ensure you are testing within the Telegram environment."
      );
    }
  }, [i18n]);

  const handleSelect = useCallback((sign) => {
    setSelectedSign(sign);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedSign(null);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="app">
      <header>
        <h1>{t("horoscope")}</h1>
        <div>
          <button onClick={() => changeLanguage("en")}>EN</button>
          <button onClick={() => changeLanguage("ru")}>RU</button>
        </div>
      </header>

      {selectedSign ? (
        <ZodiacDetail sign={selectedSign} onBack={handleBack} />
      ) : (
        <ZodiacList onSelect={handleSelect} />
      )}
    </div>
  );
}

export default App;
