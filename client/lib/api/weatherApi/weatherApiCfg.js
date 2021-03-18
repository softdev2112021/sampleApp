const baseURL = `${process.env.appHost}:${process.env.appPort}`;
const config = {
  entrypoints: {
    locationsURL: `${baseURL}/locations`,
  },
  iconsURL: 'http://openweathermap.org/img/wn',
  logInURL: `${baseURL}/auth/login`,
  logOutURL: `${baseURL}/auth/logout`,
  citiesURL: `${baseURL}/cities`,
}

export default config;
