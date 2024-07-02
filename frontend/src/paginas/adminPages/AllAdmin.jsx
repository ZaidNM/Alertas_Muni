import React from 'react'
import HeaderAdmi from '../../componentes/header/HeaderAdmi'
import Footer from '../../componentes/footer/footer'
import AllCardsAdmin from '../../componentes/cards/AllCardsAdmin'
import { Button } from '../../componentes/ui'
import { Link } from 'react-router-dom'


export default function AllAdmin() {


    return (
        <main>
            <HeaderAdmi />

            <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Administradores Registrados</h1>

            <AllCardsAdmin />

            <Link to={"/admin/registro"}><Button className="mx-2 bg-[#2D9596] hover:bg-[#ECF4D6] text-[#ECF4D6] hover:text-[#2D9596] mb-5 flex ml-8">Agregar</Button></Link>

            

            <Footer />
        </main>
    )
}