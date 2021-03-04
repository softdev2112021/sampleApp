import { Controller, Request, Post, UseGuards, Get, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import getWeatherForecast from '../api/weatherApi';

@Controller('auth')
export class AuthController {
  private userRepository: Repository<User>;
  constructor(
    private authService: AuthService,
    private connection: Connection,
  ) {
    this.userRepository = this.connection.getRepository(User);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('forecast')
  async getForecast(@Request() req) {
    const user = await this.userRepository.findOne(req.user.id);
    const { locations } = user;

    if (!locations.length) {
      return;
    }

    const forecast = [];
    locations.forEach((location) => {
      forecast.push(getWeatherForecast(location.coords));
    });

    return Promise.all(forecast);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('location')
  async addLocation(@Request() req) {
    const { name, coords } = req.body;
    const user = await this.userRepository.findOne(req.user.id);
    user.locations.push({ name, coords });
    return await this.userRepository.manager.save(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('location')
  async deleteLocation(@Request() req) {
    const user = await this.userRepository.findOne(req.user.id);
    const { locations } = user;
    locations.splice(
      locations.findIndex((location) => location.name === req.body.name),
      1,
    );
    return await this.userRepository.manager.save(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const user = await this.userRepository.findOne(req.user.id);
    return this.authService.login(user);
  }
}
