const pathAliasForDomainInJestGenerator = {
  type: 'append',
  pattern: /moduleNameMapper[^}]*\',/,
  path: 'jest.config.js',
  template:
    "    '^@/{{dashCase name}}/(.*)': '<rootDir>/src/apps/{{dashCase name}}/$1',",
};

const pathAliasForDomainInTsconfigGenerator = {
  type: 'append',
  pattern: /"paths"[^}]*\],/,
  path: 'tsconfig.json',
  template: '      "@/{{dashCase name}}/*": ["src/apps/{{dashCase name}}/*"],',
};

const pathAliasForCompleteCrudGenerator = [
  pathAliasForDomainInJestGenerator,
  pathAliasForDomainInTsconfigGenerator,
];

module.exports = {
  pathAliasForCompleteCrudGenerator,
};
