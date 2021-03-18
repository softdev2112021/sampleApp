import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { WeatherModule } from '../weather/weather.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    WeatherModule,
    AuthModule,
  ],
  controllers: [LocationController],
  providers: [LocationService, Logger],
})
export class LocationModule {}
