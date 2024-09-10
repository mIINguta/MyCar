import { useRef, useState } from "react";
import axios from "axios";
import Pencil from '../assets/icons/pencil-solid.svg'
import Check from '../assets/icons/check-solid.svg'
import Trash from '../assets/icons/trash-solid.svg'

export default function Manutencao(manutencoes:any, props:any){

const [changeEdit, setChangeEdit] = useState(true);
const manutencaoRef = useRef(null);
const[manutencao, setManutencao] = useState({
   ...manutencoes
});


    function handleChange(e:any){
       
        const name = e.target.name;
     
        switch(name){
            case"descricao":{
                setManutencao({...manutencao, descricao: e.target.value});
                break;
            }
            case "dataManutencao":{
                setManutencao({...manutencao, dataManutencao: e.target.value});
                break;
            }
            case"valor":{
                setManutencao({...manutencao, valor: e.target.value});
                break;
            }
            case("kmTroca"):{
                setManutencao({...manutencao, quilometragemAtual: e.target.value});
                break;
            }
            case("kmMax"):{
                setManutencao({...manutencao, quilometragemMaxima: e.target.value});
                break;
            }
        

        }}
    function eventButton(func:string){
        switch(func){
            case "editar":{
                setChangeEdit(false);
                break;
            }
            case 'confirmar':{
                setChangeEdit(true);
                try {
                    axios.put("http://localhost:5207/auth/EditarManutencao" , 
                        {...manutencao}
                    ).then(response =>{
                        window.alert("o registro de manutenção foi atualizado");
                        window.location.reload();
                        response.data });
                }catch(erro){
                    console.log(erro);
                }
                break;  
        }
             
            
            case"excluir":{
                if(window.confirm("Deseja excluir esse registro?")){
                    try{
                        axios.delete("http://localhost:5207/auth/DeletarManutencao",{
                            params:{
                                "id": props.id
                            }
                        }).then(response =>{
                            return window.alert("O registro da manutenção foi excluído com sucesso!");
                        })
                        }catch(error){
                            return console.log(error);}
                }
                break;
            }
        }
    }
    return (
        <div className="div-manutencoes" key={props.id}  >
                        <div className="info" ref={manutencaoRef} >
                            <div className="infos_buttons">
                                <span className="modelo">{manutencoes.carroNome} </span>
                                <ul className="buttons">
                                    <li>
                                        <button className='editar' onClick={() => eventButton((changeEdit ? 'editar' : 'confirmar'))}>
                                            <img src={(changeEdit ? Pencil : Check)} alt="" title="" />
                                        </button>
                                    </li>
                                    <li>
                                        <button className='excluir' onClick={() => eventButton('excluir')}>
                                            <img src={Trash} alt="" title="" />
                                        </button>
                                    </li>
                                </ul>
                        </div>  
                            { changeEdit ? 
                            <> 
                        <p>{manutencoes.descricao}</p>
                        <p>{manutencoes.dataManutencao}</p>
                        <p>R$ {manutencoes.valor}</p>
                        <p>Troca: {manutencoes.quilometragemAtual.toLocaleString()} km</p>
                        <p>Próxima Troca: {manutencoes.quilometragemMaxima.toLocaleString()} km</p>
                    </>
                    :
                    <>
                        <input type="text" value={manutencao.descricao} name="descricao" title="Insira uma descrição" onChange={handleChange}/>
                        <input type="text" value={manutencao.dataManutencao} name="dataManutencao" title="Insira a data" onChange={handleChange} />
                        <input type="text" value={manutencao.valor} name="valor" title="Insira o valor" onChange={handleChange} />
                        <input type="text" value={manutencao.quilometragemAtual} name="kmTroca" title="Insira a kilometragem da troca" onChange={handleChange} />
                        <input type="text" value={manutencao.quilometragemMaxima} name="kmMax" title="Insira a kilometragem da próxima troca" onChange={handleChange} />
                    </>
                    }
                        </div>
                        </div>
                        
                           
    )
}