import { WeatherMain, TimeForecast } from "@/types/weatherTypes";

export const getMainWeatherData = (forecast: TimeForecast[] | undefined) => {
  if (!forecast) return [null, null];
  const weather: (WeatherMain | null)[] = [];
  const dayWeather = forecast.find(
    (hour) =>
      hour.time === "10:00" || hour.time === "11:00" || hour.time === "12:00"
  );
  const nightWeather = forecast.find(
    (hour) =>
      hour.time === "22:00" || hour.time === "23:00" || hour.time === "00:00"
  );
  weather.push(
    dayWeather !== undefined
      ? {
          temp: dayWeather.temp,
          icon: dayWeather.icon,
          description: dayWeather.description,
        }
      : null
  );
  weather.push(
    nightWeather !== undefined
      ? {
          temp: nightWeather.temp,
          icon: nightWeather.icon,
          description: nightWeather.description,
        }
      : null
  );
  return weather;
};
