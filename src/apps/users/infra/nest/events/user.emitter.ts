import { IUserEventEmitter, TUserEvent } from '@/apps/users/application';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from './constants';

@Injectable()
export class UserEventEmitter implements IUserEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  created(user: TUserEvent): void {
    this.eventEmitter.emit(EVENTS.USER.CREATED, user);
  }

  confirmed(user: TUserEvent): void {
    this.eventEmitter.emit(EVENTS.USER.CONFIRMED, user);
  }
}
