import { Module } from '@nestjs/common';
import { ReserveResolver } from './reserve.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './reserve.entity';
import { ReserveService } from './reserve.service';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { Room } from '../room/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserve, Room]),
    UserModule,
    RoomModule,
  ],
  providers: [
    ReserveResolver,
    ReserveService,
  ],
})
export class ReserveModule {
}
