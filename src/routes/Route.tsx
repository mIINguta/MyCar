import React, {useState } from "react";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Principal from "../pages/Principal"
import { Route, BrowserRouter,Routes} from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";
import { AuthContext } from "../Context/AuthContext";

const AppRoutes = () => {
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userEmail, setUserEmail] = useState('')

  return (
  <BrowserRouter>
  <AuthContext.Provider value={{userId, setUserId, userEmail, setUserEmail, userToken, setUserToken}}>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/auth/home" element={ 
            <PrivateRoute>
              <Principal/>
            </PrivateRoute>
        } />
    </Routes>
    </AuthContext.Provider>
  </BrowserRouter>
)
}

export default AppRoutes;