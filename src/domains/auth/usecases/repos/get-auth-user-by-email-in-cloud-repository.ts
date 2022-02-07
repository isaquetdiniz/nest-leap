export interface IGetAuthUserByEmailInCloudRepository {
  get(
    email: IGetAuthUserByEmailInCloudRepository.Params
  ): Promise<IGetAuthUserByEmailInCloudRepository.Result>;
}

export namespace IGetAuthUserByEmailInCloudRepository {
  export type Params = string;

  export type Result = { email: string; status: string } | null;
}
