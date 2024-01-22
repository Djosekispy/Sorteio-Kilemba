import './style.css';
import Menu from '../../components/menu';
import { IonContent, IonPage,IonText,IonItem ,IonTitle, IonToolbar } from '@ionic/react';

export default function Candidatura(){

	return(
<>
    <IonPage>
    <IonContent>
<section className='sectionContent'>
<Menu />
<div className="login-form">
    <form>
		<div className="avatar">
			<img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="Avatar" />
		</div>
        <h2 className="text-center">Candidato</h2>   
        <div className="form-group my-2">
        	<input type="text" className="form-control" name="username" placeholder="Nome Completo" />
        </div>
 <div className="form-group my-2">
        	<input type="text" className="form-control" name="telefone" placeholder="Nº de Telefone" />
        </div>

 <div className="form-group my-2">
        	<input type="text" className="form-control" name="endereco" placeholder="Endereço" />
        </div>

         <div className="form-group my-2">
        	<input type="file" className="form-control" name="bilhete" placeholder="Bilhete de Identidade" />
        </div>
	<div className="form-group my-2">
        	<input type="file" className="form-control" name="certificado" placeholder="Bilhete de Identidade" />
        </div>
<div className="form-group my-2">
        	<input type="file" className="form-control" name="residencia" placeholder="Bilhete de Identidade" />
        </div>

	<div className="bottom-action clearfix">
            <label className="float-left form-check-label">
            <input type="checkbox" /> Concordo com os <a href='#'>termos e condições</a></label>
        </div>

        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Submeter</button>
        </div>
    </form>
</div>
</section>
</IonContent>
    </IonPage>
</>
		);
}