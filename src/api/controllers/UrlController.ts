import { Body, Controller, Request, Get, Param, Post, Response, UseGuards, Query } from '@nestjs/common';
import { UrlService } from '../services/UrlService';
import { CreateUrlDto } from '../dtos/CreateUrlDto';
import { UrlByShortIdPipe } from '../pipes/UrlByShortIdPipe';
import { OptionalJwtAuthGuard } from '../../security/guards/OptionalJwtAuthGuard';
import { JwtGuard } from '../../security/guards/JwtGuard';
import { UrlByIdPipe } from '../pipes/UrlByIdPipe';
import { LimitQueryDto } from '../dtos/LimitQueryDto';
import { Role } from '../../security/Role';
import { RoleGuard } from '../../security/guards/RoleGuard';


@Controller('/urls')
export class UrlController {
  constructor (private urlService: UrlService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  async create (
    @Request() req,
    @Body() data: CreateUrlDto
  ) {
    return this.urlService.create(data, req.user);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get('/short/:shortId')
  async redirect (
    @Param('shortId', UrlByShortIdPipe) shortId: string,
    @Request() req,
    @Response() res
  ) {
    const url = await this.urlService.getByShortId(shortId, req.user);
    res.redirect(url.full);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllForUser (@Request() req) {
    return this.urlService.getAllForUser(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/:urlId/stats')
  async getStats (
    @Request() req,
    @Param('urlId', UrlByIdPipe) urlId: string
  ) {
    return this.urlService.getStats(urlId, req.user);
  }

  @Role('ADMIN')
  @UseGuards(JwtGuard, RoleGuard)
  @Get('/top')
  async getMostPopular (@Query() query: LimitQueryDto) {
    return this.urlService.getMostPopular(query.limit);
  }
}
