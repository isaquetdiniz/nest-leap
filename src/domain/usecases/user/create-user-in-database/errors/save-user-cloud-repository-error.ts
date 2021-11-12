class SaveUserCloudRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SaveUserCloudRepositoryError';
  }
}

export { SaveUserCloudRepositoryError };
