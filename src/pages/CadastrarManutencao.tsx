import { useContext, useEffect, useState } from "react";
import Aside from "../components/Aside";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Ferrari from "../assets/images/ferrari-foto.jpg"
import Cars from "../components/Cars";
import Loader from "../components/Loader";

export default function CadastrarManutencao(){
const {userEmail, userId, userToken, userName}:any = useContext(AuthContext);
const [cars, setCars]:any = useState();
const [loadingCars, setLoadingCars] = useState(true);

function getCars(){
    try{
        axios.get('http://localhost:5207/auth/ConsultarCarrosUsuario', {
            params: {
                id: (userId || sessionStorage.getItem('user_id'))}
        }).then(response =>{
                setCars(response.data);
        })}
        catch(error){
            console.log(error);}  
        finally{
            setLoadingCars(false);}
        return {cars, loadingCars}
        }
    useEffect(() =>{
        getCars()}, []);

    return (
        <>
        <section className="conteiner-cadmanutencao">
            <Aside userName = {userName || sessionStorage.getItem('userLogin')} />
            <section className="escolha-carro">
                <h1>Escolha um veículo</h1>
                <div className="carros">
            {loadingCars? <Loader/> : cars?.map((carros:any) => {
                    return(
                    <Cars 
                    {...carros}
                    imagem={Ferrari}
                    show = {true}
                    />      
            )})}
                </div>
            </section>
        </section>
        </>
    )
}