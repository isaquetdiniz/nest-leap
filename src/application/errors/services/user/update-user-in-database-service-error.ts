class UpdateUserInDatabaseServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpdateUserInDatabaseServiceError';
  }
}

export { UpdateUserInDatabaseServiceError };
