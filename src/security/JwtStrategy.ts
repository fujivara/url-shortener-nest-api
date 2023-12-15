import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './JwtPayload';
import { UserRepository } from '../db/repositories/UserRepository';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'idinahui',
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
