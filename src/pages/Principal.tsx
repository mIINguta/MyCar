import Aside from "../components/Aside"
import Ferrari from "../assets/images/ferrari-foto.jpg"
import axios from "axios"
import {useContext, useEffect, useState} from "react"
import Loader from "../components/Loader"
import { AuthContext } from "../Context/AuthContext"
import Cars from "../components/Cars"
import Manutencao from "../components/Manutencao"




export default function Principal(){


const {userId,setUserId, userToken, userEmail, setUserEmail, userName, setUserName}:any = useContext(AuthContext);
const [cars, setCars]:any = useState([]);
const [loadingCars, setLoadingCars] = useState(true);

axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`}

async function ReceberDados(){
    try{
       await axios.get(`http://localhost:5207/users/ReceberDadosUsuario`, {
            params:{
                usuario: (sessionStorage.getItem('userLogin'))
            }}).then(response =>{
                const resposta = response.data[0];
                setUserEmail(resposta.email);
                setUserName(resposta.normalizedUserName);
                setUserId(resposta.id);
                sessionStorage.setItem('user_id', resposta.id);
                sessionStorage.setItem('userEmail', resposta.email);
                
        });
            }catch(error){
            console.log(error);
            }finally{
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
        {loadingCars && <Loader/>}
        <section className={`conteiner-AppPage`}>   {/* lógica para puxar classe*/}
            <Aside 
            userName = {userName? userName : userEmail}/>
            
            {cars.length != 0? 
            <>
            <section className="sec-home">
                <h2>Carros</h2>
            <section className="sec-carros" >
                
                {loadingCars? <Loader/> : cars?.map((carros:any) => { // só vai começar a carregar, depois do loading dos dados.
                    return (
                        <>
                        <Cars 
                        {...carros}        
                        show = {false}
                        imagem = {Ferrari} />
                        </>
                            )})}
            </section>
            <h2>Manutenções</h2>
            <section className="sec-manutencoes" >
            
            {cars?.map((carros:any) => {
                return (
                    // coloquei dois maps para mapear as manutencoes inseridas
                    carros.manutencoes?.map((manutencoes:any) =>{
                    
                    return ( 
                    <Manutencao
                    {...manutencoes}
                    carroNome = {carros.modelo}
                    />

                    ) })
                    
                )})} 
            </section>
        </section>
        
        <section className="atalhos">
            <h2>Próximas Revisões ❗❗</h2>
            {cars?.map((carros:any, i:number) =>{
                return (
                    <>
                    {/* verificar antes se existe alguma manutenção cadastrada */}
                    {carros.manutencoes[i] == undefined ? 
                        null 
                        : 
                        <>
                        {(carros.manutencoes[i].quilometragemMaxima - carros.quilometragemAtual) > 1000? 
                            <p>As manutenções se encontram no prazo!</p>
                            :
                            <>
                            <div className="info-rapidas" key={carros.id}>
                                <p><span>Veículo: </span><span>{carros.modelo}</span></p>
                                <p><span>Placa: </span><span>{carros.placa}</span></p>
                                <p><span>Quilometragem atual: </span><span>{carros.quilometragemAtual.toLocaleString()} km</span></p>
                                <p><span className="produto">Descrição: </span>{carros.manutencoes[i].descricao} </p>
                                <p>Quilometragem de <span className="KM-troca">troca: </span>{carros.manutencoes[i].quilometragemAtual.toLocaleString()} km</p>
                                <p>Quilometragem <span className="KM-max">máxima: </span>{carros.manutencoes[i].quilometragemMaxima.toLocaleString()} km</p>
                            </div>
                            </>
                        }
                        </>
                    }
                   
                  
                
                
                </>
                )
            })}
        </section>
        </> : <h1>Não existem informações cadastradas.</h1> }
       </section>
    </>
    )
}
