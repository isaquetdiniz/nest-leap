import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserRestController } from '@/api-users/infra';
import { PrismaModule } from '@/libs/prisma';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from '@/apps/users/infra';
import { NotificationsModule } from '@/apps/notifications/infra';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    UsersModule,
    NotificationsModule,
  ],
  controllers: [CreateUserRestController],
})
export class ApiUsersModule {}
