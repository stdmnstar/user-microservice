// @ts-check
const tadSpecificRules = {
  // Enforce creating specific errors types
  'no-restricted-syntax': [
    'warn',
    {
      selector: "NewExpression[callee.name='Error']",
      message: 'Please consider to throw custom error/http error instead of a generic "new Error()"',
    },
  ],
  'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jest', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    // This must be always last
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': { typescript: {} },
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'variableLike', format: ['camelCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
    ],
    'prettier/prettier': 'error',
    // 'import/order': 'error' - it doesn't work well with baseUrl
    'import/no-duplicates': 'error',
    'no-template-curly-in-string': 'error',
    'prefer-template': 'error',
    'dot-notation': 'error',
    'no-console': 'warn',
    ...tadSpecificRules,
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['warn'],
      },
    },
    {
      files: ['*.test.ts', '*.mock.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unnecessary-type-assertion': ['warn'],
        '@typescript-eslint/no-empty-function': 0,
        'max-lines-per-function': 0,
        'no-restricted-syntax': 0,
      },
    },
  ],
  ignorePatterns: ['*.js', '*.d.ts'],
};
