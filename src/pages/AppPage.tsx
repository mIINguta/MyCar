import Aside from "../components/Aside"
import Ferrari from "../assets/images/ferrari-foto.jpg"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Loader from "../components/Loader"
import { useFetch } from "../hooks/useFetch"
import { AuthContext } from "../Context/AuthContext"

export default function App(){

const [userName, setUserName] = useState('');
const [carregando, setCarregando] = useState(true);
const [token, setToken]:any = useState('');

const {userId, setUserId}:any = useContext(AuthContext);


useEffect(() =>{
    const UserEmail:any = sessionStorage.getItem('userToken');
            try{
            const response = axios.get(`http://localhost:5207/users/ReceberDadosUsuario`, {
                params:{
                    email: UserEmail
                }}).then(response =>{
                    const resposta = response.data[0];
                    setUserName(resposta.normalizedUserName);
                    setUserId(resposta.id);
                    setToken(sessionStorage.getItem('tokenAuth'));
                    sessionStorage.setItem('user_id', resposta.id);
                    setCarregando(false);
                })
                }catch(error){
                console.log(error);

            }
},[userId]);

type Carros = {
    nome: string;
    marca: string;
    anoFabricacao: number;
    kilometragem: number;
    manutencoes: [];
}


const {data:carros, isFetching} = useFetch<Carros[]>('http://localhost:5207/auth/ConsultarCarrosUsuario');

    return (
        <> 
       {carregando && <Loader/>}
        <section className={`conteiner-AppPage ${carregando ? 'loading' : 'loaded' }`}>   {/* lógica para puxar classe*/}
            <Aside 
            userName = {userName}/>
            <section className="sec-home">
                <h2>Carros</h2>
            <section className="sec-carros">
                {isFetching && <Loader/>}
                {carros?.map((carros:any) => {
                    return (
                    <div className="div-carros">
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


                {/* <div className="div-carros">
                    <figure>
                        <img src={Gtr} alt="" />
                    </figure>
                    <div className="info">
                        <p>
                            <span className="modelo">R34, </span>
                            <span> Nissan </span>
                            - 
                            <span> 1999 </span>
                        </p>
                        <span className="kilometragem">155.000 km</span>
                    </div> 
                </div>*/}
                

            </section>
            <h2>Manutenções</h2>
            <section className="sec-manutencoes">
              <div className="div-manutencoes">
                <div className="info">
                    
                    <span className="modelo">R34 </span>
                    <p>Troca de Óleo</p>
                    <p>22/02/2024</p>
                    <p>R$200,00</p>
                </div>
                </div>
                <div className="div-manutencoes">
                <div className="info">
                <span className="modelo">Ferrari </span>
                    <p>Troca de Pneus</p>
                    <p>22/04/2024</p>
                    <p>R$1800,00</p>
                </div>
              </div>
            </section>
        </section>
        <section className="atalhos">
            <h1>Próximas Revisões</h1>
            <div className="info-rapidas">
                <p><span>Veículo: </span><span>408</span></p>
                <p><span className="produto">Produto: </span><span>Freios</span> </p>
                <p className="KM-troca"><span>Km da troca:</span> <span>120.000km</span></p>
                <p className="KM-max"><span>Km máxima:</span><span>150.000km</span></p>
            </div>
            <div className="info-rapidas">
                <p><span>Veículo: </span><span>408</span></p>
                <p><span className="produto">Produto: </span><span>Freios</span> </p>
                <p className="KM-troca"><span>Km da troca:</span> <span>120.000km</span></p>
                <p className="KM-max"><span>Km máxima:</span><span>150.000km</span></p>
            </div>
            <div className="info-rapidas">
                <p><span>Veículo: </span><span>408</span></p>
                <p><span className="produto">Produto: </span><span>Freios</span> </p>
                <p className="KM-troca"><span>Km da troca:</span> <span>120.000km</span></p>
                <p className="KM-max"><span>Km máxima:</span><span>150.000km</span></p>
            </div>
        </section>
       </section>
        </>

           
      
    )
}