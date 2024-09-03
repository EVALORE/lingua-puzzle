export const eslintSecurity = {
  /**
   * @description Disallow the use of alert, confirm, and prompt
   * @see https://eslint.org/docs/rules/no-alert
   */
  'no-alert': 'error',

  /**
   * @description Disallow new operators with the Function object
   * @see https://eslint.org/docs/rules/no-new-func
   */
  'no-new-func': 'error',

  /**
   * @description Disallow the use of eval()
   * @see https://eslint.org/docs/rules/no-eval
   */
  'no-eval': 'error',

  /**
   * @description Disallow the use of eval()-like methods
   * @see https://eslint.org/docs/rules/no-implied-eval
   */
  'no-implied-eval': 'error',

  /**
   * @description Disallow javascript: urls
   * @see https://eslint.org/docs/rules/no-script-url
   */
  'no-script-url': 'error',
};
