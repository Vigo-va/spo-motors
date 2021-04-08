import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { useRoutes } from './routes';
import { Footer } from './components/Footer/Footer';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token, login, logout } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          isAuth,
        }}
      >
        <Router>
          <Header />
          {routes}
          <Footer />
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
