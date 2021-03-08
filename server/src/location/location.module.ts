import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { UserModule } from '../user/user.module';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [UserModule, WeatherModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
