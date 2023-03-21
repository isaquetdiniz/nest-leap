import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IORedisService } from '@/libs/ioredis';

@Module({
  imports: [ConfigModule],
  providers: [IORedisService],
  exports: [IORedisService],
})
export class IORedisModule {}
