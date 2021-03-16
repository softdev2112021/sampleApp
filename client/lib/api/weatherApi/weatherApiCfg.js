const baseURL = `${process.env.appHost}:${process.env.appPort}`;
const config = {
  apiKey: '',
  entrypoints: {
    locationsURL: `${baseURL}/locations`,
  },
  iconsURL: 'http://openweathermap.org/img/wn',
  maxLocations: 10,
}

export default config;
