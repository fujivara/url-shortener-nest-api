import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UrlRepository } from '../db/repositories/UrlRepository';

@Injectable()
export class UrlByShortIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (private urlRepository: UrlRepository) {}

  async transform (shortId: string): Promise<string> {
    const url = await this.urlRepository.findWhere({
      short: shortId,
    });

    if (!url) {
      throw new BadRequestException('Url with such id not found');
    }

    return shortId;
  }
}
