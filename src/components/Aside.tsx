import { useNavigate } from 'react-router';
import Icon from '../assets/images/gustavo-icon.jpeg'
import Pencil from '../assets/icons/pencil-solid.svg'
import Check from '../assets/icons/check-solid.svg'
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function Aside({userName}: {userName:string}){
const [newUserName, setNewUserName] = useState(sessionStorage.getItem("userLogin")!);
const {userId, userToken}:any = useContext(AuthContext);
const [isEditButton, setIsEditButton] = useState(true);

axios.defaults.headers.common = {'Authorization' : `Bearer ${userToken || sessionStorage.getItem('tokenAuth')}`}

const navigate = useNavigate();
const home = () =>{
    navigate('/auth/home');
}
const logOut = () => {
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("tokenAuth");
        sessionStorage.removeItem("userLoken");
        navigate('/');
}
const cadastrarCarro = () => {
    navigate('/auth/cadastrarCarro');
}
const cadastrarManutencao= () => {
    navigate('/auth/cadastrarManutencao');
}
const editarDados= () => {
    navigate('/auth/editarDados');
}

const handleName = (e:any) =>{
    setNewUserName(e.target.value);
}

const enviarNome = async () =>{
        if(newUserName != "" && !isEditButton){
            try{
            await axios.patch(`http://localhost:5207/users/${userId}`,null,{
                params: {
                    userName: newUserName
                }
            })
            .then(() => {
                setIsEditButton(true);
                sessionStorage.setItem("userLogin", newUserName );
            }
            )}catch(error){
                console.log(error)}
            }

        else if(newUserName == ""){
            window.alert("Insira um nome válido");
        }
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
                    <input type="text" className='nome-span' onChange = {handleName} value={newUserName || userName} disabled= {isEditButton? true : false} />
                        <button className='editar' onClick={() => {enviarNome(); setIsEditButton(false);}}>
                            <img src={isEditButton ? Pencil : Check} alt={isEditButton ? "Botão editar": "Botão confirmar"} title={isEditButton ? "Botão editar": "Botão confirmar"} />
                        </button>
                    </div>
                </div>
            <div className="buttons-aside">
                <button onClick={home}><i className="fa-solid fa-house"></i> <span>Home</span></button>
                <button onClick={cadastrarCarro}> <i className="fa-solid fa-car"></i><span>Cadastrar Carro</span></button>
                <button onClick={cadastrarManutencao}> <i className="fa-solid fa-gear"></i><span>Registrar Manutenção</span></button>
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