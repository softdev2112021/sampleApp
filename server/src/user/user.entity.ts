import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocationEntity } from '../location/location.entity';

@Entity()
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  login: string;

  @Exclude()
  @Column({ nullable: false })
  passwordHash: string;

  @OneToMany(() => LocationEntity, (location) => location.user)
  locations?: LocationEntity[];
}
