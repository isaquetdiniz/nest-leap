import {
  INotificationService,
  IUserConfirmationRepository,
  TUserEvent,
} from '@/users/application';
import { IUsecase } from '@/core/application';
import {
  UserConfirmationEntity,
  UserConfirmationState,
  UserEntity,
} from '@/users/domain';
import { RandomCode } from '@/core/domain';

export class HandleUserCreatedUsecase implements IUsecase<TUserEvent, void> {
  constructor(
    private readonly userConfirmationRepository: IUserConfirmationRepository,
    private readonly notificationService: INotificationService,
  ) {}

  async perform(event: TUserEvent): Promise<void> {
    const { id: userId, name, email } = event;

    const code = this.generateRandomCode();

    const userConfirmation = new UserConfirmationEntity({
      state: UserConfirmationState.PENDING,
      attempts: 0,
      code,
      email,
      user: new UserEntity({ id: userId }),
    });

    await this.userConfirmationRepository.save(userConfirmation);

    await this.notificationService.sendConfirmationEmail(
      email,
      userId,
      name,
      code,
    );
  }

  generateRandomCode(): string {
    return RandomCode.generate(5);
  }
}
