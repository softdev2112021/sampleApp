const baseURL = process.env.NEXT_PUBLIC_API_HOST

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
