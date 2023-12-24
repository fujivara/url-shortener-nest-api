import { Module } from '@nestjs/common';
import { AuthModule } from './modules/AuthModule';
import { PrismaModule } from './modules/PrismaModule';
import { UserModule } from './modules/UserModule';
import { UrlModule } from './modules/UrlModule';
import { ThrottlerModule } from '@nestjs/throttler';

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
  ],
})
export class AppModule {}
