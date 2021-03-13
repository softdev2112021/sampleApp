import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocationEntity } from '../location/location.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  login: string;

  @Column({ nullable: false })
  passwordHash?: string;

  @OneToMany(() => LocationEntity, (location) => location.user)
  locations?: LocationEntity[];
}
