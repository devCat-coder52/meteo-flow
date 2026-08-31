import axios from "axios"
import {
  WeatherResponse,
  ProcessedWeatherData
} from "../types/weatherTypes";

export class WeatherService {
  private apiKey: string;
  private baseUrl = import.meta.env.VITE_OPENWEATHER_API_WEATHER;

  constructor(apiKey: string = import.meta.env.VITE_OPENWEATHER_API_KEY) {
    this.apiKey = apiKey;
  }

  async getWeatherData(
    lat: number,
    lon: number,
    lang: string
  ): Promise<ProcessedWeatherData> {
    try {
      const response = await axios.get<WeatherResponse>(this.baseUrl, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: "metric",
          lang,
        },
      });
      const data = response.data;
      const temp = Math.round(data.main.temp);
      const tempFeelsLike = Math.round(data.main.feels_like);
      const description = data.weather[0].description;
      const pressure = Math.round(data.main.pressure * 0.750062);
      const weatherData: ProcessedWeatherData = {
        city: data.name,
        country: data.sys.country,
        timezone: data.timezone,
        main: {
          temp: temp > 0 ? `+${temp}°` : `${temp}°`,
          feels_like:
            tempFeelsLike > 0 ? `+${tempFeelsLike}°` : `${tempFeelsLike}°`,
          description:
            description.charAt(0).toUpperCase() + description.slice(1),
          icon: data.weather[0].icon,
        },
        sys: {
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        },
        stats: {
          visibility: parseFloat((data.visibility / 1000).toFixed(2)),
          humidity: data.main.humidity,
          pressure: pressure,
          wind_speed: parseFloat(data.wind.speed.toFixed(1)),
          clouds: data.clouds.all,
        },
      };
      return weatherData;
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
      throw error;
    }
  }
}
