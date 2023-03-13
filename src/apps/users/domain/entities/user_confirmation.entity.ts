import { Domain, DomainEntity } from '@/core/domain';
import { User } from '@/users/domain';

export enum UserConfirmationState {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
  EXPIRED = 'EXPIRED',
}

export interface UserConfirmation extends Domain {
  state: UserConfirmationState;
  code: string;
  user: User;
  confirmedAt?: Date;
  expiredAt?: Date;
}

export class UserConfirmationEntity
  extends DomainEntity
  implements UserConfirmation
{
  state: UserConfirmationState;
  code: string;
  user: User;
  confirmedAt?: Date;
  expiredAt?: Date;

  constructor(props: Partial<UserConfirmation>) {
    super(props);

    this.state = props.state;
    this.code = props.code;
    this.user = props.user;
    this.confirmedAt = props.confirmedAt;
    this.expiredAt = props.expiredAt;
  }
}
