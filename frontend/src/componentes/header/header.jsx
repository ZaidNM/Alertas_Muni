import React from 'react';
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
      <input type="checkbox" id='check'/>
      <label htmlFor="check" className='mostrar-menu'>
        &#8801;
      </label>
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#reportes">Reportes</a></li>
          <li><a href="#noticias">Noticias</a></li>
          <li><a href="#destacados">Destacados</a></li>
          <li><a href="#formularios">Formulario</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="login">Iniciar Sesión</button>
          <button className="register">Regístrate</button>
        </div>
        <label htmlFor="check" className='esconder-menu'>
          &#215;
        </label>
      </nav>
    </header>
  );
}