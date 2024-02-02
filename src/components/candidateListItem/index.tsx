import './style.css';
import { star, location,home ,atCircleOutline, bookOutline } from 'ionicons/icons';
import { IonButton, IonIcon, IonAvatar } from '@ionic/react';

type ListProps = {
	nome: string;
	tipo: string;
   bilhete: string;
}

export default function CandidateListItem({nome,
	tipo, bilhete}:ListProps){

	return(
    <>
<div className="body">
<div className="page-content page-container" id="page-content">
   <div className="padding">
      <div className="row">
         <div className="col-sm-12">
            <div className="list list-row block">
               <div className="list-item" data-id="7">
                  <div><a href="#" data-abc="true"><span className="w-48 avatar gd-primary"><img src="https://img.icons8.com/color/48/000000/administrator-male.png" alt="." /></span></a></div>
                  <div className="item-except text-muted text-sm h-1x">{nome}</div><br/>
                  <div className="text-dark text-sm h-1x">{tipo}</div>              
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</div>
</>
		);
}