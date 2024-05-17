import React, {useContext, useEffect, useState } from "react";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import AppPage from "../pages/AppPage"
import { Route, BrowserRouter,Routes} from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";

const AppRoutes = () => {
  
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/auth/home" element={ 
            <PrivateRoute>
              <AppPage/>
            </PrivateRoute>
        } />
        
    </Routes>
  </BrowserRouter>
)
}

export default AppRoutes;