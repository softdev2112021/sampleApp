export interface Forecast {
  current: {
    dt: number;
    temp: number;
    rain?: string;
    snow?: string;
    description: string;
    icon: string;
  };
  daily: {
    dt: number;
    temp: { min: number; max: number };
    pop: number;
    rain?: string;
    snow?: string;
    description: string;
    icon: string;
  };
}
