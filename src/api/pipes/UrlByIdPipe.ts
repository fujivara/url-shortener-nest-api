import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UrlRepository } from '../../db/repositories/UrlRepository';

@Injectable()
export class UrlByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (private urlRepository: UrlRepository) {
  }
  async transform (urlId: string) {
    const url = await this.urlRepository.findWhere({ id: urlId });

    if (!url) {
      throw new BadRequestException('Url with such id not found');
    }

    return urlId;
  }
}
