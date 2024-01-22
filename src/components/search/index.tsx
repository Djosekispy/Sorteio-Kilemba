import { search } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/react';
import './style.css'

export default function Search({...rest}){


   return(
      <> 
<form>
  <div>
    <div className="col mx-3">
      <input type="text" className="form-control" placeholder="First name"/>
    </div>
    <div className="col mx-3">
    <button type="submit" className="btn btn-primary">Buscar</button>
    </div>
  </div>
</form>
</>
   	);

}