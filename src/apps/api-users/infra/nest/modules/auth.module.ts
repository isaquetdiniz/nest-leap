import { Module } from '@nestjs/common';
import {
  JwtTokenService,
  LocalStrategy,
  LoginRestController,
} from '@/api-users/infra';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/infra';
import { PrismaModule } from '@/libs/prisma';
import { IORedisModule } from '@/libs/ioredis';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    PassportModule,
    UsersModule,
    IORedisModule,
  ],
  controllers: [LoginRestController],
  providers: [JwtTokenService, LocalStrategy],
})
export class AuthModule {}
