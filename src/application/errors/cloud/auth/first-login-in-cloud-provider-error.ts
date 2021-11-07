class FirstLoginInCloudProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FirstLoginInCloudProviderError';
  }
}

export { FirstLoginInCloudProviderError };
