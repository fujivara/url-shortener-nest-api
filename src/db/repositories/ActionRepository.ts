import { Prisma } from '@prisma/client';
import { PrismaService } from '../PrismaService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionRepository {
  constructor (private prismaService: PrismaService) {}

  async create (data: Prisma.ActionUncheckedCreateInput) {
    return this.prismaService.action.create({ data });
  }

  async findUrlsWhere (where: Prisma.ActionWhereInput) {
    return this.prismaService.action.findMany({
      where,
      select: {
        url: true,
      },
    });
  }
}
