import { Controller, Get, Post, Delete, Req, Body, UseGuards } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { AuthGuard } from '@nestjs/passport';
import { AddForecastDto } from './dto/add-forecast.dto';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getForecast(@Req() req): Promise<any[]> {
    return this.forecastService.getForecast(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addLocation(@Body() AddForecastDto: AddForecastDto, @Req() req): Promise<void> {
    return this.forecastService.addLocation(req.user.id, AddForecastDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteLocation(@Body() name: string, @Req() req): Promise<void> {
    return this.forecastService.deleteLocation(req.user.id, name);
  }
}
