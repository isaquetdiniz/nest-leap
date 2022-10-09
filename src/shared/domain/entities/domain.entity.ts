import { randomUUID as uuid } from 'node:crypto';

export interface Domain {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class DomainEntity implements Domain {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Domain) {
    this.id = props.id ?? uuid();
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
