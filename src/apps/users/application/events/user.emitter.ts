import { User } from '@/users/domain';

export interface IUserEventEmitter {
  created(user: User): void;
  confirmed(user: User): void;
}
