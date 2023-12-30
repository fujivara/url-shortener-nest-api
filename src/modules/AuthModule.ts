import { Module } from '@nestjs/common';
import { AuthController } from '../api/controllers/AuthController';
import { AuthService } from '../api/services/AuthService';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './UserModule';
import { PrismaModule } from './PrismaModule';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../security/LocalStrategy';
import { JwtStrategy } from '../security/JwtStrategy';
import { JwtGuard } from '../security/guards/JwtGuard';
import { ConfigurationModule } from './ConfigModule';
import { SecurityConfigService } from '../config/SecurityConfigService';


@Module({
  imports: [
    PassportModule,
    UserModule,
    PrismaModule,
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [SecurityConfigService],
      useFactory: (configService: SecurityConfigService) => ({
        secret: configService.secret,
        signOptions: {
          expiresIn: '2d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtGuard],
  exports: [AuthService],
})
export class AuthModule {}
