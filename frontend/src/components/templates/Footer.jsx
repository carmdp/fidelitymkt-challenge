import React from 'react';
import {Container,Row} from 'react-bootstrap'
import './css/footer.css';

const Footer = ({children}) => {
    return (<>
        <footer className="d-flex align-items-center bg-dark">
            <Container>
                <Row> 
                    {children}
                </Row>
            </Container>
        </footer>
    </>)
}


export default Footer;