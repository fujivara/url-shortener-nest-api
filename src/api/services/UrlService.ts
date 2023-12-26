import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../../db/repositories/UrlRepository';
import { CreateUrlDto } from '../dtos/CreateUrlDto';
import { nanoid } from 'nanoid';
import { ActionType, User } from '@prisma/client';
import { ActionRepository } from '../../db/repositories/ActionRepository';

@Injectable()
export class UrlService {
  constructor (
    private urlRepository: UrlRepository,
    private actionRepository: ActionRepository
  ) {}

  async create (data: CreateUrlDto, user: User) {
    const short = nanoid(10);
    const url = await this.urlRepository.create({
      ...data,
      short,
    });

    if (user) {
      await this.actionRepository.create({
        urlId: url.id,
        userId: user.id,
        type: ActionType.CREATE,
      });
    }

    return url;
  }

  async getByShortId (short: string) {
    return this.urlRepository.findWhere({ short });
  }
}
