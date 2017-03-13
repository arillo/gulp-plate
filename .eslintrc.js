// Pass webpack `reslove.aliases` & `reslove.extensions`
// to prevent `import/resolver` errors.
const resolve = require('./gulpfile.js/config').js.resolve || {};

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',

  rules: {
    'no-multi-spaces': [ 'error', {
      exceptions: {
        VariableDeclarator: true
      }
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never'
    }]
  },
  'settings': {
    'import/resolver': {
      webpack: {
        config: {
          resolve,
        },
      },
    },
  },
};
