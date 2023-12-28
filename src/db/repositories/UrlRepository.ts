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

  async groupByFull (limit: number) {
    return this.prismaService.$queryRaw`  
    SELECT urls."full", COUNT("full") AS full_count
    FROM urls
    GROUP BY "full"
    ORDER BY full_count DESC
    LIMIT ${Number(limit)}`;
  }
}
