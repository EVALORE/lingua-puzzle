// @ts-check
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import angular from 'angular-eslint';
import { eslintRules } from './eslint-rules/eslint.rules.js';

export default tsEslint.config(
  {
    files: ['**/*.ts'],

    extends: [
      eslint.configs.recommended,
      ...tsEslint.configs.strictTypeChecked,
      ...tsEslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],

    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...eslintRules,
      // enable 'ignoreStatic' option to validate use of Validator api
      '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: true,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: true,
          },
        },
      ],
      '@angular-eslint/prefer-standalone': ['error'],
      '@angular-eslint/prefer-on-push-component-change-detection': ['error'],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      // disabled for usage in tests
      '@typescript-eslint/unbound-method': 'off',
      // disabled for testing of private | protected methods
      'dot-notation': 'off',
      // disabled because one describe may contain a lot of test cases
      'max-lines-per-function': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-self-closing-tags': ['error'],
      '@angular-eslint/template/prefer-ngsrc': ['error'],
      '@angular-eslint/template/prefer-control-flow': ['error'],
    },
  },
);
