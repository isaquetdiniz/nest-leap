import { Access } from '@/domains/auth/entities';

export interface ILoginInCloudGateway {
  login(
    loginParams: ILoginInCloudGateway.Params
  ): Promise<ILoginInCloudGateway.Result>;
}

export namespace ILoginInCloudGateway {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = Access;
}
