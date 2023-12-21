import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsUrl()
    full: string;
}
