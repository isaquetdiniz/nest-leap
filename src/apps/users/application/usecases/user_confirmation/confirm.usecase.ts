import { User, UserConfirmationState, UserState } from '@/users/domain';
import {
  IUserConfirmationRepository,
  IUserEventEmitter,
  IUserRepository,
  UserConfirmationInvalidStateException,
  UserInvalidStateException,
  UserNotFoundException,
  UserConfirmationNotFoundException,
  UserConfirmationCodeWrongException,
} from '@/users/application';
import { IUsecase } from '@/core/application';

export type TConfirmUser = { email: User['email']; code: string };

export class ConfirmUserUsecase implements IUsecase<TConfirmUser, User> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userConfirmationRepository: IUserConfirmationRepository,
    private readonly eventEmitter: IUserEventEmitter,
  ) {}

  async perform(data: TConfirmUser): Promise<User> {
    const { email, code } = data;

    const userFound = await this.userRepository.getByEmail(email);

    if (!userFound) {
      throw new UserNotFoundException({ email });
    }

    if (userFound.state !== UserState.PENDING_CONFIRMATION) {
      throw new UserInvalidStateException({ email });
    }

    const userConfirmationFound =
      await this.userConfirmationRepository.getByUserAndIsPending(userFound);

    if (!userConfirmationFound) {
      throw new UserConfirmationNotFoundException({});
    }

    if (userConfirmationFound.state !== UserConfirmationState.PENDING) {
      throw new UserConfirmationInvalidStateException({});
    }

    if (userConfirmationFound.code !== code) {
      userConfirmationFound.attempts += 1;
      await this.userConfirmationRepository.update(userConfirmationFound);

      throw new UserConfirmationCodeWrongException({ code });
    }

    userFound.state = UserState.CONFIRMED;
    userConfirmationFound.state = UserConfirmationState.CONFIRMED;
    userConfirmationFound.confirmedAt = new Date();

    const userConfirmed = await this.userRepository.update(userFound);

    await this.userConfirmationRepository.update(userConfirmationFound);

    this.eventEmitter.confirmed(userConfirmed);

    return userConfirmed;
  }
}
