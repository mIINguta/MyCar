import { useContext, useState } from "react";
import Aside from "../components/Aside";
import { AuthContext } from "../Context/AuthContext";
import LabelLoginComponent from "../components/LabelLoginComponent";
import axios from "axios";

export default function CadastrarCarro(){
const {userEmail, userId, userToken}:any = useContext(AuthContext);
const [modelo, setModelo] = useState("");
const [montadora, setMontadora] = useState("");
const [anoFabricacao, setAnoFabricacao] = useState("");
const [kilometragem, setKilometragem] = useState("");
const [kilometragemAtual, setKilometragemAtual] = useState("");


const handleModelo = (e:any) =>{
setModelo(e.target.value);
}
const handleMontadora = (e:any) =>{
setMontadora(e.target.value);
}
const handleAnoFabricacao = (e:any) =>{
setAnoFabricacao(e.target.value);
}
const handleKilometragem = (e:any) =>{
setKilometragem(e.target.value);
}
const handleKilometragemAtual = (e:any) =>{
setKilometragemAtual(e.target.value);
}


const cadCarro = async () =>{
    try{
        await axios.post('http://localhost:5207/auth/RegistrarCarro', {
            'nome': `${modelo}`,
            'marca': `${montadora}`,
            'anoFabricacao': `${anoFabricacao}`,
            'kilometragem': `${kilometragem}`,
            'kilometragemAtual': `${kilometragemAtual}`,
            'idUsuario': `${(userId || sessionStorage.getItem('user_id'))}`,
            'manutencoes': []
        }, {
            headers: {
                'Authorization': `Bearer ${userToken || sessionStorage.getItem('tokenAuth')} `
            }
        }).then(
            response => response.data
        )}catch(error){
            console.log('algo de errado aconteceu');
        }  
    
}


    return (
        <>
        <section className="conteiner-cadcarros">
        <Aside userName ={ userEmail}/>
        <div className="div-form">
            <form action='post'>
                <h1>Cadastre o seu carro <span>!</span></h1>
                    <LabelLoginComponent
                        name = "modelo"
                        placeholder = "Modelo"
                        IClassName = "fa-solid fa-user"
                        change = {handleModelo}
                    />
                    <LabelLoginComponent
                    name = "marca"
                    placeholder = "Montadora"
                    IClassName = "fa-solid fa-lock"
                    change = {handleMontadora}
                    />
                    
                    <LabelLoginComponent
                    name = "anoFabricacao"
                    placeholder = "Ano (Fabricação)"
                    IClassName = "fa-solid fa-lock"
                    change = {handleAnoFabricacao}
                    />
                    <LabelLoginComponent
                    name = "kilometragem"
                    placeholder = "Kilometragem (Compra)"
                    IClassName = "fa-solid fa-lock"
                    change = {handleKilometragem}
                    />
                    <LabelLoginComponent
                    name = "kilometragem"
                    placeholder = "Kilometragem (Atual)"
                    IClassName = "fa-solid fa-lock"
                    change = {handleKilometragemAtual}
                    />
                    <a className="btn-entrar" onClick={cadCarro}>Cadastrar</a>
                </form>
                </div>
            </section>
        </>
    )
}