import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ConfirmUserRestController,
  CreateUserRestController,
} from '@/api-users/infra';
import { PrismaModule } from '@/libs/prisma';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from '@/apps/users/infra';
import { NotificationsModule } from '@/apps/notifications/infra';
import { JwtTokenService } from '@/libs/nest';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    JwtModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [CreateUserRestController, ConfirmUserRestController],
  providers: [JwtTokenService],
})
export class ApiUsersModule {}
