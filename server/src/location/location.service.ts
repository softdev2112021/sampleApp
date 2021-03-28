import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { WeatherService } from '../weather/services/weather.service';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Location } from './location.entity';
import { AddLocation } from './interfaces/addLocation.interface';
import { DeleteLocation } from './interfaces/deleteLocation.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private readonly weatherService: WeatherService,
  ) {}

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

  async addLocation(user: User, addLocation: AddLocation): Promise<Location> {
    const location = this.locationRepository.create(addLocation);
    location.user = user;
    await this.locationRepository.save(location);

    return {
      id: location.id,
      forecast: await this.weatherService.getWeatherForecast(location.coords),
      ...addLocation,
    };
  }

  async deleteLocation(user: User, id: number): Promise<void> {
    const location = await this.locationRepository.findOne(id, {
      relations: ['user'],
    });

    if (user.id !== location.user.id) {
      this.logger.warn(`Delete location incompartible id`);
      throw new Error('No operation');
    }

    await this.locationRepository.delete(id);
  }
}
