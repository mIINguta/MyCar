import { useContext, useState} from "react";
import Pencil from '../assets/icons/pencil-solid.svg'
import Trash from '../assets/icons/trash-solid.svg'
import Check from '../assets/icons/check-solid.svg'
import LabelLoginComponent from "./LabelLoginComponent";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";


export default function Cars(carroP:any, props:any){

    const {userToken} = useContext(AuthContext);
    const [handleClass, setHandleClass] = useState(false);
    const [message, setMessage]= useState("");
    const [changeEdit, setChangeEdit] = useState(true);
    
    const [manutencao, setManutencao] = useState({
        descricao: "",
        valor: 0,
        dataManutencao: "",
        quilometragemAtual: carroP.quilometragemAtual,
        quilometragemMaxima: 0,
        idCarro: carroP.id
    });

    

    const [carro, setCarro] = useState({ 
        ...carroP
    });

    axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`}

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

        console.log(parseInt(carro.id));
        if(carro.quilometragemCompra <= carro.quilometragemAtual){
           try{
                await axios.put("http://localhost:5207/auth/AtualizarQuilometragem", null, {
                        params: {
                        id: carro.id,
                        quilometragemAtual: carro.quilometragemAtual }

           }).then(response => {
                    console.log(response.data);
                    window.alert("A quilometragem foi atualizada com sucesso!");
                    location.reload();
                })
            }
            catch(erro){
                console.log(erro);
            }
        }
        
        else
        window.alert("O valor informado é inválido");
    }

    function eventButton (event:string){
        switch(event){
            case 'editar':{
                setChangeEdit(false);
                break;
            }
            case 'confirmar':{
                atualizarQuilometragem();
                (carro.quilometragemAtual < carro.quilometragemCompra? null : setChangeEdit(true));
                break;
               
            }
        }
    }
    function deleteCar(){

            if(window.confirm("Deseja excluir o respectivo veículo?")){
                 try{
                    axios.delete(`http://localhost:5207/auth/DeletarCarro/`,{
                        params:{
                            "id": carro.id
                        }
                    })
                    .then(response => {
                        window.alert(response? "O respectivo carro foi excluído!" :  null);
                        window.location.reload();
                    })}
                    catch(error){
                        console.log(error);
                        setChangeEdit(false);
                    }  
    }}

    async function cadManutencao(){
        if(manutencao.descricao == ""){
            window.alert("Verifique os dados e envie novamente");
            setMessage("Verifique os dados e envie novamente.");
        }
        else{
        try{
            await axios.post('http://localhost:5207/auth/RegistrarManutencao', manutencao)
            .then(response =>{
                window.alert("A manutenção foi cadastrada com sucesso!");
            } );
        
            }catch(error){
                console.log(error);
            }
        }
    }

   
    
    return (
        <>
        <div className='div-carros' key={carroP.id}>
            <figure>
                <img src={carroP.imagem} alt="" />
            </figure>
            <div className="info">
                <p>
                    <span className="modelo">{carro.marca}</span>
                    <span> {carro.modelo}</span>
                    <span> {carro.anoFabricacao}</span> 
                    <span className="placa"> ({carro.placa}) </span>
                </p> 
                {changeEdit ?
                <>
                <p>
                    <span className="kilometragem" title="Quilometragem de compra"> {carro.quilometragemCompra.toLocaleString()} km </span> 
                    -
                    <span className="kilometragem" title="Quilometragem atual"> {carro.quilometragemAtual.toLocaleString()} km </span>
                </p>
                 </>  
                 :
                 <>
                 <span className="kilometragem" title="Quilometragem de compra"> {carro.quilometragemCompra.toLocaleString()} km </span> 
                    -
                 <input type="text" className="input-carros" name= "kmAtual" value={carro.quilometragemAtual} onChange={handleChange}/>
                </>
                }

                
                { carroP.show? <button className="add-manutencao" title="Adicionar manutenção" onClick={() => setHandleClass(!handleClass)}> + </button> : null}
                
                {!carroP.show?  
                    <ul className="buttons">
                        <li>
                            <button className='editar' >
                                <img src={changeEdit? Pencil : Check} alt="Ícone lápis+" title="Alterar Quilometragem" onClick={()=> eventButton(changeEdit ? 'editar' : 'confirmar')}/>
                            </button>
                        </li>
                        <li>
                            <button className='excluir' title="Excluir Veículo" onClick={deleteCar}>
                                <img src={Trash} alt="Ícone Lixeira" title="" />
                                {props.id}
                            </button>
                        </li>
                    </ul> : null}
            </div> 
                { carroP.show? 
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
                    {/* <LabelLoginComponent placeholder={props.id}/>   */}
                <input className="btn-cadastrar" type="submit" value="Cadastrar" onClick={cadManutencao} />
            </form> 
            : null }    
        </div>
        </>
    )
}