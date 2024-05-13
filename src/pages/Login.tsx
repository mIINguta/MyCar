import React, { useEffect, useState } from 'react';
import LabelLoginComponent from '../components/LabelLoginComponent';
import imgBackground from '../assets/background1.jpg';
import axios from 'axios';
import imgLogo from '../assets/logo-redonda.png';
import { Link, Navigate, Routes, useNavigate} from 'react-router-dom';
import isAuthenticated from '../auth';

export default function Login(){
let tokenAuth:any;
const [usuario, setUsuario] = useState(0);
const [password, setPassword] = useState(0);
const navigate = useNavigate();

const handleUsuario = (e:any) => {
setUsuario(e.target.value)
}
const handlePassword = (e:any) => {
setPassword(e.target.value)
}

const submitLogin = async () => {
    try{
        const response = await axios.post("http://localhost:5207/users/Login",{
                'email': `${usuario}`,
                'senha':`${password}`
            });
           tokenAuth = await response.data.token;
           isAuthenticated(tokenAuth); 
           isAuthenticated()? navigate('/login'): 'Deu ruim';
        }
            catch(error){
            console.log(error);
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
                    />
                    <LabelLoginComponent
                    name = "senha"
                    placeholder = "Senha"
                    IClassName = "fa-solid fa-lock"
                    change = {handlePassword}
                    />
                        <a className='btn-entrar' onClick={submitLogin}>Entrar</a>
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