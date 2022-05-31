import { Navigate } from "react-router-dom";
import React from 'react';


function Logout(){

    localStorage.setItem('userRole','notSet');
   
    return(
         <Navigate to="/"/>
    );
}

export default Logout;