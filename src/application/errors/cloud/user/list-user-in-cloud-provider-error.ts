class ListUserInCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ListUserInCloudProviderError';
  }
}

export { ListUserInCloudProviderError };
