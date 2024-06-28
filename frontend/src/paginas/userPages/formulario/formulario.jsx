import React from "react";
import './formulario.css';

export default function Formulario() {
    const seleccionUbicacion = () => {
        window.open('https://www.google.com/maps', '_blank');
    };

    return (
        <div className="form-container">
            <form className="formulario">
                <h2>FORMULARIO DE REPORTE</h2>

                <label className="ubicacion">
                    Ubicación:
                    <div className="ubicacion-input">
                        <input type="text" name="ubicacion" placeholder="Seleccione su ubicación" readOnly />
                        <button type="button" onClick={seleccionUbicacion}>Seleccionar</button>
                    </div>
                </label>

                <label className="municipalidad">
                    Municipalidad:
                    <input type="text" name="municipalidad" readOnly />
                </label>

                <label className="descripcion">
                    Descripción del Problema:
                    <textarea name="descripcion" placeholder="Describa el problema aquí..." required />
                </label>

                <label className="foto">
                    Evidencia (Foto):
                    <input type="file" name="evidencia" accept="image/*" />
                </label>

                <button type="submit">Enviar Reporte</button>
            </form>
        </div>

    );
}