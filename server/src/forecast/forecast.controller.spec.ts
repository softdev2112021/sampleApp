import { Test, TestingModule } from '@nestjs/testing';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

describe('ForecastController', () => {
  let controller: ForecastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForecastController],
      providers: [ForecastService],
    }).compile();

    controller = module.get<ForecastController>(ForecastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
