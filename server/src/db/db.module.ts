import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        dropSchema: configService.get('POSTGRES_DROPSCHEMA'),
        synchronize: configService.get('POSTGRES_SYNCHRONIZE'),
        migrationsRun: configService.get('POSTGRES_MIGRATIONSRUN'),
        logging: configService.get('POSTGRES_LOGGING'),
        migrations: ['dist/**/db/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'db/migrations',
        },
      }),
    }),
  ],
})
export class DbModule {}
