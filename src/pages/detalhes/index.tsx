import './style.css';
import { IonContent,
 IonPage,
 } from '@ionic/react';
 import {useState, useEffect} from 'react';

import { useParams} from 'react-router-dom';
import Menu from '../../components/menu';
type CasasProps = {
  nome: string;
  tipo: string;
  descricao: string;
  imagem: string;
}



export default function Detalhes(){
   const { dados } = useParams<{ dados: string }>();

  const casa: CasasProps = JSON.parse(decodeURIComponent(dados));


	return(
 <IonPage>
    <IonContent>
    <section className='sectionContent'>
<Menu />
<div className="container-fluid my-12">
    <div className="row decor-default">
        <div className="col-md-12">
          <div className="contact">
            <div className="controls">
            <img src={casa?.imagem} alt="cover" className="cover"/>
            </div>
    
            <div className="row">
              <div className="col-md-4 col-md-5 col-xs-12">
                <div className="row my-3">
               
                  <div className="col-xs-9 me-3 text-dark font-bold">
                   {casa?.nome}
                  </div>
             
                  <div className="col-xs-9 me-3 text-dark">
                    {casa?.tipo}
                  </div>
              </div>

              <div className="col-lg-8 col-md-7 col-xs-12">
                <p className="contact-description text-dark">
                {casa?.descricao}
                </p>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  </div>
 
    <div className='w-full p-3 gap-8 justify-center flex-1 flex-row px-8 pb-12 bg-[#A5A5A5]'>
      <span className='font-extralight italic text-dark'>Copyright © 2023 Globo F</span>
     <br/>
        </div>

  </section>
    </IonContent>
   </IonPage>
		);
}