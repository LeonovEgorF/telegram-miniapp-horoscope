import axios from "axios";
export const fetchHoroscope = async (sign, language) => {
  try {
    const response = await axios.post(
      "https://poker247tech.ru/get_horoscope/",
      {
        sign: sign,
        language: language === "ru" ? "original" : "translated",
        period: "today",
      }
    );
    return response.data;
  } catch (err) {
    throw new Error("Unable to fetch horoscope");
  }
};
