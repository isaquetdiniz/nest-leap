import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserRestController } from '@/api-users/infra';
import { PrismaModule } from '@/libs/prisma';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from '@/apps/users/infra';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    UsersModule,
  ],
  controllers: [CreateUserRestController],
})
export class ApiUsersModule {}
