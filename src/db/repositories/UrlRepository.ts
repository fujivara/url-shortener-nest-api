import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlRepository {
  constructor (private prismaService: PrismaService) {}

  async create (data: Prisma.UrlCreateInput) {
    return this.prismaService.url.create({
      data,
    });
  }

  async findWhere (where: Prisma.UrlWhereInput) {
    return this.prismaService.url.findFirst({ where });
  }
}
