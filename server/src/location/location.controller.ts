import { Controller, Get, Post, Delete, Body, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { AddLocationDto } from './dto/addLocation.dto';
import { DeleteLocationDto } from './dto/deleteLocation.dto';
import { LocationEntity } from './location.entity';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getLocations(@User() user: UserEntity): Promise<LocationEntity[]> {
    return this.locationService.getLocations(user);
  }

  @Post()
  async addLocation(
    @Body() addLocationDto: AddLocationDto,
    @User() user: UserEntity,
  ): Promise<LocationEntity> {
    return this.locationService.addLocation(user, addLocationDto);
  }

  @Delete()
  async deleteLocation(
    @Body() deleteLocationDto: DeleteLocationDto,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.locationService.deleteLocation(user, deleteLocationDto);
  }
}
