 import React, { useState } from 'react';
import { connect } from 'dva';
import CSSModules from 'react-css-modules';
import { Card, Table, Tag, Button, Row } from 'antd';

import styles from './index.less';

function ListPage() {
  const [list, setList] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }}>Invite {record.name}</a>
          <a>Delete</a>
        </span>
      ),
    },
  ];


  return (
    <>
      <Card>
        <Row
          style={{
            marginBottom: 16,
          }}
        >
          <Button type="primary">请求数据</Button>
        </Row>

        <Table columns={columns} dataSource={list} />
      </Card>
    </>
  );
}

export default connect()(
  CSSModules(ListPage, styles, {
    allowMultiple: true,
  }),
);
