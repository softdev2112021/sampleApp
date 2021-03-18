import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { City } from '../../city/city.entity';
import * as cityList from './cityList.json';
import * as config from './cityConfig.json';

const { countryList } = config;

export class CreateCities1614628588842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cityRepository: Repository<City> = queryRunner.connection.getRepository(
      City,
    );

    interface CityData {
      id: number;
      name: string;
      state: string;
      country: string;
      coord: {
        lon: number;
        lat: number;
      };
    }

    const cities: City[] = await Promise.all(
      JSON.parse(JSON.stringify(cityList))
        .filter((city: CityData) => countryList.includes(city.country))
        .map(async (city: CityData) => {
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
    const cityRepository: Repository<City> = queryRunner.connection.getRepository(
      City,
    );

    const cities: City[] = await cityRepository.find({
      select: ['name'],
    });

    if (!cities.length) {
      return;
    }

    await cityRepository.remove(cities);
  }
}
