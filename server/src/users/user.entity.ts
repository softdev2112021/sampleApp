import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('babbbbbb')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
