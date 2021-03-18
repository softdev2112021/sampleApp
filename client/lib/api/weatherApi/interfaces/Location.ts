export interface CityProps {
  name: string;
  coords: [number, number];
}

export interface LocationCoords {
  name: string;
  coords: [number, number];
}

export interface Location {
  id: number;
  title: string;
  date: {
    weekDay: string;
    date: string;
  };
  content: { data: number; descr: string; icon: string };
  contentDetails: {
    date: {
      weekDay: string;
      date: string;
    };
    content: {
      data: { min: number; max: number; pop: string };
      descr: string;
      icon: string;
    };
  };
}

export interface LocationDayApi {
  dt: number;
  temp: { min: number; max: number };
  pop: number;
  description: string;
  icon: string;
}

export interface LocationApi {
  id: number;
  name: string;
  forecast: {
    current: {
      dt: number;
      temp: number;
      description: string;
      icon: string;
    };
    daily: LocationDayApi[];
  }
}
