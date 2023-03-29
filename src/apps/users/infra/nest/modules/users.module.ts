import { Module } from '@nestjs/common';
import {
  ConfirmUserNestService,
  CreateUserForgotPasswordService,
  CreateUserNestService,
  GetUserByEmailService,
  NotificationService,
  PrismaUserConfirmationRepository,
  PrismaUserForgotPasswordRepository,
  PrismaUserRepository,
  UpdateUserForgotPasswordService,
  UserEventEmitter,
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
    UserEventEmitter,
    UserForgotPasswordEventEmitter,
    CreateUserForgotPasswordService,
    UpdateUserForgotPasswordService,
    CreateUserNestService,
    ConfirmUserNestService,
  ],
  exports: [
    GetUserByEmailService,
    CreateUserForgotPasswordService,
    UpdateUserForgotPasswordService,
    CreateUserNestService,
    ConfirmUserNestService,
  ],
})
export class UsersModule {}
