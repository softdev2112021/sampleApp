import { Forecast } from 'src/weather/services/interfaces/forecast.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column('float', { array: true })
  coords: [number, number];

  @ManyToOne(() => UserEntity, (user) => user.locations)
  user?: UserEntity;

  forecast?: Forecast;
}
