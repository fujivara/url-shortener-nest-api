import { Module } from '@nestjs/common';
import { UrlController } from '../api/controllers/UrlController';
import { UrlService } from '../api/services/UrlService';
import { PrismaModule } from './PrismaModule';
import { UrlRepository } from '../db/repositories/UrlRepository';
import { JwtStrategy } from '../security/JwtStrategy';
import { UserRepository } from '../db/repositories/UserRepository';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [PrismaModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository, JwtStrategy, UserRepository, Reflector],
})
export class UrlModule {}
