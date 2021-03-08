import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { AuthGuard } from '@nestjs/passport';
import { AddLocationDto } from './dto/addLocation.dto';
import { DeleteLocationDto } from './dto/deleteLocation.dto';
import { Location } from './location.entity';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getLocations(@Req() req): Promise<Location[]> {
    return this.locationService.getLocations(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addLocation(
    @Body() addLocationDto: AddLocationDto,
    @Req() req,
  ): Promise<void> {
    return this.locationService.addLocation(req.user.id, addLocationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteLocation(
    @Body() deleteLocationDto: DeleteLocationDto,
    @Req() req,
  ): Promise<void> {
    return this.locationService.deleteLocation(req.user.id, deleteLocationDto);
  }
}
