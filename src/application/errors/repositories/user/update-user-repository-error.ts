class UpdateUserInDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateUserInDatabaseRepositoryError';
  }
}

export { UpdateUserInDatabaseRepositoryError };
