/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Tooltip, Dropdown, Menu, PageHeader } from 'antd';
import {
  MenuFoldOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import SiderMenu from './SiderMenu';
import { userLogout } from '@/pages/Login/_service.Login';

import styles from './index.less';

const { Header, Sider, Content, Footer } = Layout;

const App = (props) => {
  const {
    children,
    location,
    history,
    global: { USER_INFO },
  } = props;
  const [collapsed, setCollapsed] = useState(false);

  const menu = (
    <Menu className="user-menu" selectedKeys={[]} onClick={handleMenuClick}>
      <Menu.Item key="userinfo">
        <Link to="/settings/password_change">
          <SettingOutlined />
          <span style={{ paddingLeft: 10 }}>修改密码</span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        onClick={async () => {
          try {
            await userLogout();
            history.push('/logout');
            globalStore.logout();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <LogoutOutlined />
        <span style={{ paddingLeft: 4 }}>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  const handleMenuClick = () => {};

  const getBreadData = ({ location, global }) => {
    const { pathname } = location;
    const { routes: router } = global;
    const curPathArr = pathname.split('/').slice(1);
    console.log(curPathArr);
    let curRouter = router;
    const breads = [];
    curPathArr.reduce((prefix, next) => {
      prefix = `${prefix}/${next}`;
      console.log(prefix);
      const curItem = curRouter.find((item) => item.route === prefix);
      console.log(curItem);
      if (curItem) {
        breads.push(curItem);
        curRouter = curItem.routes;
      }
      return prefix;
    }, '');
    return breads;
  };

  const renderSubHeader = (props) => {
    const sourceData = getBreadData(props);
    console.log(sourceData);
    const routes =
      sourceData.length > 1
        ? sourceData.map((item, index) => {
            // console.log(item.route);
            // console.log(item.route.substring(1));
            let tempPath = '';

            if (item.route) {
              if (index === 0) {
                tempPath = item.route.split('/')[1];
              } else {
                tempPath = item.route
                  .replace(sourceData[index - 1].route, '')
                  .split('/')[1];
              }
            }

            return {
              path: tempPath,
              breadcrumbName: item.name,
            };
          })
        : [];
    const curRoute = sourceData[sourceData.length - 1];

    return sourceData.length && curRoute.hasBread ? (
      <PageHeader
        ghost={false}
        title={curRoute && curRoute.name}
        breadcrumb={{ routes }}
        subTitle={curRoute.subTitle || ''}
      />
    ) : null;
  };

  return (
    <Layout styleName="app-layout">
      <Sider collapsed={collapsed}>
        <SiderMenu collapsed={collapsed} {...props}></SiderMenu>
      </Sider>
      <Layout>
        <Header>
          <div styleName="header-item">
            {collapsed ? (
              <MenuUnfoldOutlined
                styleName="icon-size--primary"
                onClick={() => {
                  // console.log(1);
                  setCollapsed(false);
                }}
              />
            ) : (
              <MenuFoldOutlined
                styleName="icon-size--primary"
                onClick={() => {
                  // console.log(2);
                  setCollapsed(true);
                }}
              />
            )}
            {collapsed}
          </div>
          <div styleName="header-item--main"></div>
          {/* <div styleName="header-item">
            <Tooltip title="使用文档">
              <a
                target="_blank"
                href="https://ywinvesttest.zjbdos.com/static-resource/wb-uni-pro/"
                rel="noopener noreferrer"
                title="使用文档"
              >
                <QuestionCircleOutlined styleName="icon-size--primary" />
              </a>
            </Tooltip>
          </div> */}

          <div styleName="header-item">
            <Dropdown overlay={menu}>
              <div>
                {/* <Avatar
                      size="small"
                      styleName="avatar"
                      // src={userInfo.avatar}
                      // src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                      alt="avatar"
                    /> */}
                <span>{USER_INFO.name || USER_INFO.loginId || '--'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content>
          {renderSubHeader(props)}
          <div styleName="app-layout__content">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>万博大数据提供技术支持</Footer>
      </Layout>
    </Layout>
  );
};

export default connect(({ global }) => ({ global }))(
  CSSModules(App, styles, {
    allowMultiple: true,
  }),
);
