import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import Aside from "../components/Aside"
import { AuthContext } from "../Context/AuthContext";
import LabelLoginComponent from "../components/LabelLoginComponent";
import { error } from "console";
import Loader from "../components/Loader";
export default function MeusDados(){

const {userEmail, userId, userToken, userName}:any = useContext(AuthContext);
const [userEmailBD, setUserEmailBD] = useState();
const [userNameBD, setUserNameBD] = useState();
const [passwordBD, setPasswordBD] = useState();
const [passwordBDConfirm, setPasswordBDConfirm] = useState();
const [message, setMessage] = useState("");
const [carregando, setCarregando] = useState(true);

const receberDados = async () =>{
    await axios.get("http://localhost:5207/users/ReceberDadosUsuario", {
        params: {
            usuario: userName || sessionStorage.getItem('userLogin')
        }
    }).then(result => {
        setUserNameBD(result.data.normalizedUserName);
        setUserEmailBD(result.data.email);
        setCarregando(false);

    }).catch(error =>{
        console.log(error)
    })
}

const handleUserName = (e:any) =>{
    setUserNameBD(e.target.value);
}
const handleUserEmail = (e:any) =>{
    setUserEmailBD(e.target.value);
}
const handleUserPassword = (e:any) =>{
    setPasswordBD(e.target.value);
    console.log("Senha:" + passwordBD);
}
const handleUserPasswordConfirm = (e:any) =>{
    setPasswordBDConfirm(e.target.value);
    console.log("Senha Confirm:" + passwordBDConfirm);
    verifyPassword();
}

const verifyPassword = () =>{
    (passwordBD && passwordBDConfirm != "") && (passwordBD == passwordBDConfirm) ? setMessage("As senhas são válidas") : setMessage("As senhas não são iguais");
    // message != " "?  enviarDados() : console.log("Não foi!");
}

useEffect(() =>{
    receberDados()
}, [])
    return (

        <>
        {carregando && <Loader/>}
        <section className={`conteiner-meusdados ${carregando ? 'loading' : 'loaded' }`}>
        <Aside userName = {userName || sessionStorage.getItem('userLogin')}/>
        <div className="div-form">
            <form action='post'>
                <h1>Aqui estão seus dados <span>!</span></h1>
                    <LabelLoginComponent
                        name = "nome"
                        placeholder = {sessionStorage.getItem('userLogin')}
                        IClassName = "fa-solid fa-user"
                        change = {handleUserName}
                    />
                    <LabelLoginComponent
                    name = "email"
                    placeholder = {sessionStorage.getItem('userEmail')}
                    IClassName = "fa-solid fa-envelope"
                    change = {handleUserEmail}
                    />
                    
                    <LabelLoginComponent
                    name = "senha"
                    placeholder = "Senha"
                    IClassName = "fa-solid fa-lock"
                    change = {handleUserPassword}
                    />
                    <LabelLoginComponent
                    name = "conf-senha"
                    placeholder = "Confirme sua senha"
                    IClassName = "fa-solid fa-lock"
                    change = {handleUserPasswordConfirm}
                    />
                    <p>{message}</p>
                    <a className="btn-entrar" onClick={verifyPassword} >Atualizar</a>
                </form>
                </div>
        </section>
        </>
    )
}