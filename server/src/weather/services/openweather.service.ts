import { Injectable, HttpService } from '@nestjs/common';
import { Coords } from './interfaces/coords.interface';
import { Forecast, ForecastDaily } from './interfaces/forecast.interface';
import * as config from './openweather.service.cfg.json';

const {
  apiKey,
  baseURL,
  entrypoints: {
    type: { onecall },
    exclude,
  },
  units,
  forecastDays,
} = config;

@Injectable()
export class OpenWeatherService {
  constructor(private http: HttpService) {}

  async getOpenWeatherForecast([lat, lon]: Coords): Promise<Forecast> {
    return await this.http
      .get(`${baseURL}${onecall}?lat=${lat}&lon=${lon}&exclude=${exclude.join(',',)}&units=${units}&appid=${apiKey}`)
      .toPromise()
      .then(
        ({
          data: {
            current: {
              dt,
              temp,
              weather: [{ description, icon }],
            },
            daily,
          },
        }) => {
          const dailyWeather = daily.map(
            ({
              dt,
              temp: { min, max },
              pop,
              weather: [{ description, icon }],
            }: ForecastDaily): ForecastDaily => {
              return {
                dt,
                temp: { min, max },
                description,
                icon,
                pop,
              };
            },
          );

          return {
            current: {
              dt,
              temp,
              description,
              icon,
            },
            daily: dailyWeather.splice(1, forecastDays),
          };
        },
      );
  }
}
