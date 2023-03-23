import { Module } from '@nestjs/common';
import {
  CreateUserForgotPasswordService,
  GetUserByEmailService,
  NotificationService,
  PrismaUserConfirmationRepository,
  PrismaUserForgotPasswordRepository,
  PrismaUserRepository,
  UpdateUserForgotPasswordService,
  UserForgotPasswordEventEmitter,
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
    PrismaUserForgotPasswordRepository,
    GetUserByEmailService,
    UserForgotPasswordEventEmitter,
    CreateUserForgotPasswordService,
    UpdateUserForgotPasswordService,
  ],
  exports: [
    GetUserByEmailService,
    CreateUserForgotPasswordService,
    UpdateUserForgotPasswordService,
  ],
})
export class UsersModule {}
