import React, { useRef, useState } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Form, Input, Checkbox, message } from 'antd';
import { login } from '@/pages/Login/_service.Login';

import styles from './index.less';

function LoginPage(props) {
  console.log(props);
  const { history } = props;
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await login(values);
      history.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (e) => {
    console.error(e);
  };
  const goToReset = () => {
    history.push('/login/forget');
  };
  console.log(process);
  console.log(process.env.NODE_ENV);
  return (
    <div styleName="page">
      <div styleName="content">
        <div styleName="top">
          <div styleName="header">
            <Link to="/">
              {/* <div styleName="bg-test"></div> */}
              {/* <img
                styleName="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="logo"
              /> */}
              <span styleName="title">购车补贴系统</span>
            </Link>
          </div>
          <div styleName="desc">{count}</div>
          {/* <img src={`${__PUBLIC_PATH__}logo.png`} /> */}
        </div>
        <div styleName="login">
          <Form
            name="basic"
            ref={formRef}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="loginId"
              rules={[
                {
                  required: true,
                  message: '请输入账号名',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <div styleName="forgetPassword">
                {/* <Checkbox>记住密码</Checkbox> */}
                <div></div>
                <a onClick={goToReset}>忘记密码?</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                block
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default connect(({ global }) => ({ global }))(
  CSSModules(LoginPage, styles),
);
