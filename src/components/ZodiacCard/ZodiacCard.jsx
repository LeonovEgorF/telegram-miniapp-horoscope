import React from "react";
import { useTranslation } from "react-i18next";
const LazyImage = React.lazy(() => import("../LazyImage/LazyImage"));
function ZodiacCard({ sign, onClick }) {
  const { t } = useTranslation();
  const icon = `./icons/${sign}.webp`;
  return (
    <div onClick={() => onClick(sign)} className="zodiac-card">
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyImage src={icon} alt={`${sign} icon`} className="zodiac-icon" />
      </React.Suspense>
      <h3>{t(`zodiac.${sign}`)}</h3>
      <p>{t(`period.${sign}`)}</p>
    </div>
  );
}

export default ZodiacCard;
