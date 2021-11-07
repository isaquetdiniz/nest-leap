export interface DeleteUserFromCloudProvider {
  deleteUser(
    userParams: DeleteUserFromCloudProvider.Params
  ): Promise<DeleteUserFromCloudProvider.Result>;
}

export namespace DeleteUserFromCloudProvider {
  export type Params = {
    email: string;
  };

  export type Result = void;
}
