import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useState} from 'react';
import { arrowBack} from 'ionicons/icons';
import {IonButton,
IonIcon,
 IonContent,
  IonPage,
  IonText,
  IonItem ,
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonModal,
  IonLabel } from '@ionic/react';

import { logoGoogle, logoFacebook,lockClosed,lockOpen } from 'ionicons/icons';
import {
  signInWithEmailAndPassword,
sendPasswordResetEmail,
sendEmailVerification 
} from 'firebase/auth';
import {
 IonReactRouter 
} from '@ionic/react-router'
import './style.css'
import {auth} from '../../services/firebase';
import ModalTrue from '../../components/modalTrue/index';
import Home from '../home/index';
import {
 GoogleAuthProvider, 
signInWithPopup,
signInWithRedirect,
FacebookAuthProvider
 } from "firebase/auth";

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

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
const [open, setOpen] = useState<boolean>(false);
const [email, setEmail] = useState('');
const [enviar, setEnviar] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
 const onSubmit = async (data: useProps) => {
    try{
      setEnviar(true)
const user = await signInWithEmailAndPassword(auth,data.email, data.senha);
  const userData = user.user;
  setEnviar(false)
    }catch(error){
  setSend(!send);
  setEnviar(false)
    }
 }

const RecuperarSenha = async(email: string)=>{
  if(email.trim() != ''){
setEnviar(true);
await sendPasswordResetEmail(auth, email);
setEnviar(false);
  }
  return false;
};

const reenviarEmaildeConfirmacao = async () => {
   const user = auth?.currentUser
        await sendEmailVerification(user);
  };

const entrarComGoogle = () => signInWithPopup(auth, providerGoogle)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
  
    const email = error.customData.email;
  
    const credential = GoogleAuthProvider.credentialFromError(error);
  
  });

const entrarComFacebook = () => signInWithPopup(auth, providerFacebook)
  .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = FacebookAuthProvider.credentialFromError(error);
  });


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
{auth?.currentUser?.emailVerified && <> <div className="mb-4 text text-dark text-center">
      Notamos que não verificou a sua senha. <span className="text-primary" onClick={()=>reenviarEmaildeConfirmacao}>Clique Aqui</span>
    </div>
</> }

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
            <input 
            {...register("senha")} 
            type="password"
            id="form1Example23" 
            className="form-control form-control-lg" 
            />

            <label className="form-label text-dark">Palavra passe</label>
          </div>

       
            <div className="form-check">
              <span className='text-dark me-2'>Não tens uma conta?</span>
               <a href="/singnup">aqui</a>
               </div>
                   <div className="form-check">
            <span onClick={()=>setOpen(!open)} className='text-dark' >Esqueci minha senha</span>
          </div>
          <button type="submit"  disabled={enviar} className="btn btn-primary btn-sm btn-block w-100">Entrar</button>

          <div className="text text-center my-4">
            <p className="text  text-center fw-bold mx-3 text-dark mb-0">OR</p>
          </div>

<div className='text text-center pb-2'>
          <span className="btn text-sm  my-2 btn-sm btn-block" 
          style={{backgroundColor:'#3b5998'}} 
          onClick={()=>entrarComFacebook()}
            role="button">
           <IonIcon icon={logoFacebook} className='text-dark mx-2' />

            Continuar com Facebook
          </span>
          <span className="btn btn-sm btn-block  twitterbutton"
           style={{backgroundColor: '#dd4b39'}} 
           onClick={()=>entrarComGoogle()}
            role="button">
            <IonIcon icon={logoGoogle} 
             className='text-dark mx-2' />Continuar com Google</span>
</div>
        </form>
      </div>
    </div>
  </div>
</section>
<IonModal
  title="Repor Senha"
  content="Insira o seu Email para poder Repor a sua Senha"
  isOpen={open}
  className="m-3 rounded"
>
  <form className="p-4">
 <IonIcon icon={arrowBack} size='35px' onClick={()=>setOpen(!open)} />
    <h4 className="mb-4">Reposição de Senha</h4>
    <div>Lhe enviaremos um link para a reposição da sua senha</div>
    <div className="mb-4">
      Se dentro de 5 minutos não receber. <span className="text-primary" onClick={()=>RecuperarSenha(email)}>Clique Aqui</span>
    </div>
    <div className="mb-4">
      <div className="form-outline">
        <label className="form-label" htmlFor="form1Example13">
          E-mail Cadastrado
        </label>
     <input
  inputMode="email"
  type="email"
  disabled={enviar}
  id="form1Example13"
  className="form-control form-control-lg"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder='example@gmail.com'
/>    
      </div>
    </div>
    {
      enviar ? 
     <button disabled={true} className="btn btn-primary btn-lg btn-block">
      Enviando...
    </button>
    :
     <button onClick={()=>RecuperarSenha(email)} className="btn btn-primary btn-lg btn-block">
      Receber SMS
    </button>
    }
   
  </form>
</IonModal>

    </IonContent>
    </IonPage>
		);
}