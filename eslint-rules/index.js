import javascriptRules from './javascript-rules';
import typescriptRules from './typescript-rules';

export default [
  {
    ...javascriptRules,
    ...typescriptRules,
  },
];
