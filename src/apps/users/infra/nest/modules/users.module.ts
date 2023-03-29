import { Module } from '@nestjs/common';
import {
  ConfirmUserNestService,
  CreateUserForgotPasswordService,
  CreateUserNestService,
  GetUserByEmailNestService,
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
    GetUserByEmailNestService,
    UserEventEmitter,
    UserForgotPasswordEventEmitter,
    CreateUserForgotPasswordService,
    UpdateUserForgotPasswordService,
    CreateUserNestService,
    ConfirmUserNestService,
  ],
  exports: [
    CreateUserNestService,
    ConfirmUserNestService,
    GetUserByEmailNestService,
    CreateUserForgotPasswordService,
    UpdateUserForgotPasswordService,
  ],
})
export class UsersModule {}
