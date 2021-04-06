import React from 'react';
import { Carousels } from '../../components/Carousel/Carousel';
import { CatalogPage } from '../CatalogPage/CatalogPage';
import { ContactsPage } from '../ContactsPage/ContactsPage';
import { Banner } from '../../components/Banner/Banner';

export const HomePage = (props) => {
  return (
    <>
      <section id={'home'}>
        <Carousels />
      </section>
      <Banner />
      <section id={'catalog'}>
        <CatalogPage />
      </section>
      <section id={'contacts'}>
        <ContactsPage />
      </section>
    </>
  );
};
