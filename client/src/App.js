import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { useRoutes } from './routes';
import { Footer } from './components/Footer/Footer';

function App() {
  const routes = useRoutes(true);
  return (
    <>
      <Header />
      {routes}
      <Footer />
    </>
  );
}

export default App;
