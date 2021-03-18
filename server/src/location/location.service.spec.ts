import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Coords } from '../weather/services/interfaces/coords.interface';
import { WeatherService } from '../weather/services/weather.service';
import { getWeatherServiceResult } from './mocks/location.service.mock';

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
      const res = await getWeatherServiceResult(coords);

      jest
        .spyOn(weatherService, 'getWeatherForecast')
        .mockImplementation(getWeatherServiceResult);

      expect(await weatherService.getWeatherForecast(coords)).toEqual(res);
      expect(weatherService.getWeatherForecast).toHaveBeenCalledWith(coords);
    });
  });
});
