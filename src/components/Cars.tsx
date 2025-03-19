import { useContext, useState} from "react";
import Pencil from '../assets/icons/pencil-solid.svg'
import Trash from '../assets/icons/trash-solid.svg'
import Check from '../assets/icons/check-solid.svg'
import LabelLoginComponent from "./LabelLoginComponent";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import Ferrari from "../assets/images/ferrari-foto.jpg"


export default function Cars(carroProps:any){

    const {userToken} = useContext(AuthContext);
    const [handleClass, setHandleClass] = useState(false);
    const [message, setMessage]= useState("");
    const [changeEdit, setChangeEdit] = useState(true);
    const [manutencao, setManutencao] = useState({
        descricao: "",
        valor: 0,
        dataManutencao: "",
        quilometragemAtual: carroProps.quilometragemAtual,
        quilometragemMaxima: 0,
        idCarro: carroProps.id
    });
    const [carro, setCarro] = useState({ 
        ...carroProps
    });

    axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`};

    const notify = (type: string, msg:string) =>{
       type == "success" ? toast.success(msg) : toast.error(msg);
           
    }

    function handleChange (e:any){
        const name = e.target.name;
        switch(name){
            case "marca":{
                setCarro({...carro, marca: (e.target.value).toString()});
                break;
            }
            case "modelo":{
                setCarro({...carro, modelo: (e.target.value)});
                break;
            }
            case "anoFabricacao":{
                setCarro({...carro, anoFabricacao: (e.target.value)});
                break;
            }
            case "kmCompra":{
                setCarro({...carro, quilometragemCompra: (e.target.value)});
                break;
            }
            case "kmAtual":{
                setCarro({...carro, quilometragemAtual: (e.target.value)});
                break;
            }
            case "descricao":{
                setManutencao({...manutencao, descricao: e.target.value});
                break;
            }
            case "valor":{
                setManutencao({...manutencao, valor: e.target.value});
                break;
            }
            case "dataManutencao":{
                setManutencao({...manutencao, dataManutencao: e.target.value});
                break;
            }
            case "KmTrocaManutencao":{
                setManutencao({...manutencao, quilometragemAtual: e.target.value});
                break;
            }
            case "KmProxTrocaManutencao":{
                setManutencao({...manutencao, quilometragemMaxima: e.target.value});
                break;
            }

        }
    }
    async function atualizarQuilometragem(){

        if(carro.quilometragemCompra <= carro.quilometragemAtual){
                await axios.patch(`http://localhost:5207/auth/cars/${carro.id}`, null, {
                        params: {
                        quilometragemAtual: carro.quilometragemAtual}
           }).then(response => {
                    setChangeEdit(true)
                    notify("success", "A quilometragem foi atualizada!");
                })
            .catch(error => {
                notify("error", "Algo de errado aconteceu! Verifique seus dados e tente novamente!");
            })
                
            
        }else
        notify("error", "O valor é inválido!");
    }

    function eventButton (event:string){
        switch(event){
            case 'editar':{
                setChangeEdit(false);
                break;
            }
            case 'confirmar':{
                atualizarQuilometragem();
                break;
               
            }
        }
    }
    function deleteCar(){
            if(window.confirm("Deseja excluir o respectivo veículo?")){
                    axios.delete(`http://localhost:5207/auth/cars/${carro.id}`)
                    .then(response => {
                        notify("success", "O respectivo carro foi excluído!");
                    })
                    .catch(error => {
                        notify("error", "Algo de errado aconteceu!");
                        setChangeEdit(false);
                    });
            }       window.location.reload();}

    async function cadManutencao(){
        if(manutencao.descricao == ""){
            window.alert("Verifique os dados e envie novamente");
            setMessage("Verifique os dados e envie novamente.");
        }
        else{
            await axios.post('http://localhost:5207/auth/maintenance', manutencao)
            .then(response =>{
                notify("success", "A manutenção foi cadastrada com sucesso!");
            })
        
            .catch(error => {
                notify("error", "Verifique se os dados foram inseridos corretamente.")
            })
    }}

   
    
    return (
        <>
        <div className='div-carros' key={carroProps.id}>
            <figure>
                <img src={carroProps.imagemCarro == "" || carroProps.imagemCarro == null? Ferrari : carroProps.imagemCarro} alt="" />
            </figure> 
            <div className="info">
                <p>
                    <span className="marca">{carroProps.marca}</span>
                    <span className="modelo"> {carroProps.modelo}</span>
                    <span className="anoFabricacao"> {carroProps.anoFabricacao}</span> 
                    <span className="placa"> ({carroProps.placa}) </span>
                </p> 
                {changeEdit ?
                <>
                <p>
                    <span className="kilometragem" title="Quilometragem de compra"> {carroProps.quilometragemCompra.toLocaleString()} km </span> 
                    -
                    <span className="kilometragem" title="Quilometragem atual"> {carroProps.quilometragemAtual.toLocaleString()} km </span>
                </p>
                 </>  
                 :
                 <>
                 <span className="kilometragem" title="Quilometragem de compra"> {carro.quilometragemCompra} km </span> 
                    -
                 <input type="number" className="input-carros" name= "kmAtual" value={carro.quilometragemAtual} onChange={handleChange}/>
                </>
                }

                
                { carroProps.show? <button className="add-manutencao" title="Adicionar manutenção" onClick={() => setHandleClass(!handleClass)}> + </button> : null}
                
                {!carroProps.show?  
                    <ul className="buttons">
                        <li>
                            <button className='editar' >
                                <img src={changeEdit? Pencil : Check} alt="Ícone lápis+" title="Alterar Quilometragem" onClick={()=> eventButton(changeEdit ? 'editar' : 'confirmar')}/>
                            </button>
                        </li>
                        <li>
                            <button className='excluir' title="Excluir Veículo" onClick={deleteCar}>
                                <img src={Trash} alt="Ícone Lixeira" title="" />
                                {/* {carroProps.id} */}
                            </button>
                        </li>
                    </ul> : null}
            </div> 
                { carroProps.show? 
                <form className={`form-manutencao ${handleClass? 'mostrar' : 'esconder'}`}>
                    <LabelLoginComponent placeholder="descrição"
                    IClassName = "fa-solid fa-pen"
                    change={handleChange}
                    name="descricao"/>
                    
                    <LabelLoginComponent placeholder="valor"
                    IClassName = "fa-solid fa-money-bill"
                    change= {handleChange}
                    name="valor"/>
                        
                    <LabelLoginComponent placeholder="data (dd/mm/aaaa)"
                    IClassName = "fa-solid fa-calendar-days"
                    change={handleChange}
                    name="dataManutencao"
                    />
                    
                    <LabelLoginComponent placeholder="KM (Troca)"
                    IClassName = "fa-solid fa-check"
                    change={handleChange}
                    value={manutencao.quilometragemAtual.toLocaleString()}
                    name="KmTrocaManutencao" />

                    <LabelLoginComponent placeholder="KM (prox. troca)"
                    IClassName = "fa-solid fa-ban"
                    change={handleChange}
                    name="KmProxTrocaManutencao"
                    value={manutencao.quilometragemMaxima.toLocaleString()}
                    />
                        {message? <span></span> : null}
                    {/* <LabelLoginComponent placeholder={carroPropsrops.id}/>   */}
                <input className="btn-cadastrar" type="submit" value="Cadastrar" onClick={cadManutencao} />
            </form> 
            : null }    
        </div>
        </>
    )
}