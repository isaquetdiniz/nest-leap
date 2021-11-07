export interface ListUserInCloudProvider {
  listUser(
    userParams: ListUserInCloudProvider.Params
  ): Promise<ListUserInCloudProvider.Result>;
}

export namespace ListUserInCloudProvider {
  export type Params = {
    email: string;
  };
  export type Result = {
    username: string;
    email: string;
    enabled: boolean;
    status: string;
  };
}
