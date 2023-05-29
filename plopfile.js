const {
  commandWithInputName,
  commandWithInputEntity,
  commandWithInputFeature,
  commandWithMethodInput,
} = require('./plopfiles/commands/default-commands.ts');

const { createCompleteCrudAction } = require('./plopfiles/plopfile-actions/create-complete-crud-action.ts');
const { createTestsForCompleteCrudAction } = require('./plopfiles/plopfile-actions/create-tests-for-complete-crud-action.ts');
// const { createSeparatedFeatureAction } = require('./plopfiles/plopfile-actions/create-separated-feature-action.ts');

module.exports = function (plop) {
  plop.setGenerator('[NEW DOMAIN]: Create new Domain', {
    description: 'Generate a new domain',
    prompts: [commandWithInputName],
    actions: createCompleteCrudAction,
  });
  plop.setGenerator('[DOMAIN TESTS]: Create tests for a domain', {
    description: 'Generate all tests for a provided domain',
    prompts: [commandWithInputName],
    actions: createTestsForCompleteCrudAction,
  });
  // plop.setGenerator('[NEW FEATURE]: Create a new feature for a valid domain', {
  //   description: 'Generate new feature files',
  //   prompts: [commandWithInputEntity, commandWithInputFeature, commandWithMethodInput],
  //   actions: createSeparatedFeatureAction,
  // });
};
