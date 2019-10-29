import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserve } from '../reserve/reserve.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: [4, 6, 8],
  })
  size: number;

  @OneToMany(type => Reserve, reserve => reserve.room)
  reserves: Reserve[];
}
