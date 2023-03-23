import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NullPointerException } from '@/core/application';

export const NotificationParam = createParamDecorator(
  (Notification: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { eventEmitter } = request;

    if (!eventEmitter) {
      throw new NullPointerException('Event emitter not found');
    }

    return new EventEmitter(eventEmitter);
  },
);
