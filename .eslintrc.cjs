module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-duplicate-imports': 'error',
    'no-const-assign': 'warn',
    'no-dupe-keys': 'warn',
    'default-case': ['warn', { commentPattern: '^no default$' }],
    'default-case-last': 'warn',
    'no-var': 'error',
    "prefer-const": "warn",
  }
}
