import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { BrandPage } from './pages/BrandPage/BrandPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { AdminPage } from './pages/adminPage/AdminPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <>
        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route>
          <Route path={'/admin'}>
            <AdminPage />
          </Route>
          <Redirect to={'/'} />
        </Switch>
      </>
    );
  }
  return (
    <Switch>
      <Redirect to={'/'} />
    </Switch>
  );
};
