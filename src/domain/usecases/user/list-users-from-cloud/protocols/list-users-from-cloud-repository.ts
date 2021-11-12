export interface ListUsersFromCloudRepository {
  list(
    usersFilters: ListUsersFromCloudRepository.Params
  ): Promise<ListUsersFromCloudRepository.Result>;
}

export namespace ListUsersFromCloudRepository {
  export type Params = { email: string };
  export type Result = { usersFromCloud: { email: string }[] };
}
