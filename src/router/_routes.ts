/* eslint-disable */
export interface RouteType {
  route: string; // 路径
  routes: RouteType[]; // 子路由
  path: string; // 页面组件地址
  name?: string; // 页面名字
  template?: string; // 使用的模板
  layout?: string; // 外层layout 路径
  isHideInMenus?: boolean; // 是否在左侧菜单中隐藏
  [prop: string]: any; // 其他额外属性
}

const routes: RouteType[] = [
  {
    route: '/login',
    routes: [],
    path: 'pages/Login/index',
    name: '登录',
    isHideInMenus: true,
  },
  {
    route: '/list',
    routes: [],
    path: 'pages/List/index',
    name: '列表',
    template: 'list',
    layout: 'layouts/App/index',
  },
];

export default routes;
