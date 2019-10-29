import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Reserve } from './reserve.entity';
import { ReserveService } from './reserve.service';
import { ReserveDto } from './reserve.dto';
import { Room } from '../room/room.entity';

@Resolver('Reserve')
export class ReserveResolver {
  constructor(
    private readonly reserveService: ReserveService,
  ) {
  }

  @Query()
  getReservesByWeek(): Promise<Reserve[]> {
    return this.reserveService.thisWeek();
  }

  @Query()
  getEmptyRooms(
    @Args('startedAt') startedAt: string,
    @Args('endedAt') endedAt: string,
    ): Promise<Room[]> {
    return this.reserveService.getEmptyRooms(startedAt, endedAt);
  }

  @Mutation('createReserve')
  create(@Args('reserve') reserve: ReserveDto) {
    return this.reserveService.create(reserve);
  }

}
