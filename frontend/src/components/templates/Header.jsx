import React from 'react';
import {Container,Row} from 'react-bootstrap'
import './css/header.css';

const Header = ({children}) => {
    return (<>
        <header className="d-flex align-items-center">
            <Container fluid>
                <Row> 
                    {children}
                </Row>
            </Container>
        </header>
    </>)
}


export default Header;