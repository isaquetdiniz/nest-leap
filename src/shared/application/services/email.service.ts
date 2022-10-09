import { Email } from '@/apps/notifications/domain';

export interface IEmailService {
  send(email: Email, data?: unknown): Promise<void>;
}
