import { Module, HttpModule } from '@nestjs/common';
import { OpenWeatherService } from './services/openweather.service';
import { WeatherService } from './services/weather.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherService, OpenWeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
