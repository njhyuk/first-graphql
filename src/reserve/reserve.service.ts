import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserve } from './reserve.entity';
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { ReserveDto } from './reserve.dto';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';
import { Room } from '../room/room.entity';
import moment = require('moment');

@Injectable()
export class ReserveService {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
    @InjectRepository(Reserve)
    private readonly reservesRepository: Repository<Reserve>,
  ) {
  }

  thisWeek(): Promise<Reserve[]> {
    return this.reservesRepository.find({
      startedAt: LessThan(moment().endOf('week').toDate()),
      endedAt: MoreThan(moment().startOf('week').toDate()),
    });
  }

  async checkTime(room: Room, startedAt: Date, endedAt: Date): Promise<boolean> {
    return !await this.reservesRepository.findOne({
      room,
      startedAt: LessThan(endedAt),
      endedAt: MoreThan(startedAt),
    });
  }

  protected timeFormat(time: string): Date {
    return moment(time).toDate();
  }

  async getEmptyRooms(startedAt: string, endedAt: string): Promise<Room[]> {
    return this.roomsRepository.createQueryBuilder('room')
      .where(`NOT EXISTS (
      SELECT
        id
      FROM
        reserve
      WHERE
        reserve.roomId = room.id AND
        reserve.startedAt < :endedAt AND
        reserve.endedAt > :startedAt
      )`, {
        endedAt: this.timeFormat(endedAt),
        startedAt: this.timeFormat(startedAt),
      })
      .getMany();
  }

  async create(data: ReserveDto): Promise<Reserve> {
    const user = await this.userService.findOne(data.userId);
    const room = await this.roomService.findOne(data.roomId);
    const startedAt = this.timeFormat(data.startedAt);
    const endedAt = this.timeFormat(data.endedAt);

    if (!(user && room)) {
      throw new BadRequestException('not found data.');
    }
    if (startedAt > endedAt) {
      throw new BadRequestException('Reservation start time is later than the end time.');
    }
    if (!await this.checkTime(room, startedAt, endedAt)) {
      throw new BadRequestException('The room is already booked at that time.');
    }

    const reserve = new Reserve();
    reserve.startedAt = startedAt;
    reserve.endedAt = endedAt;
    reserve.user = user;
    reserve.room = room;
    return await this.reservesRepository.save(reserve);
  }
}
