import { UserEntity } from '@/users/domain';
import { IUserRepository, UpdateUserUsecase } from '@/users/application';
import { UserDTO, UserPresenter } from '@/users/interface';
import { ILoggerProvider } from '@/core/application';
import { Controller, IValidation } from '@/core/interface';

export interface IUpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

export type IUpdateUserResponse = UserDTO;

export class UpdateUserByIdController extends Controller<
  IUpdateUserRequest,
  IUpdateUserResponse
> {
  private usecase: UpdateUserUsecase;

  constructor(
    userRepository: IUserRepository,
    validation: IValidation<IUpdateUserRequest, IUpdateUserResponse>,
    logger: ILoggerProvider,
  ) {
    super(validation, logger);

    this.usecase = new UpdateUserUsecase(userRepository, logger);
  }

  async perform(request: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    const userToUpdate = new UserEntity({
      id: request.id,
      name: request.name,
      email: request.email,
    });

    const userUpdated = await this.usecase.perform(userToUpdate);

    const userPresenter = UserPresenter.format(userUpdated);

    return userPresenter;
  }
}
