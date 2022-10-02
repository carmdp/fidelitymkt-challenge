import React from 'react';
import AuthContext from './Contexts';
import * as Yup from 'yup';

const AuthProvider = ({children}) => {

    const regexPass = /(?=(.*[0-9]))(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    const validateSchemaText = Yup.string()
      .min(3, 'Demasiado corto! - Debe ser mayor a 5 caracteres.')
      .max(25, 'Muy largo! - Debe ser menor a 25 caracteres.')
      .matches(/^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/,"Error - Solo puede contener caracteres en mayusculas/minusculas.")
      .required("Campo obligatorio");
  
    const validateSchemaPass = Yup.string()
        .min(8, 'Demasiado corta! - La contraseña debe ser mayor a 8 caracteres.')
        .matches(regexPass,"ERROR - La contraseña debe contener al menos 1 caracter especiales, 1 numerico, 1 mayuscula y 1 minuscula.")
        .required("Campo obligatorio"); 

    
    const Login = (params) => {      
        localStorage.setItem('user',params.user);
        localStorage.setItem('token',params.token);
        localStorage.setItem('loggedIn',true);
    }

    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
    }
    
    return(
            <AuthContext.Provider
                value={{
                    Login,
                    Logout,
                    validateSchemaPass,
                    validateSchemaText,
                }}
            >
                {children}
            </AuthContext.Provider>
    )
    
}

export default AuthProvider; 