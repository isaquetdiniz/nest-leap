import {
  IUserForgotPasswordEventEmitter,
  TUserForgotPasswordEvent,
} from '@/users/application';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from './constants';

@Injectable()
export class UserForgotPasswordEventEmitter
  implements IUserForgotPasswordEventEmitter
{
  constructor(private eventEmitter: EventEmitter2) {}

  created(userForgotPassword: TUserForgotPasswordEvent): void {
    this.eventEmitter.emit(
      EVENTS.USER_FORGOT_PASSWORD.CREATED,
      userForgotPassword,
    );
  }

  confirmed(userForgotPassword: TUserForgotPasswordEvent): void {
    this.eventEmitter.emit(
      EVENTS.USER_FORGOT_PASSWORD.CONFIRMED,
      userForgotPassword,
    );
  }
}
