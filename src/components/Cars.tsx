import { useState } from "react";
import CadastrarManutencao from "../pages/CadastrarManutencao";
import LabelLoginComponent from "./LabelLoginComponent";

export default function Cars(props:any){
    const [handleClass, setHandleClass] = useState(false);
    const [showButton, setShowButton] = useState(true);
    
    return (
        <>
        <div className='div-carros' key={props.key}>
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
                { props.show? <button title="Adicionar manutenção" onClick={() => setHandleClass(!handleClass)}> + </button> : null}
            </div> 
                { props.show? 
                <form className={`form-manutencao ${handleClass? 'mostrar' : 'esconder'}`}>
                    <LabelLoginComponent placeholder="descrição"
                    IClassName = "fa-solid fa-pen"/>
                    <LabelLoginComponent placeholder="valor"
                    IClassName = "fa-solid fa-money-bill">
                        </LabelLoginComponent>  
                    <LabelLoginComponent placeholder="data (dd/mm/aaaa)"
                    IClassName = "fa-solid fa-calendar-days"/>
                    
                    <LabelLoginComponent placeholder="KM (Troca)"
                    IClassName = "fa-solid fa-check"/>
                    <LabelLoginComponent placeholder="KM (prox. troca)"
                    IClassName = "fa-solid fa-ban"/>
                    {/* <LabelLoginComponent placeholder={props.id}/>   */}
                <input className="btn-cadastrar" type="submit" value="Cadastrar" />
            </form> 
            : null }    
        </div>
        </>
    )
}