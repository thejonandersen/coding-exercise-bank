/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  collectCoverage: true,
  testPathIgnorePatterns: [
    "/node_modules/*"
  ],
  roots: ["<rootDir>/src"],
};