const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common')();
const { PATHS, DLL_ENTRY_DEV, webpackConfig } = require('./config');

const publicPath = '/'; // 开发时统一publicPath为 '/'
const htmlWebpackPluginOptionsExtend = webpackConfig
  ? webpackConfig.htmlWebpackPlugin || {}
  : {};

// 设置环境变量
process.env.NODE_ENV = 'development';

const DllReferencePlugins = Object.keys(DLL_ENTRY_DEV).map((name) => {
  return new webpack.DllReferencePlugin({
    //引用动态链接库
    manifest: path.resolve(PATHS.dll, `manifest.${name}.json`),
  });
});

module.exports = function () {
  return merge(commonConfig, {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
      filename: '[name].[hash:5].js',
      path: PATHS.distDev,
      publicPath,
    },
    devServer: {
      contentBase: [PATHS.public, PATHS.dll],
      historyApiFallback: true,
      compress: true,
      hot: true,
      inline: true,
      disableHostCheck: true,
      publicPath,
      host: '0.0.0.0',
      proxy: webpackConfig && webpackConfig.proxy ? webpackConfig.proxy : {},
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   include: PATHS.src,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        // },
        {
          // 使用MiniCssExtractPlugin样式无法热更新，所以开发用style-loader，注意样式打包逻辑一致
          test: /\.less$/,
          include: [PATHS.global_styles, PATHS.node_modules], // 全局样式
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.css$/, // css 没有模块化处理
          include: [PATHS.global_styles, PATHS.node_modules],
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /(\.css$)|(\.less$)/, // less 模块化处理
          exclude: path.resolve(PATHS.src, 'assets/styles'),
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                  mode: 'local',
                  exportGlobals: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer('last 2 version')],
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ErrorOverlayPlugin(),
      new HtmlWebpackPlugin({
        title: '万博后台管理模板',
        template: 'src/assets/template/index.html',
        filename: 'index.html',
        publicPath,
        dll: Object.keys(DLL_ENTRY_DEV).map((name) => {
          return `${publicPath}__dll__${name}.js`;
        }),
        ...htmlWebpackPluginOptionsExtend,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // 页面里直接用process.env.NODE_ENV，注意不是挂在window对象上的
        __PUBLIC_PATH__: JSON.stringify(publicPath), // publicPath 注入
      }),
      ...DllReferencePlugins,
    ],
    devtool: 'cheap-module-source-map',
  });
};
