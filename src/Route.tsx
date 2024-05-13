import React from "react";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import AppPage from "./pages/AppPage"
import isAuthenticated from "./auth";

import { Route, BrowserRouter,Routes, Navigate} from 'react-router-dom';

const PrivateRoute =({children}:any) =>{
    return isAuthenticated() ? children : <Login/> // aqui está uma rota privada. Se True, ela vai para a página filha. Se false, fica na mesma página.
}

const AppRoutes = () => {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/login" element={
          //pagina filha abaixo.
          <PrivateRoute> 
            <AppPage/> 
          </PrivateRoute>
        } />
    </Routes>
  </BrowserRouter>
)
}

export default AppRoutes;