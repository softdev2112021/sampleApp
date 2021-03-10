import { Injectable } from '@nestjs/common';
import { WeatherService } from '../weather/services/weather.service';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Location } from './location.entity';
import { AddLocation } from './interfaces/addLocation.interface';
import { DeleteLocation } from './interfaces/deleteLocation.interface';

@Injectable()
export class LocationService {
  private locationRepository: Repository<Location>;
  constructor(
    private connection: Connection,
    private weatherService: WeatherService,
  ) {
    this.locationRepository = this.connection.getRepository(Location);
  }

  async getLocations(user: User): Promise<Location[]> {
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

  async addLocation(user: User, addLocation: AddLocation): Promise<void> {
    const location = this.locationRepository.create(addLocation);
    location.user = user;
    await this.locationRepository.save(location);
  }

  async deleteLocation(
    user: User,
    deleteLocation: DeleteLocation,
  ): Promise<void> {
    const location = await this.locationRepository.findOne(deleteLocation.id, {
      relations: ['user'],
    });

    // TODO Fix bug, check doesn't work
    // if (user.id !== location.user.id) {
    //   throw new Error('No operation');
    // }

    await this.locationRepository.delete(deleteLocation.id);
  }
}
