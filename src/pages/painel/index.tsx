import {
IonPage,
IonContent,
IonButton,
IonText,
IonTitle,
IonHeader
} from '@ionic/react';
import Menu from '../../components/menu/index';
import './style.css';
import PainelCard from '../../components/painelCards/index';
import CandidateList from '../../components/candidateList/index'
import {useState, useEffect} from 'react';
import {
  doc,
  setDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  collection,
  query, 
  updateDoc,
  onSnapshot, 
  where,
  and
} from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
type preferencia = 'Apartamentos' | 'Vivendas Insoladas' | 'Vivendas Geminadas';

type FormData = {
  nome: string;
  telefone: string;
  endereco: string;
  bilheteFile: FileList;
  certificadoFile: FileList;
  residenciaFile: FileList;
  termosChecked: boolean;
  tipo: preferencia;
  referencia: string;
};


export default function PaineldeControle(){
 const [apartamentos, setApartamentos] = useState([]);
 const [vivendasInsoladas, setVivendasInsoladas] = useState([]);
 const [vivendasGeminadas, setVivendasGeminadas] = useState([]);
 const [candidatos, setCandidatos] = useState([]);
 const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sorteiodeApartamentosRealizado, setSorteiodeApartamentosRealizado] = useState(false);
  const [sorteiodeVivendasGeminadasRealizado, setSorteiodeVivendasGeminadasRealizado ] = useState(false);

const [sorteiodeVivendasInsoladasRealizado, setSorteiodeVivendasInsoladasRealizado ] = useState(false);




const totalPorApatamentos = ()=>{
 const q = query(collection(db, "candidatos"),where('tipo','==','Apartamentos'));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setApartamentos(modulo);
    });
};


const totalPorVivendasGeminadas = ()=>{
	 const q = query(collection(db, "candidatos"),where('tipo','==','Vivendas Insoladas'));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setVivendasInsoladas(modulo);
    });

}
const totalPorVivendasInsoladas = ()=>{
		 const q = query(collection(db, "candidatos"),where('tipo','==','Vivendas Geminadas'));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setVivendasGeminadas(modulo);
    });
}

const TotaldeInscrito = ()=>{
		 const q = query(collection(db, "candidatos"));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
  setCandidatos(modulo);
    });
}

const FazerSorteioApartamentos = async () => {
  try {
    setIsLoading(true);
     const querySnapshot = await getDocs(query(collection(db, 'candidatos'), 
    where('sorteado', '==', false),
    where('tipo', '==', 'Apartamentos'),
     where('estado', '==', 'aprovado')
));
    const apartamentosNaoSorteados: any = [];
    querySnapshot.forEach((doc) => {
      apartamentosNaoSorteados.push({ id: doc.id, ...doc.data() });
    });
    const sorteadosApartamento = shuffleArray(apartamentosNaoSorteados);

   for (let i = 0; i < 200; i++) {
      await addDoc(collection(db, 'apartamentosSorteados'), {
        nome: sorteadosApartamento[i].nome,
        referencia: sorteadosApartamento[i].referencia
      });
      await updateDoc(doc(db, 'candidatos', sorteadosApartamento[i].id), {
        sorteado: true
      });
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

function shuffleArray(array:any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const FazerSorteioVivendasGeminadas = async () => {
  try {
    setIsLoading(true);
     const querySnapshot = await getDocs(query(collection(db, 'candidatos'), 
    where('sorteado', '==', false),
    where('tipo', '==', 'Vivendas Geminadas'),
    where('estado', '==', 'aprovado')
));
    const VivendasNaoSorteados: any = [];
    querySnapshot.forEach((doc) => {
      VivendasNaoSorteados.push({ id: doc.id, ...doc.data() });
    });
    const sorteadosVivendas = shuffleArray(VivendasNaoSorteados);
     for (let i = 0; i < 200; i++) {
      await addDoc(collection(db, 'geminadasSorteados'), {
        nome: sorteadosVivendas[i].nome,
        referencia: sorteadosVivendas[i].referencia
      });
      await updateDoc(doc(db, 'candidatos', sorteadosVivendas[i].id), {
        sorteado: true
      });
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};



const FazerSorteioVivendasInsoladas = async () => {
  try {
    setIsLoading(true);
     const querySnapshot = await getDocs(query(collection(db, 'candidatos'), 
    where('sorteado', '==', false),
    where('tipo', '==', 'Vivendas Insoladas'),
    where('estado', '==', 'aprovado')
));
    const VivendasNaoSorteados: any = [];
    querySnapshot.forEach((doc) => {
      VivendasNaoSorteados.push({ id: doc.id, ...doc.data() });
    });
    const sorteadosVivendas = shuffleArray(VivendasNaoSorteados);
    for (let i = 0; i < 200; i++) {
      await addDoc(collection(db, 'insoladasSorteados'), {
        nome: sorteadosVivendas[i].nome,
        referencia: sorteadosVivendas[i].referencia
      });
      await updateDoc(doc(db, 'candidatos', sorteadosVivendas[i].id), {
        sorteado: true
      });
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};



const verificaSorteioFeito = async (nomeColecaoSorteio:string) => {
  const sorteioRef = collection(db, nomeColecaoSorteio);
  const querySnapshot = await getDocs(sorteioRef);
  return !querySnapshot.empty;
}







useEffect(()=>{
   totalPorApatamentos();
    TotaldeInscrito();
    totalPorVivendasGeminadas();
    totalPorVivendasInsoladas();

    /*Sorteio Realizados*/
    verificaSorteioFeito('apartamentosSorteados').then((sorteioFeito) => {
      setSorteiodeApartamentosRealizado(sorteioFeito);
    });

 verificaSorteioFeito('geminadasSorteados').then((sorteioFeito) => {
      setSorteiodeVivendasGeminadasRealizado(sorteioFeito);
    });

 verificaSorteioFeito('insoladasSorteados').then((sorteioFeito) => {
      setSorteiodeVivendasInsoladasRealizado(sorteioFeito);
    });



},[]);
	return (
		<IonPage>
		<IonContent>
		<section className='sectionContent'>
<Menu />
<div>
<h2 className='text text-dark'> Realizar Sorteio</h2>
</div>
<div className='px-3'>
{
  isLoading ? 
 <h2 className='text text-center text-dark text-lg'>Sorteiando...</h2>
 :
 <> 
 <IonButton 
  disabled={sorteiodeApartamentosRealizado}
  onClick={() => FazerSorteioApartamentos()}
 >
<IonText> Apartamentos
</IonText>
 </IonButton>
 <IonButton 
  disabled={sorteiodeVivendasInsoladasRealizado}
 onClick={()=>FazerSorteioVivendasInsoladas()}>
<IonText> Vivendas Insoladas
</IonText>
 </IonButton>
  <IonButton 
   disabled={sorteiodeVivendasGeminadasRealizado}
  onClick={()=>FazerSorteioVivendasGeminadas()}>
<IonText> Vivendas Geminadas
</IonText>
 </IonButton>
 </>
}


 </div>


  <PainelCard 
  tipo='Apartamentos' 
  total={apartamentos.length}
   porcentagem={(apartamentos.length/candidatos.length ) * 100} />

  <PainelCard 
  tipo='Vivendas Geminadas' 
  total={vivendasGeminadas.length}
   porcentagem={(vivendasGeminadas.length/candidatos.length ) * 100} />

   <PainelCard 
   tipo='Vivendas Insoladas'
    total={vivendasInsoladas.length}
      porcentagem={(vivendasInsoladas.length/candidatos.length ) * 100}
      />
  
 <CandidateList />

  </section>
   </IonContent>
		</IonPage>
     
		);
}