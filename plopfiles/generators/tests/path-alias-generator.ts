const pathAliasForTestsInJestGenerator = {
  type: 'append',
  pattern: /moduleNameMapper[^}]*\',/,
  path: 'jest.config.js',
  template:
    "    '^@/tests/{{dashCase name}}/(.*)': '<rootDir>/tests/{{dashCase name}}/$1',",
};

const pathAliasForTestsInTsconfigGenerator = {
  type: 'append',
  pattern: /"paths"[^}]*\],/,
  path: 'tsconfig.json',
  template:
    '      "@/tests/{{dashCase name}}/*": ["tests/{{dashCase name}}/*"],',
};

const pathAliasForCompleteCrudTestsGenerator = [
  pathAliasForTestsInJestGenerator,
  pathAliasForTestsInTsconfigGenerator,
];

module.exports = {
  pathAliasForCompleteCrudTestsGenerator,
};
