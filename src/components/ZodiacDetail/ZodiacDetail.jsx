import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSwipeable } from "react-swipeable";
import { fetchHoroscope } from "../../api";
import "./ZodiacDetail.scss";

function ZodiacDetail({ sign, onBack }) {
  const { i18n, t } = useTranslation();
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [preloaded, setPreloaded] = useState(false);

  const handlers = useSwipeable({
    onSwipedRight: () => {
      onBack();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const loadHoroscope = useCallback(async () => {
    try {
      const horoscope = await fetchHoroscope(sign, i18n.language);
      setDescription(horoscope);
      setError(null);
      setPreloaded(true);
    } catch (err) {
      console.error(err);
      setError(t("error_message"));
    }
  }, [sign, i18n.language, t]);

  useEffect(() => {
    setPreloaded(false);
    loadHoroscope();
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(onBack);

      return () => {
        window.Telegram.WebApp.BackButton.hide();
      };
    }
  }, [loadHoroscope, onBack]);

  return (
    <div {...handlers} className="zodiac-detail">
      {!preloaded ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="container visible">
          <div className="wrap-img">
            <img src={`./icons/${sign}.webp`} alt={sign} />
          </div>
          <p className="description">{description.horoscope}</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(ZodiacDetail);
