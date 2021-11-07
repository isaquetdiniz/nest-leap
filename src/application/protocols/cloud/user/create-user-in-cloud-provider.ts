export interface CreateUserInCloudProvider {
  createUser(
    userParams: CreateUserInCloudProvider.Params
  ): Promise<CreateUserInCloudProvider.Result>;
}

export namespace CreateUserInCloudProvider {
  export type Params = {
    email: string;
  };
  export type Result = void;
}
