import { Module } from '@nestjs/common';
import { PrismaService } from '../db/PrismaService';


@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
