// Pass webpack `reslove.aliases` & `reslove.extensions`
// to prevent `import/resolver` errors.
const resolve = require('./gulpfile.js/config').js.resolve || {};

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier', 'standard'],
  extends: ['standard', 'prettier', 'prettier/standard'],
  rules: {
    'prettier/prettier': 1,
    'no-unused-vars': 1,
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
