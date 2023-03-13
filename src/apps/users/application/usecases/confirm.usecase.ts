import { User, UserState } from '@/users/domain';
import {
  IUserEventEmitter,
  IUserRepository,
  UserInvalidStateException,
  UserNotFoundException,
} from '@/users/application';
import { IUsecase } from '@/core/application';

export class ConfirmUserUsecase implements IUsecase<User, User> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventEmitter: IUserEventEmitter,
  ) {}

  async perform(user: User): Promise<User> {
    const { id, email } = user;

    const userFound = await this.userRepository.getByIdAndEmail(id, email);

    if (!userFound) {
      throw new UserNotFoundException({ id, email });
    }

    if (userFound.state !== UserState.PENDING_CONFIRMATION) {
      throw new UserInvalidStateException({ id, email });
    }

    userFound.state = UserState.CONFIRMED;

    const userConfirmed = await this.userRepository.update(userFound);

    this.eventEmitter.confirmed(userConfirmed);

    return userConfirmed;
  }
}
