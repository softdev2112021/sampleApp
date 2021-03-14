export interface ForecastDay {
  dt: number;
  temp: { min: number; max: number };
  pop: number;
  description: string;
  icon: string;
}

export interface Forecast {
  current: {
    dt: number;
    temp: number;
    description: string;
    icon: string;
  };
  daily: ForecastDay[];
}

export interface OpenWeatherDay {
  dt: number;
  temp: { min: number; max: number };
  pop: number;
  weather: [{ description: string; icon: string }];
}

export interface OpenWeatherForecast {
  data: {
    current: {
      dt: number;
      temp: number;
      weather: [{ description: string; icon: string }];
    };
    daily: OpenWeatherDay[];
  };
}
