const ERROR = 'error'
const OFF = 'off'

module.exports = {
  extends: [
    'preact',
    'prettier',
    'plugin:import/recommended',
    // the following lines do the trick
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'prettier', 'unused-imports'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.app.json',
      },
    },
  },
  rules: {
    'prettier/prettier': ERROR,
    'jest/no-deprecated-functions': OFF,
    'unused-imports/no-unused-imports': ERROR,
    'no-unused-vars': OFF,
    'import/no-unresolved': [
      ERROR,
      {
        ignore: ['react'],
      },
    ],
    'import/order': [
      ERROR,
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'internal',
          'object',
          'unknown',
          'type',
        ],
      },
    ],
    'no-duplicate-imports': OFF,
    'padding-line-between-statements': [
      ERROR,
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: ['singleline-const', 'singleline-let'],
        next: ['singleline-const', 'singleline-let'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let'],
        next: ['multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: ['cjs-import'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['cjs-import'],
        next: ['cjs-import'],
      },
    ],
  },
}
