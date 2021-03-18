import { User } from '../../user/user.entity';
import { AddLocationDto } from '../dto/addLocation.dto';
import { DeleteLocationDto } from '../dto/deleteLocation.dto';
import { Location } from '../location.entity';

const location: Location = {
  id: 1,
  name: 'Dnipro',
  coords: [48.450001, 34.98333],
  forecast: {
    current: {
      dt: 1615980598,
      temp: 7.89,
      description: 'broken clouds',
      icon: '04d',
    },
    daily: [
      {
        dt: 1616058000,
        temp: {
          min: 4.1,
          max: 9.97,
        },
        pop: 0.6,
        description: 'light rain',
        icon: '10d',
      },
      {
        dt: 1616144400,
        temp: {
          min: 1.01,
          max: 4.49,
        },
        pop: 0.4,
        description: 'light rain',
        icon: '10d',
      },
      {
        dt: 1616230800,
        temp: {
          min: 0.71,
          max: 4.88,
        },
        pop: 0.84,
        description: 'light snow',
        icon: '13d',
      },
    ],
  },
};

export const getLocationsServiceResult = async (
  user: User,
): Promise<Location[]> => {
  return [location];
};

export const addLocationServiceResult = async (
  user: User,
  addLocationDto: AddLocationDto,
): Promise<Location> => {
  return location;
};

export const deleteLocationServiceResult = async (
  user: User,
  deleteLocationDto: DeleteLocationDto,
): Promise<void> => {};
