import { Module } from '@nestjs/common';
import { AuthModule } from './modules/AuthModule';
import { PrismaModule } from './modules/PrismaModule';
import { UserModule } from './modules/UserModule';
import { UrlModule } from './modules/UrlModule';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    UrlModule,
  ],
})
export class AppModule {}
