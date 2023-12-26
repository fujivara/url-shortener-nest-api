import { Body, Controller, Request, Get, Param, Post, Response, UseGuards } from '@nestjs/common';
import { UrlService } from '../services/UrlService';
import { CreateUrlDto } from '../dtos/CreateUrlDto';
import { UrlByShortIdPipe } from '../UrlByShortIdPipe';
import { RateThrottlerGuard } from '../../security/RateThrottlerGuard';


@Controller('/urls')
export class UrlController {
  constructor (private urlService: UrlService) {}

  @Post()
  @UseGuards(RateThrottlerGuard)
  async create (
    @Request() req,
    @Body() data: CreateUrlDto
  ) {
    return this.urlService.create(data, req.user);
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
