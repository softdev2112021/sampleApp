import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  passwordHash?: string;

  @OneToMany(() => Location, (location) => location.user)
  locations?: Location[];
}
