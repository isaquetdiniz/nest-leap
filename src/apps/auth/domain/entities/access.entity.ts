export interface Access {
  accessToken: string;
  refreshToken: string;
}

export class AccessEntity implements Access {
  accessToken: string;
  refreshToken: string;

  constructor(props: Access) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;

    Object.freeze(this);
  }
}
