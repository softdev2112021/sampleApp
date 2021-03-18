import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';

@Entity()
export class User {
  constructor(partial: Partial<User>) {
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

  @OneToMany(() => Location, (location) => location.user)
  locations?: Location[];
}
