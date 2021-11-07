class LoginCloudServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginCloudServiceError';
  }
}

export { LoginCloudServiceError };
