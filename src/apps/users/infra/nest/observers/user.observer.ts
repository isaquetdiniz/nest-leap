import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS, NotificationService } from '@/users/infra';
import { TUserEvent } from '@/apps/users/application';
import { HandleUserCreatedController } from '@/apps/users/interface';
import { Injectable } from '@nestjs/common';
import { JwtTokenService } from '@/libs/nest';

@Injectable()
export class UserObserver {
  handleUserCreatedController: HandleUserCreatedController;

  constructor(
    tokenProvider: JwtTokenService,
    notificationService: NotificationService,
  ) {
    this.handleUserCreatedController = new HandleUserCreatedController(
      tokenProvider,
      notificationService,
    );
  }

  @OnEvent(EVENTS.USER.CREATED)
  async handleUserCreated(event: TUserEvent) {
    await this.handleUserCreatedController.execute({
      id: event.id,
      name: event.name,
      email: event.email,
    });
  }
}
