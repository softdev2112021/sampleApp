import { Module } from '@nestjs/common';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DbModule } from './db/db.module';
// import { TesterModule } from './tester/tester.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DbModule,
    // UsersModule,
    // AuthModule,
    // TesterModule,
  ],
})
export class AppModule {}
