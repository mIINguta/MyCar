import Header from "../components/Header"
export default function App(){
    return (
        <>
        <Header/>

        <section className="conteiner-AppPage">
            <div className="boxes">
                <button>Cadastrar Veículo</button>
            </div>
            <div className="boxes">
                <button>Manutenções</button>
            </div>
        </section>
        </>

           
      
    )
}