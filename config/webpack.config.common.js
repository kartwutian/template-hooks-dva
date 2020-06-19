const path = require('path');
const Happypack = require('happypack');
const { PATHS, publicPath } = require('./config');

module.exports = function () {
  return {
    entry: './src/index.js',
    output: {
      filename: '[name].[hash:5].js',
      path: PATHS.dist,
      publicPath,
    },
    module: {
      noParse:
        '/react|react-dom|mobx|mobx-react|axios|react-css-modules|react-router-dom/', // 不去解析三方库
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: PATHS.src,
          use: 'happypack/loader?id=js',
        },
        // {
        //   test: /\.json$/,
        //   use: [
        //     {
        //       loader: 'json-loader',
        //     },
        //   ],
        // },
        {
          test: /\.(png|gif|jpg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024,
                name: path.normalize('assets/[name].[ext]'),
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024,
                name: path.normalize('assets/[name].[ext]'),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Happypack({
        id: 'js',
        threads: 4,
        use: ['babel-loader'],
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(PATHS.src),
        assets: path.resolve(PATHS.src, 'assets'),
        layouts: path.resolve(PATHS.src, 'layouts'),
        components: path.resolve(PATHS.src, 'components'),
        pages: path.resolve(PATHS.src, 'pages'),
        models: path.resolve(PATHS.src, 'models'),
        utils: path.resolve(PATHS.src, 'utils'),
      },
    },
  };
};
