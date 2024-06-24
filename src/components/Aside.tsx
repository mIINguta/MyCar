import { useNavigate } from 'react-router';
import Icon from '../assets/images/gustavo-icon.jpeg'

export default function Aside(props:any){
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
    return (
        <>
        <aside className='aside-component'>
            <section className='superior-section-aside'>
                <div className='info-user'>
                    <figure>
                        <img src={Icon} alt="" />
                    </figure>
                    <p>
                    <span>Oi,</span> 
                    <span className='nome-span'>{props.userName}</span>
                    </p>
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