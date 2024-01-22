import { IonButton, IonIcon, IonText } from '@ionic/react';
import { home, location, checkbox } from 'ionicons/icons';

type imageProps = {
  source: string,
  title: string,
  description: string;
  dimension: string
}

export default function ImageScroll({
  source,
  title,
  description,
  dimension
}: imageProps){

  return (
  	<>
 

    <div style={{width:'200px', height:'200px'}} className="card rounded-2">
  <img src={source} style={{height:'100%', width:'100%'}} className="card-img" alt="..." />
</div>
<div>
  <p style={{fontSize:'15px', fontWeight:'bold'}} className="text-dark text text-center">{title}</p>

  </div>
</>
  );

}