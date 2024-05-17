import Aside from "../components/Aside"
import Header from "../components/Header"
import Ferrari from "../assets/images/ferrari-foto.jpg"
import Gtr from "../assets/images/gtr-r34.jpg"
export default function App(){
    return (
        <>
      
        <section className="conteiner-AppPage">  
            <Aside/>
            <section className="sec-home">
                <h2>Carros</h2>
            <section className="sec-carros">
                <div className="div-carros">
                    <figure>
                        <img src={Ferrari} alt="" />
                    </figure>
                    <div className="info">
                        <p>
                            <span className="modelo">488, </span>
                            <span> Ferrari </span>
                            - 
                            <span> 2022 </span>
                        </p>
                        <span className="kilometragem">140.000 km</span>
                    </div>
                </div>
                <div className="div-carros">
                    <figure>
                        <img src={Gtr} alt="" />
                    </figure>
                    <div className="info">
                        <p>
                            <span className="modelo">R34, </span>
                            <span> Nissan </span>
                            - 
                            <span> 1999 </span>
                        </p>
                        <span className="kilometragem">155.000 km</span>
                    </div>
                </div>

            </section>
            <h2>Manutenções</h2>
            <section className="sec-manutencoes">
              <div className="div-manutencoes">
                <div className="info">
                    
                    <span className="modelo">R34 </span>
                    <p>Troca de Óleo</p>
                    <p>22/02/2024</p>
                    <p>R$200,00</p>
                </div>
                </div>
                <div className="div-manutencoes">
                <div className="info">
                <span className="modelo">Ferrari </span>
                    <p>Troca de Pneus</p>
                    <p>22/04/2024</p>
                    <p>R$1800,00</p>
                </div>
              </div>
            </section>
        </section>
        <section className="atalhos">
            <h1>Próximas Revisões</h1>
            <div className="info-rapidas">
                <p><span>Veículo: </span><span>408</span></p>
                <p><span className="produto">Produto: </span><span>Freios</span> </p>
                <p className="KM-troca"><span>Km da troca:</span> <span>120.000km</span></p>
                <p className="KM-max"><span>Km máxima:</span><span>150.000km</span></p>
            </div>
            <div className="info-rapidas">
                <p><span>Veículo: </span><span>408</span></p>
                <p><span className="produto">Produto: </span><span>Freios</span> </p>
                <p className="KM-troca"><span>Km da troca:</span> <span>120.000km</span></p>
                <p className="KM-max"><span>Km máxima:</span><span>150.000km</span></p>
            </div>
            <div className="info-rapidas">
                <p><span>Veículo: </span><span>408</span></p>
                <p><span className="produto">Produto: </span><span>Freios</span> </p>
                <p className="KM-troca"><span>Km da troca:</span> <span>120.000km</span></p>
                <p className="KM-max"><span>Km máxima:</span><span>150.000km</span></p>
            </div>
        </section>
       </section>
        </>

           
      
    )
}