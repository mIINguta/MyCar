import { useContext, useState, useRef } from "react";
import Pencil from '../assets/icons/pencil-solid.svg'
import Trash from '../assets/icons/trash-solid.svg'
import LabelLoginComponent from "./LabelLoginComponent";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";


export default function Cars(props:any){
    const {userToken} = useContext(AuthContext);
    const [handleClass, setHandleClass] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState(0);
    const [dataManutencao, setDataManutencao] = useState("");
    const [kmDaTroca, setKMDaTroca] = useState(0);
    const [kmMaximo, setKMMaximo] = useState(0);
    const carroRef:any = useRef();
    
    axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`}


    const changeDescription = (e:any) =>{
        setDescricao(e.target.value);
        console.log(descricao);
    }
    const changeValue = (e:any) =>{
        setValor(e.target.value);
    }
    const changeDate = (e:any) =>{
        setDataManutencao(e.target.value);
    }
    const changeKMMaximo = (e:any) =>{
        setKMMaximo(e.target.value);
    }
    const changeKMTroca = (e:any) =>{
        setKMDaTroca(e.target.value);
    }


    function deleteCar(idCarro:number){

            if(window.confirm("Deseja excluir o respectivo veículo?")){
                 try{
                    axios.delete(`http://localhost:5207/auth/DeletarCarro/`,{
                        params:{
                            "id": idCarro
                        }
                    })
                    .then(response => {
                        window.alert(response? "O respectivo carro foi excluído!" :  null);
                        window.location.reload();
                    })}
                    catch(error){
                        console.log(error);
                    }  
    }}


    async function CadManutencao(id:number){
        
        try{
            await axios.post('http://localhost:5207/auth/RegistrarManutencao',{
                "nome": descricao,
                "valor": valor,
                "dataManutencao": dataManutencao,
                "kmTroca": kmDaTroca,
                "kmMax": kmMaximo,
                "idCarro": id


            }).then(response => response.data);
        
            }catch(error){
                console.log(error);
            }
    }
    
    return (
        <>
        <div className='div-carros' key={props.key} ref={carroRef}>
            <figure>
                <img src={props.imagem} alt="" />
            </figure>
            <div className="info">
                <p>
                    <span className="modelo">{props.marca}</span>
                    <span> {props.nome}</span>
                    <span> {props.anoFabricacao}</span>
                </p>
                        {/* Inserir formatação depois */}
                <span className="kilometragem">{props.kilometragem}km</span> 
                { props.show? <button className="add-manutencao" title="Adicionar manutenção" onClick={() => setHandleClass(!handleClass)}> + </button> : null}
                {!props.show?  
                    <ul className="buttons">
                        <li>
                            <button className='editar' >
                                <img src={Pencil} alt="" title="" />
                            </button>
                        </li>
                        <li>
                            <button className='excluir' onClick={() => {deleteCar(props.idCarro)}}>
                                <img src={Trash} alt="" title="" />
                                {props.id}
                            </button>
                        </li>
                    </ul> : null}
            </div> 
                { props.show? 
                <form className={`form-manutencao ${handleClass? 'mostrar' : 'esconder'}`}>
                    <LabelLoginComponent placeholder="descrição"
                    IClassName = "fa-solid fa-pen"
                    change={changeDescription}/>
                    
                    <LabelLoginComponent placeholder="valor"
                    IClassName = "fa-solid fa-money-bill"
                    change= {changeValue}/>
                        
                    <LabelLoginComponent placeholder="data (dd/mm/aaaa)"
                    IClassName = "fa-solid fa-calendar-days"
                    change={changeDate}/>
                    
                    <LabelLoginComponent placeholder="KM (Troca)"
                    IClassName = "fa-solid fa-check"
                    change={changeKMTroca}/>
                    <LabelLoginComponent placeholder="KM (prox. troca)"
                    IClassName = "fa-solid fa-ban"
                    change={changeKMMaximo}/>

                    {/* <LabelLoginComponent placeholder={props.id}/>   */}
                <input className="btn-cadastrar" type="submit" value="Cadastrar" onClick={()=> CadManutencao(props.id)} />
            </form> 
            : null }    
        </div>
        </>
    )
}