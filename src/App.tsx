import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Candidatura from './pages/candidate/index';
import Candidatos from './pages/cadastrados/index';
import Detalhes from './pages/detalhes/index';
import PaineldeControle from './pages/painel/index';
import Sair from './pages/signout/index';
import SorteadosdeApartamento from './pages/sorteios/apartamento';
import SorteadosdeInsoladas from './pages/sorteios/insoladas';
import SorteadosdeGeminadas from './pages/sorteios/geminadas';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';


setupIonicReact();


const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      setAuthenticated(user?.emailVerified);
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Rotas condicionais com base no estado de autenticação */}
          <Route
            exact
            path="/home"
            render={() => (authenticated ?
             <Home /> : <Redirect to="/login" />)}
          /> 
          <Route
            exact
            path="/login"
            render={() => (authenticated ? 
             <Redirect to="/home" />: <Login /> )}
          />
         <Route
            exact
            path="/singnup"
            render={() => (authenticated ? 
             <Redirect to="/home" />: <Signup /> )}
          />

          <Route
            exact
            path="/logout"
            render={() => (authenticated && <Sair /> )}
          />


          <Route
            exact
            path="/"
            render={() => (authenticated ? 
               <Home /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/login"
            render={() => (authenticated ? 
             <Redirect to="/home" />: <Login /> )}
          />
     <Route
     exact
     path='/apartamentos'
     render={() => (authenticated && <SorteadosdeApartamento /> ) }
     />
  <Route
     exact
     path='/insoladas'
     render={() => (authenticated && <SorteadosdeInsoladas /> ) }
     />

     <Route
     exact
     path='/geminadas'
     render={() => (authenticated && <SorteadosdeGeminadas /> ) }
     />
     

     <Route
     exact
     path='/candidatar/user'
     render={() => (authenticated && <Candidatura />) }
     /> 
      <Route
     exact
     path='/painel'
     render={() => (authenticated && <PaineldeControle />) }
     /> 


 <Route
     exact
     path='/detalhes/:dados'
     render={() => (authenticated && <Detalhes />) }
     /> 



        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;


