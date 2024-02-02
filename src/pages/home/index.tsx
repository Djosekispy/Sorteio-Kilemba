import { IonContent,
 IonPage,
IonText,IonItem ,
IonTitle, 
IonLoading,
IonToolbar } from '@ionic/react';

import {useState, useEffect} from 'react';
import CandidateList from '../../components/candidateList/index'
import ScrollContentImage from '../../components/scroollcontent/index'
import './style.css'
import Menu from '../../components/menu';
import Cards from '../../components/cards';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db, auth } from '../../services/firebase';

import CardComent from '../../components/comentarioCard/index';



type CasasProps = {
  nome: string;
  tipo: string;
  descricao: string;
  imagem: string;
}

const banner = '../../assets/banner.jpg';



const Home: React.FC = () => {
  const [menuvisible, setMenuvisible] = useState(false);
  const [casas, setCasas] = useState<CasasProps[]|null>(null)

const carregarDados = async ()=>{
    const q = query(collection(db, "casas"));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo : CasasProps[] = [];
     querySnapshot.forEach((doc) => {
      modulo.push({
      nome: doc.data().nome,
      imagem: doc.data().imagem,
      tipo: doc.data().tipo,
      descricao: doc.data().descricao

      });
      setCasas(modulo);
     });

    })
}


useEffect(()=>{
 carregarDados();
},[]);





  return (
    <IonPage>
    <IonContent>
<section className='sectionContent'>
<Menu />

{
  casas ? casas.map((item,index)=><Cards 
    key={index}
    nome={item.nome}
    tipo={item.tipo}
    imagem={item.imagem}
    descricao={item.descricao}

   />) : <IonLoading animated={true} color="red"/>


}


<CandidateList />
</section>
</IonContent>
    </IonPage>
  );
};

export default Home;
