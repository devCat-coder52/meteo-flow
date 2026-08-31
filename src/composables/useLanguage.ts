import { ref } from "vue"
import dayjs from "@/utils/dayjs"

type Locale = "ru" | "en";

interface Translations {
  [key: string]: { ru: string; en: string }
}

const locale = ref<Locale>(
  (localStorage.getItem("meteoflow_locale") as Locale) || "ru"
)

export function useLanguage() {
  const t = (key: keyof Translations): string => {
    return translations[key]?.[locale.value] ?? key
  }

  const setLocale = (newLocale: Locale) => {
    dayjs.locale(newLocale)
    locale.value = newLocale
    localStorage.setItem("meteoflow_locale", newLocale)
  }

  return {
    locale,
    t,
    setLocale,
  };
}

const translations: Translations = {
  emptySearchMessage: { ru: "Нет результата", en: "No results found" },
  localTimeTitle: { ru: "Местное время", en: "Local Time" },
  currentWeather: { ru: "Текущая погода", en: "Current Weather" },
  feelsLike: { ru: "Ощущается как", en: "Feels like" },
  pressure: { ru: "Атм. давление", en: "Pressure" },
  humidity: { ru: "Влажность", en: "Humidity" },
  clouds: { ru: "Облачность", en: "Cloudiness" },
  wind_speed: { ru: "Скорость ветра", en: "Wind Speed" },
  visibility: { ru: "Видимость", en: "Visibility" },
  sunrise: { ru: "Восход", en: "Sunrise" },
  sunset: { ru: "Закат", en: "Sunset" },
  forecastTitle: { ru: "Прогноз на", en: "Forecast for" },
  dataLimit: {
    ru: "Доступны сведения только на ближайшие 5 суток",
    en: "Data shown for the next 5 days only",
  },
  providedBy: {
    ru: "Погодные данные предоставлены",
    en: "Weather data provided by",
  },
  /*moonCalcNote: {
    ru: "Фазы луны рассчитываются по приближенной формуле",
    en: "Moon phases are calculated using an approximate formula",
  },*/
  privacyTitle: { ru: "Политика конфиденциальности", en: "Privacy Policy" },
  privacyText1: {
    ru: "Приложение «MeteoFlow» запрашивает ваше геолографическое положение исключительно для определения локального прогноза погоды.",
    en: 'The "MeteoFlow" application requests your geolocation solely to determine the local weather forecast.',
  },
  privacyText2: {
    ru: "Координаты обрабатываются локально в вашем браузере и не сохраняются на наших серверах. Мы не передаем данные о местоположении третьим сторонам.",
    en: "Coordinates are processed locally in your browser and are not stored on our servers. We do not share location data with third parties.",
  },
  privacyText3: {
    ru: "Вы можете отозвать разрешение на доступ к геолокации в настройках вашего браузера в любой момент.",
    en: "You can revoke geolocation access permission in your browser settings at any time.",
  },
  close: { ru: "Закрыть", en: "Close" },
  loading: { ru: "Загрузка данных...", en: "Loading data..." },
  noData: { ru: "Отсутствуют данные", en: "No data found" },
};
