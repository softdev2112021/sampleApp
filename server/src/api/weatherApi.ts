import getOpenWeatherForecast from './openWeatherApi/openWeatherApi';

async function getWeatherForecast(coords: [number, number]): Promise<any> {
  return getOpenWeatherForecast(coords).then(
    ({
      current: {
        dt,
        temp,
        rain,
        snow,
        weather: [{ description, icon }],
      },
      daily,
    }) => {
      try {
        const dailyWeather = daily.map(
          ({ dt, temp: { min, max }, rain, snow, pop, weather: [{ description, icon }] }) => {
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
      } catch (e) {
        return e.message;
      }
    },
  );
}

export default getWeatherForecast;
