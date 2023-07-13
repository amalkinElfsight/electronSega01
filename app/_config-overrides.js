const { override } = require('customize-cra');

module.exports = override(
  module: {
    resolve: {
    fallback: {
      // polyfills for node.js core modules that webpack no longer includes by default
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify/')
    },
    rules: [
      {
        test: /@remix-run\/router/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
);
