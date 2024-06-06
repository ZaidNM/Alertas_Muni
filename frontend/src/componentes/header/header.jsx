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
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#home">Inicio</a></li>
          <li><a href="#about">Acerca de</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <div className="auth-buttons">
          <button className="login">Iniciar Sesión</button>
          <button className="register">Registrarse</button>
        </div>
      </nav>
    </header>
  );
}