export const eslintTsBestPractices = {
  /**
   * @description Require explicit return and argument types on exported functions' and classes' public class methods
   * @see https://typescript-eslint.io/rules/explicit-module-boundary-types/
   */
  '@typescript-eslint/explicit-module-boundary-types': 'error',

  /**
   * @description Enforce using a particular method signature syntax
   * @see https://typescript-eslint.io/rules/method-signature-style/
   */
  '@typescript-eslint/method-signature-style': 'error',

  /**
   * @description Disallow the use of variables before they are defined.
   * @see https://typescript-eslint.io/rules/no-use-before-define
   */
  '@typescript-eslint/no-use-before-define': 'error',

  /**
   * @description Require explicit accessibility modifiers on class properties and methods
   * @see https://typescript-eslint.io/rules/explicit-member-accessibility
   */
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      overrides: {
        constructors: 'no-public',
      },
    },
  ],
};
