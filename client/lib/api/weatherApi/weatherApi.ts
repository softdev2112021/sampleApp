import { getResources, addResource, deleteResource } from '../../services/services';
import convertTime from '../../utils/convertTime/convertTime';
import config from './weatherApiCfg';

const { entrypoints: { locations }, iconsURL } = config;

interface Locations {
  id: number;
  title: string;
  date: {
    weekDay: string;
    date: string;
  };
  content: { data: number; descr: string; icon: string };
  contentDetails: {
    date: {
      weekDay: string;
      date: string;
    };
    content: {
      data: { min: number; max: number; pop: string };
      descr: string;
      icon: string;
    };
  };
}    

const convertLocations = (data) => {
    return data.map(({ id, name, forecast: { current: { dt, temp, description, icon}, daily } }) => {
      const contentDetails = daily.map(({ dt, temp: { min, max }, description, pop, icon }) => {
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
        contentDetails,
      }
    });
}

const getLocations = async (): Promise<Locations[]> => {
  return getResources({ url: locations }).then((data) => convertLocations(data));
};

const addLocation = async (params: any): Promise<any> => {
  return addResource({ url: locations, ...params }).then((data) => convertLocations([data]));
};

const deleteLocation = async (params: any): Promise<any> => {
  return deleteResource({ url: locations, ...params });
};

export { getLocations, addLocation, deleteLocation };
