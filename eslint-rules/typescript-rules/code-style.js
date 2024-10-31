export default [
  {
    rules: {
      '@typescript-eslint/member-ordering': [
        'error',
        { default: ['field', 'constructor', 'method'] },
      ],
    },
  },
];
