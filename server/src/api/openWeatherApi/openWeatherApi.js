import { getResources } from '../services/services';
import config from './openWeatherApi.json';

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

const coords = {
  lon: 30.5,
  lat: 50.25,
};
const { lat, lon } = coords;

const getWeatherForecast = async () => {
  return getResources(
    `${baseURL}${onecall}?lat=${lat}?lon=${lon}&exclude=${exclude}&${units}&appid=${apiKey}`,
  ).then((data) => {
    //TODO
    // try {
    //   return data.map(({ type, btnSymbol }) => {
    //     return { type, attr: 'data-symbol', btnSymbol };
    //   });
    // } catch (e) {
    //   return data;
    // }
  });
}

export default getWeatherForecast;
