import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../user/user.entity';
import { AddLocationDto } from './dto/addLocation.dto';
import { DeleteLocationDto } from './dto/deleteLocation.dto';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import {
  addLocationServiceResult,
  deleteLocationServiceResult,
  getLocationsServiceResult,
} from './mocks/location.controller.mock';

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
      const res = await addLocationServiceResult(user, addLocationDto);

      jest
        .spyOn(service, 'addLocation')
        .mockImplementation(addLocationServiceResult);

      expect(await controller.addLocation(addLocationDto, user)).toEqual(res);
    });
  });

  describe('deleteLocation', () => {
    it('should return an empty promise', async () => {
      const res = await deleteLocationServiceResult(user, deleteLocationDto);

      jest
        .spyOn(service, 'deleteLocation')
        .mockImplementation(deleteLocationServiceResult);

      expect(await controller.deleteLocation(deleteLocationDto, user)).toEqual(
        res,
      );
    });
  });
});
