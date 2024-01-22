
import CandidateListItem from '../candidateListItem/index';
import { IonButton,IonIcon,IonInput,
IonText,
 IonButtons,
  IonList,
IonNavLink
} from '@ionic/react';
import { notificationsCircle, search, notifications, calculator } from 'ionicons/icons';
import Search from '../search/index'
import './style.css';

const imagesContent = [
{
profile : '../../assets/apartamento1.jpg',
  name: 'Osvaldo Victor',
  description: "Apartamentos",
},
{
profile : '../../assets/apartamento3.jpg',
 name: 'Osvaldo Victor',
   description: "Vivendas Insoladas",
},
{
profile : '../../assets/apartamento4.jpg',
  name: 'Osvaldo Victor',
   description: "Apartamentos",
},
{
profile : '../../assets/apartamento6.jpeg',
 name: 'Osvaldo Victor',
   description: "Apartamentos",
},
{
profile : '../../assets/apartamento1.jpg',
 name: 'Osvaldo Victor',
    description: "Vivendas Geminadas",
},
{
profile : '../../assets/apartamento1.jpg',
  name: 'Osvaldo Victor',
   description: "Vivendas Insoladas",
},
]; 

const nemuItens = ['Apartamentos', 'Insoladas','Geminadas' ];

export default function CandidateList(){

return(
<div>
<div className='px-2 py-1 my-1'>
<p className='text-dark titleDiv px-3 titleHouse'>Candidatos Cadastrados</p>
</div>

<Search />
{
imagesContent.map((item,index)=> <CandidateListItem name={item.name} 
	description={item.description}
	key={index}
	profile={item.profile}
	 /> )
}
</div>
	);
}