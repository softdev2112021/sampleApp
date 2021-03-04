import { Module } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}
