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
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint'],
};
