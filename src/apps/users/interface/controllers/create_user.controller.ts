import { CreateUserUsecase, IUserRepository } from '@/users/application';
import { UserDTO, UserPresenter } from '@/users/interface';
import { ILoggerProvider } from '@/core/application';
import { Controller, IValidation } from '@/core/interface';

export type ICreateUserRequest = {
  name: string;
  email: string;
};

export type ICreateUserResponse = UserDTO;

export class CreateUserController extends Controller<
  ICreateUserRequest,
  ICreateUserResponse
> {
  private usecase: CreateUserUsecase;

  constructor(
    userRepository: IUserRepository,
    validation: IValidation<ICreateUserRequest, ICreateUserResponse>,
    logger: ILoggerProvider,
  ) {
    super(validation, logger);
    this.usecase = new CreateUserUsecase(userRepository, logger);
  }

  async perform(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    const userCreated = await this.usecase.perform({
      name: request.name,
      email: request.email,
    });

    const userPresenter = UserPresenter.format(userCreated);

    return userPresenter;
  }
}
