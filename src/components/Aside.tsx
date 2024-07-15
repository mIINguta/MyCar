import { useNavigate } from 'react-router';
import Icon from '../assets/images/gustavo-icon.jpeg'
import Pencil from '../assets/icons/pencil-solid.svg'
import Check from '../assets/icons/check-solid.svg'
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';



export default function Aside(props:any){
const [newUserName, setNewUserName] = useState("");
const {userId, userToken}:any = useContext(AuthContext);

axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`}

const navigate = useNavigate();

const home = () =>{
    navigate('/auth/home');
}
const logOut = () => {
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("tokenAuth");
        sessionStorage.removeItem("userToken");
        navigate('/');
}
const cadastrarCarro = () => {
    navigate('/auth/cadastrarCarro');
}
const cadastrarManutencao= () => {
    navigate('/auth/registrarManutencao');
}
const editarDados= () => {
    navigate('/auth/editarDados');
}
const [ativo, setAtivo] = useState(false);

let isActive = (parm1:any, parm2:any) =>{
    return ativo == false? parm1 : parm2
} 
const handleName = (e:any) =>{
    setNewUserName(e.target.value);
}
const handleButtonEditName = () =>{    
    ativo == false? setAtivo(true) : setAtivo(false);
   
    const enviarNome = async () =>{
        try{
        await axios.put(`http://localhost:5207/users/AtualizarNome?id=${userId}&name=${newUserName}`)
        .then(response =>
            console.log("Funcionou")
        )}catch(error){
            console.log(error)}
        }
        
        newUserName == null || newUserName == undefined || newUserName == "" ? console.log("O Nome está vazio!") : enviarNome();
}

    return (
        <>
        <aside className='aside-component'>
            <section className='superior-section-aside'>
                <div className='info-user'>
                    <figure>
                        <img src={Icon} alt="" />
                    </figure>
                    <div>
                    <span>Oi,</span> 
                    <input type="text" className='nome-span' onChange = {handleName} defaultValue={props.userName} disabled={isActive (true, false)}/>
                        <button className='editar' onClick={handleButtonEditName}>
                            <img src={isActive(Pencil, Check)} alt={isActive("Botão editar", "Botão confirmar")} title={isActive("Botão editar", "Botão confirmar")} />
                        </button>
                    </div>
                </div>
            <div className="buttons-aside">
                <button onClick={home}><i className="fa-solid fa-house"></i> <span>Home</span></button>
                <button onClick={cadastrarCarro}> <i className="fa-solid fa-pen-to-square"></i><span>Cadastrar Carro</span></button>
                <button onClick={cadastrarManutencao}> <i className="fa-solid fa-pen-to-square"></i><span>Registrar Manutenção</span></button>
                <button onClick={editarDados}>
                <i className="fa-solid fa-user-pen"></i><span>Meus Dados</span></button>
            </div>
        </section>
        <div className="button-logout-div">
            <button onClick={logOut}> <i className="fa-solid fa-arrow-right-from-bracket"></i><span>Log Out</span></button>
        </div>
        </aside>
        </>
    )
}