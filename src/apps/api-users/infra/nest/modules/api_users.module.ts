import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@/libs/prisma';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from '@/apps/notifications/infra';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { IORedisConfig } from '@/libs/ioredis';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    JwtModule,
    NotificationsModule,
    AuthModule,
    UsersModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IORedisConfig>) => ({
        ttl: 60,
        limit: 100,
        storage: new ThrottlerStorageRedisService(
          configService.get<string>('APP_REDIS_URL'),
        ),
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ApiUsersModule {}
