import { useRef, useState } from "react";
import axios from "axios";
import Pencil from '../assets/icons/pencil-solid.svg'
import Check from '../assets/icons/check-solid.svg'
import Trash from '../assets/icons/trash-solid.svg'
import { toast } from "react-toastify";

export default function Manutencao(manutencoes:any, props:any){

const [changeEdit, setChangeEdit] = useState(true);
const manutencaoRef = useRef(null);
const[manutencao, setManutencao] = useState({
   ...manutencoes
});

const notify = (type:string, msg: string) =>{
    type == "success" ? toast.success(msg) : toast.error(msg);
}


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
                    axios.put(`http://localhost:5207/auth/maintenance/${manutencao.id}` , 
                        {...manutencao}
                    ).then(response =>{
                       setChangeEdit(true);
                       notify("success", "O registro de manutenção foi atualizado");
                    })
                    .catch(error => {
                        notify("error", "Verifique se os dados inseridos são válidos!")
                    });
                
                break;  
        }
            case"excluir":{
                if(window.confirm("Deseja excluir esse registro?")){
                        axios.delete(`http://localhost:5207/auth/maintenance/${manutencao.id}`)
                        .then(response =>{
                           location.reload();
                           notify("success", "O registro da manutenção foi excluído com sucesso!");
                        })
                        .catch(error =>{
                           
                            notify("error", "Algo de errado aconteceu!");}
                        );
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
                        <p>{manutencao.descricao}</p>
                        <p>{manutencao.dataManutencao}</p>
                        <p>R$ {manutencao.valor}</p>
                        <p>Troca: {manutencao.quilometragemAtual.toLocaleString()} km</p>
                        <p>Próxima Troca: {manutencao.quilometragemMaxima.toLocaleString()} km</p>
                    </>
                    :
                    <>
                        <input type="text" value={manutencao.descricao} name="descricao" title="Insira uma descrição" onChange={handleChange}/>
                        <input type="text" value={manutencao.dataManutencao} name="dataManutencao" title="Insira a data" onChange={handleChange} />
                        <input type="number" value={manutencao.valor} name="valor" title="Insira o valor" onChange={handleChange} />
                        <input type="number" value={manutencao.quilometragemAtual} name="kmTroca" title="Insira a kilometragem da troca" onChange={handleChange} />
                        <input type="number" value={manutencao.quilometragemMaxima} name="kmMax" title="Insira a kilometragem da próxima troca" onChange={handleChange} />
                    </>
                    }
                        </div>
                        </div>
                        
                           
    )
}