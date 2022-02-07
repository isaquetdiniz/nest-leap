export interface AccessDTO {
  accessToken: string;
  refreshToken: string;
}

export class Access {
  accessToken: string;
  refreshToken: string;

  constructor(params: AccessDTO) {
    const { accessToken, refreshToken } = params;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    Object.freeze(this);
  }
}
