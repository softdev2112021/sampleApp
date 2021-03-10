import { getResources, addResource, deleteResource } from '../../services/services';
import convertTime from '../../utils/convertTime/convertTime';
import config from './weatherApiCfg';

const { entrypoints: { locations } } = config;

const getLocations = async (params) => {
  return getResources({ url: locations, ...params }).then((data) => {
    try {
      return data.map(({ id, name, forecast: { current: { dt, temp, description, icon}, daily } }) => {
        const contentDetails = daily.map(({ dt, temp: { min, max }, description, pop, icon }) => {
          return {
            date: convertTime(dt), 
            content: { 
              data: { min: Math.floor(min), max: Math.floor(max), pop: `${pop*100}%` },
              descr: description,
              icon: `http://openweathermap.org/img/wn/${icon}@2x.png`
            }
          }
        });
        return {
          id,
          title: name,
          date: convertTime(dt),
          content: { data: Math.floor(temp), descr: description, icon: `http://openweathermap.org/img/wn/${icon}@4x.png` },
          contentDetails,
        }
      });
    } catch (e) {
      return data;
    }
  });
};

const addLocation = async (params) => {
  return addResource({ url: locations, ...params });
};

const deleteLocation = async (params) => {
  return deleteResource({ url: locations, ...params });
};

export { getLocations, addLocation, deleteLocation };
