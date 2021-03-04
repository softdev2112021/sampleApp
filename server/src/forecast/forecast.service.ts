import { Injectable } from '@nestjs/common';
import getWeatherForecast from 'src/api/weatherApi';
import { Connection, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Forecast } from './interfaces/forecast.interface';

@Injectable()
export class ForecastService {
  private userRepository: Repository<User>;
  constructor(private connection: Connection) {
    this.userRepository = this.connection.getRepository(User);
  }
  async getForecast(id: number): Promise<any[]> {
    const user = await this.userRepository.findOne(id);
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

  async addLocation(id: number, forecast: Forecast): Promise<void> {
    const user = await this.userRepository.findOne(id);
    user.locations.push(forecast);
    await this.userRepository.manager.save(user);
  }

  async deleteLocation(id: number, name: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    const { locations } = user;
    locations.splice(
      locations.findIndex((location) => location.name === name),
      1,
    );
    await this.userRepository.manager.save(user);
  }
}
