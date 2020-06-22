import '@babel/polyfill';

import React from 'react';
// import ReactDom from 'react-dom';
import dva, { DvaInstance, RouterAPI } from 'dva';
import {} from 'dva/router';
import { createHashHistory, History } from 'history';
// import { Button } from 'antd';
import Router from './router/index';
import { registerModels } from '@/models/index';

export const appHistory: History = createHashHistory();

// const Test = () => {
//   return <Button>123</Button>;
// };

const app: DvaInstance = dva({
  history: appHistory,
  onHmr: () => {},
});

// 注册所有模块
registerModels(app);

// 定义路由
app.router((props: RouterAPI) => {
  return <Router {...props} />;
});

// 启动
app.start('#root');

// ReactDom.render(<Root />, document.getElementById('root'));

if (module.hot) {
  console.log(module);
  module.hot.accept();
}
