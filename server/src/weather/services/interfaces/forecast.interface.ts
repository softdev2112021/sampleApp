export interface ForecastDaily {
  dt: number;
  temp: { min: number; max: number };
  description: string;
  icon: string;
  pop: number;
  weather?: [{ description: string; icon: string }];
}

export interface Forecast {
  current: {
    dt: number;
    temp: number;
    description: string;
    icon: string;
  };
  daily: ForecastDaily;
}
