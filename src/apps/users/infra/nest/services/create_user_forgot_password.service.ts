import {
  CreateUserForgotPasswordController,
  CreateUserForgotPasswordRequest,
  TCreateUserForgotPasswordRequest,
  TCreateUserForgotPasswordResponse,
} from '@/users/interface';
import {
  NotificationService,
  PrismaUserForgotPasswordRepository,
  PrismaUserRepository,
  UserForgotPasswordEventEmitter,
} from '@/users/infra';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserForgotPasswordService {
  controller: CreateUserForgotPasswordController;

  constructor(
    userRepository: PrismaUserRepository,
    userForgotPasswordRepository: PrismaUserForgotPasswordRepository,
    notificationService: NotificationService,
    eventEmitter: UserForgotPasswordEventEmitter,
  ) {
    this.controller = new CreateUserForgotPasswordController(
      userRepository,
      userForgotPasswordRepository,
      notificationService,
      eventEmitter,
    );
  }

  async execute(
    params: TCreateUserForgotPasswordRequest,
  ): Promise<TCreateUserForgotPasswordResponse> {
    const request = new CreateUserForgotPasswordRequest({
      email: params.email,
    });

    const response = await this.controller.execute(request);

    return response;
  }
}
