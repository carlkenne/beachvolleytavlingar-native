module.exports = {
  env: {
    node: true, // this is the best starting point
    browser: true, // for react web
    es6: true, // enables es6 features
  },
  parser: 'babel-eslint', // needed to make babel stuff work properly
  extends: ['airbnb', 'react-native', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/prefer-stateless-function': 1,
    'import/prefer-default-export': 0,
    'import/no-namespace': 0,
    'react/jsx-filename-extension': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 1,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 1,
    'react/require-default-props': 0,
  },
}
