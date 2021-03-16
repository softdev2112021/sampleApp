import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import logger from './logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_HOST,
    methods: 'GET,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(parseInt(process.env.PORT, 10) || 4000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
