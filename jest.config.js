module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'], 
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json']
};
