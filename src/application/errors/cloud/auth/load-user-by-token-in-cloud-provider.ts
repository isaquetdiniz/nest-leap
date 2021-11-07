class LoadUserByTokenInCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoadUserByTokenInCloudProviderError';
  }
}

export { LoadUserByTokenInCloudProviderError };
