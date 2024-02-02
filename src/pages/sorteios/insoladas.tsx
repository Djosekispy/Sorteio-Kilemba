
import CandidateListItem from '../../components/candidateListItem/index';
import { 
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonInput,
IonText,
 IonButtons,
  IonList,
IonNavLink
} from '@ionic/react';
import { notificationsCircle, search, notifications, calculator } from 'ionicons/icons';
import './style.css';
import {useState, useEffect} from 'react';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import {db, auth} from '../../services/firebase';
import Menu from '../../components/menu/index';
import { jsPDF } from 'jspdf';
import { renderToStaticMarkup } from 'react-dom/server';
import autoTable from 'jspdf-autotable';
import {styles} from './style';

type usersProps = {
    nome: string;
  referencia: string;
}

export default function SorteadosdeInsoladas(){
   const [candidatos, setCandidatos] = useState<usersProps[]>([]);
   const [nome, setNome] = useState('');
   const [dadosBuscados, setDadosBuscados ] = useState<usersProps[]>([]);
  const getAdmim = auth?.currentUser?.email;
  
 const handleGeneratePdf = () => {
  const doc = new jsPDF();

  // Cabeçalho
  doc.text('Ministério da Administração', 30, 10, styles.header);
  doc.text('Governo de Angola', 25, 20, styles.header);

  // Tabela
  const columns = [
    { title: 'Nome', dataKey: 'nome' },
    { title: 'Referência', dataKey: 'referencia' },
  ];

  const data = candidatos.map((item) => ({
    nome: item.nome,
    referencia: item.referencia,
  }));

  autoTable(doc, {
    ...styles.table,
    headStyles: styles.tableHeader,
    columns,
    body: data,
  });

  doc.save('lista-candidatos-VivendasInsoladas.pdf');
};



 const ColetarCadastrados = () => {
 const q = query(collection(db, "insoladasSorteados"));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setCandidatos(modulo);
    });
};

const Pesquisar = (nome: string) => {
  if (nome !== '') {
    const busca = candidatos.filter(item => item.nome.toLowerCase().startsWith(nome.toLowerCase()));
    setDadosBuscados(busca);
  } else {
    ColetarCadastrados();
  }
};


useEffect(()=>{
ColetarCadastrados();

},[]);





    return(
          <IonPage>
    <IonContent>
    <section className='sectionContent'>
    <Menu />
 { getAdmim === "globof129@gmail.com" &&   <div className='mx-3'>
       <button className='btn btn-secondary btn-sm' onClick={handleGeneratePdf}>Baixar PDF</button>
     </div>}

    <div className='px-2 py-1 my-1'>
    <p className='text-dark titleDiv text-center px-3 titleHouse'>Sorteados nas Vivendas Insoladas</p>
    </div>
    
    <div>
  <div>
    <div className="col mx-3">
      <input 
      type="text" 
      className="form-control" 
      placeholder="pesquisar nome"
      value={nome}
       onChange={(e) => {
           setNome(e.target.value)
           
       }}
      />
    </div>
    <div className="col mx-3">
    <span onClick={()=>Pesquisar(nome)} className="btn btn-primary">Buscar</span>
    </div>
  </div>
</div>
   
 {
       
  nome && dadosBuscados.length > 0  ? dadosBuscados.map((item,index)=> <CandidateListItem nome={item.nome} 
        key={index}
        tipo={item.tipo}
         /> )
   :
  
   candidatos.length > 0  ? candidatos.map((item,index)=> <CandidateListItem nome={item.nome} 
        key={index}
        tipo={item.tipo}
         /> )
   :
   <div className='w-100 p-3'>
   <p className='text-dark text-lg'>Não Há cadastro</p>
   </div>
    }
    </section>
    </IonContent>
        </IonPage>
    	);
}