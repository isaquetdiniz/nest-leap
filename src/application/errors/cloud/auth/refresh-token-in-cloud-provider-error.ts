class RefreshTokenInCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RefreshTokenInCloudProviderError';
  }
}

export { RefreshTokenInCloudProviderError };
