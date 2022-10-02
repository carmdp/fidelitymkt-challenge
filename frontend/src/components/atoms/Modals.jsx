import React from 'react';
import {Modal} from 'react-bootstrap';
import Swal from 'sweetalert2'
import {AddOperator, EditOperator} from 'components/atoms/Forms';
import './css/modals.css'


export const OperatorModal = ({id, show,handleClose}) => {

  return (
    <>
      <Modal 
        show={show}  
        onHide={handleClose} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="title">
            <h4> { id ? "EDITAR OPERADOR" : "AGREGAR OPERADOR"} </h4>
        </Modal.Header>
        <Modal.Body>
          { 
            id ?
              <EditOperator id={id} handleClose={handleClose}/>
            :
              <AddOperator handleClose={handleClose}/>
          }
        </Modal.Body>
      </Modal>
    </>
  );

}


export const AlertMessage = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  
  });