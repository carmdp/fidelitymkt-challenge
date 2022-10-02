import React from 'react';
import {Container} from 'react-bootstrap';
import './Container';


const ContainerPage = ({children}) => {
 
    return (
        <div id="wrapper" className="d-flex align-items-center">
            <Container>
            {children}
            </Container>
        </div>
    )

}

export default ContainerPage;