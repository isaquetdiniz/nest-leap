import { AuthUserDTO } from '@/domains/auth';

export interface IGetAuthUserByTokenInCloudGateway {
  get(
    token: IGetAuthUserByTokenInCloudGateway.Params
  ): Promise<IGetAuthUserByTokenInCloudGateway.Result>;
}

export namespace IGetAuthUserByTokenInCloudGateway {
  export type Params = string;

  export type Result = AuthUserDTO;
}
