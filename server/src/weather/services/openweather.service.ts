import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Coords } from './interfaces/coords.interface';
import { Forecast, ForecastDaily } from './interfaces/forecast.interface';
import * as config from './openweather.service.cfg.json';

const {
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
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  async getOpenWeatherForecast([lat, lon]: Coords): Promise<Forecast> {
    const apiKey = this.configService.get<string>('API_KEY');

    return await this.http
      .get(
        `${baseURL}${onecall}?lat=${lat}&lon=${lon}&exclude=${exclude.join(
          ',',
        )}&units=${units}&appid=${apiKey}`,
      )
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
