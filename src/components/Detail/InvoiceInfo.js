import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { Spin, Card, Row, Col } from 'antd';
import { getExtName } from '@/utils/helper';

import styles from './index.less';

const InvoiceInfo = ({ data, type }) => {
  console.log(data);
  const gridStyle = {
    width: '33%',
    textAlign: 'left',
    boxShadow:
      '0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff, 0 0 0 0 #fff inset, 0 0 0 0 #fff inset',
  };

  return (
    <Card title="增值税发票信息" bordered={false}>
      <Card.Grid hoverable={false} style={gridStyle}>
        发票代码: {data.invoiceCode}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        发票号码：{data.invoiceNo}
      </Card.Grid>
      {type === 'purchase' ? (
        <Card.Grid hoverable={false} style={gridStyle}>
          税务机关(必须是义乌税务机关)：{data.taxOrg}
        </Card.Grid>
      ) : null}
      {type === 'valueAdd' ? (
        <Card.Grid hoverable={false} style={gridStyle}>
          开票方名称(必须与白名单企业名称一致)：{data.opName}
        </Card.Grid>
      ) : null}
      <Card.Grid hoverable={false} style={gridStyle}>
        开票日期：{data.invoiceDate}
      </Card.Grid>
      {type === 'valueAdd' ? (
        <Card.Grid hoverable={false} style={gridStyle}>
          开票方识别号：{data.opCode}
        </Card.Grid>
      ) : null}
      {type === 'valueAdd' ? (
        <Card.Grid hoverable={false} style={gridStyle}>
          税价合计金额：{data.totalAmount}
        </Card.Grid>
      ) : null}
      <Card.Grid hoverable={false} style={gridStyle}>
        <Row>
          <Col>附件：</Col>
          <Col flex="auto">
            {data.fileList &&
              data.fileList.map((file) => (
                <Row key={file.fileName}>
                  <a
                    href={file.showPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: 10 }}
                  >
                    {file.fileName + '.' + getExtName(file.showPath)}
                  </a>
                </Row>
              ))}
          </Col>
        </Row>
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        {type === 'valueAdd' ? '购置税审核状态：' : '增值税审核状态：'}
        {(data.relStatus === 1 && (
          <span className={styles.statusNormal}>未提交</span>
        )) ||
          (data.relStatus === 2 && (
            <span className={styles.statusNormal}>待审核</span>
          )) ||
          (data.relStatus === 3 && (
            <span className={styles.statusNo}>
              审核不通过/{data.reasonOfReject}
            </span>
          )) ||
          (data.relStatus === 4 && (
            <span className={styles.statusNormal}>审核通过</span>
          )) ||
          null}
      </Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        {type === 'valueAdd' ? '增值税审核状态：' : '购置税审核状态：'}
        {(data.status === 1 && (
          <span className={styles.statusNormal}>未提交</span>
        )) ||
          (data.status === 2 && (
            <span className={styles.statusNormal}>待审核</span>
          )) ||
          (data.status === 3 && (
            <span className={styles.statusNo}>
              审核不通过
              {data.reasonOfReject ? `/${data.reasonOfReject}` : null}
            </span>
          )) ||
          (data.status === 4 && (
            <span className={styles.statusNormal}>审核通过</span>
          )) ||
          null}
      </Card.Grid>
    </Card>
  );
};

export default InvoiceInfo;
