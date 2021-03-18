import { Coords } from '../../weather/services/interfaces/coords.interface';
import { Forecast } from '../../weather/services/interfaces/forecast.interface';

const forecast: Forecast = {
  current: {
    dt: 1615980598,
    temp: 7.89,
    description: 'broken clouds',
    icon: '04d',
  },
  daily: [
    {
      dt: 1616058000,
      temp: {
        min: 4.1,
        max: 9.97,
      },
      pop: 0.6,
      description: 'light rain',
      icon: '10d',
    },
    {
      dt: 1616144400,
      temp: {
        min: 1.01,
        max: 4.49,
      },
      pop: 0.4,
      description: 'light rain',
      icon: '10d',
    },
    {
      dt: 1616230800,
      temp: {
        min: 0.71,
        max: 4.88,
      },
      pop: 0.84,
      description: 'light snow',
      icon: '13d',
    },
  ],
};

export const getWeatherServiceResult = async (
  coords: Coords,
): Promise<Forecast> => {
  return forecast;
};
