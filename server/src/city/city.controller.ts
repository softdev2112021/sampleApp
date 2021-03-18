import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { CityService } from './city.service';
import { CityEntity } from './city.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('cities')
@UseGuards(JwtAuthGuard)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':name')
  async getCities(@Param('name') name: string): Promise<CityEntity[]> {
    return this.cityService.findCities(name);
  }
}
