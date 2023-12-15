import { Module } from '@nestjs/common';
import { AuthModule } from './modules/AuthModule';
import { PrismaModule } from './modules/PrismaModule';
import { UserModule } from './modules/UserModule';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
})
export class AppModule {}
