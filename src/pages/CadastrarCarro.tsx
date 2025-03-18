import { useContext, useEffect, useState } from "react";
import Aside from "../components/Aside";
import { AuthContext } from "../Context/AuthContext";
import LabelLoginComponent from "../components/LabelLoginComponent";
import axios from "axios";
import { redirect } from "react-router";
import Cars from "../components/Cars";

export default function CadastrarCarro(){
const {userEmail, userId, userToken, userName}:any = useContext(AuthContext);
const [carro, setCarro] = useState({
        id:0,
        modelo: "",
        marca:"",
        placa:"",
        anoFabricacao: 0,
        quilometragemCompra: 0,
        quilometragemAtual: 0,
        idCarro: 0,
        idUsuario:userId,
        manutencoes:[]
})



axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`}

function handleChange (e:any){
    const name = e.target.name;
    switch(name){
        case "marca":{
            setCarro({...carro, marca: (e.target.value)});
            break;
        }
        case "modelo":{
            setCarro({...carro, modelo: (e.target.value)});
            break;
        }
        case "placa":{
            setCarro({...carro, placa: (e.target.value)});
            break;
        }
        case "anoFabricacao":{
            setCarro({...carro, anoFabricacao: (e.target.value)});
            break;
        }
        case "quilometragemCompra":{
            setCarro({...carro, quilometragemCompra: (e.target.value)});
            break;
        }
        case "quilometragemAtual":{
            setCarro({...carro, quilometragemAtual: (e.target.value)});
            break;
        }
    }
}

const cadCarro = async () =>{
    try{
        await axios.post('http://localhost:5207/auth/register', carro
        ).then(
            response => {
                response.data
                window.alert("O cadastro foi realizado com sucesso!");
                redirect('http://localhost:5173/auth/home');
            }
        )}
        catch(error){
            console.log('algo de errado aconteceu');
        }}

    return (
        <>
        <section className="conteiner-cadcarros">
        <Aside userName ={userName || sessionStorage.getItem('userLogin')}/>
        <div className="div-form">
            <form action='post'>
                <h1>Insira as informações do seu veículo</h1>
                    <LabelLoginComponent
                    name = "modelo"
                    placeholder = "Modelo"
                    IClassName = "fa-solid fa-user"
                    change = {handleChange}
                    />
                    <LabelLoginComponent
                    name = "marca"
                    placeholder = "Montadora"
                    IClassName = "fa-solid fa-lock"
                    change = {handleChange}
                    />
                    <LabelLoginComponent
                    name = "placa"
                    placeholder = "Placa"
                    IClassName = "fa-solid fa-lock"
                    change = {handleChange}
                    />
                    <LabelLoginComponent
                    name = "anoFabricacao"
                    placeholder = "Ano (Fabricação)"
                    IClassName = "fa-solid fa-lock"
                    change = {handleChange}
                    />
                    <LabelLoginComponent
                    name = "quilometragemCompra"
                    placeholder = "Kilometragem (Compra)"
                    IClassName = "fa-solid fa-lock"
                    change = {handleChange}
                    />
                    <LabelLoginComponent
                    name = "quilometragemAtual"
                    placeholder = "Kilometragem (Atual)"
                    IClassName = "fa-solid fa-lock"
                    change = {handleChange}
                    />
                    <a className="btn-entrar" onClick={cadCarro}>Cadastrar</a>
                </form>
        </div>
        <div>
        
        <Cars 
        {...carro}
        />
         
        </div>
            </section>
        </>
    )
}