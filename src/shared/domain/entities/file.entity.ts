import { Domain, DomainEntity } from '@/shared/domain';

export interface File extends Domain {
  name: string;
  type: string;
  data: Buffer;
}

export class FileEntity extends DomainEntity implements File {
  name: string;
  type: string;
  data: Buffer;

  constructor(props: File) {
    super(props);
    this.name = `${this.id}-${props.name}`;
    this.type = props.type;
    this.data = props.data;

    Object.freeze(this);
  }
}
