export interface ForecastData {
  day: TimeForecast[];
}

export interface ForecastResponse {
  list: DailyForecast[];
  city: {
    timezone: number;
    name: string;
    country: string;
  };
}

export interface WeatherResponce {
  city: string;
  country: string;
  timezone: number;
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherData {
  city: string;
  country: string;
  timezone: number;
  main: {
    temp: string;
    feels_like: string;
    description: string;
    icon: string;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  stats: {
    visibility: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    clouds: number;
  };
}

export interface TimeForecast {
  temp: string;
  description: string;
  icon: string;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  clouds: number;
  time: string;
}

export interface WeatherMain {
  temp: string;
  icon: string;
  description: string;
}