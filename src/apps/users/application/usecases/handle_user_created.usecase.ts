import { INotificationService, TUserEvent } from '@/users/application';
import { ITokenProvider, IUsecase, TokenType } from '@/core/application';

export class HandleUserCreatedUsecase implements IUsecase<TUserEvent, void> {
  constructor(
    private readonly tokenProvider: ITokenProvider,
    private readonly notificationService: INotificationService,
  ) {}

  async perform(event: TUserEvent): Promise<void> {
    const { id: userId, name, email } = event;

    const token = await this.tokenProvider.generate(TokenType.CONFIRM_EMAIL, {
      id: userId,
      email,
    });

    const data = {
      userId,
      name,
      token: token,
    };

    await this.notificationService.sendConfirmationEmail(email, data);
  }
}
