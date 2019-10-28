import { Module } from '@nestjs/common';
import { ReserveResolver } from './reserve.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from './reserve.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve])],
  providers: [ReserveResolver],
})
export class ReserveModule {
}
