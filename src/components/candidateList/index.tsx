
import CandidateListItem from '../candidateListItem/index';
import { IonButton,IonIcon,IonInput,
IonText,
 IonButtons,
  IonList,
IonNavLink
} from '@ionic/react';
import { notificationsCircle, search, notifications, 
calculator, documentText,documents,
 documentAttach,
 ticket,
 exit
  } from 'ionicons/icons';
import { Document, Page } from 'react-pdf';
import Search from '../search/index'
import './style.css';
import {useState, useEffect} from 'react';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import {db, auth} from '../../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';


const updateDocument = async (collectionName: string, documentId:string, updatedData:any) => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, updatedData);
};

type usersProps = {
  id: any;
    nome: string;
  telefone: string;
  endereco: string;
  bilhete: string;
  certificado: string;
  residencia: string;
  tipo: string;
  estado: string;

}

export default function CandidateList(){


   const [candidatos, setCandidatos] = useState<usersProps[]>([]);
   const [nome, setNome] = useState('');
   const [dadosBuscados, setDadosBuscados ] = useState<usersProps[]>([]);
 
  const getAdmin = auth?.currentUser?.email;

 const ColetarCadastrados = () => {
 const q = query(collection(db, "candidatos"));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: usersProps[] = [];
     querySnapshot.forEach((doc) => {
       doc.data()
      modulo.push({
         id: doc.id,
    nome: doc.data().nome,
  telefone: doc.data().telefone,
  endereco: doc.data().endereco,
  bilhete: doc.data().bilhete,
  certificado: doc.data().certificado,
  residencia: doc.data().residencia,
  tipo: doc.data().tipo,
  estado: doc.data().estado
      });
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



const aprovarCandidato = async (documentId: string) => {
    const updatedData = {
      estado: 'aprovado',
    };
    await updateDocument('candidatos', documentId, updatedData);
  };

const reprovadarCandidato = async (documentId: string) => {
    const updatedData = {
      estado: 'reprovado',
    };
    await updateDocument('candidatos', documentId, updatedData);
  };


useEffect(()=>{
ColetarCadastrados();

},[]);





    return(
    <div>
    <div className='px-2 py-1 my-1'>
    <p className='text-dark titleDiv px-3 titleHouse'>Lista de Candidatos</p>
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
       
  nome && dadosBuscados.length > 0  ? dadosBuscados.map((item,index)=><> <CandidateListItem bilhete={item.bilhete} nome={item.nome} 
        key={index}
        tipo={item.tipo}

         />
{    getAdmin === 'globof129@gmail.com' && <>  

  {item.estado === "pendente" && <> <div className='m-2 text-dark gap-8 text-center'>
           <span className='block me-4'>
           <a href={item.bilhete} target="_blank" rel="noopener noreferrer">

             <IonIcon icon={documents} size='50px' className='bg-red' />
</a>
           </span>
           
            <span className='block me-4'>
            <a href={item.residencia} target="_blank" rel="noopener noreferrer">
             <IonIcon icon={documentText} size='50px' className='bg-red' />
             </a>
           </span>
           
            <span>
            <a href={item.certificado} target="_blank" rel="noopener noreferrer">
             <IonIcon icon={documentAttach} size='50px' className='bg-red' />
             </a>
           </span>
           
         </div>

   <div className='me-3'>
            <span
            onClick={()=>aprovarCandidato(item.id)}
             className='btn btn-outline-success btn-sm text-dark inline-block mx-3'>
            
           Aprovar
           </span>
           <span 
           onClick={()=>reprovadarCandidato(item.id)}
           className='inline-block btn btn-outline-danger btn-sm mx-3 red'> Rejeitar</span>
          
         </div>
         </>}
         </>}
         </> )
   :
  
   candidatos.length > 0  ? candidatos.map((item,index)=> <> <CandidateListItem bilhete={item.bilhete} nome={item.nome} 
        key={index}
        tipo={item.tipo}
         />
  {    getAdmin === 'globof129@gmail.com' && <>  

  {item.estado === "pendente" && <> <div className='m-2 text-dark gap-8 text-center'>
           <span className='block me-4'>
           <a href={item.bilhete} target="_blank" rel="noopener noreferrer">

             <IonIcon icon={documents} size='50px' className='bg-red' />
</a>
           </span>
           
            <span className='block me-4'>
            <a href={item.residencia} target="_blank" rel="noopener noreferrer">
             <IonIcon icon={documentText} size='50px' className='bg-red' />
             </a>
           </span>
           
            <span>
            <a href={item.certificado} target="_blank" rel="noopener noreferrer">
             <IonIcon icon={documentAttach} size='50px' className='bg-red' />
             </a>
           </span>
           
         </div>

   <div className='me-3'>
            <span
            onClick={()=>aprovarCandidato(item.id)}
             className='btn btn-outline-success btn-sm text-dark inline-block mx-3'>
            
           Aprovar
           </span>
           <span 
           onClick={()=>reprovadarCandidato(item.id)}
           className='inline-block btn btn-outline-danger btn-sm mx-3 red'> Rejeitar</span>
          
         </div>
         </>}
         </>}
         </> )
   :
   <div className='w-100 p-3'>
   <p className='text-dark text-lg'>Não Há cadastro</p>
   </div>
    }

   
    </div>
    	);
}