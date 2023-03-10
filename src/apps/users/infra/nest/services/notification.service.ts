import { EVENTS, TCreateEmailEvent } from '@/notifications/infra';
import { Email } from '@/notifications/domain';
import {
  INotificationService,
  TSendConfirmationEmail,
} from '@/users/application';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
      'APP_CONFIRMATION_EMAIL_SENDER',
    );

    this.CONFIRMATION_EMAIL_SENDER = this.configService.get<string>(
      'APP_CONFIRMATION_EMAIL_TAG',
    );
  }

  async sendConfirmationEmail(
    to: Email['to'],
    data: TSendConfirmationEmail,
  ): Promise<void> {
    const event: TCreateEmailEvent = {
      from: this.CONFIRMATION_EMAIL_SENDER,
      to,
      tag: this.CONFIRMATION_EMAIL_TAG,
      userId: data.userId,
      data,
    };

    console.log(event);

    this.eventEmitter.emit(EVENTS.EMAIL.CREATE, event);
  }
}
