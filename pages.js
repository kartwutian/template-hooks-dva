module.exports = {
  webpack: {
    dll: {}, // 扩展dll动态链接库
    //存放需要变动的webpack的配置参数
    publicPath: '/cps_web/', // 打包时候的前缀配置，注意一定要/开头，/结尾，因为我偷懒了,不会用在开发环境
    htmlWebpackPlugin: {
      title: 'template-admin',
    }, // html-webpack-plugin 的配置参数，主要可以用来配置title及其meta
    proxy: {
      '/proxy': {
        target: 'http://192.168.18.83:8092',
        pathRewrite: { '^/proxy': '' },
      },
      // '/cps-server': {
      //   target: 'http://183.131.202.136:8008/cps-server',
      //   pathRewrite: { '^/cps-server': '' },
      // },
    }, // 开发时候的代理配置
  },
  pages: [
    // pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    // {
    //   path: 'pages/Home/index', // 生成的页面路径
    //   //   template: 'list', // 配置生成相关页面使用的模板文件，没有则用默认模板文件
    //   route: '/project', // 使用的前端路由
    //   name: '首页',
    //   hasBread: true, // 是否展示自带面包屑
    //   subTitle: '子标题', // 自带header的子标题
    //   isHideInMenus: true, // 代表在菜单栏隐藏菜单
    // },
    {
      path: 'pages/Login/index',
      route: '/login',
      name: '登录',
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    {
      path: 'pages/List/index',
      route: '/list',
      name: '列表',
      template: 'list',
      layout: 'layouts/App/index', // layout路径
    },
  ],
};
