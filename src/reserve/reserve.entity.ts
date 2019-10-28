import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Room } from '../room/room.entity';

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(type => Room)
  @JoinColumn()
  room: Room;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  startedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  endedAt: Date;
}
