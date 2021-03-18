import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  country: string;

  @Column('float', { array: true })
  coords: [number, number];
}
