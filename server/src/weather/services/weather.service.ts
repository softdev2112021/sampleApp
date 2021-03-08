import { Injectable } from '@nestjs/common';
import { OpenWeatherService } from './openweather.service';
import { Forecast } from './interfaces/forecast.interface';

type LatLon = [number, number];

@Injectable()
export class WeatherService {
  constructor(private openWeatherService: OpenWeatherService) {}

  async getWeatherForecast(coords: LatLon): Promise<Forecast> {
    return this.openWeatherService.getOpenWeatherForecast(coords);
  }
}
