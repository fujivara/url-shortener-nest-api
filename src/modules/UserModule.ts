import { Module } from '@nestjs/common';
import { UserRepository } from '../db/repositories/UserRepository';
import { PrismaModule } from './PrismaModule';


@Module({
  imports: [PrismaModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
