import { Module } from '@nestjs/common';
import { UrlController } from '../api/controllers/UrlController';
import { UrlService } from '../api/services/UrlService';
import { PrismaModule } from './PrismaModule';
import { UrlRepository } from '../db/repositories/UrlRepository';


@Module({
  imports: [PrismaModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
})
export class UrlModule {
  
}