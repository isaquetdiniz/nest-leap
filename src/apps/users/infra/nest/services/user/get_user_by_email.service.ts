import {
  GetUserByEmailController,
  GetUserByEmailRequest,
  GetUserByEmailResponse,
  IGetUserByEmailRequest,
} from '@/users/interface';
import { PrismaUserRepository } from '@/users/infra';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByEmailNestService {
  controller: GetUserByEmailController;

  constructor(userRepository: PrismaUserRepository) {
    this.controller = new GetUserByEmailController(userRepository);
  }

  async execute(
    params: IGetUserByEmailRequest,
  ): Promise<GetUserByEmailResponse> {
    const request = new GetUserByEmailRequest({
      email: params.email,
    });

    const response = await this.controller.execute(request);

    return response;
  }
}
