import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/libs/prisma';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from '@/apps/notifications/infra';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    JwtModule,
    NotificationsModule,
    AuthModule,
    UsersModule,
  ],
})
export class ApiUsersModule {}
