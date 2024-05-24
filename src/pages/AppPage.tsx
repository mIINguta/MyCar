import Aside from "../components/Aside"
import Ferrari from "../assets/images/ferrari-foto.jpg"
import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import Loader from "../components/Loader"
import { useFetch } from "../hooks/useFetch"
import { AuthContext } from "../Context/AuthContext"



export default function App(){

const [userName, setUserName] = useState('');
const [carregando, setCarregando]:any = useState();
const {setUserId, userEmail}:any = useContext(AuthContext);


async function ReceberDados(){
    try{
        const response = await axios.get(`http://localhost:5207/users/ReceberDadosUsuario`, {
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
            };
}

    useEffect(() =>{ReceberDados()}, []);



type Carros = {
    nome: string;
    marca: string;
    anoFabricacao: number;
    kilometragem: number;
    manutencoes: [];
}
type Manutencoes = {
    id: number;
    nome: string;
    valor: number;
    kmTroca: number;
    kmMaximo: number;
    id_carro: number;
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
                <p ><span className="KM-troca">Km da troca:</span> <span>120.000km</span></p>
                <p ><span className="KM-max">Km máxima:</span><span>150.000km</span></p>
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