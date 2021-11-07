class LoadUserByTokenServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoadUserByTokenServiceError';
  }
}

export { LoadUserByTokenServiceError };
