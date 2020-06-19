import React, { Component, useEffect, useState } from 'react';
import cssModules from 'react-css-modules';
import { useStore } from '@/store/index';
import { Spin, Card } from 'antd';
import styles from './index.less';

const CustomerInfo = ({ data }) => {
  const [type, setType] = useState('');
  const gridStyle = {
    width: '33%',
    textAlign: 'left',
    boxShadow:
      '0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff inset, 0 0 0 0 #fff inset',
  };

  const globalStore = useStore('globalModel');

  useEffect(() => {
    globalStore.appEnum.subsidy.map((item) => {
      if (item.id === data.typeId) {
        setType(item.name);
      }
    });
  }, [data]);

  return (
    <Card title="消费者信息" bordered={false}>
      <Card.Grid hoverable={false} style={gridStyle}>
        购买方名称：{data.buyerName}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        身份证号或者统一信用代码：{data.buyerCardNo}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        补贴类型：{type}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        车辆识别代码/车架号码：{data.frameNumber}
      </Card.Grid>
    </Card>
  );
};

export default CustomerInfo;
