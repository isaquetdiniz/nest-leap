import {
  GetUserByIdUsecase,
  IUserCloudService,
  IUserRepository,
} from '@/users/application';
import { UserPresenter, UserDTO } from '@/users/interface';
import { ILoggerProvider } from '@/shared/application';
import { IController, IValidation } from '@/shared/interface';

export type IGetUserByIdRequest = {
  id: string;
};

export type IGetUserByIdResponse = UserDTO | null;

export class GetUserByIdController
  implements IController<IGetUserByIdRequest, IGetUserByIdResponse>
{
  private usecase: GetUserByIdUsecase;

  constructor(
    userRepository: IUserRepository,
    userCloudService: IUserCloudService,
    private readonly validation: IValidation,
    private readonly logger: ILoggerProvider,
  ) {
    this.usecase = new GetUserByIdUsecase(
      userRepository,
      userCloudService,
      logger,
    );

    this.logger = logger.child({ controller: 'get-user-by-id' });
  }

  async execute(request: IGetUserByIdRequest): Promise<IGetUserByIdResponse> {
    this.logger.debug({ message: 'Request Received', data: request });

    this.validation.request(request);

    this.logger.debug({ message: 'Params Validated' });

    const user = await this.usecase.perform(request.id);

    this.logger.debug({ message: 'User found', data: user });

    if (!user) {
      return null;
    }

    const userPresenter = UserPresenter.format(user);

    this.validation.response(userPresenter);

    return userPresenter;
  }
}
