//import { Email } from '@/notifications/domain';

export interface IEmailService {
  send(email: any, data?: unknown): Promise<void>;
}
