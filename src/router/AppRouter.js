/* eslint-disable */
import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Loading from 'components/Loading';
import Exception from 'components/Exception/index.js';
import Login from 'pages/Login/index';

function AppRouter({ history }) {
  return (
    <Router history={history}>
      <>
        <Switch>
          <Route path="/loading" component={Loading} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Exception} />
        </Switch>
      </>
    </Router>
  );
}

export default AppRouter;
