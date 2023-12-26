import { Module } from '@nestjs/common';
import { UrlController } from '../api/controllers/UrlController';
import { UrlService } from '../api/services/UrlService';
import { PrismaModule } from './PrismaModule';
import { UrlRepository } from '../db/repositories/UrlRepository';
import { JwtStrategy } from '../security/JwtStrategy';
import { UserRepository } from '../db/repositories/UserRepository';
import { ConfigurationModule } from './ConfigModule';
import { ActionRepository } from '../db/repositories/ActionRepository';

@Module({
  imports: [PrismaModule, ConfigurationModule],
  controllers: [UrlController],
  providers: [
    UrlService,
    UrlRepository,
    ActionRepository,
    JwtStrategy,
    UserRepository,
  ],
})
export class UrlModule {}
