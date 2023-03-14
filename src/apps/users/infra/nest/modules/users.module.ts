import { Module } from '@nestjs/common';
import {
  GetUserByEmailService,
  NotificationService,
  PrismaUserConfirmationRepository,
  PrismaUserRepository,
  UserObserver,
} from '@/users/infra';
import { PrismaModule } from '@/libs/prisma';

@Module({
  imports: [PrismaModule],
  providers: [
    UserObserver,
    NotificationService,
    PrismaUserRepository,
    PrismaUserConfirmationRepository,
    GetUserByEmailService,
  ],
  exports: [GetUserByEmailService],
})
export class UsersModule {}
