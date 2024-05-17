import React, {useEffect, useState } from 'react';
import LabelLoginComponent from '../components/LabelLoginComponent';
import imgBackground from '../assets/background1.jpg';
import axios from 'axios';
import imgLogo from '../assets/logo-redonda.png';
import {useNavigate} from 'react-router-dom';



export default function Login(){
const [usuario, setUsuario] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate(); // uso para redirecionar a rota quando for válido o usuário

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
            }
        ).then( response =>{
                const token = response.data.token;
                sessionStorage.setItem('tokenAuth', token);
                sessionStorage.setItem('userToken', usuario);
                navigate('/auth/home'); // partindo para rota se for válido
        }) 
        }catch(error){
            console.log('Erro 404');
            sessionStorage.removeItem('tokenAuth');
            sessionStorage.removeItem('userToken');
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