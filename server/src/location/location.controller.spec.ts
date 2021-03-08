import { Test, TestingModule } from '@nestjs/testing';
import { ForecastController } from './location.controller';
import { ForecastService } from './location.service';

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
