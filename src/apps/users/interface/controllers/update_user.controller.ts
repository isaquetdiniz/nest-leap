import { UserEntity } from '@/users/domain';
import { IUserRepository, UpdateUserUsecase } from '@/users/application';
import { UserDTO, UserPresenter } from '@/users/interface';
import { ILoggerProvider } from '@/shared/application';
import { IController, IValidation } from '@/shared/interface';

export interface IUpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

export type IUpdateUserResponse = UserDTO;

export class UpdateUserByIdController
  implements IController<IUpdateUserRequest, IUpdateUserResponse>
{
  private usecase: UpdateUserUsecase;

  constructor(
    userRepository: IUserRepository,
    private readonly validation: IValidation,
    private readonly logger: ILoggerProvider,
  ) {
    this.usecase = new UpdateUserUsecase(userRepository, logger);
  }

  async execute(request: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    this.logger.debug({ message: 'Request received', data: request });

    this.validation.request(request);

    this.logger.debug({ message: 'Params validated' });

    const userToUpdate = new UserEntity({
      id: request.id,
      name: request.name,
      email: request.email,
    });

    const userUpdated = await this.usecase.perform(userToUpdate);

    this.logger.debug({ message: 'User updated', data: userUpdated });

    const userPresenter = UserPresenter.format(userUpdated);

    this.validation.response(userPresenter);

    return userPresenter;
  }
}
