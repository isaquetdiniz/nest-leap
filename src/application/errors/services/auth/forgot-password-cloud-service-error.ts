class ForgotPasswordCloudServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForgotPasswordCloudServiceError';
  }
}

export { ForgotPasswordCloudServiceError };
