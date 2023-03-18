import { Module } from '@nestjs/common';
import { LocalStrategy, LoginRestController } from '@/api-users/infra';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/infra';
import { PrismaModule } from '@/libs/prisma';

@Module({
  imports: [PrismaModule, JwtModule, PassportModule, UsersModule],
  controllers: [LoginRestController],
  providers: [LocalStrategy],
})
export class AuthModule {}
