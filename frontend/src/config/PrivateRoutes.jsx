import React, {useContext} from 'react';
import {AuthContext} from 'context/Contexts';
import {Outlet, Navigate} from 'react-router-dom';


const PrivateRoutes = ({destination}) => {
    const auth = localStorage.getItem("token")

    return (<>
       {auth ? <Outlet /> : <Navigate to={destination} />}
    </>)
}

export const RedirectDashboard = ({destination}) => {
    const auth = localStorage.getItem("token")

    return (<>
       {!auth ? <Outlet /> : <Navigate to={destination} />}
    </>)
}

export default PrivateRoutes;