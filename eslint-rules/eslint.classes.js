export const classes = {
  'no-constructor-return': 'error',
  'max-classes-per-file': 'error',
  'grouped-accessor-pairs': 'error',
  'new-cap': 'error',
  'no-new': 'error',

  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      overrides: {
        constructors: 'no-public',
      },
    },
  ],
  '@typescript-eslint/member-ordering': 'error',
  '@typescript-eslint/no-useless-constructor': 'error',
};
