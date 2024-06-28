import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import Data_news from '../../../componentes/dataS/dataNoticias'
import SwiperComponent from '../../../componentes/swiper/swiper'
import f_news from '../../../assets/img/fondo-news.png'
import dataImgNew from './NewImg'
import SwiperImg from '../../../componentes/swiper/swiperImg'
import { Button } from '../../../componentes/ui'


export default function NewsPage() {
    return (
        <main>
            <Header/>
                
            <article className="cont-tarjeta">
                <SwiperImg data={dataImgNew} />
            </article>
                
            <article className="relative pt-5 bg-gradient-to-b from-transparent to-white pb-5" style={{ backgroundImage: `url(${f_news})`, backgroundSize: "cover", backgroundPosition: "0% 10%" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium text-white pb-10'>Noticias</h1>
                <SwiperComponent data={Data_news} />
                <Link to="/noticias/all-noticias">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>
                
            <Footer/>
        </main>
    )
}
