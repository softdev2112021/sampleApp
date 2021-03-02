import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = new Location();
    location.name = createLocationDto.name;
    return this.locationRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  findOne(id: string): Promise<Location> {
    return this.locationRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.locationRepository.delete(id);
  }
}
