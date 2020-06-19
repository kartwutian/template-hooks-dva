import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { Spin, Card } from 'antd';
import styles from './index.less';
import CustomerInfo from './CustomerInfo';
import InvoiceInfo from './InvoiceInfo';
import BankAccountInfo from './BankAccountInfo';
import moment from 'moment';

const CommonDetail = ({ data, type }) => {
  const gridStyle = {
    width: '33%',
    textAlign: 'left',
    boxShadow:
      '0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff inset, 0 0 0 0 #fff inset',
  };
  return (
    <div>
      <div styleName="cardCss">
        <CustomerInfo data={data} />
      </div>
      <div styleName="cardCss">
        <InvoiceInfo data={data} type={type} />
      </div>
      {type === 'purchase' ? null : (
        <div styleName="cardCss">
          <BankAccountInfo data={data} />
        </div>
      )}
      <Card>
        <Card.Grid hoverable={false} style={gridStyle}>
          提交人：{data.submitName}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          提交时间：
          {data.submitTime
            ? moment(data.submitTime).format('YYYY-MM-DD HH:mm:ss')
            : ''}
        </Card.Grid>
      </Card>
    </div>
  );
};

export default cssModules(CommonDetail, styles);
