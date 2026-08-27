import { Dayjs } from "../utils/dayjs";
import { ForecastData, WeatherMain } from "./weatherTypes";

export interface CalendarDay {
  date: Dayjs;
  isCurrentMonth: boolean;
  isToday?: boolean;
  forecast?: forecastData[];
  weather?: WeatherMain[];
  moonPhase?: {
    phase: string;
    illumination: number;
    icon: string;
    description: string;
  };
  hasForecastData?: boolean;
}
