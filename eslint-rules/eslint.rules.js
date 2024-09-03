import { eslintJsRules } from './eslint-js-rules/eslint.js-rules.js';
import { eslintTsRules } from './eslint-ts-rules/eslint.ts-rules.js';

export const eslintRules = {
  ...eslintJsRules,
  ...eslintTsRules,
};
