import { Module } from '@nestjs/common';
import {
  ConfirmUserNestService,
  CreateUserForgotPasswordNestService,
  CreateUserNestService,
  GetUserByEmailNestService,
  NotificationService,
  PrismaUserConfirmationRepository,
  PrismaUserForgotPasswordRepository,
  PrismaUserRepository,
  UpdateUserForgotPasswordNestService,
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
    CreateUserForgotPasswordNestService,
    UpdateUserForgotPasswordNestService,
    CreateUserNestService,
    ConfirmUserNestService,
  ],
  exports: [
    CreateUserNestService,
    ConfirmUserNestService,
    GetUserByEmailNestService,
    CreateUserForgotPasswordNestService,
    UpdateUserForgotPasswordNestService,
  ],
})
export class UsersModule {}
