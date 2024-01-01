import { Module } from '@nestjs/common';
import { AuthModule } from './modules/AuthModule';
import { PrismaModule } from './modules/PrismaModule';
import { UserModule } from './modules/UserModule';
import { UrlModule } from './modules/UrlModule';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigurationModule } from './modules/ConfigModule';
import Config from './config/Config';
import { SecurityConfigService } from './config/SecurityConfigService';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    UrlModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [SecurityConfigService],
      useFactory: (config: SecurityConfigService) => [
        {
          ttl: config.ttl,
          limit: config.limit,
        },
      ],
    }),
    ConfigurationModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [Config],
    }),
  ],
})
export class AppModule {}
