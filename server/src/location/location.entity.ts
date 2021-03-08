import { Forecast } from 'src/weather/services/interfaces/forecast.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column('float', { array: true })
  coords: [number, number];

  @ManyToOne(() => User, (user) => user.locations)
  user?: User;

  forecast?: Forecast;
}
