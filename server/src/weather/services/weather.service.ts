import { Injectable } from '@nestjs/common';
import { OpenWeatherService } from './openweather.service';
import { Forecast } from './interfaces/forecast.interface';
import { Coords } from './interfaces/coords.interface';

@Injectable()
export class WeatherService {
  constructor(private openWeatherService: OpenWeatherService) {}

  async getWeatherForecast(coords: Coords): Promise<Forecast> {
    return this.openWeatherService.getOpenWeatherForecast(coords);
  }
}
