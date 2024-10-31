import bestPractices from './typescript-rules/best-practices';
import codeStyle from './typescript-rules/code-style';
import maintainability from './typescript-rules/maintainability';
import performance from './typescript-rules/performance';
import security from './typescript-rules/security';

export default [...bestPractices, ...codeStyle, ...maintainability, ...performance, ...security];
