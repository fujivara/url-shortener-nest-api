import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityConfigService {
  constructor (private configService: ConfigService) {}

  get secret (): string {
    return this.configService.get<string>('security.secret');
  }

  get ttl (): number {
    return this.configService.get<number>('rateLimit.ttl');
  }

  get limit (): number {
    return this.configService.get<number>('rateLimit.limit');
  }
}
