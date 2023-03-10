import {
  CreateEmailController,
  CreateEmailRequest,
  TCreateEmailRequest,
} from '@/apps/notifications/interface';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from './constants';

export type TCreateEmailEvent = TCreateEmailRequest;

export class EmailObserver {
  constructor() {}

  @OnEvent(EVENTS.EMAIL.CREATE)
  async handleCreateEmail(event: TCreateEmailEvent) {
    const request = new CreateEmailRequest({
      from: event.from,
      to: event.to,
      tag: event.tag,
      userId: event.userId,
      data: event.data,
    });

    //const controller = new CreateEmailController();

    //await controller.execute(request);
  }
}
