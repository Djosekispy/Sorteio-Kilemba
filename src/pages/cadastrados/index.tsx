import CandidateList from '../../components/candidateList/index'
import Menu from '../../components/menu';
import { IonContent, IonPage,IonText,IonItem ,IonTitle, IonToolbar } from '@ionic/react';
import './style.css'
export default function Candidatos(){
	return (
<>
    <IonPage>
    <IonContent>
<section className='sectionContent'>
<Menu />
		<CandidateList />
</section>
</IonContent>
    </IonPage>
</>
		);
}