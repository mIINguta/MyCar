import React from "react";
import { Navigate } from "react-router";


export const PrivateRoute = ({children}:any) =>{
    const token = sessionStorage.getItem('tokenAuth');
    return token ? children : <Navigate to= '/'/>
}