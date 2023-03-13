import { EVENTS, TCreateEmailEvent } from '@/notifications/infra';
import { Email } from '@/notifications/domain';
import { INotificationService } from '@/users/application';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@/users/domain';

export interface NotificationServiceConfig {
  APP_CONFIRMATION_EMAIL_SENDER: string;
  APP_CONFIRMATION_EMAIL_TAG: string;
}

@Injectable()
export class NotificationService implements INotificationService {
  CONFIRMATION_EMAIL_SENDER: string;
  CONFIRMATION_EMAIL_TAG: string;

  constructor(
    private readonly configService: ConfigService<NotificationServiceConfig>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.CONFIRMATION_EMAIL_TAG = this.configService.get<string>(
      'APP_CONFIRMATION_EMAIL_TAG',
    );

    this.CONFIRMATION_EMAIL_SENDER = this.configService.get<string>(
      'APP_CONFIRMATION_EMAIL_SENDER',
    );
  }

  async sendConfirmationEmail(
    to: Email['to'],
    userId: User['id'],
    name: User['name'],
    token: string,
  ): Promise<void> {
    const event: TCreateEmailEvent = {
      from: this.CONFIRMATION_EMAIL_SENDER,
      to,
      tag: this.CONFIRMATION_EMAIL_TAG,
      userId,
      data: {
        name,
        token,
      },
    };

    this.eventEmitter.emit(EVENTS.EMAIL.CREATE, event);
  }
}
