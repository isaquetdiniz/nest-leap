class ConfirmForgotPasswordCloudServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfirmForgotPasswordCloudServiceError';
  }
}

export { ConfirmForgotPasswordCloudServiceError };
