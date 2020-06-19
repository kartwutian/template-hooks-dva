import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import AppRouter from './AppRouter';

import 'assets/styles/app.less';

export default function Root(props) {
  return (
    <ConfigProvider locale={zh_CN}>
      <AppRouter {...props} />
    </ConfigProvider>
  );
}
