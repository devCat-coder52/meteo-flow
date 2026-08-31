import axios from "axios"
import dayjs from "../utils/dayjs"
import { TimeForecast, ForecastResponse } from "../types/weatherTypes";
import { useLanguage } from "@/composables/useLanguage";

export class ForecastService {
  private apiKey: string;
  private baseUrl = import.meta.env.VITE_OPENWEATHER_API_FORECAST;

  constructor(apiKey: string = import.meta.env.VITE_OPENWEATHER_API_KEY) {
    this.apiKey = apiKey;
  }

  async getForecastData(
    lat: number,
    lon: number
  ): Promise<Record<string, TimeForecast[]>> {
    try {
      const { locale } = useLanguage();
      const response = await axios.get<ForecastResponse>(this.baseUrl, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: "metric",
          lang: locale.value,
          cnt: 30,
        },
      });
      const forecasts: Record<string, TimeForecast[]> = {};
      const timezone = response.data.city.timezone / 3600;

      response.data.list.forEach((item) => {
        const datetime = dayjs.unix(item.dt).utc().add(timezone, "hour");
        const date = datetime.subtract(1, "minute").format("YYYY-MM-DD");
        const time = datetime.format("HH:mm");
        const temp = Math.round(item.main.temp);
        const description = item.weather[0].description;
        const pressure = Math.round(item.main.pressure * 0.750062);
        const timeForecast: TimeForecast = {
          temp: temp > 0 ? `+${temp}°` : `${temp}°`,
          description:
            description.charAt(0).toUpperCase() + description.slice(1),
          icon: item.weather[0].icon,
          feels_like: item.main.feels_like,
          humidity: item.main.humidity,
          pressure: pressure,
          wind_speed: parseFloat(item.wind.speed.toFixed(1)),
          clouds: item.clouds.all,
          time: time,
        };
        if (!forecasts[date]) forecasts[date] = [];
        forecasts[date].push(timeForecast);
      });
      return forecasts;
    } catch (error) {
      console.error("Ошибка получения сводки:", error);
      throw error;
    }
  }
}
