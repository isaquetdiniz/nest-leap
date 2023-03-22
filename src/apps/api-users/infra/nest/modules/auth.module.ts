import { Module } from '@nestjs/common';
import {
  JwtAuthGuard,
  JwtStrategy,
  JwtTokenService,
  LocalStrategy,
  LoginRestController,
  RefreshTokenGuard,
  RefreshTokenRestController,
} from '@/api-users/infra';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/infra';
import { PrismaModule } from '@/libs/prisma';
import { IORedisModule } from '@/libs/ioredis';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BcryptModule } from '@/libs/bcrypt';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    JwtModule,
    PassportModule,
    UsersModule,
    IORedisModule,
    BcryptModule,
  ],
  controllers: [LoginRestController, RefreshTokenRestController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtTokenService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenGuard,
  ],
})
export class AuthModule {}
