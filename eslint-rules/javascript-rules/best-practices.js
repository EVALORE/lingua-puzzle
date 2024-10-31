export default {
  'no-inner-declarations': 'error',
  'no-undefined': 'error',
  'no-var': 'error',
  'no-void': ['error', { allowAsStatement: true }],
  'prefer-const': 'error',
  'no-console': 'warn',
  'no-constructor-return': 'error',
  'no-new': 'error',
  'array-callback-return': 'error',
  'no-extra-bind': 'error',
  'no-loop-func': 'error',
  'no-return-assign': 'error',
  'prefer-arrow-callback': 'error',
  'consistent-return': 'error',
  'no-restricted-exports': ['error', { restrictDefaultExports: { direct: true } }],
  'no-self-compare': 'error',
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'no-eq-null': 'error',
  'no-else-return': 'error',
  'no-extra-boolean-cast': ['error', { enforceForInnerExpressions: true }],
  'no-lonely-if': 'error',
  'no-negated-condition': 'error',
  'no-nested-ternary': 'error',
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'default-case': 'error',
  'default-case-last': 'error',
  'default-param-last': 'error',
  'no-extra-label': 'error',
  'guard-for-in': 'error',
  'no-unreachable-loop': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-continue': 'error',
  'block-scoped-var': 'error',
  'no-lone-blocks': 'error',
  'no-promise-executor-return': 'error',
  'require-atomic-updates': 'error',
  'no-label-var': 'error',
  'no-labels': 'error',
  'no-iterator': 'error',
  'no-proto': 'error',
  'no-restricted-globals': [
    'error',
    {
      name: 'isFinite',
      message:
        'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
    },
    {
      name: 'isNaN',
      message:
        'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
    },
  ],
  'no-restricted-properties': [
    'error',
    {
      object: 'arguments',
      property: 'callee',
      message: 'arguments.callee is deprecated',
    },
    {
      object: 'global',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'self',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'window',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'global',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'self',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'window',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      property: '__defineGetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      property: '__defineSetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (**) instead.',
    },
  ],
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    {
      selector: 'ForOfStatement',
      message:
        'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
    },
    {
      selector: 'LabeledStatement',
      message:
        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message:
        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],
  'dot-notation': 'error',
  'no-template-curly-in-string': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-div-regex': 'error',
  'no-extend-native': 'error',
  'no-implicit-coercion': ['error', { disallowTemplateShorthand: true }],
  'no-invalid-this': 'error',
  'no-multi-assign': 'error',
  'no-multi-str': 'error',
  'no-array-constructor': 'error',
  'no-new-wrappers': 'error',
  'no-object-constructor': 'error',
  'no-plusplus': 'error',
  'no-sequences': 'error',
  'no-throw-literal': 'error',
  'no-unused-expressions': 'error',
  'no-useless-call': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-concat': 'error',
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
  'prefer-exponentiation-operator': 'error',
  'prefer-numeric-literals': 'error',
  'prefer-object-spread': 'error',
  'prefer-promise-reject-errors': 'error',
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
  'prefer-template': 'error',
  'require-await': 'error',
  'vars-on-top': 'error',
  yoda: 'error',
};
