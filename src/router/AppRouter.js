/* eslint-disable */
import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from 'dva';
import Loading from 'components/Loading';
import Exception from 'components/Exception/index.js';
import App from '@/layouts/App/index';
import auth from 'utils/auth';

const renderRouter = (routes, app) => {
  const children = [];

  function renderRoutes(arr) {
    arr.forEach((route) => {
      if (!route.path) {
        children.push(null);
      } else {
        const curRoute = (
          <Route
            key={route.route}
            exact
            path={route.route}
            render={(props) => {
              let isAuth = true;
              if (route.authority) {
                isAuth = auth(route.authority);
              }
              const pathSuffix = route.path.split('/').slice(1).join('/');
              // webpack require 的地址会被转为正则，详见https://blog.csdn.net/weixin_33738555/article/details/88766052
              const Temp = dynamic({
                app,
                component: () => import('pages/' + pathSuffix),
              });
              return isAuth ? (
                <Suspense fallback={<Loading />}>
                  <div className="animated faster fadeInRight">
                    <Temp {...props} />
                  </div>
                </Suspense>
              ) : (
                <Exception type="403"></Exception>
              );
            }}
          />
        );
        children.push(curRoute);
      }

      console.log(route.routes.length);
      if (route.routes.length) {
        renderRoutes(route.routes);
      }
    });
  }
  renderRoutes(routes);
  console.log(children);
  return children;
};

function AppRouter(props) {
  const {
    history,
    app,
    global: { routes },
  } = props;
  console.log(props);
  return (
    <Router history={history}>
      <>
        <Switch>
          {renderRouter(routes, app)}
          <Route
            path="/404"
            render={(props) => {
              console.log(props);
              return (
                <App {...props}>
                  <Exception type="404" {...props} />
                </App>
              );
            }}
          />
          <Redirect to="/404"></Redirect>
        </Switch>
      </>
    </Router>
  );
}

export default connect(({ global }) => ({ global }))(AppRouter);
