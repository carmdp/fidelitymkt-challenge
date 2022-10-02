import React,{useState, useEffect, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {Form, Row, Col,InputGroup,  Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthContext from "context/Contexts";
import {AlertMessage} from 'components/atoms/Modals';
import {Password, Text} from 'components/atoms/Inputs';
import {validateUser} from 'controllers/userController';
import {GetOperatorById, SetOperator, PutOperator} from "controllers/operatorsController"



export const FormLogin = () => {

  const Authentication = useContext(AuthContext); //Declaro el consumidor Authenticacion de estados
  const navigate  = useNavigate();
  const initialData = { userName:"", password:"" };
  const validaciones = Yup.object({
    userName: Authentication.validateSchemaText,
    password: Yup.string().required("Campo obligatorio")
  })
  
  
  const formik = useFormik({
    initialValues: initialData,
    validationSchema:validaciones,
    onSubmit: (values, {resetForm}) => {
      
      validateUser(values).then((res) =>{
       
        Authentication.Login(res.data); //guarada token localstorage
        
        navigate('/dashboard');
        
          
      }).catch(error => {
        console.error(error.message);
        AlertMessage.fire({
          icon: 'error',
          title: 'Acceso NO autorizado',
          text: 'Prueba nuevamente con tu usuario o contraseña',
          color:'#ffffff',
          background: '#ff0000b5',
          timer:5000
        })
      
       
          
      });
    
    }
});

  return (<>
   
     
    <Form  onSubmit={formik.handleSubmit} >
      <Form.Label htmlFor="userName" className="mt-3 mb-0" >Usuario</Form.Label>
      <InputGroup> 
        <InputGroup.Text>
        <FontAwesomeIcon icon={"fa-solid fa-user"} size="1x"/>
        </InputGroup.Text>
        <Form.Control 
          id="userName" 
          name="userName" 
          size="sm" 
          type="text" 
          value={formik.values.userName} 
          onChange={formik.handleChange} 
          placeholder="Ingrese su usuario" 
        />
      </InputGroup>
      {formik.touched.userName && formik.errors.userName ? (<Col><p className="errose">{formik.errors.userName}</p></Col>) : null}
      
      <Form.Label htmlFor="password" className="mt-3 mb-0" >Contraseña</Form.Label>
      <InputGroup > 
        <InputGroup.Text> 
          <FontAwesomeIcon icon={"fa-solid fa-key"} size="1x"/>
        </InputGroup.Text>
        <Form.Control 
          id="password" 
          name="password" 
          size="sm" 
          type="password" 
          value={formik.values.password} 
          onChange={formik.handleChange} 
          placeholder="Escriba su contraseña" 
        />
      </InputGroup>
      {formik.touched.password && formik.errors.password ? (<Col><p className="errose">{formik.errors.password}</p></Col>) : null}
      
      <Col className="d-grid gap-2 mt-5">
        <Button variant="primary" size="lg" type="submit" className="animate__animated animate__bounce">Iniciar </Button>
      </Col>
    </Form>     
  </>);
  
}








export const AddOperator = ({id, handleClose}) => {
  
  //Declaro el consumidor Authenticacion de estados
  const Authentication = useContext(AuthContext); 
   
  //Inicializamos campos de formulario
  const initialData = { name:"",surname:"",userName:"", password:"",password2:"",status:"" };
  
  //Declaro esquemas de validacion de formulario
  const validaciones = Yup.object({
    name: Authentication.validateSchemaText,
    surname: Authentication.validateSchemaText,
    userName: Authentication.validateSchemaText,
    password: Authentication.validateSchemaPass,
    password2: Authentication.validateSchemaPass.oneOf([Yup.ref('password'), null], 'HEY! Las contraseñas no coinciden.')
  })
  
  const formik = useFormik({
    initialValues: initialData,
    validationSchema:validaciones,
    onChange:(values) =>{
      console.log(values);
    },
    onSubmit: (values, {resetForm}) => {
      
      //Enviamos datos del formulario
      SetOperator(values).then((res) =>{

        //Cerramos modal
        handleClose();
        AlertMessage.fire({icon: 'success', title: 'Tarea exitosa!', text: 'Ud. ha generado un operador con exito.', color:'#ffffff', background: '#4caf50', timer:3000 })
          
      }).catch(error => {
          console.error(error.message);
          
          AlertMessage.fire({ icon: 'error', title: error.response.data.title, text: error.response.data.message, color:'#ffffff', background: '#ff0000b5', timer:3000})
      });
    
    }
  });

  return (<>
    <Form  onSubmit={formik.handleSubmit} >
      <Row className="mb-3">
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form.Check 
              id="status" 
              name="status" 
              type="switch"  
              label={`¿Ud. desea ${!formik.values.status ? "activar" : "desactivar"} al operador?`}
              onChange={formik.handleChange} 
            />
        </Col>
        <Col>
          <Text 
            name={"name"}
            label={"Nombre"}
            values={formik.values.name}
            handleChange={formik.handleChange}
            placeholder={"Ingrese su nombre"}
            touched={formik.touched.name}
            errors={formik.errors.name}
            info={"No debe contener caracteres especiales."}
          />
        </Col>

        <Col>
          <Text 
            name={"surname"}
            label={"Apellido"}
            values={formik.values.surname}
            handleChange={formik.handleChange}
            placeholder={"Ingrese su apellido"}
            touched={formik.touched.surname}
            errors={formik.errors.surname}
            info={"No debe contener caracteres especiales."}
          /> 
        </Col>
      </Row>

      <Text 
        name={"userName"}
        label={"Usuario"}
        values={formik.values.userName}
        handleChange={formik.handleChange}
        placeholder={"Ingrese su nombre de usuario"}
        touched={formik.touched.userName}
        errors={formik.errors.userName}
      />
      
      <Password 
        name={"password"} 
        label={"Contraseña"}  
        value={formik.values.password} 
        handleChange={formik.handleChange} 
        touched={formik.touched.password} 
        errors={formik.errors.password} 
        info={"Su contraeña debe ser mayor a ocho caracteres y debe contener al menos una letra mayuscula, una minuscula y un número. Ej: Mi1erPassword"}
        placeholder={"Escriba su contraseña"} 
      />

      <Password 
        name={"password2"} 
        label={"Repita su contraseña"}  
        value={formik.values.password2} 
        handleChange={formik.handleChange} 
        touched={formik.touched.password2} 
        errors={formik.errors.password2} 
        placeholder={"Ingrese nuevamente su contraseña"} 
      />
          
      <Col className="d-flex justify-content-end mt-4 ">
        <Button variant="success" size="sm" type="submit" className="mx-2">Guardar </Button>
        <Button variant="danger" size="sm" type="button" onClick={handleClose} className="mx-2">Cancelar </Button>
      </Col>
    </Form>     
  </>);
  
}






export const EditOperator = ({id, handleClose}) => {

  //Declaro el consumidor Authenticacion de estados
  const Authentication = useContext(AuthContext); 
 
  //Inicializamos campos de formulario
  const [initialData,setInitialData] = useState({ name:"",surname:"", status:"" });
  
  //Declaro esquemas de validacion de formulario
  const validaciones = Yup.object({
    name: Authentication.validateSchemaText,
    surname: Authentication.validateSchemaText
  })
  
  useEffect(()=>{
       
      GetOperatorById(id).then((res)=>{
        setInitialData({...initialData, 
                        id:id,
                        name:res.data.name,
                        surname:res.data.surname,
                        status:res.data.status
        })
      }).catch((error)=>{
        
      });
   
  },[])

  
  const formik = useFormik({
    initialValues: initialData,
    enableReinitialize:true,
    validationSchema:validaciones,
    onSubmit: (values, {resetForm}) => {
      
      //Enviamos datos del formulario
      PutOperator(values).then((res) =>{

        //Cerramos modal
        handleClose();
        AlertMessage.fire({icon: 'success', title: 'Tarea exitosa!', text: 'Ud. pudo actualizar al operador con exito.', color:'#ffffff', background: '#4caf50', timer:2000 })
          
      }).catch(error => {
          console.error(error.message);
          AlertMessage.fire({ icon: 'error', title: 'Ups! Hubo un error!', text: 'Estamos trabajando para solucionarlo', color:'#ffffff', background: '#ff0000b5', timer:3000})
      });
    
    }
  });

  return (<>
    <Form  onSubmit={formik.handleSubmit} >
      <Row className="mb-3">
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Form.Check 
            id="status" 
            name="status" 
            type="switch"  
            label={`¿Ud. desea ${!formik.values.status ? "activar" : "desactivar"} al operador?`}
            checked={formik.values.status}
            onChange={formik.handleChange}  
          />
        </Col>
        <Col>
          <Text 
            name={"name"}
            label={"Nombre"}
            values={formik.values.name}
            handleChange={formik.handleChange}
            placeholder={"Ingrese su nombre"}
            touched={formik.touched.name}
            errors={formik.errors.name}
            info={"No debe contener caracteres especiales."}
          />
        </Col>

        <Col>
          <Text 
            name={"surname"}
            label={"Apellido"}
            values={formik.values.surname}
            handleChange={formik.handleChange}
            placeholder={"Ingrese su apellido"}
            touched={formik.touched.surname}
            errors={formik.errors.surname}
            info={"No debe contener caracteres especiales."}
          /> 
        </Col>
      </Row>
          
      <Col className="d-flex justify-content-end mt-4 ">
        <Button variant="success" size="sm" type="submit" className="mx-2">Guardar </Button>
        <Button variant="danger" size="sm" type="button" onClick={handleClose} className="mx-2">Cancelar </Button>
      </Col>
    </Form>     
  </>);
  
}
