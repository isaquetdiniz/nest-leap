class DeleteUserInDatabaseServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeleteUserInDatabaseServiceError';
  }
}

export { DeleteUserInDatabaseServiceError };
