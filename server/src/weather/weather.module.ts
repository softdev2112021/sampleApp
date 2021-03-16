import { Module, HttpModule, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenWeatherService } from './services/openweather.service';
import { WeatherService } from './services/weather.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [WeatherService, OpenWeatherService, Logger],
  exports: [WeatherService],
})
export class WeatherModule {}
