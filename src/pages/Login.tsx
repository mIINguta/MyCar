import React, {useContext, useState } from 'react';
import LabelLoginComponent from '../components/LabelLoginComponent';
import imgBackground from '../assets/background1.jpg';
import axios from 'axios';
import imgLogo from '../assets/logo-redonda.png';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


export default function Login(){
const [userLogin, setUserLogin] = useState("");
const [password, setPassword] = useState("");
const [msgErro, setMsgErro] = useState("");
const {setUserToken, setUserEmail, setUserName, setUserId}:any = useContext(AuthContext);


const navigate = useNavigate(); // uso para redirecionar a rota quando for válido o usuário
const handleUsuario = (e:any) => {
setUserLogin(e.target.value)
}
const handlePassword = (e:any) => {
setPassword(e.target.value)
}
const submitLogin = async () => {
    try{
        await axios.post(`http://localhost:5207/users/${userLogin}`,{
                email: userLogin, //aqui eu repito pois estou puxando na api o body da classe User
                senha: password
            }
        ).then(response =>{
                const token = response.data.token;
                setUserToken(token);
                setUserName(userLogin);
                sessionStorage.setItem('tokenAuth', token);
                sessionStorage.setItem('userLogin', userLogin);
                navigate('auth/home'); // partindo para rota se for válido
        }) 
        }catch(error){
            setMsgErro("Login Inválido. Por favor, verique suas credenciais.");
            sessionStorage.removeItem('tokenAuth');
            sessionStorage.removeItem('userLogin');
            sessionStorage.removeItem('user_id');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userEmail');
} 
}
    return(
        <>
        <section className="login">
        <section className="loginFormConteiner">
            <form action='post'>
            <img className="imgLogo" src={imgLogo} alt="" />
                <h1>Olá, seja bem-vindo <span>!</span></h1>
                    <LabelLoginComponent
                        name = "usuario"
                        placeholder = "Usuario"
                        IClassName = "fa-solid fa-user"
                        change = {handleUsuario}
                        type = "text"
                    />
                    <LabelLoginComponent
                    name = "senha"
                    placeholder = "Senha"
                    IClassName = "fa-solid fa-lock"
                    change = {handlePassword}
                    type= "password"
                    />
                    {msgErro ? <span>{msgErro}</span> : null}
                    <a className='btn-entrar'
                    onClick={submitLogin}>Entrar</a>
                    <div className="buttons">
                        <a href="">Esqueci minha senha</a>
                        <a href="/registro">Registre-se</a>
                    </div>
            </form>
            <figure className="imgBackground">
            <img src={imgBackground} alt="Background Aplicação" /></figure>  
        </section>
        </section>
        </>
    )
}
