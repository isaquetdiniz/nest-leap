module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testRegex: '.*\\.spec\\.ts',
  setupFiles: ['<rootDir>/config/test/setup_files.ts'],
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/core/(.*)': '<rootDir>/src/core/$1',
    '^@/libs/(.*)': '<rootDir>/src/libs/$1',
    '^@/api-users/(.*)': '<rootDir>/src/apps/api-users/$1',
    '^@/users/(.*)': '<rootDir>/src/apps/users/$1',
    '^@/notifications/(.*)': '<rootDir>/src/apps/notifications/$1',
  },
};
