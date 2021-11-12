class SaveUserRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SaveUserRepositoryError';
  }
}

export { SaveUserRepositoryError };
