import React from 'react';
import {Col } from 'react-bootstrap';
import {NavbarBrand} from 'components/atoms/Navbar';
import Login from 'components/molecules/Login';
import Header from 'components/templates/Header';
import ContainerPage from 'components/templates/Container';
import Footer from 'components/templates/Footer';

export default function Home() {
    return(<>
        <Header>
            <NavbarBrand />
        </Header>
        <ContainerPage>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} > 
                <Login />
            </Col>
        </ContainerPage>
        <Footer>
            <Col className="text-center"><h6 className="text-white">Desarrollado por Recalde Claudio</h6></Col>
        </Footer>
    </>)
}
