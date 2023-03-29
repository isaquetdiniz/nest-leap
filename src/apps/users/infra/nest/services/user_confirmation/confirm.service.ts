import {
  ConfirmUserController,
  ConfirmUserRequest,
  ConfirmUserResponse,
  TConfirmUserRequest,
} from '@/users/interface';
import {
  PrismaUserConfirmationRepository,
  PrismaUserRepository,
  UserEventEmitter,
} from '@/users/infra';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfirmUserNestService {
  controller: ConfirmUserController;

  constructor(
    userRepository: PrismaUserRepository,
    userConfirmationRepository: PrismaUserConfirmationRepository,
    eventEmitter: UserEventEmitter,
  ) {
    this.controller = new ConfirmUserController(
      userRepository,
      userConfirmationRepository,
      eventEmitter,
    );
  }

  async execute(params: TConfirmUserRequest): Promise<ConfirmUserResponse> {
    const request = new ConfirmUserRequest({
      code: params.email,
      email: params.email,
    });

    const response = await this.controller.execute(request);

    return response;
  }
}
