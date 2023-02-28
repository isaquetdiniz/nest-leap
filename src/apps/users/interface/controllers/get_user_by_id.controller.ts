import { GetUserByIdUsecase, IUserRepository } from '@/users/application';
import { UserPresenter, UserDTO } from '@/users/interface';
import { ILoggerProvider } from '@/core/application';
import { Controller, IValidation } from '@/core/interface';

export type IGetUserByIdRequest = {
  id: string;
};

export type IGetUserByIdResponse = UserDTO | null;

export class GetUserByIdController extends Controller<
  IGetUserByIdRequest,
  IGetUserByIdResponse
> {
  private usecase: GetUserByIdUsecase;

  constructor(
    userRepository: IUserRepository,
    validation: IValidation,
    logger: ILoggerProvider,
  ) {
    super(validation, logger);
    this.usecase = new GetUserByIdUsecase(userRepository, logger);
  }

  async perform(request: IGetUserByIdRequest): Promise<IGetUserByIdResponse> {
    const user = await this.usecase.perform(request.id);

    const userPresenter = user && UserPresenter.format(user);

    return userPresenter;
  }
}
