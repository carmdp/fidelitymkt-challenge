import React, {useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import AuthContext from "context/Contexts";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Button} from 'react-bootstrap';

export const ButtonLoginOut = ({text}) => {

    const Logout = useContext(AuthContext).Logout;
    const navigate = useNavigate();

    const handleClick = () =>{
        
        Logout();
        
        navigate("/");
    }

    return(
        <Link to="/" onClick={handleClick} className="btn btn-primary">
            <span>  {text || "Text"}  </span>
        </Link>  
    )
}


export const AddOperators = ({handleClick}) => {
 
    return (<>
        <Button variant="success" className="mx-2 my-1" title={"Añadir operador"} onClick={handleClick}> 
            <FontAwesomeIcon icon={"fa-solid fa-user-plus"} size="xl"/>
        </Button> 
    </>)
 
}

export const EditOperators = ({handleClick}) => {
 
    return (<>
        <Button variant="primary" className="mx-2 my-1" title={"Modificar operador"} onClick={handleClick} > 
            <FontAwesomeIcon icon={"fa-solid fa-pen-to-square"} size="xl"/> 
        </Button> 
    </>)
 
}

export const RemoveOperators = ({id}) => {
 
    return (<>
        <Button variant="danger" className="mx-2 my-1" title={"Eliminar operador"}>
            <FontAwesomeIcon icon={"fa-solid fa-trash-can"} size="xl"/> 
        </Button> 
    </>)
 
}
