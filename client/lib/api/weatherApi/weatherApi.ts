import convertTime from '../../utils/convertTime/convertTime';
import { LocationCoords, Location, LocationApi, LocationDayApi, CityProps } from './interfaces/Location';
import config from './weatherApiCfg';
import { LogIn, User } from "../../../lib/api/weatherApi/interfaces/Auth";
import Http from '../../http/Http';

const http = new Http();

const { entrypoints: { locationsURL }, iconsURL, logInURL, logOutURL } = config;

const convertLocations = (locations: LocationApi[]): Location[] => {
    return locations.map((location: LocationApi): Location => {
      const { id, name, forecast: { current: { dt, temp, description, icon }, daily } } = location;

      const contentDetails = daily.map((locationDay: LocationDayApi) => {
        const { dt, temp: { min, max }, description, pop, icon } = locationDay;

        return {
          date: convertTime(dt), 
          content: { 
            data: { min: Math.floor(min), max: Math.floor(max), pop: `${Math.floor(pop*100)}%` },
            descr: description,
            icon: `${iconsURL}/${icon}@2x.png`
          }
        }
      });

      return {
        id,
        title: name,
        date: convertTime(dt),
        content: { data: Math.floor(temp), descr: description, icon: `${iconsURL}/${icon}@4x.png` },
        contentDetails: contentDetails as any,
      }
    });
}

const getLocations = async (): Promise<Location[]> => {
  return http.get(locationsURL).then(({ data }) => convertLocations(data));
};

const addLocation = async (data: LocationCoords): Promise<Location[]> => {
  return http.post(locationsURL, data).then(({ data }) => {
    return convertLocations([data]);
  });
};

const deleteLocation = async (id: number): Promise<void> => {
  return http.delete(`${locationsURL}/${id}`);
};

const logIn = async (data: LogIn): Promise<User> => {
  return http.post(logInURL, data);
};

const logOut = async (): Promise<void> => {
  return http.post(logOutURL);
};

export { getLocations, addLocation, deleteLocation, logIn, logOut };
