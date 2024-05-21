import Icon from '../assets/images/gustavo-icon.jpeg'

export default function Aside(props:any){
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
                <button><i className="fa-solid fa-house"></i> Home</button>
                <button> <i className="fa-solid fa-pen-to-square"></i>Cadastrar</button>
                <button>
                <i className="fa-solid fa-user-pen"></i>
                Meus Dados</button>
            </div>
        </section>
        <div className="button-logout-div">
            <button> <i className="fa-solid fa-arrow-right-from-bracket"></i>Log Out</button>
        </div>
        </aside>
        </>
    )
}