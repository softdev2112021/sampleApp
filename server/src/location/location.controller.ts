import { Controller, Get, Post, Delete, Body, UseGuards, Inject, Logger, LoggerService, InternalServerErrorException } from '@nestjs/common';
import { LocationService } from './location.service';
import { AddLocationDto } from './dto/addLocation.dto';
import { DeleteLocationDto } from './dto/deleteLocation.dto';
import { Location } from './location.entity';
import { ReqUser } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('locations')
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  async getLocations(@ReqUser() user: User): Promise<Location[]> {
    return this.locationService
      .getLocations(user)
      .then((locations: Location[]): Location[] => {
        this.logger.log('Successfully loaded locations');
        return locations;
      })
      .catch((e) => {
        this.logger.error(`Locations loading error: ${e.message}`);
        throw new InternalServerErrorException();
      });
  }

  @Post()
  async addLocation(
    @Body() addLocationDto: AddLocationDto,
    @ReqUser() user: User,
  ): Promise<Location> {
    return this.locationService
      .addLocation(user, addLocationDto)
      .then(
        (location: Location): Location => {
          this.logger.log('Successfully added location');
          return location;
        },
      )
      .catch((e) => {
        this.logger.error(`Location adding error: ${e.message}`);
        throw new InternalServerErrorException();
      });
  }

  @Delete()
  async deleteLocation(
    @Body() deleteLocationDto: DeleteLocationDto,
    @ReqUser() user: User,
  ): Promise<void> {
    return this.locationService
      .deleteLocation(user, deleteLocationDto)
      .then((): void => {
        this.logger.log('Successfully deleted location');
      })
      .catch((e) => {
        this.logger.error(`Location deleting error: ${e.message}`);
        throw new InternalServerErrorException();
      });
  }
}
