export interface IDeleteUserByEmailInCloudRepository {
  delete(
    email: IDeleteUserByEmailInCloudRepository.Params
  ): Promise<IDeleteUserByEmailInCloudRepository.Result>;
}

export namespace IDeleteUserByEmailInCloudRepository {
  export type Params = string;
  export type Result = void;
}
