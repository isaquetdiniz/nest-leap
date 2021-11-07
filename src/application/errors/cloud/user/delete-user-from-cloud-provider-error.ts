class DeleteUserFromCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeleteUserFromCloudProviderError';
  }
}

export { DeleteUserFromCloudProviderError };
