import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class LimitQueryDto {
  @IsOptional()
  @Transform((value) => parseInt(value.value, 10))
  @IsInt()
    limit?: number;
}
