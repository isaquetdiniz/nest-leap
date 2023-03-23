import {
  IUserForgotPasswordEventEmitter,
  IUserForgotPasswordRepository,
  IUserRepository,
  UserForgotPasswordCodeWrongException,
  UserForgotPasswordInvalidStateException,
  UserForgotPasswordNotFoundException,
  UserNotFoundException,
} from '@/users/application';
import { IUsecase } from '@/core/application';
import {
  User,
  UserForgotPassword,
  UserForgotPasswordState,
} from '@/users/domain';

export type TUpdateUserForgotPassword = {
  id: UserForgotPassword['id'];
  code: UserForgotPassword['code'];
  newPassword: User['password'];
};

export class UpdateUserForgotPasswordUsecase
  implements IUsecase<TUpdateUserForgotPassword, UserForgotPassword>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userForgotPasswordRepository: IUserForgotPasswordRepository,
    private readonly eventEmitter: IUserForgotPasswordEventEmitter,
  ) {}

  async perform(data: TUpdateUserForgotPassword): Promise<UserForgotPassword> {
    const { id, code, newPassword } = data;

    const userForgotPasswordFound =
      await this.userForgotPasswordRepository.getById(id);

    if (!userForgotPasswordFound) {
      throw new UserForgotPasswordNotFoundException({ id });
    }

    if (userForgotPasswordFound.state !== UserForgotPasswordState.PENDING) {
      throw new UserForgotPasswordInvalidStateException({
        id,
        state: userForgotPasswordFound.state,
      });
    }

    if (code !== userForgotPasswordFound.code) {
      throw new UserForgotPasswordCodeWrongException({});
    }

    const userFound = await this.userRepository.getById(
      userForgotPasswordFound.user.id,
    );

    if (!userFound) {
      throw new UserNotFoundException({ id: userForgotPasswordFound.user.id });
    }

    userFound.password = newPassword;
    await this.userRepository.update(userFound);

    userForgotPasswordFound.state = UserForgotPasswordState.CONFIRMED;
    userForgotPasswordFound.confirmedAt = new Date();

    const userForgotPasswordUpdated =
      await this.userForgotPasswordRepository.update(userForgotPasswordFound);

    this.eventEmitter.confirmed(userForgotPasswordUpdated);

    return userForgotPasswordUpdated;
  }
}
