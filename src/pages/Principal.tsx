import Aside from "../components/Aside"
import Ferrari from "../assets/images/ferrari-foto.jpg"
import axios from "axios"
import {useContext, useEffect, useState} from "react"
import Loader from "../components/Loader"
import { AuthContext } from "../Context/AuthContext"

export default function Principal(){

const [userName, setUserName] = useState('');
const [carregando, setCarregando]:any = useState();
const {userId,setUserId, userToken, userEmail}:any = useContext(AuthContext);
const [cars, setCars]:any = useState();
const [loadingCars, setLoadingCars] = useState(true);

async function ReceberDados(){
    try{
       await axios.get(`http://localhost:5207/users/ReceberDadosUsuario`, {
            params:{
                email: (userEmail || sessionStorage.getItem('userToken'))
            }}).then(response =>{
                const resposta = response.data[0];
                setUserName(resposta.normalizedUserName);
                setUserId(resposta.id);
                sessionStorage.setItem('user_id', resposta.id);
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
                id: (userId || sessionStorage.getItem('user_id'))},
            headers: {
                'Authorization': `Bearer ${userToken || sessionStorage.getItem('tokenAuth')} `
            }  
        }).then(response =>{
            setCars(response.data);
            console.log(response.data);
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
            userName = {userName}/>
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
            {cars?.map((carros:any) => {
                    return (
            <section className="sec-manutencoes">
              <div className="div-manutencoes">
                <div className="info">
                    <span className="modelo">{carros.nome} </span>
                    <p>{carros.manutencoes.nome}</p>
                    <p>{carros.manutencoes.dataManutencao}</p>
                    <p>R${carros.manutencoes.valor}</p>
                    <p>Troca: {carros.manutencoes.kmTroca}km</p>
                    <p>Próxima Troca: {carros.manutencoes.kmMax}km</p>
                </div>
                </div>
            </section>
    )}) }
        </section>
        <section className="atalhos">
            <h1>Próximas Revisões</h1>
            {cars?.map((carros:any) =>{
                return (
                <div className="info-rapidas">
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