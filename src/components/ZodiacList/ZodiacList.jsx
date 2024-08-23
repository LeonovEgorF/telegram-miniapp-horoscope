import ZodiacCard from "../ZodiacCard/ZodiacCard";
import "./ZodiacList.scss";

const zodiacSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

function ZodiacList({ onSelect }) {
  return (
    <div className="zodiac-list">
      {zodiacSigns.map((sign) => (
        <ZodiacCard key={sign} sign={sign} onClick={onSelect} />
      ))}
    </div>
  );
}

export default ZodiacList;
