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
          <li><a href="#home">Inicio</a></li>
          <li><a href="#instrucciones">Instrucciones</a></li>
          <li><a href="#noticias">Noticias</a></li>
          <li><a href="#destacados">Destacados</a></li>
          <li><a href="#formularios">Formulario</a></li>
        </ul>
        <div className="auth-buttons">
          <button >Iniciar Sesión</button>
          <Link to="/registro"><button>Registrate</button></Link>
        </div>
        <label htmlFor="check" className='esconder-menu'>
          &#215;
        </label>
      </nav>
    </header>
  );
}