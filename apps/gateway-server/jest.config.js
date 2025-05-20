const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../../tsconfig.base.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: [
    '<rootDir>/src',
  ],

  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: '<rootDir>/../../' }
  ),

  moduleDirectories: [
    '<rootDir>/node_modules',
    '<rootDir>/../../libs',
  ],

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  testMatch: ['**/?(*.)+(spec|test).ts'],
};
