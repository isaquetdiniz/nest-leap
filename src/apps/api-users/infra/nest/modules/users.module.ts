import { Module } from '@nestjs/common';
import {
  ConfirmUserRestController,
  CreateUserRestController,
  JwtTokenService,
} from '@/api-users/infra';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/libs/prisma';
import { IORedisModule } from '@/libs/ioredis';
import { BcryptModule } from '@/libs/bcrypt';

@Module({
  imports: [PrismaModule, UsersModule, JwtModule, IORedisModule, BcryptModule],
  controllers: [CreateUserRestController, ConfirmUserRestController],
  providers: [JwtTokenService],
})
export class UsersModule {}
