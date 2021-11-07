class DeleteUserInDatabaseRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeleteUserInDatabaseRepositoryError';
  }
}

export { DeleteUserInDatabaseRepositoryError };
