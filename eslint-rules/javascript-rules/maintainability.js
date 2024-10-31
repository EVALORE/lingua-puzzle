export default {
  'no-useless-assignment': 'error',
  'max-classes-per-file': 'error',
  'grouped-accessor-pairs': 'error',
  'max-nested-callbacks': ['error', 3],
  'max-params': ['error', 3],
  'no-param-reassign': 'error',
  'no-useless-return': 'error',
  'max-lines-per-function': [
    'error',
    {
      max: 40,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    },
  ],
  'no-duplicate-imports': 'error',
  'no-useless-rename': 'error',
  'max-depth': ['error', { max: 3 }],
  complexity: ['error', 5],
  'no-shadow': 'error',
};
