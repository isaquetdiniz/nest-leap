import {
  CreateUserUsecase,
  IUserCloudService,
  IUserRepository,
} from '@/users/application';
import { UserDTO, UserPresenter } from '@/users/interface';
import { ILoggerProvider } from '@/shared/application';
import { IController, IValidation } from '@/shared/interface';

export type ICreateUserRequest = {
  name: string;
  email: string;
};

export type ICreateUserResponse = UserDTO;

export class CreateUserController
  implements IController<ICreateUserRequest, ICreateUserResponse>
{
  private usecase: CreateUserUsecase;

  constructor(
    userRepository: IUserRepository,
    userCloudService: IUserCloudService,
    private readonly validation: IValidation<
      ICreateUserRequest,
      ICreateUserResponse
    >,
    private readonly logger: ILoggerProvider,
  ) {
    this.usecase = new CreateUserUsecase(
      userRepository,
      userCloudService,
      logger,
    );
  }

  async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
    this.logger.debug({ message: 'Request Received', data: request });

    const { name, email } = request;

    this.validation.request(request);

    const userCreated = await this.usecase.perform({ name, email });

    this.logger.debug({ message: 'User created', data: userCreated });

    const userPresenter = UserPresenter.format(userCreated);

    this.validation.response(userPresenter);

    return userPresenter;
  }
}
