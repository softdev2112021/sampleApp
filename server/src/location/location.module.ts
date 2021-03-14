import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { WeatherModule } from '../weather/weather.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity]),
    WeatherModule,
    AuthModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
