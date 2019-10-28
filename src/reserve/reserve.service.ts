import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserve } from './reserve.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { ReserveDto } from './reserve.dto';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';
import { Room } from '../room/room.entity';
import { transformAndValidate } from 'class-transformer-validator';
import moment = require('moment');

@Injectable()
export class ReserveService {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    @InjectRepository(Reserve)
    private readonly reservesRepository: Repository<Reserve>,
  ) {
  }

  findAll(): Promise<Reserve[]> {
    return this.reservesRepository.find();
  }

  async checkTime(room: Room, startedAt: Date, endedAt: Date): Promise<boolean> {
    return !await this.reservesRepository.findOne({
      room,
      startedAt: LessThan(endedAt),
      endedAt: MoreThan(startedAt),
    });
  }

  async create(data: ReserveDto): Promise<Reserve> {
    const user = await this.userService.findOne(data.userId);
    const room = await this.roomService.findOne(data.roomId);
    const startedAt = moment(data.startedAt).toDate();
    const endedAt = moment(data.endedAt).toDate();

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
