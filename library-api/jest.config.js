module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "<rootDir>/src/common/interfaces", // Ignora la carpeta de interfaces
    "<rootDir>/src/dto", // Ignora la carpeta de DTOs
    "<rootDir>/src/schemas", // Ignora la carpeta de schemas
    // Añade más patrones según sea necesario
  ],
};
