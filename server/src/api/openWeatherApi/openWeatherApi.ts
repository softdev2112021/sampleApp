import { getResources } from '../services/services';
import * as config from './openWeatherApiCfg.json';

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
// http://openweathermap.org/img/wn/10d@2x.png
// http://openweathermap.org/img/wn/{iconID}@{size}.png

const getOpenWeatherForecast = async ([lat, lon]: [number, number]): Promise<any> => {
  return getResources(
    `${baseURL}${onecall}?lat=${lat}&lon=${lon}&exclude=${exclude.join(',')}&units=${units}&appid=${apiKey}`,
  );
};

export default getOpenWeatherForecast;
