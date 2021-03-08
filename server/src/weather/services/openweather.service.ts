import { Injectable, HttpService } from '@nestjs/common';
import { Forecast } from './interfaces/forecast.interface';
import * as config from './openweather.service.cfg.json';

const {
  apiKey,
  baseURL,
  entrypoints: {
    type: { onecall },
    exclude,
  },
  units,
} = config;

// pics url
// http://openweathermap.org/img/wn/10d@2x.png
// http://openweathermap.org/img/wn/{iconID}@{size}.png

@Injectable()
export class OpenWeatherService {
  constructor(private http: HttpService) {}

  async getOpenWeatherForecast([lat, lon]: [number, number]): Promise<Forecast> {
    return await this.http
      .get(`${baseURL}${onecall}?lat=${lat}&lon=${lon}&exclude=${exclude.join(',',)}&units=${units}&appid=${apiKey}`)
      .toPromise()
      .then(
        ({
          data: {
            current: {
              dt,
              temp,
              rain,
              snow,
              weather: [{ description, icon }],
            },
            daily,
          },
        }) => {
          const dailyWeather = daily.map(
            ({
              dt,
              temp: { min, max },
              rain,
              snow,
              pop,
              weather: [{ description, icon }],
            }) => {
              return {
                dt,
                temp: { min, max },
                rain,
                snow,
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
              rain,
              snow,
              description,
              icon,
            },
            daily: dailyWeather,
          };
        },
      );
  }
}
