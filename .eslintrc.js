// Pass webpack `reslove.aliases` & `reslove.extensions`
// to prevent `import/resolver` errors.
const resolve = require('./gulpfile.js/config').webpack.resolve || {};

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['prettier', 'standard'],
  extends: ['standard', 'prettier', 'prettier/standard'],
  rules: {
    'prettier/prettier': 1,
    'no-unused-vars': 1,
  },
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve,
        },
      },
    },
  },
};
