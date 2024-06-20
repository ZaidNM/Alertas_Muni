import React from "react";
import './login.css';

export default function Login() {
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>Iniciar Sesión</h2>
                <label>
                    Correo:
                    <input type="email" name="correo" required />
                </label>
                <label>
                    Contraseña:
                    <input type="password" name="contrasena" required />
                </label>
                <button type="button">Iniciar Sesión</button>
            </form>
        </div>
    );
}