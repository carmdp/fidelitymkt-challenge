import React,{useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes,{RedirectDashboard} from './PrivateRoutes'; 


import Home from 'components/pages/Home';
import Dashboard from 'components/pages/Dashboard';


export default function App() {

  return (<>

      <Routes>
        <Route element={<RedirectDashboard destination="/dashboard" />} > 
          <Route path="/" element={<Home />} />
        </Route>
      
        <Route element={<PrivateRoutes destination="/" />} > 
          <Route path="/dashboard"  element={<Dashboard />} /> 
        </Route>
      </Routes>

  </>);
  
}
