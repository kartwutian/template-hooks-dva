/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'dva/router';
import { Menu } from 'antd';
import WbIcon from 'components/WbIcon/index';

// import { MenuFoldOutlined } from '@ant-design/icons';
// import auth from 'utils/auth';
import fetchMenusRouter, { queryRouteNode } from 'utils/fetchMenusRouter';

const { SubMenu } = Menu;

// import style from './style.less';

const renderSubMenu = (route) => {
  return (
    <SubMenu
      key={route.route}
      title={
        <span>
          {route.icon ? <WbIcon type={route.icon}></WbIcon> : null}
          <span>{route.name}</span>
        </span>
      }
    >
      {renderMenus(route.routes)}
    </SubMenu>
  );
};

const renderMenuItem = (route) => {
  return (
    <Menu.Item key={route.route}>
      <Link to={route.route}>
        {route.icon ? <WbIcon type={route.icon}></WbIcon> : null}
        <span>{route.name}</span>
      </Link>
    </Menu.Item>
  );
};

const renderMenus = (routes) => {
  return routes.map((route) => {
    if (route.routes.length) {
      return renderSubMenu(route);
    }
    return renderMenuItem(route);
  });
};

function SiderMenu(props) {
  const {
    collapsed,
    history,
    location,
    dispatch,
    global: { routes, MENU_SELECTKEYS },
  } = props;
  console.log(collapsed);
  console.log('-------------------------');
  const menusRouter = fetchMenusRouter(routes);
  console.log(menusRouter);

  // const localStore = useLocalStore(() => ({}));

  const menuNode = queryRouteNode(menusRouter, location.pathname);
  // console.log(location.pathname);
  // console.log(menuNode);
  if (menuNode && menuNode.route !== MENU_SELECTKEYS[0]) {
    dispatch({
      type: 'global/updateByKey',
      payload: {
        MENU_SELECTKEYS: [menuNode.route],
      },
    });
  }
  // const handleMenuClick = ({ key }) => {

  //   if (key === '/project') {
  //     history.push(key);
  //   }
  // };

  return (
    <Menu
      defaultOpenKeys={menusRouter[0] ? [menusRouter[0].route] : []}
      defaultSelectedKeys={['/home']}
      selectedKeys={MENU_SELECTKEYS}
      // defaultOpenKeys={['exchangemgr']}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      // onClick={handleMenuClick}
    >
      {renderMenus(menusRouter)}
    </Menu>
  );
}

export default SiderMenu;
