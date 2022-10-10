import { Domain, DomainEntity } from '@/shared/domain';

export enum UserState {
  CONFIRMED = 'CONFIRMED',
  PENDING_CONFIRMATION = 'PENDING_CONFIRMATION',
}

export interface User extends Domain {
  state: UserState;
  enabled: boolean;
  name: string;
  email: string;
}

export class UserEntity extends DomainEntity implements User {
  state: UserState;
  enabled: boolean;
  name: string;
  email: string;

  constructor(props: Partial<User>) {
    super(props);

    this.state = props.state;
    this.enabled = props.enabled;
    this.name = props.name;
    this.email = props.email;

    Object.freeze(this);
  }
}
