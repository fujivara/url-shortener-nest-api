import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { UrlService } from '../services/UrlService';
import { CreateUrlDto } from '../dtos/CreateUrlDto';
import { UrlByShortIdPipe } from '../UrlByShortIdPipe';


@Controller('/urls')
export class UrlController {
  constructor (private urlService: UrlService) {}

  @Post()
  async create (@Body() data: CreateUrlDto) {
    return this.urlService.create(data);
  }

  @Get('/:shortId')
  async redirect (
    @Param('shortId', UrlByShortIdPipe) shortId: string,
    @Response() res
  ) {
    const url = await this.urlService.getByShortId(shortId);
    res.redirect(url.full);
  }
}