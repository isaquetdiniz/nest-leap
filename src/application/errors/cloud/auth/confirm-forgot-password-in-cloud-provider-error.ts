class ConfirmForgotPasswordInCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfirmForgotPasswordInCloudProviderError';
  }
}

export { ConfirmForgotPasswordInCloudProviderError };
