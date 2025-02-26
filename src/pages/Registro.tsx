import { useState, useRef, useLayoutEffect, useEffect} from "react";
import LabelLoginComponent from "../components/LabelLoginComponent";
import axios from "axios";
import imgBackground from '../assets/background-toyota.jpg';
import imgLogo from '../assets/logo-redonda.png';
import { useNavigate } from "react-router";



export default function Registro(){
const [password, setPassword] = useState();
const [email, setEmail] = useState();
const [active, setActive] = useState(false);
const componentRef = useRef<HTMLFieldSetElement>(null);
const navigate = useNavigate();

const handleEmail = (e:any) =>{
    setEmail(e.target.value);
}
const handlePassword = (e:any) =>{
    setPassword(e.target.value);
}

const submitRegistro = async () =>{
    try{
        await axios.post("http://localhost:5207/users", {
            "email": `${email}`,
            "senha": `${password}`,
        }).then(response =>{
            window.alert("Sua conta foi criada com sucesso!");
            navigate('/');
        })
        
        
}   catch(erro){
    console.log(erro);
    }
}

const infoPassword = () => {
    console.log("Focus!");
    setActive(true);
}


    return (
        <>
        <section className="registro">
            <section className="registroFormConteiner">
                    <form action="post">
                    <img className="imgLogo" src={imgLogo} alt="Imagem da Logo MyCar" />
                        <h1>Crie uma nova conta<span>.</span></h1>
                    <LabelLoginComponent
                    name = "email"
                    placeholder = "Email"
                    IClassName = "fa-solid fa-envelope"
                    change = {handleEmail}
                    type="email"
                    />
                    <LabelLoginComponent
                    name = "senha"
                    placeholder = "Senha"
                    IClassName = "fa-solid fa-lock"
                    change = {handlePassword}
                    type = "password"
                    className="password"
                    onFocus = {infoPassword}
                    />
                    
                    <button onClick={submitRegistro}>Registrar</button>
                    <fieldset className={`password-validations ${active? 'ativo': 'desativo'}`} ref={componentRef}>
                        <h3>A senha deve conter:</h3>
                        <p>Uma letra maiúscula</p>
                        <p>Uma letra minúscula</p>
                        <p>Um caracter especial</p>
                    </fieldset>
                </form>
                <figure className="imgBackground-registro">
                    <img src={imgBackground} alt="Background Aplicação" />
                </figure>
            </section>
        </section>
                

        </>
    )
}