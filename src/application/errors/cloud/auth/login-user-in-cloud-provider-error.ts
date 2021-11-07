class LoginInCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginInCloudProviderError';
  }
}

export { LoginInCloudProviderError };
