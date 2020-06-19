import '@babel/polyfill';

import React from 'react';
// import ReactDom from 'react-dom';
import dva from 'dva';
import { createHashHistory } from 'history';
// import { Button } from 'antd';
import Router from './router/index';
import { registerModels } from '@/models/index';
export const appHistory = createHashHistory();

// const Test = () => {
//   return <Button>123</Button>;
// };

const app = dva({
  history: createHashHistory(),
  onHmr: () => {
    console.log('1222222222222222222222222');
  },
});

// 注册所有模块
registerModels(app);

// 定义路由
app.router((props) => {
  return <Router {...props} />;
});

// 启动
app.start('#root');

// ReactDom.render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
