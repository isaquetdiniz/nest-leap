import {
  GetUserByEmailController,
  GetUserByEmailRequest,
  IGetUserByEmailRequest,
  IGetUserByEmailResponse,
} from '@/users/interface';
import { PrismaUserRepository } from '@/users/infra';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByEmailService {
  controller: GetUserByEmailController;

  constructor(userRepository: PrismaUserRepository) {
    this.controller = new GetUserByEmailController(userRepository);
  }

  async execute(
    params: IGetUserByEmailRequest,
  ): Promise<IGetUserByEmailResponse> {
    const request = new GetUserByEmailRequest({
      email: params.email,
    });

    const response = await this.controller.execute(request);

    return response;
  }
}
