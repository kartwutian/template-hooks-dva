import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { Spin, Card } from 'antd';
import styles from './index.less';

const BankAccountInfo = ({ data }) => {
  const gridStyle = {
    width: '33%',
    textAlign: 'left',
    boxShadow:
      '0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff inset, 0 0 0 0 #fff inset',
  };

  return (
    <Card title="发放补贴银行账号信息" bordered={false}>
      <Card.Grid hoverable={false} style={gridStyle}>
        开户行：{data.bank}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        开户银行账号：{data.bankAccount}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        开户人姓名：{data.accountName}
      </Card.Grid>
    </Card>
  );
};

export default BankAccountInfo;
