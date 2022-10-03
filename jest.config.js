// @ts-check

module.exports = {
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['/.build/', '/node_modules/'],
  testMatch: ['**/?(*.)+(test).ts'],
  moduleFileExtensions: ['ts', 'json', 'js'],
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['text', 'cobertura'],
  // Automatically restore mock state between every test
  restoreMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
