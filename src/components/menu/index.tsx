import { IonButton, IonIcon } from '@ionic/react';
import { menu } from 'ionicons/icons';
import Cronometer from '../cronometer/index'; 
import {auth} from '../../services/firebase';



export default function Menu(){

  const getAdmin = auth?.currentUser?.email;

	return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Sorteio</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Inicio</a>
        </li>
        {
          getAdmin === 'globof129@gmail.com' ?  <li className="nav-item">
          <a className="nav-link" href="/painel">Painel de Controle</a>
        </li>
        :
         <li className="nav-item">
          <a className="nav-link" href="/candidatar/user">Candidatura</a>
        </li>
        }
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sorteiados
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/apartamentos">Apartamentos</a></li>
            <li><a className="dropdown-item" href="/geminadas">Vivendas Geminadas</a></li>
            <li><a className="dropdown-item" href="/insoladas">Vivendas Insoladas</a></li>
          </ul>
        </li>
            <li className="nav-item">
            <a className="nav-link" href="/logout">Terminar sessão</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Cronometer />
</>
		);
}