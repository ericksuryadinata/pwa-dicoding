module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
    serviceworker: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script'
  },
  rules: {
    strict: 'off',
    semi: ['error', 'never'],
    indent: ['error', 2],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'class-methods-use-this': 'off',
    'no-param-reassign': ['error', { props: false }],
    'global-require': 'off',
    'object-curly-newline': ['error', { multiline: true }],
    'arrow-parens': ['error', 'as-needed'],
    'array-callback-return': ['error', { allowImplicit: true }]
  },
  globals: { window: true }
}
