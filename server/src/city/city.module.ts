import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), AuthModule],
  controllers: [CityController],
  providers: [CityService, Logger],
})
export class CityModule {}
