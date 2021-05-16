module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "linebreak-style": [0 ,"error", "windows"],
    'semi': 0,
    'comma-dangle': [2, 'never'],
    "import/order": ['off'],
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }]
  },
};
