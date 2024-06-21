import React from 'react';
import {useNavigate} from 'react-router-dom'
import './registro.css';

export default function Registro() {

    const navigate = useNavigate()
    
    const registroClick = () => {
        navigate('/')
    }

    return (
        <div className="register-container">
            <form className="register-form">
                <div className="form-column">
                    <label>
                        Nombre:
                        <input type="text" name="nombre" required />
                    </label>
                    <label>
                        Apellido:
                        <input type="text" name="apellido" required />
                    </label>
                    <label>
                        Correo:
                        <input type="email" name="correo" required />
                    </label>
                    <label>
                        DNI:
                        <input type="text" name="dni" required />
                    </label>
                </div>
                <div className="form-column">
                    <label>
                        Celular:
                        <input type="tel" name="celular" required />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" name="contrasena" required />
                    </label>
                    <label>
                        Fecha de Nacimiento:
                        <div className="birth-date">
                            <select name="dia" required>
                                <option value="">Día</option>
                                {[...Array(31).keys()].map(day => (
                                    <option key={day + 1} value={day + 1}>{day + 1}</option>
                                ))}
                            </select>
                            <select name="mes" required>
                                <option value="">Mes</option>
                                {[
                                    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                                ].map((month, index) => (
                                    <option key={index + 1} value={index + 1}>{month}</option>
                                ))}
                            </select>
                            <select name="ano" required>
                                <option value="">Año</option>
                                {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </label>
                </div>
                <div className="form-full">
                    <button type="button" onClick={registroClick} >Registrarse</button>
                </div>
            </form>
        </div>
    );
}
