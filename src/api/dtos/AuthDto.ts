import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { RoleName } from '@prisma/client';

export class AuthDto {
  @IsNotEmpty()
    username: string;
  @IsNotEmpty()
    password: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'Wrong email provided' })
    email: string;
  @IsNotEmpty()
  @IsEnum(RoleName, { message: 'Wrong role provided' })
    role: RoleName;
}
