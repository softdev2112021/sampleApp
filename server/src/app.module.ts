import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { AuthModule } from './auth/auth.module';
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
        POSTGRES_DROPSCHEMA: Joi.boolean().required(),
        POSTGRES_SYNCHRONIZE: Joi.boolean().required(),
        POSTGRES_MIGRATIONSRUN: Joi.boolean().required(),
        POSTGRES_LOGGING: Joi.boolean(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    DbModule,
    LocationModule,
    AuthModule,
    // TesterModule,
  ],
})
export class AppModule {}
