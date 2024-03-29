import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor (private prismaService: PrismaService) {}

  async findManyWhere (where: Prisma.UserWhereInput) {
    return this.prismaService.user.findMany({
      where,
    });
  }

  async find (where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
    });
  }

  async create (data: Prisma.UserUncheckedCreateInput) {
    return this.prismaService.user.create({ data });
  }
}