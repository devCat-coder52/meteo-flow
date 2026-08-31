import dayjs from "@/utils/dayjs";
import { TimeForecast, WeatherMain } from "./weatherTypes";

export interface MoonPhase {
  phase: string;
  illumination: number;
  icon: string;
  description: string;
}

export interface CalendarDay {
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
  isToday?: boolean;
  forecast?: TimeForecast[];
  weather?: (WeatherMain | null)[];
  moonPhase?: MoonPhase;
  hasForecastData?: boolean;
}
