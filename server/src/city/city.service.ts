import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { City } from './city.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async findCities(name: string): Promise<City[]> {
    const cities = await this.cityRepository.find({
      name: Like(`%${name}%`),
    });

    if (!cities) {
      this.logger.error(`Error loading: ${name} `);
      throw new InternalServerErrorException();
    }

    return cities;
  }
}
