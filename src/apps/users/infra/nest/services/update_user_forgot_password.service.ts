import {
  UpdateUserForgotPasswordController,
  UpdateUserForgotPasswordRequest,
  TUpdateUserForgotPasswordRequest,
  TUpdateUserForgotPasswordResponse,
} from '@/users/interface';
import {
  PrismaUserForgotPasswordRepository,
  PrismaUserRepository,
  UserForgotPasswordEventEmitter,
} from '@/users/infra';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserForgotPasswordService {
  controller: UpdateUserForgotPasswordController;

  constructor(
    userRepository: PrismaUserRepository,
    userForgotPasswordRepository: PrismaUserForgotPasswordRepository,
    eventEmitter: UserForgotPasswordEventEmitter,
  ) {
    this.controller = new UpdateUserForgotPasswordController(
      userRepository,
      userForgotPasswordRepository,
      eventEmitter,
    );
  }

  async execute(
    params: TUpdateUserForgotPasswordRequest,
  ): Promise<TUpdateUserForgotPasswordResponse> {
    const request = new UpdateUserForgotPasswordRequest({
      id: params.id,
      code: params.code,
      newPassword: params.newPassword,
    });

    const response = await this.controller.execute(request);

    return response;
  }
}
