import { Module } from '@nestjs/common';
import {
  ConfirmUserRestController,
  CreateUserRestController,
} from '@/api-users/infra';
import { JwtTokenService } from '@/libs/nest';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/libs/prisma';

@Module({
  imports: [PrismaModule, UsersModule, JwtModule],
  controllers: [CreateUserRestController, ConfirmUserRestController],
  providers: [JwtTokenService],
})
export class UsersModule {}
