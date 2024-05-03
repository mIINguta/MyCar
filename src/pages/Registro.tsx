import React, { useState } from "react";
import LabelLoginComponent from "../components/LabelLoginComponent";
import axios from "axios";
import imgBackground from '../assets/background-toyota.jpg';



export default function Registro(){
const [password, setPassword] = useState();
const [email, setEmail] = useState();

const handleEmail = (e:any) =>{
    setEmail(e.target.value);
}
const handlePassword = (e:any) =>{
    setPassword(e.target.value);
}

const submitRegistro = async () =>{
    try{
        const result = await axios.post("http://localhost:5207/Usuarios/Registrar", {
            "email": `${email}`,
            "senha": `${password}`,
        });
        console.log(result.data);
}   catch(erro){
    console.log(erro);
    }
}
    return (
        <>
        <section className="registro">
            <section className="registroFormConteiner">
                <form action="post">
                    <h1>REGISTRO</h1>
                    <LabelLoginComponent
                    name = "email"
                    placeholder = "Email"
                    IClassName = "fa-solid fa-envelope"
                    change = {handleEmail}
                    />
                    <LabelLoginComponent
                    name = "senha"
                    placeholder = "Senha"
                    IClassName = "fa-solid fa-lock"
                    change = {handlePassword}
                    />
                    <a onClick={submitRegistro}>REGISTRAR</a>
                </form>
                <figure className="imgBackground">
                    <img src={imgBackground} alt="Background Aplicação" />
                </figure>
            </section>
            
        </section>
                

        </>
    )
}