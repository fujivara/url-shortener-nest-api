import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../../db/repositories/UrlRepository';
import { CreateUrlDto } from '../dtos/CreateUrlDto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor (private urlRepository: UrlRepository) {}

  async create (data: CreateUrlDto) {
    const short = nanoid(10);
    return this.urlRepository.create({
      ...data,
      short,
    });
  }

  async getByShortId (short: string) {
    return this.urlRepository.findWhere({ short });
  }
}