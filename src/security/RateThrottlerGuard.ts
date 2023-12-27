import { ThrottlerException, ThrottlerGuard, ThrottlerOptions } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RateThrottlerGuard extends ThrottlerGuard {
  async handleRequest (
    context: ExecutionContext, limit: number, ttl: number, throttler: ThrottlerOptions
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
      const key = this.generateKey(context, ip, throttler.name);
      const { totalHits } = await this.storageService.increment(key, ttl);

      if (totalHits > limit) {
        throw new ThrottlerException();
      }
    } else {
      console.log(request.user);
    }

    return true;
  }
}
