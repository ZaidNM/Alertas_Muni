import React from 'react'
import HeaderAdmi from '../../componentes/header/HeaderAdmi'
import Footer from '../../componentes/footer/footer'
import AllCardsUser from '../../componentes/cards/AllCardsUser'


export default function AllUser() {


    return (
        <main>
            <HeaderAdmi />

            <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Usuarios Registrados</h1>

            <AllCardsUser/>

            <Footer />
        </main>
    )
}
