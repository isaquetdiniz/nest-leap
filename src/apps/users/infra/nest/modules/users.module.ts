import { Module } from '@nestjs/common';
import {
  NotificationService,
  PrismaUserConfirmationRepository,
  UserObserver,
} from '@/users/infra';
import { PrismaModule } from '@/libs/prisma';

@Module({
  imports: [PrismaModule],
  providers: [
    UserObserver,
    NotificationService,
    PrismaUserConfirmationRepository,
  ],
})
export class UsersModule {}
