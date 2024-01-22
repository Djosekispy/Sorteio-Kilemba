import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useState} from 'react';
import {IonButton,
IonIcon,
 IonContent,
  IonPage,
  IonText,
  IonItem ,
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonLabel } from '@ionic/react';
import { logoGoogle, logoFacebook } from 'ionicons/icons';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {
 IonReactRouter 
} from '@ionic/react-router'
import './style.css'
import {auth} from '../../services/firebase';
import ModalTrue from '../../components/modalTrue/index';
import Home from '../home/index';
const schema = yup
  .object({
    email: yup.string().required('* campo Obrigatório'),
    senha: yup.string().required('* campo Obrigatório'),
  })
  .required()  

type useProps = {
  email: string;
  senha: string;
}
export default function Login(){
const [send , setSend] = useState<boolean>(false);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
 const onSubmit = async (data: useProps) => {
    try{
const user = await signInWithEmailAndPassword(auth,data.email, data.senha);
  const userData = user.user;
  const router = new IonReactRouter({
  basename: '/home',
 forceRefresh: true
})
    }catch(error){
  setSend(!send);
    }
 }

	return(
		   <IonPage>
    <IonContent>
<section style={{backgroundColor: '#eee'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image" />
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          {send && (
                <ModalTrue
                  href="/login"
                  content="Erro ao fazer seu Login! 
                  Verifique suas credenciais ou sua conexão com a internet."
                  title="Login"
                />
              )}



          <div className="form-outline mb-4">
          <p className='text text-danger'>{errors.email?.message}</p>
            <input {...register("email")} id="form1Example13" className="form-control form-control-lg" />
            <label className="form-label text-dark">E-mail</label>
          </div>
          <div className="form-outline mb-4">
          <p className='text text-danger'>{errors.senha?.message}</p>
            <input {...register("senha")} id="form1Example23" className="form-control form-control-lg" />
            <label className="form-label text-dark">Palavra passe</label>
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
           
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
              <label className="form-check-label text-dark"> recordar senha </label>
            </div>
            <a href="#!">Esqueceu sua senha?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">Entrar</button>

          <div className="text text-center my-4">
            <p className="text  text-center fw-bold mx-3 text-dark mb-0">OR</p>
          </div>

<div className='text text-center pb-2'>
          <a className="btn  my-2 btn-lg btn-block" style={{backgroundColor:'#3b5998'}} href="#!"
            role="button">
           <IonIcon icon={logoFacebook} className='text-dark mx-2' />

            Continuar com Facebook
          </a>
          <a className="btn btn-lg btn-block  twitterbutton" style={{backgroundColor: '#dd4b39'}}  href="#!"
            role="button">
            <IonIcon icon={logoGoogle} className='text-dark mx-2' />Continuar com Google</a>
</div>
        </form>
      </div>
    </div>
  </div>
</section>
    </IonContent>
    </IonPage>
		);
}