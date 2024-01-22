import { IonContent, IonPage,IonText,IonItem ,IonTitle, IonToolbar } from '@ionic/react';

import {useState} from 'react';
import CandidateList from '../../components/candidateList/index'
import ScrollContentImage from '../../components/scroollcontent/index'
import './style.css'
import Cronometer from '../../components/cronometer';
import Menu from '../../components/menu';
import Cards from '../../components/cards';
const banner = '../../assets/banner.jpg';
const Home: React.FC = () => {
  const [menuvisible, setMenuvisible] = useState(false);
  return (
    <IonPage>
    <IonContent>
<section className='sectionContent'>
<Menu />
{/*    <ScrollContentImage /> */}

<Cards />

<CandidateList />
</section>
</IonContent>
    </IonPage>
  );
};

export default Home;
