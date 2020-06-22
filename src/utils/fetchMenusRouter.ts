import auth from '@/utils/auth';
/**
 * 根据权限及规则过滤出菜单所需的路由
 * @param {*} router
 */
const fetchMenusRouter = (routes) => {
  return routes
    .map((route) => {
      if (!route.isHideChildrenInMenu && route.routes.length) {
        return renderSubMenu(route);
      }
      return renderMenuItem(route);
    })
    .filter((item) => item !== null);
};

const renderSubMenu = (route) => {
  if (route.isHideInMenus) return null; // 如果设置了隐藏，则菜单不显示
  if (route.authority && !auth(route.authority)) return null; // 如果有设置权限，则只展示有权限的菜单

  return {
    ...route,
    routes: fetchMenusRouter(route.routes),
  };
};

const renderMenuItem = (route) => {
  if (route.isHideInMenus) return null; // 如果设置了隐藏，则菜单不显示
  if (route.authority && !auth(route.authority)) return null; // 如果有设置权限，则只展示有权限的菜单
  return { ...route, routes: [] };
};

export default fetchMenusRouter;

/**
 * 根据路由从路由树上获取节点
 * @param {*} routes
 * @param {*} route
 */
export const queryRouteNode = (routes, route) => {
  // console.log(route);
  for (let i = 0; i < routes.length; i++) {
    // console.log(routes[i].route + '===' + route);
    if (routes[i].route === route) {
      return routes[i];
    } else {
      const res = queryRouteNode(routes[i].routes, route);
      if (res) return res;
    }
  }
  return null;
};
