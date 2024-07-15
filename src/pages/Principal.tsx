import Aside from "../components/Aside"
import Ferrari from "../assets/images/ferrari-foto.jpg"
import axios from "axios"
import {useContext, useEffect, useState} from "react"
import Loader from "../components/Loader"
import { AuthContext } from "../Context/AuthContext"

export default function Principal(){

const [carregando, setCarregando]:any = useState();
const {userId,setUserId, userToken, userEmail, setUserEmail, userName, setUserName}:any = useContext(AuthContext);
const [cars, setCars]:any = useState();
const [loadingCars, setLoadingCars] = useState(true);
axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`}

async function ReceberDados(){
    try{
       await axios.get(`http://localhost:5207/users/ReceberDadosUsuario`, {
            params:{
                usuario: (sessionStorage.getItem('userLogin'))
            }}).then(response =>{
                const resposta = response.data[0];
                console.log(resposta);
                setUserEmail(resposta.email);
                setUserName(resposta.normalizedUserName);
                setUserId(resposta.id);
                sessionStorage.setItem('user_id', resposta.id);
                sessionStorage.setItem('userEmail', resposta.email);
                
        });
            }catch(error){
            console.log(error);
            }finally{
            setCarregando(false); 
            getItems();
            
    };
}
async function getItems(){ 
    try{
       await axios.get('http://localhost:5207/auth/ConsultarCarrosUsuario', {
            params:{
                id: (userId || sessionStorage.getItem('user_id'))}
        }).then(response =>{
            setCars(response.data);

    });
    }catch(error){
        console.log(error);
    }finally{
        setLoadingCars(false);
    }
    return { cars, loadingCars}
}
useEffect(() =>{
    ReceberDados()}, []);


    return (
        <> 
       {carregando && <Loader/>}
        <section className={`conteiner-AppPage ${carregando ? 'loading' : 'loaded' }`}>   {/* lógica para puxar classe*/}
            <Aside 
            userName = {userName? userName : userEmail}/>
            <section className="sec-home">
                <h2>Carros</h2>
            <section className="sec-carros">
                {loadingCars && <Loader/>}
                {carregando? <Loader/> : cars?.map((carros:any) => { // só vai começar a carregar, depois do loading dos dados.
                    return (
                    <div className="div-carros" key={carros}>
                    <figure>
                        <img src={Ferrari} alt="" />
                    </figure>
                        <div className="info">
                        <p>
                            <span className="modelo">{carros.marca}</span>
                            <span> {carros.nome}</span>
                            <span> {carros.anoFabricacao}</span>
                            
                        </p>
                        {/* Inserir formatação depois */}
                        <span className="kilometragem">{carros.kilometragem}km</span> 
                        </div>
                     </div>
                )})}
                    </section>
            <h2>Manutenções</h2>
            <section className="sec-manutencoes" >
            {cars?.map((carros:any) => {
                return (
                    // coloquei dois maps para mapear as manutencoes inseridas
                    carros.manutencoes?.map((manutencoes:any) =>{
                    return ( 
                        <div className="div-manutencoes" key={manutencoes.id} >
                        <div className="info" >
                            <span className="modelo">{carros.nome} </span>
                            <p>{manutencoes.nome}</p>
                            <p>{manutencoes.dataManutencao}</p> 
                            <p>R${manutencoes.valor}</p>
                            <p>Troca: {manutencoes.kmTroca}km</p>
                            <p>Próxima Troca: {manutencoes.kmMax}km</p>
                        </div>
                        </div>
                    )})
                    )})}        
            </section>
        </section>
        <section className="atalhos">
            <h1>Próximas Revisões</h1>
            {cars?.map((carros:any) =>{
                return (
                <div className="info-rapidas" key={carros}>
                    <p><span>Veículo: </span><span>{carros.nome}</span></p>
                    <p><span>Kilometragem Atual: </span><span>{carros.kilometragem}</span></p>
                    <p><span className="produto">Produto: </span><span>{carros.manutencoes.nome}</span> </p>
                    <p className="KM-troca"><span>Km da troca:</span> <span>{carros.manutencoes.kmTroca}</span></p>
                    <p className="KM-max"><span>Km máxima:</span><span>{carros.manutencoes.kmMax}</span></p>
                </div>
                )
            })}
        </section>
       </section>
    </>
    )
    }