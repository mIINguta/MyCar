import {useState } from "react";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Principal from "../pages/Principal"
import { Route, BrowserRouter,Routes} from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";
import { AuthContext } from "../Context/AuthContext";
import CadastrarCarro from "../pages/CadastrarCarro";

const AppRoutes = () => {
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  return (
  <BrowserRouter>
  <AuthContext.Provider value={{userId, setUserId, userName, setUserName, userEmail, setUserEmail, userToken, setUserToken}}>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/auth/home" element={ 
            <PrivateRoute>
              <Principal/>
            </PrivateRoute>
        } />
    <Route path="/auth/cadastrarCarro" element={ 
            <PrivateRoute>
              <CadastrarCarro/>
            </PrivateRoute>
        } />
    <Route path="/auth/registrarManutencao" element={ 
            <PrivateRoute>
             
            </PrivateRoute>
        } />
    <Route path="/auth/editarDados" element={ 
            <PrivateRoute>
     
            </PrivateRoute>
        } />
    </Routes>
    </AuthContext.Provider>
  </BrowserRouter>
)
}

export default AppRoutes;