import { eslintTsBestPractices } from './eslint.ts-best-practices.js';
import { eslintTsCodeStyle } from './eslint.ts-code-style.js';
import { eslintPerformance } from '../eslint-js-rules/eslint.performance.js';
import { eslintMaintainability } from '../eslint-js-rules/eslint.maintainability.js';
import { eslintSecurity } from '../eslint-js-rules/eslint.security.js';

export const eslintTsRules = {
  ...eslintTsBestPractices,
  ...eslintTsCodeStyle,
  ...eslintPerformance,
  ...eslintMaintainability,
  ...eslintSecurity,
};
