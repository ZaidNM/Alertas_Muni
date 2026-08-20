import React, { useEffect, useState } from 'react'
import Header from '../../../componentes/header/header'
import AllCards from '../../../componentes/cards/AllCards'
import Footer from '../../../componentes/footer/footer'
import { captNoticiasRequest } from '../../../api/capt.api'

export default function AllNews() {
    const [news, setNews] = useState([])

    useEffect(() => {
        captNoticiasRequest().then(response => setNews(response.data)).catch(console.error)
    }, [])

    return (
        <main>
            <Header />

            <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Todas las noticias</h1>

            <AllCards data={news} />

            <Footer />
        </main>
    )
}