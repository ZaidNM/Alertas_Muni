import React from 'react';
import { Link } from "react-router-dom";
import './header.css';
import Imagen from '../../assets/img/logo.jpg';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="#home">
          <img src={Imagen} alt="Logo" />
        </a>
      </div>
      <input type="checkbox" id='check' />
      <label htmlFor="check" className='mostrar-menu'>
        &#8801;
      </label>
      <nav className="nav">
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/">Instrucciones</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/reportes">Reportes</Link></li>
          <li><Link to="/noticias">Formulario</Link></li>
        </ul>
        <div className="auth-buttons">
          <Link to="/"><button>Iniciar Sesión</button></Link>
          <Link to="/registro"><button>Registrate</button></Link>
        </div>
        <label htmlFor="check" className='esconder-menu'>
          &#215;
        </label>
      </nav>
    </header>
  );
}