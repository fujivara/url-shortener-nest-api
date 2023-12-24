import { ThrottlerException, ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, verify } from 'jsonwebtoken';
import { PrismaService } from '../db/PrismaService';
import { UserRepository } from '../db/repositories/UserRepository';

@Injectable()
export class RateThrottlerGuard extends ThrottlerGuard {
  async handleRequest (
    context: ExecutionContext, limit: number, ttl: number, throttler: ThrottlerOptions
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtFromRequest(request);
    let payload: string | JwtPayload;

    if (token) {
      try {
        payload = verify(token, 'supercoolsecret');
      } catch (error) {
        throw new UnauthorizedException();
      }

      if (payload) {
        request.user = await this.validateToken(payload);
      }

    } else {
      const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      const key = this.generateKey(context, ip, throttler.name);
      const { totalHits } = await this.storageService.increment(key, ttl);

      if (totalHits > limit) {
        throw new ThrottlerException();
      }
    }

    return true;
  }

  extractJwtFromRequest (request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (authHeader) {
      return authHeader.split(' ')[1];
    }
    return null;
  }

  async validateToken (payload: any) {
    const prismaService = new PrismaService();
    const userRepository = new UserRepository(prismaService);

    const user = await userRepository.find({ id: payload.sub });

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }
}
