import { Module } from '@nestjs/common';
import { AuthController } from '../api/controllers/AuthController';
import { AuthService } from '../api/services/AuthService';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './UserModule';
import { PrismaModule } from './PrismaModule';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../security/LocalStrategy';
import { JwtStrategy } from '../security/JwtStrategy';
import { JwtGuard } from '../security/JwtGuard';


@Module({
  imports: [
    PassportModule,
    UserModule,
    PrismaModule,
    JwtModule.register({
      secret: 'idinahui',
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtGuard],
  exports: [AuthService],
})
export class AuthModule {}
