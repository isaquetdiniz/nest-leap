export interface ISaveUserInCloudRepository {
  save(
    userParams: ISaveUserInCloudRepository.Params
  ): Promise<ISaveUserInCloudRepository.Result>;
}

export namespace ISaveUserInCloudRepository {
  export type Params = {
    email: string;
  };
  export type Result = void;
}
