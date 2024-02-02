import './style.css';
import { useHistory } from 'react-router-dom';

type CasasProps = {
  nome: string;
  tipo: string;
  descricao: string;
  imagem: string;
}

 



const Cards: React.FC<CasasProps> = ({ nome, tipo, descricao, imagem }) => {
 
const history = useHistory();

 const enviarObjeto = () => {
   const DadosDaCasa = {
     'nome' : nome,
     'tipo':  tipo, 
     'descricao': descricao,
     'imagem': imagem
   }
    const dados = encodeURIComponent(JSON.stringify(DadosDaCasa));
    history.push(`/detalhes/${dados}`) 
    window.location.reload();
  };

  return (
    <>
      <article className="col-md-12" style={{ margin: '0' }}>
        <div className="cards-1 section-gray" style={{ marginBottom: '0' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card card-blog">
                  <div className="card-image">
                    <a href="#">
                      <img className="img" src={imagem} alt='' />
                      <div className="card-caption px-3"> {nome} </div>
                    </a>
                    <div className="ripple-cont"></div>
                  </div>
                  <div className="table px-3">
                    <h6 className="category text-info">{tipo}</h6>
                    <p className="card-description" style={{ maxHeight: '230px', overflow: 'hidden' }}>
                      {descricao}
                    </p>
                    <button onClick={enviarObjeto} className="btn btn-info">Saber Mais</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Cards;
