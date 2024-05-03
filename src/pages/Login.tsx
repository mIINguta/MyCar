import React, { useEffect, useState } from 'react';
import LabelLoginComponent from '../components/LabelLoginComponent';
import imgBackground from '../assets/background1.jpg';
import axios from 'axios';

export default function Login(){
let tokenAuth:any;
const [usuario, setUsuario] = useState(0);
const [password, setPassword] = useState(0);

const handleUsuario = (e:any) => {
setUsuario(e.target.value)
}
const handlePassword = (e:any) => {
setPassword(e.target.value)
}

const autorizado = async () =>{
        try {
            const response = await axios.get("http://localhost:5207/Values/ObterCarros", {
                    headers: {
                        'Authorization': `Bearer ${tokenAuth}`
                    }});
                    console.log('Funfou! ' + response.data)
                }
                catch (error){
                    console.log(error);
}}

const submitLogin = async () => {
    try{
        const response = await axios.post("http://localhost:5207/Usuarios/Login",{
                'email': `${usuario}`,
                'senha':`${password}`
            });
           tokenAuth = response.data.token;
           autorizado();
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
                <h1>Login</h1>
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
            
        </section>
        
        <div className="imgBackground">
            <img src={imgBackground} alt="Background Aplicação" /></div>        
        </section>
        </>
    )
}