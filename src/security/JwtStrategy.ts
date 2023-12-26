import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../db/repositories/UserRepository';
import { JwtPayload } from 'jsonwebtoken';
import { SecurityConfigService } from '../config/SecurityConfigService';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userRepository: UserRepository,
    private secretConfig: SecurityConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretConfig.secret,
    });
  }

  async validate (payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('No payload provided');
    }

    const user = await this.userRepository.find({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }
}
