/* eslint-disable no-shadow */

module.exports = (pages) => {
  const routeMap = pages.reduce((result, next) => {
    result[next.route] = next;
    return result;
  }, {});
  const routes = Object.keys(routeMap);

  const renderTree = (arr, rootNode, prefix) => {
    const [first, ...rest] = arr;
    rootNode.route = prefix ? `${prefix}/${first}` : `/${first}`;
    rootNode.routes = [];
    // 附加上原始数据信息
    const curMeta = routeMap[rootNode.route] || {};
    Object.keys(curMeta).forEach((prop) => {
      rootNode[prop] = curMeta[prop];
    });
    const subNode = {};
    if (rest.length) {
      renderTree(rest, subNode, rootNode.route);
    }
    if (subNode.route) {
      rootNode.routes.push(subNode);
    }
  };

  const parsePath = (path) => {
    const metaArr = path.split('/').slice(1);
    const curRoute = {};
    renderTree(metaArr, curRoute);
    return curRoute;
  };

  const combineRoutes = (pRoutes) => {
    const routes = [];
    pRoutes.forEach((item) => {
      const curRoute = routes.find((r) => r.route === item.route);
      // console.log(curRoute);
      if (!curRoute) {
        routes.push(item);
      } else {
        curRoute.routes = [...curRoute.routes, ...item.routes];
      }
    });
    routes.forEach((item) => {
      item.routes = combineRoutes(item.routes);
    });
    return routes;
  };

  const plainRoutes = routes.map((item) => parsePath(item)); // 展平的所有路由

  const allRoutes = combineRoutes(plainRoutes);

  return allRoutes;
};
