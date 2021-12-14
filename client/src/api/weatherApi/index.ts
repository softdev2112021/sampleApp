import { IUser, ILocation, ILocationApi, ISearchedLocation } from 'interfaces';
import Http from 'services/http';
import { convertLocationsApi } from 'utils';
import config from 'config';

const http = new Http();

const { locationsURL, logInURL, logOutURL, citiesURL } = config;

const getLocations = async (): Promise<ILocation[]> =>
  http
    .get(locationsURL)
    .then(({ data: locationsApi }: { data: ILocationApi[] }) =>
      locationsApi.length ? convertLocationsApi(locationsApi) : [],
    );

const searchLocations = async (
  searchQuery: string,
): Promise<ISearchedLocation[]> => {
  return http
    .get(`${citiesURL}/${searchQuery}`)
    .then(
      ({ data: searchedLocations }: { data: ISearchedLocation[] }) =>
        searchedLocations,
    );
};

const addLocation = async (
  location: Pick<ILocation, 'name' | 'coords'>,
): Promise<ILocation[]> =>
  http
    .post(locationsURL, location)
    .then(({ data: locationApi }: { data: ILocationApi }) =>
      convertLocationsApi([locationApi]),
    );

const deleteLocation = async (id: number): Promise<void> =>
  http.delete(`${locationsURL}/${id}`);

const logIn = async (user: Pick<IUser, 'login' | 'password'>): Promise<IUser> =>
  http.post(logInURL, user);

const logOut = async (): Promise<void> => http.post(logOutURL);

export {
  getLocations,
  searchLocations,
  addLocation,
  deleteLocation,
  logIn,
  logOut,
};
