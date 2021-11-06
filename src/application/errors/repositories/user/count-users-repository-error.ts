class CountUsersInDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CountUsersInDatabaseRepositoryError';
  }
}

export { CountUsersInDatabaseRepositoryError };
