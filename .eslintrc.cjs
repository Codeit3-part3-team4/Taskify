// .eslintrc.js
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  globals: {
    JSX: true,
  },
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended', 'airbnb', 'prettier', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
