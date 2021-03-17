import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../user/user.entity';
import { AddLocationDto } from './dto/addLocation.dto';
import { DeleteLocationDto } from './dto/deleteLocation.dto';
import { LocationController } from './location.controller';
import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';

const location: LocationEntity = {
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

const user: UserEntity = {
  id: 1,
  name: 'name',
  login: 'login',
  passwordHash: 'hash',
};

const addLocationDto: AddLocationDto = {
  name: 'name',
  coords: [0, 0],
};

const deleteLocationDto: DeleteLocationDto = {
  id: 1,
};

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: {
            getLocations: () => {},
            addLocation: () => {},
            deleteLocation: () => {},
          },
        },
        {
          provide: Logger,
          useValue: { log: () => {} },
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  describe('getLocations', () => {
    it('should return locations array', async () => {
      const getLocationsServiceResult = async (
        user: UserEntity,
      ): Promise<LocationEntity[]> => {
        return [location];
      };

      const res = await getLocationsServiceResult(user);

      jest
        .spyOn(service, 'getLocations')
        .mockImplementation(getLocationsServiceResult);

      expect(await controller.getLocations(user)).toEqual(res);
      expect(service.getLocations).toHaveBeenCalledWith(user);
    });
  });

  describe('addLocation', () => {
    it('should return a location', async () => {
      const addLocationServiceResult = async (
        user: UserEntity,
        addLocationDto: AddLocationDto,
      ): Promise<LocationEntity> => {
        return location;
      };

      const res = await addLocationServiceResult(user, addLocationDto);

      jest
        .spyOn(service, 'addLocation')
        .mockImplementation(addLocationServiceResult);

      expect(await controller.addLocation(addLocationDto, user)).toEqual(res);
    });
  });

  describe('deleteLocation', () => {
    it('should return an empty promise', async () => {
      const deleteLocationServiceResult = async (
        user: UserEntity,
        deleteLocationDto: DeleteLocationDto,
      ): Promise<void> => {};

      const res = await deleteLocationServiceResult(user, deleteLocationDto);

      jest
        .spyOn(service, 'deleteLocation')
        .mockImplementation(deleteLocationServiceResult);

      expect(await controller.deleteLocation(deleteLocationDto, user)).toEqual(res);
    });
  });
});
