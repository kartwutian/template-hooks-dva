const path = require('path');
const { webpack: webpackConfig } = require('../pages.js');

const publicPath = (webpackConfig && webpackConfig.publicPath) || '/'; // 只用在生产环境，开发环境统一'/'
const DLL_ENTRY_EXTEND = (webpackConfig && webpackConfig.dll) || {}; // 用来扩展dll 打包的文件

module.exports = {
  publicPath,
  PATHS: {
    src: path.resolve(__dirname, '../src'),
    public: path.resolve(__dirname, '../public'),
    dist: path.resolve(__dirname, `../dist`),
    distDev: path.resolve(__dirname, `../dist`),
    global_styles: path.resolve(__dirname, '../src/assets/styles'),
    node_modules: path.resolve(__dirname, '../node_modules'),
    dll: path.resolve(__dirname, '../__DLL__'),
  },
  DLL_ENTRY: {
    // 动态链接库入口配置
    polyfill: ['@babel/polyfill'],
    mobx: ['mobx'],
    react: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-css-modules',
      'mobx-react',
    ],
    moment_axios: ['axios', 'moment'],
    ...DLL_ENTRY_EXTEND,
  },
  DLL_ENTRY_DEV: {}, // 开发时的动态链接库
};
