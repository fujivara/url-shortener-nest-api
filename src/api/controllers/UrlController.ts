import { Body, Controller, Request, Get, Param, Post, Response, UseGuards } from '@nestjs/common';
import { UrlService } from '../services/UrlService';
import { CreateUrlDto } from '../dtos/CreateUrlDto';
import { UrlByShortIdPipe } from '../UrlByShortIdPipe';
import { RateThrottlerGuard } from '../../security/RateThrottlerGuard';
import { OptionalJwtAuthGuard } from '../../security/OptionalJwtAuthGuard';


@Controller('/urls')
export class UrlController {
  constructor (private urlService: UrlService) {}

  @UseGuards(OptionalJwtAuthGuard, RateThrottlerGuard)
  @Post()
  async create (
    @Request() req,
    @Body() data: CreateUrlDto
  ) {
    return this.urlService.create(data, req.user);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/:shortId')
  async redirect (
    @Param('shortId', UrlByShortIdPipe) shortId: string,
    @Request() req,
    @Response() res
  ) {
    const url = await this.urlService.getByShortId(shortId, req.user);
    res.redirect(url.full);
  }
}
