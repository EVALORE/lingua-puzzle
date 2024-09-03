export const eslintCodeStyle = {
  /**
   * @description Require constructor names to begin with a capital letter
   * > **DISABLED**: due to its inability to work with Angular Decorators.
   * @see https://eslint.org/docs/rules/new-cap
   */
  'new-cap': 'off',

  /**
   * @description Require braces around arrow function bodies
   * @see https://eslint.org/docs/rules/arrow-body-style
   */
  'arrow-body-style': ['error', 'as-needed'],

  /**
   * @description Require function names to match the name of the variable or property to which they are assigned
   * @see https://eslint.org/docs/rules/func-name-matching
   */
  'func-name-matching': ['error', 'always'],

  /**
   * @description Require or disallow named function expressions
   * @see https://eslint.org/docs/rules/func-names
   */
  'func-names': ['error', 'as-needed'],

  /**
   * @description Enforce the consistent use of either function declarations or expressions assigned to variables
   * @see https://eslint.org/docs/rules/func-style
   */
  'func-style': ['error', 'declaration', { allowArrowFunctions: true }],

  /**
   * @description Disallow specified identifiers
   * @see https://eslint.org/docs/rules/id-denylist
   */
  'id-denylist': [
    'error',
    'listener',
    'error',
    'callback',
    'cb',
    'next',
    'data',
    'a',
    'b',
    'x',
    'e',
    'err',
  ],

  /**
   * @description Enforce minimum and maximum identifier lengths
   * @see https://eslint.org/docs/rules/id-length
   */
  'id-length': ['error', { min: 3, max: 30, properties: 'never', exceptions: ['_', '__'] }],

  /**
   * @description Enforce camelcase naming convention
   * @see https://eslint.org/docs/rules/camelcase
   */
  camelcase: 'error',

  /**
   * @description Disallow dangling underscores in identifiers
   * @see https://eslint.org/docs/rules/no-underscore-dangle
   */
  'no-underscore-dangle': [
    'error',
    {
      allow: [],
      allowAfterThis: false,
      allowAfterSuper: false,
      enforceInMethodNames: true,
    },
  ],

  /**
   * @description Require or disallow logical assignment operator shorthand
   * @see https://eslint.org/docs/rules/logical-assignment-operators
   */
  'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],

  /**
   * @description Enforce consistent brace style for all control statements
   * @see https://eslint.org/docs/rules/curly
   */
  curly: ['error'],

  /**
   * @description Enforce or disallow capitalization of the first letter of a comment
   * @see https://eslint.org/docs/rules/capitalized-comments
   */
  'capitalized-comments': ['warn', 'always'],

  /**
   * @description Disallow inline comments after code
   * @see https://eslint.org/docs/rules/no-inline-comments
   */
  'no-inline-comments': 'error',

  /**
   * @description Require or disallow method and property shorthand syntax for object literals
   * @see https://eslint.org/docs/rules/object-shorthand
   */
  'object-shorthand': 'error',

  /**
   * @description Enforce variables to be declared either together or separately in functions
   * @see https://eslint.org/docs/rules/one-var
   */
  'one-var': ['error', 'never'],

  /**
   * @description Require or disallow assignment operator shorthand where possible
   * @see https://eslint.org/docs/rules/operator-assignment
   */
  'operator-assignment': ['error', 'always'],
};
