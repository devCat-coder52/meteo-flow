export interface Location {
  lat: number;
  lon: number;
  city: {
    [lang: string]: string;
  };
  country: string;
  timezone: number;
  isIp: boolean;
}

export interface City {
  shortName: {
    ru: string;
    en: string;
  };
  name: {
    ru: string;
    en: string;
  };
  country: string;
  lat: number;
  lon: number;
}
