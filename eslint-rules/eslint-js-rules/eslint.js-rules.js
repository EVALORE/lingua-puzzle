import { eslintBestPractices } from './eslint.best-practices.js';
import { eslintCodeStyle } from './eslint.code-style.js';
import { eslintMaintainability } from './eslint.maintainability.js';
import { eslintPerformance } from './eslint.performance.js';
import { eslintSecurity } from './eslint.security.js';

export const eslintJsRules = {
  ...eslintBestPractices,
  ...eslintCodeStyle,
  ...eslintMaintainability,
  ...eslintPerformance,
  ...eslintSecurity,
};
