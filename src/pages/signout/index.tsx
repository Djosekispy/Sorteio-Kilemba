import React, { useEffect } from 'react';
import { IonButton, IonIcon, IonContent, IonPage } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const Sair = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonIcon
          icon={logOut}
          size="large"
          color="red"
          style={{ width: '50px', height: '50px', color: 'red' }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Sair;
