import { Module } from '@nestjs/common';
import { AuthModule } from './modules/AuthModule';
import { PrismaModule } from './modules/PrismaModule';
import { UserModule } from './modules/UserModule';
import { UrlModule } from './modules/UrlModule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationModule } from './modules/ConfigModule';
import Config from './config/Config';
import * as process from 'process';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    UrlModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 3,
    }]),
    ConfigurationModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
      load: [Config],
    }),
  ],
})
export class AppModule {}
