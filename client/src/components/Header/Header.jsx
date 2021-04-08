import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, animateScroll as scroll } from 'react-scroll';

export const Header = (props) => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <>
      <Navbar
        className={'header'}
        collapseOnSelect
        expand={'lg'}
        bg={'light'}
        variant={'light'}
        fixed={'top'}
      >
        <Container>
          <LinkContainer to={'/'}>
            <Navbar.Brand>
              {' '}
              SPO<span className={'spo'}>Motors</span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls={'responsive-navbar-nav'} />
          <Navbar.Collapse id={'responsive-navbar-nav'}>
            <Nav className={'ml-auto'}>
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
              >
                <Nav.Link>Главная</Nav.Link>
              </Link>
              <Link
                activeClass="active"
                to="catalog"
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
              >
                <Nav.Link>Каталог</Nav.Link>
              </Link>
              <Link
                activeClass="active"
                to="contacts"
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
              >
                <Nav.Link>Контакты</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
