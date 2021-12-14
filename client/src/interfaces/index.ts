export interface IDropdownProfile {
  userName: string;
  avatar: string;
  onLogout: () => void;
}

export interface IHeader {
  brandName: string;
  userName: string;
  avatar: string;
  onSearchSubmit: (location: Pick<ILocation, 'name' | 'coords'>) => void;
  onLogout: () => void;
}

export interface ISearchForm {
  onSubmit: (location: Pick<ILocation, 'name' | 'coords'>) => void;
}

export interface IUser {
  id: number;
  name: string;
  login: string;
  password: string;
}

export interface IDate {
  day: string;
  date: string;
}

export interface ICard extends IDate {
  id: number;
  title: string;
  content: {
    value: number;
    description: string;
    icon: string;
  };
  onDelete: (id: number) => void;
}

export interface ICardDetails extends IDate {
  minValue: number;
  maxValue: number;
  condition: string;
  icon: string;
}

export interface IForecast extends IDate {
  weather: {
    minTemperature: number;
    maxTemperature: number;
    rain: string;
    weatherIcon: string;
  };
}

export interface ILocation extends IDate {
  id: number;
  name: string;
  country?: string;
  coords?: [number, number];
  currentWeather: {
    temperature: number;
    description: string;
    weatherIcon: string;
  };
  forecast: IForecast[];
}

export type ISearchedLocation = Pick<
  ILocation,
  'id' | 'name' | 'country' | 'coords'
>;

export interface IForecastApi {
  dt: number;
  temp: { min: number; max: number };
  icon: string;
  pop: number;
}

export interface ILocationApi {
  id: number;
  name: string;
  forecast: {
    current: {
      dt: number;
      temp: number;
      description: string;
      icon: string;
    };
    daily: IForecastApi[];
  };
}
