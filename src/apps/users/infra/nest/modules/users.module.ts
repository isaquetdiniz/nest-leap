import { Module } from '@nestjs/common';
import {
  CreateUserForgotPasswordService,
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
    CreateUserForgotPasswordService,
  ],
  exports: [GetUserByEmailService, CreateUserForgotPasswordService],
})
export class UsersModule {}
