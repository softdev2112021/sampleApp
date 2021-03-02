import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createUserDto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.locationService.remove(id);
  }
}
