const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: './react-app/user/index.js',
  output: {
    path: path.resolve(__dirname, '..', '..', 'build'),
    filename: 'user.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  }
};
