import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SecurityConfigService } from '../config/SecurityConfigService';

@Module({
  providers: [SecurityConfigService],
  exports: [SecurityConfigService],
})
export class ConfigurationModule extends ConfigModule {}
