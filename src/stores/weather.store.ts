import { defineStore } from "pinia"
import { ref } from "vue"
import dayjs from "@/utils/dayjs"
import { WeatherService } from "@/services/weather"
import { ForecastService } from "@/services/forecast"
import { LocationService } from "@/services/location"
//import { MoonService } from "@/services/moon"
import { ProcessedWeatherData, TimeForecast } from "@/types/weatherTypes";
import { Location } from "@/types/locationTypes"
import { Dayjs } from "dayjs"
import { useLanguage } from "@/composables/useLanguage"

export const useWeatherStore = defineStore("weather", () => {
  const currentDate = ref(dayjs());
  const weatherData = ref<ProcessedWeatherData | null>(null);
  const forecastData = ref<Record<string, TimeForecast[]> | null>(null);
  const moonPhaseData = ref<Record<string, any> | null>(null);
  const selectedLocation = ref<Location | null>(null);
  const selectedDateForecasts = ref<Dayjs>(dayjs());
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { locale } = useLanguage();

  const loadWeatherAndForecast = async () => {
    if (!import.meta.env.VITE_OPENWEATHER_API_KEY) return;

    const isInitial = !weatherData.value;
    if (isInitial) loading.value = true;

    try {
      if (!selectedLocation.value) {
        throw new Error("Локация не выбрана");
      }
      const weatherService = new WeatherService();
      const forecastService = new ForecastService();

      const [weather, forecast] = await Promise.all([
        weatherService.getWeatherData(
          selectedLocation.value.lat,
          selectedLocation.value.lon,
          locale.value
        ),
        forecastService.getForecastData(
          selectedLocation.value.lat,
          selectedLocation.value.lon
        ),
      ]);
      weatherData.value = weather;
      forecastData.value = forecast;

      selectedLocation.value.timezone = weatherData.value.timezone / 3600 || 0;
      //updateMoonData()
      error.value = null;
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      error.value = err instanceof Error ? err.message : "Неизвестная ошибка";
    } finally {
      if (isInitial) loading.value = false;
    }
  };

  /*const updateMoonData = () => {
    if (!weatherData.value) return;

    const dates = Object.keys(weatherData.value).map((d) => dayjs(d));
    if (dates.length > 0) {
      const min = dayjs.min(dates);
      const max = dayjs.max(dates);
      moonPhaseData.value = MoonService.getMoonPhasesForRange(min, max);
    } else {
      const start = dayjs().startOf("week");
      const end = dayjs().endOf("week");
      moonPhaseData.value = MoonService.getMoonPhasesForRange(start, end);
    }
  }*/

  const detectUserLocation = async () => {
    const locationService = new LocationService();
    const location = await locationService.detectLocation(locale.value);
    if (location) await setUserLocation(location, true);
  };

  const setUserLocation = async (location: Location, isIp: boolean) => {
    const { lat, lon, city, country, timezone } = location;
    selectedLocation.value = {
      ...selectedLocation.value,
      lat,
      lon,
      city,
      country,
      isIp,
      timezone: timezone ? timezone / 3600 : 0,
    };
    await loadWeatherAndForecast();
  };

  const switchForecastData = (day: Dayjs) => {
    selectedDateForecasts.value = day;
  };

  return {
    currentDate,
    error,
    forecastData,
    loading,
    moonPhaseData,
    selectedDateForecasts,
    selectedLocation,
    weatherData,
    detectUserLocation,
    loadWeatherAndForecast,
    setUserLocation,
    switchForecastData,
  };
})
