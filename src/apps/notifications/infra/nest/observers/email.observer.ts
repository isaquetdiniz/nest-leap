import {
  CreateEmailController,
  CreateEmailRequest,
  TCreateEmailRequest,
} from '@/apps/notifications/interface';
import { OnEvent } from '@nestjs/event-emitter';
import {
  PrismaEmailRepository,
  PrismaEmailTemplateRepository,
} from '@/notifications/infra';
import { EVENTS } from './constants';
import { Injectable } from '@nestjs/common';
import { AwsSesEmailService } from '@/libs/aws';

export type TCreateEmailEvent = TCreateEmailRequest;

@Injectable()
export class EmailObserver {
  handleCreateEmailController: CreateEmailController;

  constructor(
    emailTemplateRepository: PrismaEmailTemplateRepository,
    emailRepository: PrismaEmailRepository,
    emailService: AwsSesEmailService,
  ) {
    this.handleCreateEmailController = new CreateEmailController(
      emailTemplateRepository,
      emailRepository,
      emailService,
    );
  }

  @OnEvent(EVENTS.EMAIL.CREATE)
  async handleCreateEmail(event: TCreateEmailEvent) {
    const request = new CreateEmailRequest({
      from: event.from,
      to: event.to,
      tag: event.tag,
      userId: event.userId,
      data: event.data,
    });

    await this.handleCreateEmailController.execute(request);
  }
}
