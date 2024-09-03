export const eslintBestPractices = {
  /**
   * @description Disallow variable or function declarations in nested blocks
   * @see https://eslint.org/docs/rules/no-inner-declarations
   */
  'no-inner-declarations': 'error',

  /**
   * @description Disallow the use of undefined as an identifier
   * @see https://eslint.org/docs/rules/no-undefined
   */
  'no-undefined': 'error',

  /**
   * @description Require let or const instead of var
   * @see https://eslint.org/docs/rules/no-var
   */
  'no-var': 'error',

  /**
   * @description Disallow void operators
   * @see https://eslint.org/docs/rules/no-void
   */
  'no-void': 'error',

  /**
   * @description Require const declarations for variables that are never reassigned after declared
   * @see https://eslint.org/docs/rules/prefer-const
   */
  'prefer-const': 'error',

  /**
   * @description Disallow the use of console
   * @see https://eslint.org/docs/rules/no-console
   */
  'no-console': 'warn',

  /**
   * @description Disallow returning value from constructor
   * @see https://eslint.org/docs/rules/no-constructor-return
   */
  'no-constructor-return': 'error',

  /**
   * @description Disallow new operators outside of assignments or comparisons
   * @see https://eslint.org/docs/rules/no-new
   */
  'no-new': 'error',

  /**
   * @description Enforce return statements in callbacks of array methods
   * @see https://eslint.org/docs/rules/array-callback-return
   */
  'array-callback-return': 'error',

  /**
   * @description Disallow unnecessary calls to .bind()
   * @see https://eslint.org/docs/rules/no-extra-bind
   */
  'no-extra-bind': 'error',

  /**
   * @description Disallow function declarations that contain unsafe references inside loop statements
   * @see https://eslint.org/docs/rules/no-loop-func
   */
  'no-loop-func': 'error',

  /**
   * @description Disallow assignment operators in return statements
   * @see https://eslint.org/docs/rules/no-return-assign
   */
  'no-return-assign': 'error',

  /**
   * @description Require using arrow functions for callbacks
   * @see https://eslint.org/docs/rules/prefer-arrow-callback
   */
  'prefer-arrow-callback': 'error',

  /**
   * @description Require return statements to either always or never specify values
   * @see https://eslint.org/docs/rules/consistent-return
   */
  'consistent-return': 'error',

  /**
   * @description Disallow specified names in exports
   * @see https://eslint.org/docs/rules/no-restricted-exports
   */
  'no-restricted-exports': ['error', { restrictDefaultExports: { direct: true } }],

  /**
   * @description Disallow comparisons where both sides are exactly the same
   * @see https://eslint.org/docs/rules/no-self-compare
   */
  'no-self-compare': 'error',

  /**
   * @description Require the use of === and !==
   * @see https://eslint.org/docs/rules/eqeqeq
   */
  eqeqeq: ['error', 'always', { null: 'ignore' }],

  /**
   * @description Disallow null comparisons without type-checking operators
   * @see https://eslint.org/docs/rules/no-eq-null
   */
  'no-eq-null': 'error',

  /**
   * @description Disallow else blocks after return statements in if statements
   * @see https://eslint.org/docs/rules/no-else-return
   */
  'no-else-return': 'error',

  /**
   * @description Disallow unnecessary boolean casts
   * @see https://eslint.org/docs/rules/no-extra-boolean-cast
   */
  'no-extra-boolean-cast': ['error', { enforceForInnerExpressions: true }],

  /**
   * @description Disallow if statements as the only statement in else blocks
   * @see https://eslint.org/docs/rules/no-lonely-if
   */
  'no-lonely-if': 'error',

  /**
   * @description Disallow negated conditions
   * @see https://eslint.org/docs/rules/no-negated-condition
   */
  'no-negated-condition': 'error',

  /**
   * @description Disallow nested ternary expressions
   * @see https://eslint.org/docs/rules/no-nested-ternary
   */
  'no-nested-ternary': 'error',

  /**
   * @description Disallow ternary operators when simpler alternatives exist
   * @see https://eslint.org/docs/rules/no-unneeded-ternary
   */
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],

  /**
   * @description Require default cases in switch statements
   * @see https://eslint.org/docs/rules/default-case
   */
  'default-case': 'error',

  /**
   * @descriptionc Enforce default clauses in switch statements to be last
   * @see https://eslint.org/docs/rules/default-case-last
   */
  'default-case-last': 'error',

  /**
   * @description Enforce default parameters to be last
   * @see https://eslint.org/docs/rules/default-param-last
   */
  'default-param-last': 'error',

  /**
   * @description Disallow unnecessary labels
   * @see https://eslint.org/docs/rules/no-extra-label
   */
  'no-extra-label': 'error',

  /**
   * @description Require for-in loops to include an if statement
   * @see https://eslint.org/docs/rules/guard-for-in
   */
  'guard-for-in': 'error',

  /**
   * @description Disallow loops with a body that allows only one iteration
   * @see https://eslint.org/docs/rules/no-unreachable-loop
   */
  'no-unreachable-loop': 'error',

  /**
   * @description Disallow unmodified loop conditions
   * @see https://eslint.org/docs/rules/no-unmodified-loop-condition
   */
  'no-unmodified-loop-condition': 'error',

  /**
   * @description Disallow continue statements
   * @see https://eslint.org/docs/rules/no-continue
   */
  'no-continue': 'error',

  /**
   * @description Enforce the use of variables within the scope they are defined
   * @see https://eslint.org/docs/rules/block-scoped-var
   */
  'block-scoped-var': 'error',

  /**
   * @description Disallow unnecessary nested blocks
   * @see https://eslint.org/docs/rules/no-lone-blocks
   */
  'no-lone-blocks': 'error',

  /**
   * @description Disallow returning values from Promise executor functions
   * @see https://eslint.org/docs/rules/no-promise-executor-return
   */
  'no-promise-executor-return': 'error',

  /**
   * @description Disallow assignments that can lead to race conditions due to usage of await or yield
   * @see https://eslint.org/docs/rules/require-atomic-updates
   */
  'require-atomic-updates': 'error',

  /**
   * @description Disallow labels that share a name with a variable
   * @see https://eslint.org/docs/rules/no-label-var
   */
  'no-label-var': 'error',

  /**
   * @description Disallow labeled statements
   * @see https://eslint.org/docs/rules/no-labels
   */
  'no-labels': 'error',

  /**
   * @description Disallow the use of the __iterator__ property
   * @see https://eslint.org/docs/rules/no-iterator
   */
  'no-iterator': 'error',

  /**
   * @description Disallow the use of the __proto__ property
   * @see https://eslint.org/docs/rules/no-proto
   */
  'no-proto': 'error',

  /**
   * @description Disallow specified global variables
   * @see https://eslint.org/docs/rules/no-restricted-globals
   */
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

  /**
   * @description Disallow certain properties on certain objects
   * @see https://eslint.org/docs/rules/no-restricted-properties
   */
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

  /**
   * @description Disallow specified syntax
   * @see https://eslint.org/docs/rules/no-restricted-syntax
   */
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

  /**
   * @description Enforce dot notation whenever possible
   * @see https://eslint.org/docs/rules/dot-notation
   */
  'dot-notation': 'error',

  /**
   * @description Disallow template literal placeholder syntax in regular strings
   * @see https://eslint.org/docs/rules/no-template-curly-in-string
   */
  'no-template-curly-in-string': 'error',

  /**
   * @description Disallow bitwise operators
   * @see https://eslint.org/docs/rules/no-bitwise
   */
  'no-bitwise': 'error',

  /**
   * @description Disallow the use of arguments.caller or arguments.callee
   * @see https://eslint.org/docs/rules/no-caller
   */
  'no-caller': 'error',

  /**
   * @description Disallow equal signs explicitly at the beginning of regular expressions
   * @see https://eslint.org/docs/rules/no-div-regex
   */
  'no-div-regex': 'error',

  /**
   * @description Disallow extending native types
   */
  'no-extend-native': 'error',

  /**
   * @description Disallow shorthand type conversions
   * @see https://eslint.org/docs/rules/no-implicit-coercion
   */
  'no-implicit-coercion': ['error', { disallowTemplateShorthand: true }],

  /**
   * @description Disallow use of this in contexts where the value of this is undefined or
   * @see https://eslint.org/docs/rules/no-invalid-this
   */
  'no-invalid-this': 'error',

  /**
   * @description Disallow use of chained assignment expressions
   * @see https://eslint.org/docs/rules/no-multi-assign
   */
  'no-multi-assign': 'error',

  /**
   * @description Disallow multiline strings
   * @see https://eslint.org/docs/rules/no-multi-str
   */
  'no-multi-str': 'error',

  /**
   * @description Disallow Array constructors
   * @see https://eslint.org/docs/rules/no-array-constructor
   */
  'no-array-constructor': 'error',

  /**
   * @description Disallow new operators with the String, Number, and Boolean objects
   * @see https://eslint.org/docs/rules/no-new-wrappers
   */
  'no-new-wrappers': 'error',

  /**
   * @description Disallow calls to the Object constructor without an argument
   * @see https://eslint.org/docs/rules/no-object-constructor
   */
  'no-object-constructor': 'error',

  /**
   * @description Disallow the unary operators ++ and --
   * @see https://eslint.org/docs/rules/no-plusplus
   */
  'no-plusplus': 'error',

  /**
   * @description Disallow comma operators
   * @see https://eslint.org/docs/rules/no-sequences
   */
  'no-sequences': 'error',

  /**
   * @description Disallow throwing literals as exceptions
   * @see https://eslint.org/docs/rules/no-throw-literal
   */
  'no-throw-literal': 'error',

  /**
   * @description Disallow unused expressions
   * @see https://eslint.org/docs/rules/no-unused-expressions
   */
  'no-unused-expressions': 'error',

  /**
   * @description Disallow unnecessary calls to .call() and .apply()
   * @see https://eslint.org/docs/rules/no-useless-call
   */
  'no-useless-call': 'error',

  /**
   * @description Disallow unnecessary computed property keys in objects and classes
   * @see https://eslint.org/docs/rules/no-useless-computed-key
   */
  'no-useless-computed-key': 'error',

  /**
   * @description Disallow unnecessary concatenation of literals or template literals
   * @see https://eslint.org/docs/rules/no-useless-concat
   */
  'no-useless-concat': 'error',

  /**
   * @description Require destructuring from arrays and/or objects
   * @see https://eslint.org/docs/rules/prefer-destructuring
   */
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
    {
      enforceForRenamedProperties: true,
    },
  ],

  /**
   * @description Disallow the use of Math.pow in favor of the ** operator
   * @see https://eslint.org/docs/rules/prefer-exponentiation-operator
   */
  'prefer-exponentiation-operator': 'error',

  /**
   * @description Disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals
   * @see https://eslint.org/docs/rules/prefer-numeric-literals
   */
  'prefer-numeric-literals': 'error',

  /**
   * @description Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
   * @see https://eslint.org/docs/rules/prefer-object-spread
   */
  'prefer-object-spread': 'error',

  /**
   * @description Require using Error objects as Promise rejection reasons
   * @see https://eslint.org/docs/rules/prefer-promise-reject-errors
   */
  'prefer-promise-reject-errors': 'error',

  /**
   * @description Disallow use of the RegExp constructor in favor of regular expression literals
   * @see https://eslint.org/docs/rules/prefer-regex-literals
   */
  'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

  /**
   * @description Require template literals instead of string concatenation
   * @see https://eslint.org/docs/rules/prefer-template
   */
  'prefer-template': 'error',

  /**
   * @description Disallow async functions which have no await expression
   * @see https://eslint.org/docs/rules/require-await
   */
  'require-await': 'error',

  /**
   * @description Require var declarations be placed at the top of their containing scope
   * @see https://eslint.org/docs/rules/vars-on-top
   */
  'vars-on-top': 'error',

  /**
   * @description Require or disallow "Yoda" conditions
   * @see https://eslint.org/docs/rules/yoda
   */
  yoda: 'error',
};
