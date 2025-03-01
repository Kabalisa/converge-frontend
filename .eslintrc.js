module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'import'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'function-paren-newline': 'off',
    'no-param-reassign': 0,
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-children-prop': 0,
    'no-nested-ternary': 0,
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [
          'getSnapshotBeforeUpdate',
          'render',
          'componentWillUnmount',
          'componentDidMount'
        ]
      }
    ]
  }
};
