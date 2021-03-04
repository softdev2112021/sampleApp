import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
