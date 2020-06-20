/* eslint-disable */

const router = [
  {
    "route": "/login",
    "routes": [],
    "path": "pages/Login/index",
    "name": "登录",
    "layout": "layouts/App/index",
    "isHideInMenus": true
  },
  {
    "route": "/test",
    "routes": [],
    "path": "pages/Test/index",
    "name": "测试",
    "authority": [
      "user"
    ]
  }
]

export default router;
