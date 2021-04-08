import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { AdminPage } from './pages/adminPage/AdminPage';
import { AdminAuth } from './pages/adminPage/AdminAuth/AdminAuth';

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <>
        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route>
          <Route path={'/admin'} exact>
            <AdminPage />
          </Route>
          <Redirect to={'/'} />
        </Switch>
      </>
    );
  }
  return (
    <Switch>
      <Route path={'/'} exact>
        <HomePage />
      </Route>
      <Route path={'/admin'} exact>
        <AdminAuth />
      </Route>
      <Redirect to={'/'} />
    </Switch>
  );
};
