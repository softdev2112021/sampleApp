const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export default {
  loggerMode: 'debug',
  maxLocations: 10,
  locationsURL: `${baseURL}/locations`,
  iconsURL: 'http://openweathermap.org/img/wn',
  logInURL: `${baseURL}/auth/login`,
  logOutURL: `${baseURL}/auth/logout`,
  citiesURL: `${baseURL}/cities`,
};
