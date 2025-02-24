export default function Confirmation(props:string){
    return (<>
    <section className="ConteinerMensagem"></section>
        <h1>{props.message}</h1>
        <ul>
            <li><button>Sim</button></li>
            <li><button>Não</button></li>
        </ul>
        </>
    )
}