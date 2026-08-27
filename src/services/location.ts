import axios from "axios"
import { Location } from "@/types/locationTypes"

const DEFAULT_LOCATION: Location = {
  lat: 55.7522,
  lon: 37.6156,
  city: {
    ru: "Москва",
    en: "Moscow"
  },
  country: "RU",
  timezone: 3,
};

export class LocationService {
  detectLocation = async (locale : string = 'ru'): Promise<Location> => {
    return new Promise(async (resolve) => {
      if (!navigator.geolocation) {
        const ipLocation = await detectLocationByIP(locale);
        resolve(ipLocation)
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            const response = await axios.get(
              "https://api.openweathermap.org/geo/1.0/reverse",
              {
                params: {
                  lat: latitude,
                  lon: longitude,
                  limit: 1,
                  appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
                },
              }
            );

            const geoData = response.data[0]

            const location: Location = {
              lat: latitude,
              lon: longitude,
              city: {
                [locale]: geoData?.name || locale === 'ru' ? "Неизвестно" : "Unknown",
              },
              country: geoData?.country || "Unknown",
              timezone: geoData.timezone,
            };

            resolve(location);
          } catch (error) {
            console.warn(
              "Обратное геокодирование не удалось при использовании только координат"
            );
            resolve({
              lat: latitude,
              lon: longitude,
              city: {
                [locale]: "Определено по GPS"
              },
              country: "",
              timezone: 0,
            });
          }
        },
        async (error) => {
          const ipLocation = await detectLocationByIP(locale);
          resolve(ipLocation)
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 600000,
        }
      )
    })
  }
}

const detectLocationByIP = async (locale): Promise<Location> => {
  try {
    const response = await axios.get("https://ipwho.is", {
      params: { lang: locale },
    });

    if (response.status === 200 && response.data.success) {
      return {
        lat: response.data.latitude,
        lon: response.data.longitude,
        city: {
          [locale] :response.data.city
        },
        country: response.data.country_code,
        timezone: response.data.timezone.offset / 3600 || 0,
      };
    }

    throw new Error("Ошибочный запрос по IP");
  } catch (error) {
    return DEFAULT_LOCATION;
  }
};