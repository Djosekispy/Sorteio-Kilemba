import './style.css';
import Menu from '../../components/menu';
import { IonContent, IonPage, IonAlert, IonTitle, IonToolbar } from '@ionic/react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth,db,storage } from '../../services/firebase';
import {
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  collection,
  where,
  query,
  onSnapshot
} from 'firebase/firestore';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useState,
  useEffect
} from 'react';


// Validação Yup
const schema = yup.object().shape({
  nome: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  endereco: yup.string().required('Campo obrigatório'),
  tipo: yup.string().required('Campo obrigatório'),
  bilheteFile: yup.mixed().required('Campo obrigatório'),
  certificadoFile: yup.mixed().required('Campo obrigatório'),
  residenciaFile: yup.mixed().required('Campo obrigatório'),
  termosChecked: yup.boolean().required('Você deve concordar com os termos'),
});

type preferencia = 'Apartamentos' | 'Vivendas Insoladas' | 'Vivendas Geminadas';

type FormData = {
  nome: string;
  telefone: string;
  endereco: string;
  bilheteFile: FileList;
  certificadoFile: FileList;
  residenciaFile: FileList;
  termosChecked: boolean;
  tipo: preferencia;
};

type CandidatoProps = {
  estado: string;
  nome: string;
  telefone: string;
  endereco: string;
  bilhete: string;
  certificado: string;
  residencia: string;
  tipo: string;
  data: Date
};

export default function Candidatura() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [isLoanding, setIsLoading] = useState<boolean>(false)

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [candidato, setCandidato] = useState<CandidatoProps[] | null>(null)


  const onSubmit = async (data) => {
      setIsLoading(true);
    const { nome, bilheteFile, certificadoFile, residenciaFile } = data;

    const uploadFile = async (file: File, storagePath: string) => {
      const fileRef = ref(storage, storagePath);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    };

    const bilheteURL = await uploadFile(bilheteFile[0], `candidaturas/${nome}/bilhete`);
    const certificadoURL = await uploadFile(certificadoFile[0], `candidaturas/${nome}/certificado`);
    const residenciaURL = await uploadFile(residenciaFile[0], `candidaturas/${nome}/residencia`);

    await addDoc(collection(db, 'candidatos'), {
        nome: data.nome,
        telefone: data.telefone,
        endereco: data.endereco,
        email: auth?.currentUser?.email,
        referencia: auth?.currentUser?.uid,
        bilhete: bilheteURL,
        certificado: certificadoURL,
        residencia: residenciaURL,
        tipo: data.tipo,
        sorteado: false,
        estado: 'pendente',
        data: serverTimestamp()
      });
    setIsLoading(false);
    setShowAlert(true);
  };

  const onError = (errors:any) => {
    // Set errors based on validation
    Object.entries(errors).forEach(([name, error]) => {
      setError(name as keyof FormData, { type: 'manual', message: error?.message });
    });
  };

const VerificarCandidatura = ()=>{
   const q = query(collection(db, "candidatos"),where('referencia','==',auth?.currentUser?.uid));
  const unsubscribeData = onSnapshot(q, (querySnapshot) => {
     const modulo: any[] = [];
     querySnapshot.forEach((doc) => {
      modulo.push(doc.data());
     });
setCandidato(modulo);
    });
}

useEffect(()=>{
  VerificarCandidatura();
},[])







  return (
    <IonPage>
      <IonContent>
        <section className="sectionContent">
          <Menu />
          <div className="login-form">
          {
            candidato?.length > 0 ? 
            <form>
                 <div className="avatar">
            <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="Avatar" />
        </div>
        <h2 className="text-center">Informações de Cadastro</h2>   
  <div className="form-group my-2">
  <h6 className="text-center">Estado da sua candidatura: {candidato[0]?.estado}</h6>   
  <label className='m-2'>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={candidato[0]?.nome}
                 disabled={true}
                />
                  </div>

  <div className="form-group my-2">
   <label className='m-2'>Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  value={candidato[0]?.telefone}
                  disabled={true}
                />
                 </div>
  <div className="form-group my-2">
   <label className='m-2'>Email</label>
                <input
                  type="email"
                  inputMode='email'
                  className="form-control"
                  value={auth?.currentUser?.email}
                  disabled={true}
                />
                 </div>

<div className="form-group my-2">
 <label className='m-2'>Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  value={candidato[0]?.endereco}
                  disabled={true}
                />
                  </div>

 <div className="form-group my-2">
<label>
        <input
          type="radio"
          value={candidato[0]?.tipo}
          checked
          disabled={true}
          className='me-2'
        />
       {candidato[0]?.tipo}
      </label>
      </div>


 <div className="form-group my-2">
  <label className='m-2'>
    Todos os documentos é foram carregados com sucesso!
  </label>
           
                </div>

           
            </form>

          :
        
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                 <div className="avatar">
            <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="Avatar" />
        </div>
        <h2 className="text-center">Candidato</h2>   
  <div className="form-group my-2">
  <label className='m-2'>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome Completo"
                  {...register('nome')}
                />
                {errors.nome && <span className="error">{errors.nome.message}</span>}
              </div>

  <div className="form-group my-2">
   <label className='m-2'>Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Número de Telefone"
                  {...register('telefone')}
                />
                {errors.telefone && <span className="error">{errors.telefone.message}</span>}
              </div>

<div className="form-group my-2">
 <label className='m-2'>Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Endereço"
                  {...register('endereco')}
                />
                {errors.endereco && <span className="error">{errors.endereco.message}</span>}
              </div>

              <div className="form-group my-2">
               <label className='m-2'>Bilhete de Identidade</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Bilhete de Identidade"
                  {...register('bilheteFile')}
                />
                {errors.bilheteFile && <span className="error">{errors.bilheteFile.message}</span>}
              </div>

       <div className="form-group my-2">
        <label className='m-2'>certificado de Finanças</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Certificado de Finanças"
                  {...register('certificadoFile')}
                />
                {errors.certificadoFile && <span className="error">{errors.certificadoFile.message}</span>}
              </div>

 <div className="form-group my-2">
  <label className='m-2'>Atestado de Residencia</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Certificado de Finanças"
                  {...register('residenciaFile')}
                />
                {errors.residenciaFile && <span className="error">{errors.residenciaFile.message}</span>}
              </div>

 <div className="form-group my-2">
<label>
        <input
          type="radio"
          value="Apartamentos"
          {...register('tipo')}
          className='me-2'
        />
        Apartamentos
      </label>
      </div>
       <div className="form-group my-2">
      <label>
        <input
          type="radio"
          {...register('tipo')}
          value="Vivendas Insoladas"
          className='me-2'
        />
        Vivendas Insoladas
      </label>
      </div>
       <div className="form-group my-2">
      <label>
        <input
        className='me-2'
          type="radio"
          {...register('tipo')}
          value="Vivendas Geminadas"
          
        />
       Vivendas Geminadas
      </label>

</div>


              {/* Repita o mesmo padrão para os outros campos de arquivo */}

              <div className="bottom-action clearfix">
                <label className="float-left form-check-label">
                  <input
                    type="checkbox"
                    {...register('termosChecked')}
                    checked
                  />{' '}
                  Concordo com os{' '}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    termos e condições
                  </a>
                </label>
                {errors.termosChecked && <span className="error">{errors.termosChecked.message}</span>}
              </div>

              <div className="form-group">
             {
                 isLoanding ? <button disabled={isLoanding} className="btn btn-primary btn-sm btn-block">
                  Submetendo...
                </button> : <button type="submit" className="btn btn-primary btn-sm btn-block">
                  Submeter
                </button> 
             }   

              </div>
            </form>

             }
          </div>
          <div className='w-full p-3 gap-8 justify-center flex-1 flex-row px-8 pb-12 bg-[#A5A5A5]'>
      <span className='font-extralight italic text-dark'>Copyright © 2023 Globo F</span>
     <br/>
        </div>

        </section>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Candidatura Submetida!"
        subHeader="Sua candidatura foi enviada com sucesso."
        message="Entraremos em contato em breve."
        buttons={['OK']}
      />
    </IonPage>
  );
}
