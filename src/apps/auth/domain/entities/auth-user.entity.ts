import { Domain, DomainEntity } from '@/shared/domain';

export interface AuthUser extends Domain {
  isAdmin: boolean;
  email: string;
  name: string;
}

export class AuthUserEntity extends DomainEntity implements AuthUser {
  id: string;
  isAdmin: boolean;
  email: string;
  name: string;

  constructor(props: AuthUser) {
    super(props);

    this.isAdmin = props.isAdmin;
    this.email = props.email;
    this.name = props.name;

    Object.freeze(this);
  }
}
