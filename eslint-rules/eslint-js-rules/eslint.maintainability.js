export const eslintMaintainability = {
  /**
   * @description Disallow variable assignments when the value is not used
   * @see https://eslint.org/docs/rules/no-useless-assignment
   */
  'no-useless-assignment': 'error',

  /**
   * @description Enforce a maximum number of classes per file
   * @see https://eslint.org/docs/rules/max-classes-per-file
   */
  'max-classes-per-file': 'error',

  /**
   * @description Require grouped accessor pairs in object literals and classes
   * @see https://eslint.org/docs/rules/grouped-accessor-pairs
   */
  'grouped-accessor-pairs': 'error',

  /**
   * @description Enforce a maximum depth that callbacks can be nested
   * @see https://eslint.org/docs/rules/max-nested-callbacks
   */
  'max-nested-callbacks': ['error', 3],

  /**
   * @description Enforce a maximum number of parameters in function definitions
   * @see https://eslint.org/docs/rules/max-params
   */
  'max-params': ['error', 3],

  /**
   * @description Disallow reassigning function parameters
   * @see https://eslint.org/docs/rules/no-param-reassign
   */
  'no-param-reassign': 'error',

  /**
   * @description Disallow redundant return statements
   * @see https://eslint.org/docs/rules/no-useless-return
   */
  'no-useless-return': 'error',

  /**
   * @description Enforce a maximum number of lines of code in a function
   * @see https://eslint.org/docs/rules/max-lines-per-function
   */
  'max-lines-per-function': [
    'error',
    {
      max: 40,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    },
  ],

  /**
   * @description Disallow duplicate module imports
   * @see https://eslint.org/docs/rules/no-duplicate-imports
   */
  'no-duplicate-imports': 'error',

  /**
   * @description Disallow renaming import, export, and destructured assignments to the same name
   * @see https://eslint.org/docs/rules/no-useless-rename
   */
  'no-useless-rename': 'error',

  /**
   * @description Enforce a maximum depth that blocks can be nested
   * @see https://eslint.org/docs/rules/max-depth
   */
  'max-depth': ['error', { max: 3 }],

  /**
   * @description Enforce a maximum cyclomatic complexity allowed in a program
   * @see https://eslint.org/docs/rules/complexity
   */
  complexity: ['error', 5],

  /**
   * @description Disallow variable declarations from shadowing variables declared in the outer scope
   * @see https://eslint.org/docs/rules/no-shadow
   */
  'no-shadow': 'error',
};
