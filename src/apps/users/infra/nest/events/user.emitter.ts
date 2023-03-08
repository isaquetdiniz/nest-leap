import { IUserEventEmitter } from '@/apps/users/application';
import { User } from '@/apps/users/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from './constants';

export class UserEventEmitter implements IUserEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  created(user: User): void {
    this.eventEmitter.emit(EVENTS.USER.CREATED, user);
  }

  confirmed(user: User): void {
    this.eventEmitter.emit(EVENTS.USER.CONFIRMED, user);
  }
}
