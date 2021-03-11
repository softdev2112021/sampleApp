const baseURL = `${process.env.appHost}:${process.env.appPort}`;
const config = {
  apiKey: '',
  entrypoints: {
    locations: `${baseURL}/locations`,
  },
  iconsURL: 'http://openweathermap.org/img/wn',
}

export default config;
