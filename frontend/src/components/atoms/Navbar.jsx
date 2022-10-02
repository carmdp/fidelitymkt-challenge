import React from 'react';
import {Container, Image, Navbar, Nav} from 'react-bootstrap';
import {ButtonLoginOut} from 'components/atoms/Buttons';
import './css/navbar.css';

export const NavSideBar = () => {

  return (
    <>
      <Navbar expand="lg"  bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Image src="https://www.fidelitymkt.com/img/logos/Fmkt_transp_for_color_logo.svg" className="me-4" />
            <span>LISTADO DE OPERADORES</span>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <ButtonLoginOut text={"Cerrar Sesion"} />
          </Nav>  
        </Container>
      </Navbar>
    </>);
}

export const NavbarBrand = ({children}) => {

  return (<>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <Image src="https://www.fidelitymkt.com/img/logos/Fmkt_transp_for_color_logo.svg" className="me-4" />
          <span>DESAFIO FULLSTACK JS</span>
        </Navbar.Brand>
        <Nav className="me-auto">
          {children}
        </Nav>
    </Navbar>
  </>)
}

