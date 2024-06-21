import React from 'react'
import DataAllNews from '../../componentes/dataS/newsMuni/DataAllNews'
import Header from '../../componentes/header/header'
import AllCards from '../../componentes/cards/AllCards'
import Footer from '../../componentes/footer/footer'

export default function AllNews() {
    return (
        <main>
            <Header />

            <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Todas las noticias</h1>

            <AllCards data={DataAllNews} />

            <Footer />
        </main>
    )
}