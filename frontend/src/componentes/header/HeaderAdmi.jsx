import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Imagen from '../../assets/img/logo.jpg';
import {useLogin} from '../../context/LoginContext.jsx';

export default function HeaderAdmi() {

    const {login} = useLogin();
    console.log("Los datos que llegaron",login)

    return (
        <header className="flex items-center py-2 px-4 bg-[#2D9596] gap-2">
            <div className="logo">
                <a href="#home">
                    <img src={Imagen} alt="Logo" className="h-12 block shadow-lg" />
                </a>
            </div>
            <input type="checkbox" id='check' className="hidden" />
            <label htmlFor="check" className='mostrar-menu text-3xl cursor-pointer hidden text-[#FBFBCC] transition-colors duration-400 order-1 hover:text-[#6ac2fc]'>
                &#8801;
            </label>
            <nav className="flex items-center flex-grow justify-between pl-4 fixed w-full h-screen bg-[#0071BC] right-[-100%] top-0 text-center p-12 z-50 transition-[right] duration-800 md:static md:flex md:flex-row md:items-center md:justify-between md:p-0 md:w-auto md:h-auto md:bg-transparent">
                <ul className="list-none flex flex-col gap-1 md:flex-row md:gap-4">
                    <li className="pb-3 md:pb-0">
                        <Link to="/home-admin" className="text-white no-underline font-bold transition-colors duration-300 hover:text-[#FBFBCC]">Inicio</Link>
                    </li>
                    <li className="pb-3 md:pb-0">
                        <Link to="/noticias" className="text-white no-underline font-bold transition-colors duration-300 hover:text-[#FBFBCC]">Noticias</Link>
                    </li>
                    <li className="pb-3 md:pb-0">
                        <Link to="/reportes" className="text-white no-underline font-bold transition-colors duration-300 hover:text-[#FBFBCC]">Reportes</Link>
                    </li>
                    <li className="pb-3 md:pb-0">
                        <Link to="/formulario" className="text-white no-underline font-bold transition-colors duration-300 hover:text-[#FBFBCC]">Formulario</Link>
                    </li>
                </ul>
                <div className="flex flex-col items-center mt-8 md:flex-row md:mt-0">
                    <div className="bg-[#ECF4D6] p-2 rounded-lg flex items-center space-x-8">
                        <img src={Imagen} alt="User" className="h-12 w-12 rounded-full" />
                        <div>
                            <h1 className="text-lg font-semibold">{login ? `${login.nombre} ${login.apellido}` : "*********"}</h1>
                            {login && login.isAdmin ? (
                                <h3 className="text-xs">Administrador</h3>
                            ) : (
                                <h3 className="text-xs">Usuario</h3>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
