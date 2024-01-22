import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  IonButton,
  IonIcon,
  IonContent,
  IonPage,
  IonText,
  IonItem,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
} from '@ionic/react';
import {
  logoGoogle,
  logoFacebook,
  keyOutline,
  person,
  chevronExpandOutline,
} from 'ionicons/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  collection,
} from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import ModalTrue from '../../components/modalTrue/index';

type UserProps = {
  nome: string;
  email: string;
  senha: string;
  Confirmsenha: string;
};

const schema = yup.object({
  nome: yup.string().required('* Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('* Campo obrigatório'),
  senha: yup.string().min(6," * Deve ter pelo menos 6 caracteres").required('* Campo obrigatório'),
  Confirmsenha: yup
    .string()
    .oneOf([yup.ref('senha'), null], 'Senhas não conferem')
    .required('* Campo obrigatório'),
});

export default function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserProps) => {
    setIsLoading(true);

    try {
      const myUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );

      const user = myUser.user;

      await addDoc(collection(db, 'users'), {
        nome: data.nome,
        email: user.email,
        password: user.uid,
        createdAt: serverTimestamp(),
      });

      setSend(true);
    } catch (err) {
      console.error('Error creating user:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <section style={{ backgroundColor: '#eee' }}>
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid"
                  alt="Phone image"
                />
              </div>
              <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-8 mt-4">
                Registrar
              </p>
              {send && (
                <ModalTrue
                  href="/login"
                  content="Seu cadastro foi feito com sucesso! Agora você pode fazer o login e aproveitar."
                  title="Cadastro"
                />
              )}
              {error && (
                <ModalTrue
                  href="/signup"
                  content="Houve um erro ao tentar fazer o cadastro! Verifique sua conexão com a internet ou tente novamente mais tarde."
                  title="Erro no Cadastro"
                />
              )}

              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-1 mx-md-4"
                >
                  {/* Form inputs */}
                  <div className="d-flex flex-row align-items-center mb-0">
                    <IonIcon icon={person} style={{fontSize: '24px'}} className='me-3'/>
                    <div className="form-outline flex-fill mb-0">
                      <input {...register("nome")} placeholder='Nome Completo' id="form3Example1c" className="form-control" />
                    </div>
                  </div>
                  <label className='text text-danger mb-3'>{errors.nome?.message}</label> 

                  <div className="d-flex flex-row align-items-center mb-0">
                    <IonIcon icon={chevronExpandOutline} style={{fontSize: '24px'}} className='me-3'/>
                    <div className="form-outline flex-fill mb-0">  
                      <input {...register("email")} placeholder='Seu E-mail' id="form3Example3c" className="form-control" />
                    </div>
                  </div>
                   <label className='text text-danger mb-3'>{errors.email?.message}</label>
                  <div className="d-flex flex-row align-items-center mb-0">
                     <IonIcon icon={keyOutline} style={{fontSize: '24px'}} className='me-3'/>
                    <div className="form-outline flex-fill mb-0">
                    
                      <input {...register("senha")} placeholder='Senha' id="form3Example4c" className="form-control" />
                     
                    </div>
                  </div>
<label className='text text-danger mb-3'>{errors.senha?.message}</label>

                  <div className="d-flex flex-row align-items-center mb-0">
                    <IonIcon icon={keyOutline} style={{fontSize: '24px'}} className='me-3'/>
                    <div className="form-outline flex-fill mb-0">
                     
                      <input {...register("Confirmsenha")} placeholder='Repita sua senha' id="form3Example4cd" className="form-control" />
                     
                    </div>
                  </div>
<label className='text text-danger mb-3'>{errors.Confirmsenha?.message}</label>
    

 <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label">
                      Eu concordo com todos os <a href="#!">Termos & Condições</a>
                    </label>
                  </div>
                  {/* Submit button */}
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                  </div>

                  {/* Social media buttons */}
                  <div className="text-center text-dark my-4">
                    <p>Registrar-se com o:</p>
                      <button type="button" className="btn btn-primary btn-floating mx-1">
                  <IonIcon icon={logoFacebook} className='text-dark mx-2' />
                </button>

                <button type="button" className="btn bg-danger btn-floating mx-1">
                 <IonIcon icon={logoGoogle} className='text-dark mx-2' />
                </button>
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
