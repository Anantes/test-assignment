/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "~api/(.*)$": ["<rootDir>/src/app/api/$1"],
    "~features/(.*)$": ["<rootDir>/src/app/features/$1"],
    "~shared/(.*)$": ["<rootDir>/src/app/shared/$1"]
  }
};

export default config;
