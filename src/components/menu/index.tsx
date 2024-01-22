import { IonButton, IonIcon } from '@ionic/react';
import { menu } from 'ionicons/icons';
import Cronometer from '../cronometer/index'; 
export default function Menu(){
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
        <li className="nav-item">
          <a className="nav-link" href="/candidatura">Inscrever-se</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Meu Perfil</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sorteiados
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="/listagem">Apartamentos</a></li>
            <li><a className="dropdown-item" href="/listagem">Vivendas Geminadas</a></li>
            <li><a className="dropdown-item" href="/listagem">Vivendas Insoladas</a></li>
          </ul>
        </li>
            <li className="nav-item">
          <a className="nav-link" href="/">logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Cronometer />
</>
		);
}