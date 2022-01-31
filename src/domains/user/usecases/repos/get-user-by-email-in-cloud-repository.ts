export interface IGetUserByEmailInCloudRepository {
  getByEmail(
    email: IGetUserByEmailInCloudRepository.Params
  ): Promise<IGetUserByEmailInCloudRepository.Result>;
}

export namespace IGetUserByEmailInCloudRepository {
  export type Params = string;

  export type Result = { email: string; status: string } | null;
}
