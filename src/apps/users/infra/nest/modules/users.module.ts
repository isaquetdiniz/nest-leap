import { Module } from '@nestjs/common';
import { NotificationService, UserObserver } from '@/users/infra';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from '@/libs/nest';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, JwtModule],
  providers: [UserObserver, NotificationService, JwtTokenService],
})
export class UsersModule {}
