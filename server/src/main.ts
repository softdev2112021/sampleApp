import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    methods: 'GET,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(parseInt(process.env.PORT, 10) || 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
