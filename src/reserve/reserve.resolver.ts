import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { Reserve } from './reserve.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver('Reserve')
export class ReserveResolver {
  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
  ) {
  }

  @Query()
  async getReserves(): Promise<Reserve[]> {
    return await this.reserveRepository.find({
      relations: ['user', 'room'],
    });
  }

}
