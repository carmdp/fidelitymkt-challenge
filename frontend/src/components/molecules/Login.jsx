import React from 'react'
import {FormLogin} from 'components/atoms/Forms';
import {Container, Row, Col} from 'react-bootstrap';

const Login = () => {
  
  return (<>
  
    <Container id="login">
      <Row className="d-flex justify-content-center ">
        <Col xs={6} sm={6} md={6} lg={6} xl={6}  className="border p-5" > 
          <FormLogin />
          <Row className="d-flex justify-content-center mt-5 text-center">
            <Col className="mt-5">
              <h6 className="mx-auto mb-1 pb-1 border-bottom col-6 ">Usuario prueba</h6>
              <p>Usuario: admin</p>
              <p>Contraseña: Admin123+</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
   
  </>)
  
}


export default Login;