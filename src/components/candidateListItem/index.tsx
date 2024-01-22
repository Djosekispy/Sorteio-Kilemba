import './style.css';
import { star, location,home ,atCircleOutline, bookOutline } from 'ionicons/icons';
import { IonButton, IonIcon, IonAvatar } from '@ionic/react';

type ListProps = {
	profile: string;
	name: string;
	description: string;
}

export default function CandidateListItem({profile,
	name,description}:ListProps){

	return(
    <>
    {/*
  <div classNameName='allContent m-2'>
<IonAvatar classNameName='imgContent'>
<img src={profile} title='Imagem de Perfil' />
</IonAvatar>
<div classNameName='info mx-1 p-2 rounded textContent'>
<strong classNameName='text-white'>{name}</strong>
  <div>
 <IonIcon slot="start" classNameName='mx-1 textContent' icon={location}></IonIcon>
  {description}
  </div>
  <div  classNameName="card-title p-3 textContent position-absolute top-0 end-0">
  <IonIcon slot="start" classNameName='mx-1' icon={bookOutline}></IonIcon>
  </div>
</div>
  </div>
       */}
<div className="body">
<div className="page-content page-container" id="page-content">
   <div className="padding">
      <div className="row">
         <div className="col-sm-6">
            <div className="list list-row block">
               <div className="list-item" data-id="7">
                  <div><a href="#" data-abc="true"><span className="w-48 avatar gd-primary"><img src="https://img.icons8.com/color/48/000000/administrator-male.png" alt="." /></span></a></div>
                  <div className="flex">
                     <a href="#" className="item-author text-color" data-abc="true">Kinley Adolf</a>
                     <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                  </div>
                  <div className="no-wrap">
                     <div className="item-date text-muted text-sm d-none d-md-block">21 July</div>
                  </div>
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