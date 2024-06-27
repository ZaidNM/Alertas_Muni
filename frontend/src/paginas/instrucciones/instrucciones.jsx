import React from "react";
import { Link } from "react-router-dom";
import Imagen1 from '../../assets/img/paso1.png';
import Imagen2 from '../../assets/img/paso2.png';
import Imagen3 from '../../assets/img/paso3.png';
import Imagen4 from '../../assets/img/paso4.png';
// import Formulario from '../formulario/formulario';
import './instrucciones.css';

export default function Instrucciones() {
    // const Formulario = () => {
    //     // Redirigir a la página del formulario de reportes
    //     window.location.href = { Formulario }; // Asegúrate de que la ruta sea correcta
    // };
    return (
        <div className="instructions-container">
            <div className="instructions">
                <h2>Instrucciones para Rellenar el Formulario de Reportes</h2>

                <div className="step">
                    <p>Paso 1: Entre a Google Maps desde "Seleccionar".</p>
                    <img src={Imagen1} alt="Paso 1" />
                </div>

                <div className="step">
                    <p>Paso 2: Seleccione su ubicacion.</p>
                    <img src={Imagen2} alt="Paso 2" />
                </div>

                <div className="step">
                    <p>Paso 3: Describa el problema detalladamente.</p>
                    <img src={Imagen3} alt="Paso 3" />
                </div>

                <div className="step">
                    <p>Paso 4: Suba una foto como evidencia del problema.</p>
                    <img src={Imagen4} alt="Paso 4" />
                </div>
                <h2>PUEDE REALIZAR UN REPORTE DANDO CLICK EN EL SIGUIENTE BOTON</h2>
                <Link to='/formulario'><button >Realizar un reporte</button></Link>
            </div>
        </div>
    );
}