import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import AuthProvider from "context/AuthProvider";
import App from 'config/Routes';

import 'assets/css/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faKey, faEye, faEyeSlash, faUserPlus, faUser, faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons'


library.add( faSpinner, faKey, faEye, faEyeSlash, faUserPlus, faUser, faPenToSquare,faTrashCan )


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <BrowserRouter>
  
        <AuthProvider>
          <App />    
        </AuthProvider>
  
    </BrowserRouter>    
  </React.StrictMode>
);


