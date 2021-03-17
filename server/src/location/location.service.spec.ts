import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Coords } from '../weather/services/interfaces/coords.interface';
import { Forecast } from '../weather/services/interfaces/forecast.interface';
import { WeatherService } from '../weather/services/weather.service';
import { LocationService } from './location.service';

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

const coords: Coords = [0, 0];

describe('LocationService', () => {
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WeatherService,
          useValue: { getWeatherForecast: () => {} },
        },
        {
          provide: Logger,
          useValue: { log: () => {} },
        },
      ],
    }).compile();

    weatherService = module.get<WeatherService>(WeatherService);
  });

  describe('getLocations', () => {
    it('should return locations array', async () => {
      const getWeatherServiceResult = async (
        coords: Coords,
      ): Promise<Forecast> => {
        return forecast;
      };

      const res = await getWeatherServiceResult(coords);

      jest
        .spyOn(weatherService, 'getWeatherForecast')
        .mockImplementation(getWeatherServiceResult);

      expect(await weatherService.getWeatherForecast(coords)).toEqual(res);
      expect(weatherService.getWeatherForecast).toHaveBeenCalledWith(coords);
    });
  });
});
