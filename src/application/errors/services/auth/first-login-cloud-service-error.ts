class FirstLoginCloudServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirstLoginCloudServiceError';
  }
}

export { FirstLoginCloudServiceError };
