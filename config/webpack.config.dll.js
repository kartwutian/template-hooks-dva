const path = require('path');
const { PATHS, DLL_ENTRY } = require('./config');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: DLL_ENTRY,
  output: {
    filename: '__dll__[name].js',
    path: PATHS.dll,
    library: '__dll__[name]',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DllPlugin({
      name: '__dll__[name]',
      path: path.resolve(PATHS.dll, 'manifest.[name].json'),
    }),
  ],
};
