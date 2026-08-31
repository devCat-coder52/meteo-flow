export interface ForecastData {
  [key: string]: TimeForecast[];
}

export interface DailyForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  dt_txt: string;
}

export interface ForecastResponse {
  list: Array<ForecastResponseList>;
  city: {
    timezone: number;
    name: string;
    country: string;
  };
}

export interface WeatherResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

export interface ProcessedWeatherData {
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

interface ForecastResponseList {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
    dew_point: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  }
  visibility: number;
}