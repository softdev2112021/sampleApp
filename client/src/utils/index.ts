import {
  IDate,
  IForecast,
  IForecastApi,
  ILocation,
  ILocationApi,
} from 'interfaces';
import config from 'config';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const convertTime = (timestamp: number): IDate => {
  const time = new Date(timestamp * 1000);
  const month = months[time.getMonth()];
  const day = weekDays[time.getDay()];
  const date = `${month}/${time.getDate()}`;

  return { date, day };
};

export const convertLocationsApi = (
  locationsApi: ILocationApi[],
): ILocation[] =>
  locationsApi.map((locationApi: ILocationApi): ILocation => {
    const {
      id,
      name,
      forecast: {
        current: { dt, temp, description, icon },
        daily,
      },
    } = locationApi;

    const forecast = daily.map((forecastApi: IForecastApi): IForecast => {
      const {
        dt,
        temp: { min, max },
        pop,
        icon,
      } = forecastApi;

      return {
        weather: {
          minTemperature: Math.floor(min),
          maxTemperature: Math.floor(max),
          rain: `${Math.floor(pop * 100)}%`,
          weatherIcon: `${config.iconsURL}/${icon}@2x.png`,
        },
        ...convertTime(dt),
      };
    });

    return {
      id,
      name,
      currentWeather: {
        temperature: Math.floor(temp),
        description,
        weatherIcon: `${config.iconsURL}/${icon}@4x.png`,
      },
      forecast,
      ...convertTime(dt),
    };
  });
