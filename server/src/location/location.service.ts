import { Injectable } from '@nestjs/common';
import { WeatherService } from '../weather/services/weather.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { LocationEntity } from './location.entity';
import { AddLocation } from './interfaces/addLocation.interface';
import { DeleteLocation } from './interfaces/deleteLocation.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    private readonly weatherService: WeatherService,
  ) {}

  async getLocations(user: UserEntity): Promise<LocationEntity[]> {
    const locations = await this.locationRepository.find({
      where: { user },
    });

    return await Promise.all(
      locations.map(async (location) => {
        return {
          ...location,
          forecast: await this.weatherService.getWeatherForecast(
            location.coords,
          ),
        };
      }),
    );
  }

  async addLocation(user: UserEntity, addLocation: AddLocation): Promise<void> {
    const location = this.locationRepository.create(addLocation);
    location.user = user;
    await this.locationRepository.save(location);
  }

  async deleteLocation(
    user: UserEntity,
    deleteLocation: DeleteLocation,
  ): Promise<void> {
    const location = await this.locationRepository.findOne(deleteLocation.id, {
      relations: ['user'],
    });

    if (user.id !== location.user.id) {
      throw new Error('No operation');
    }

    await this.locationRepository.delete(deleteLocation.id);
  }
}
