import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Candidatura from './pages/candidate/index';
import Candidatos from './pages/cadastrados/index';

import {useEffect, useState} from 'react'
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

import { onAuthStateChanged} from "firebase/auth";
import { auth } from './services/firebase';

setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
    });

    return () => unsubscribe();
  }, []);

  const renderAuthorizedRoutes = () => (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
           <Route exact path="/candidatura">
            <Candidatura />
          </Route>
 <Route exact path="/listagem">
           <Candidatos />
          </Route>


          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );

  const renderUnauthorizedRoutes = () => (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );

  return <>{user ? renderUnauthorizedRoutes(): renderAuthorizedRoutes()}</>;
};

export default App;