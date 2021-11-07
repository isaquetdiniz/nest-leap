class LoadUserByTokenCloudServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoadUserByTokenCloudServiceError';
  }
}

export { LoadUserByTokenCloudServiceError };
