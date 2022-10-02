import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Form, Col, InputGroup} from 'react-bootstrap';


export const Password = (props) => {
    const {name, label, size, value, handleChange, touched, errors, info, placeholder} = props;

    const [showPass,setShowPass] = useState(true);
    const handleClick = () =>{
        setShowPass(!showPass);
      }

    return(<>
        <Form.Label htmlFor={name}  className="mt-3 mb-0">{label}</Form.Label>
        <InputGroup className="mb-1">
            <Form.Control
                id={name} 
                name={name} 
                size={size || "sm"} 
                type={`${showPass ? 'text' : 'password'}`}  
                value={value} 
                onChange={handleChange} 
                placeholder={placeholder} 
            />
            <InputGroup.Text>
                <FontAwesomeIcon  icon={`fa-solid ${showPass ? 'fa-eye' : 'fa-eye-slash'}`} size="1x" onClick={handleClick} />
            </InputGroup.Text>
        </InputGroup>
        <Form.Text id="passwordHelpBlock"  muted>
        {
            touched && errors ? 
                (<Col><p className="errose">{errors}</p></Col>) 
            : 
                (<Col><p className="info">{info}</p></Col>)
        }
        </Form.Text>
    </>)

}

export const Text = (props) =>{
    const {name,label,size,values,handleChange,handleBlur,placeholder,touched,errors,info} = props;
    return(<>
        <Form.Label htmlFor={name}  className="mb-0">{label}</Form.Label>
        <Form.Control 
            id={name}
            name={name} 
            size={size || "sm"} 
            type="text" 
            value={values} 
            onChange={handleChange} 
            onBlur={handleBlur}
            placeholder={placeholder}
        />
        <Form.Text id="passwordHelpBlock" muted>
        {
            touched && errors ? 
            (<Col><p className="errose">{errors}</p></Col>) 
          : 
            (<Col><p className="info">{info}</p></Col>)

        }
        </Form.Text>
    </>)
}
