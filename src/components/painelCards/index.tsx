import {
IonPage,
IonContent,
IonCard,
IonCardContent,
IonCardHeader,
IonCardTitle,
IonCardSubtitle

} from '@ionic/react';

type painelProps = {
	tipo: string;
	total: number;
	porcentagem: number;
}

export default  function PainelCard({tipo,total,porcentagem}:painelProps){

		return(
			<>
   				<IonCard className='my-12 card-bg' style={{
   		"background": "linear-gradient(to right, #493240, #f09)",
    "color": "#fff"
   				}}>
    <IonCardHeader>
    </IonCardHeader>
    <IonCardContent>
    <IonCardTitle>
    <span> {tipo} </span>
    </IonCardTitle>
   <span> Cadastrados {total} </span>
    <IonCardSubtitle>
 <span> Porcentagem de candidatos {porcentagem} %</span> 
    </IonCardSubtitle>
    </IonCardContent>
   				</IonCard>
</>
			);


} 