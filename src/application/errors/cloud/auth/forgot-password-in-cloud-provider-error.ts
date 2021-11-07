class ForgotPasswordInCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForgotPasswordInCloudProviderError';
  }
}

export { ForgotPasswordInCloudProviderError };
