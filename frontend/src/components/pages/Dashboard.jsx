import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {GetOperators} from 'controllers/operatorsController'

import Header from 'components/templates/Header';
import ContainerPage from 'components/templates/Container';
import Footer from 'components/templates/Footer';
import {AddOperators} from 'components/atoms/Buttons'
import TableOperators from 'components/atoms/Tables';
import {OperatorModal} from 'components/atoms/Modals';
import {NavSideBar} from 'components/atoms/Navbar';
import PaginationTable, {PaginationSelect} from 'components/atoms/Pagination';

export default function Dashboard() {
  return(<>
      <Header>
        <NavSideBar />
      </Header>
      <ContainerPage>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} > 
              <DashboardRender />
          </Col>
      </ContainerPage>
      <Footer>
          <Col className="text-center"><h6 className="text-white">Desarrollado por Recalde Claudio</h6></Col>
      </Footer>
  </>)
}


const DashboardRender = () => {
  const [listOperators, setListOperators] = useState();
  const [countTotalReg, setCountTotalReg] = useState();
  //Maneja la carga de modal con formulario
  const [show, setShow] = useState({id:null,show:false});
  
  //Seteamos los datos iniciales de paginacion
  const [sendData, setSendData] = useState({
      limit:5,
      currentPage:1,
  })

  const [pageEnd,setPageEnd]=useState();


  const handleChange = (value) =>{
    setSendData({...sendData, limit:value});
  }
  
  const handlePage = (value) =>{
      setSendData({...sendData, currentPage:value});
  }

  //Carga y muestra formulario con datos del id de registro enviado al modal
  const handleLoadForm = (value) => {
     setShow({id:value,show:true});
  }
  
  const handleClose = () => {
    setShow({id:null,show:false});
    GetOperators(sendData).then((res)=> {
      setListOperators(res.data.rows);
      
      setPageEnd(getPageEnd(res.data.count,sendData.limit));
    });
  };
  
  useEffect(() => {
    //Traemos el resultado paginado
    GetOperators(sendData).then((res)=> {
      
      //setea registros
      setListOperators(res.data.rows);

      //Total de registros de la tabla
      setCountTotalReg(res.data.count);

      //Seteamos la cantidad de paginas que tendra la tabla
      setPageEnd(getPageEnd(res.data.count,sendData.limit));
    
    });
  }, [sendData])
  
  return (<>
  
     
      <Container id="dashboard" className="">
        <Row className="d-flex justify-content-center align-items-top">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} > 
            <Row className="mb-3">
              <Col  xs={6} sm={6} md={6} lg={3} xl={3} className="d-flex justify-content-start align-items-center">
                <PaginationSelect name={"filterNum"} values={[5,10,50,100]} totalReg={countTotalReg} handleChange={handleChange} />
              </Col>
              <Col xs={6} sm={6} md={6} lg={9} xl={9}className="d-flex justify-content-end">
                <AddOperators handleClick={(e)=>handleLoadForm(null)}/>
              </Col>
            </Row>
            <TableOperators operators={listOperators} handleClick={handleLoadForm}/>
            <Row className="mt-3">
              <Col  xs={6} sm={6} md={6} lg={9} xl={9} className="d-flex justify-content-start">
                {
                  listOperators && 
                  <label>Registros: {listOperators.length}/{countTotalReg}</label>
                }
              </Col>
              <Col xs={6} sm={6} md={6} lg={3} xl={3}  className="d-flex justify-content-end">
                { pageEnd && <PaginationTable pageStart={1} pageEnd={pageEnd} handleCurrentPage={handlePage}/> }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      < OperatorModal id={show.id} show={show.show} handleClose={handleClose}/>
     
    </>)
 
}

const getPageEnd = (totalReg, limitPage) =>{
  
  return  Math.ceil(totalReg/limitPage);

}

