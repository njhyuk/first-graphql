import { IsDateString, IsNumber } from 'class-validator';

export class ReserveDto {
  @IsDateString()
  startedAt: string;
  @IsDateString()
  endedAt: string;
  @IsNumber()
  userId: number;
  @IsNumber()
  roomId: number;
}
