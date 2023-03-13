import { OnEvent } from '@nestjs/event-emitter';
import {
  EVENTS,
  NotificationService,
  PrismaUserConfirmationRepository,
} from '@/users/infra';
import { TUserEvent } from '@/apps/users/application';
import { HandleUserCreatedController } from '@/apps/users/interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserObserver {
  handleUserCreatedController: HandleUserCreatedController;

  constructor(
    userConfirmationRepository: PrismaUserConfirmationRepository,
    notificationService: NotificationService,
  ) {
    this.handleUserCreatedController = new HandleUserCreatedController(
      userConfirmationRepository,
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
