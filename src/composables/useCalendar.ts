import { computed } from "vue"
import dayjs from "@/utils/dayjs"
import { useWeatherStore } from "@/stores/weather.store"
import { getMainWeatherData } from "@/utils/func"
import { CalendarDay } from "@/types/calendarTypes"

export function useCalendar() {
  const store = useWeatherStore()

  const calendarDays = computed(() => {
    const availableDates = store.forecastData
      ? Object.keys(store.forecastData).map((date) => dayjs(date))
      : [];

    const minDate =
      availableDates.length > 0 ? dayjs.min(availableDates) : null;
    const maxDate =
      availableDates.length > 0 ? dayjs.max(availableDates) : null;

    if (!minDate || !maxDate) {
      const startOfWeek = dayjs().startOf("week");
      const days: CalendarDay[] = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = startOfWeek.add(i, "day");
        const dateString = currentDay.format("YYYY-MM-DD");
        const dayForecast = store.forecastData?.[dateString];
        const dayMoonPhase = store.moonPhaseData?.[dateString];

        days.push({
          date: currentDay,
          isCurrentMonth:
            currentDay.month() === store.currentDate.month(),
          isToday: currentDay.isSame(dayjs(), "day"),
          forecast: dayForecast,
          moonPhase: dayMoonPhase,
          hasForecastData: !!dayForecast,
        });
      }
      return days;
    }

    const days: CalendarDay[] = [];
    let currentDay = minDate.startOf("week");
    const endDay = maxDate.endOf("week");
    while (
      currentDay.isSame(minDate.startOf("week"), "day") ||
      currentDay.isSameOrBefore(endDay)
    ) {
      const dateString = currentDay.format("YYYY-MM-DD");
      const dayForecast = store.forecastData?.[dateString];
      const dayMoonPhase = store.moonPhaseData?.[dateString];
      const dayWeather = getMainWeatherData(dayForecast);

      days.push({
        date: currentDay,
        isCurrentMonth: currentDay.month() === store.currentDate.month(),
        isToday: currentDay.isSame(dayjs(), "day"),
        forecast: dayForecast,
        weather: dayWeather,
        moonPhase: dayMoonPhase,
        hasForecastData: !!dayForecast,
      });
      currentDay = currentDay.add(1, "day");
    }

    return days;
  })

  return {
    calendarDays
  };
}