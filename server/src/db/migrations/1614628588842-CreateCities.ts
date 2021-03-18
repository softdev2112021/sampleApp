import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { CityEntity } from '../../city/city.entity';
import * as cityList from './cityList.json';

export class CreateCities1614628588842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cityRepository: Repository<CityEntity> = queryRunner.connection.getRepository(
      CityEntity,
    );

    interface City {
      id: number;
      name: string;
      state: string;
      country: string;
      coord: {
        lon: number;
        lat: number;
      };
    }

    const cities: CityEntity[] = await Promise.all(
      JSON.parse(JSON.stringify(cityList))
        .filter((city: City) => city.country === 'UA')
        .map(async (city: City) => {
          const {
            name,
            country,
            coord: { lon, lat },
          } = city;

          return cityRepository.create({
            name,
            country,
            coords: [lat, lon],
          });
        }),
    );

    await cityRepository.manager.save(cities);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const cityRepository: Repository<CityEntity> = queryRunner.connection.getRepository(
      CityEntity,
    );

    const cities: CityEntity[] = await cityRepository.find({
      select: ['name'],
    });

    if (!cities.length) {
      return;
    }

    await cityRepository.remove(cities);
  }
}
