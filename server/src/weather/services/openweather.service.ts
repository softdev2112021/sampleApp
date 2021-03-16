import {
  Injectable,
  HttpService,
  Logger,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Coords } from './interfaces/coords.interface';
import {
  Forecast,
  ForecastDay,
  OpenWeatherDay,
  OpenWeatherForecast,
} from './interfaces/forecast.interface';
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
    @Inject(Logger)
    private readonly logger: LoggerService,
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getOpenWeatherForecast(coords: Coords): Promise<Forecast> {
    const [lat, lon] = coords;
    const apiKey = this.configService.get<string>('API_KEY');
    const url = `${baseURL}${onecall}?lat=${lat}&lon=${lon}&exclude=${exclude.join(
      ',',
    )}&units=${units}&appid=${apiKey}`;

    const convertDaily = (
      forecastDaily: OpenWeatherDay[],
      maxDays: number,
    ): ForecastDay[] => {
      return forecastDaily
        .map(
          (forecastDay: OpenWeatherDay): ForecastDay => {
            const {
              dt,
              temp: { min, max },
              pop,
              weather: [{ description, icon }],
            } = forecastDay;
            return { dt, temp: { min, max }, pop, description, icon };
          },
        )
        .splice(1, maxDays);
    };

    return await this.http
      .get(url)
      .toPromise()
      .then(
        (forecast: OpenWeatherForecast): Forecast => {
          const {
            data: {
              current: {
                dt,
                temp,
                weather: [{ description, icon }],
              },
              daily,
            },
          } = forecast;

          this.logger.log(`Successfully received OpenWeather forecast`);

          return {
            current: {
              dt,
              temp,
              description,
              icon,
            },
            daily: convertDaily(daily, forecastDays),
          };
        },
      )
      .catch((e) => {
        this.logger.error(`Could not get forecast: ${e.message}`);
        return e;
      });
  }
}
