// @ts-check

import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import { configs } from '@evalore/eslint-config';

const angularTsConfig = {
  files: ['**/*.ts'],
  extends: [...angular.configs.tsRecommended],
  processor: angular.processInlineTemplates,
  /** @type {import('eslint').Linter.RulesRecord} */
  rules: {
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
};

const angularTemplateConfig = {
  files: ['**/*.html'],
  extends: [
    /** @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/angular-eslint/src/configs/template-accessibility.ts */
    ...angular.configs.templateAccessibility,
    /** @see https://github.com/angular-eslint/angular-eslint/blob/main/packages/angular-eslint/src/configs/template-recommended.ts */
    ...angular.configs.templateRecommended,
  ],
  /** @type {import('eslint').Linter.RulesRecord} */
  rules: {
    '@angular-eslint/template/prefer-self-closing-tags': ['error'],
    '@angular-eslint/template/prefer-ngsrc': ['error'],
    '@angular-eslint/template/prefer-control-flow': ['error'],
  },
};

const jsConfigChanges = {
  files: ['**/*.{js,ts}'],
  /** @type {import('eslint').Linter.RulesRecord} */
  rules: {
    'init-declarations': 'off',
  },
};

/** @type {import('typescript-eslint').ConfigWithExtends} */
const tsConfigChanges = {
  files: ['**/*.{js,ts}'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
  },
};

export default tseslint.config(
  configs.js,
  jsConfigChanges,
  configs.ts,
  tsConfigChanges,
  angularTsConfig,
  angularTemplateConfig,
);
