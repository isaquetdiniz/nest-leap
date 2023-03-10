import { Email } from '@/notifications/domain';
import { User } from '@/users/domain';

export type TSendConfirmationEmail = {
  userId: User['id'];
  name: User['name'];
};

export interface INotificationService {
  sendConfirmationEmail(
    to: Email['to'],
    data: TSendConfirmationEmail,
  ): Promise<void>;
}
