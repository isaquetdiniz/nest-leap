class ListUsersInDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ListUserInDatabaseRepositoryError';
  }
}

export { ListUsersInDatabaseRepositoryError };
