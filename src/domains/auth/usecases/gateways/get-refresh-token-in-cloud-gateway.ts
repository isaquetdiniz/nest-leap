import { Access } from '@/domains/auth';

export interface IGetRefreshTokenInCloudGateway {
  get(
    refreshToken: IGetRefreshTokenInCloudGateway.Params
  ): Promise<IGetRefreshTokenInCloudGateway.Result>;
}

export namespace IGetRefreshTokenInCloudGateway {
  export type Params = string;

  export type Result = Access;
}
