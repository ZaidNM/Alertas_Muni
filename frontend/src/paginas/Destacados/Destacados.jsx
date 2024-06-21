import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../componentes/header/header'
import Footer from '../../componentes/footer/footer'
import Data_destacados from '../../componentes/dataS/dataDestacados'
import SwiperComponent from '../../componentes/swiper/swiper'
import SwiperImg from '../../componentes/swiper/swiperImg'
import dataImgDest from './DestImg'
import m_huanuco from '../../assets/img/muni-huanuco.jpg'
import m_amarillis from '../../assets/img/muni-amarillis.jpg'
import m_pillco from '../../assets/img/muni-pillco.jpg'
import { Button } from '../../componentes/ui'




export default function Destacados() {
    return (
        <main>
            <Header />

            <article>
                <SwiperImg data={dataImgDest} />
            </article>

            <article className='relative py-5 mb-1 bg-gradient-to-b from-transparent to-white' style={{ backgroundImage: `url(${m_huanuco})`, backgroundSize: "cover", backgroundPosition: "65% 0" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium mb-5 text-white'>Reportes Huánuco</h1>
                <SwiperComponent data={Data_destacados} />
                <Link to="/reportes/huanuco">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>

            <article className='relative py-5 mb-1 bg-gradient-to-b from-transparent to-white ' style={{ backgroundImage: `url(${m_amarillis})`, backgroundSize: "cover", backgroundPosition: "65% 0" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium mb-5 text-white'>Reportes Amarillis</h1>
                <SwiperComponent data={Data_destacados} />
                <Link to="/reportes/amarillis">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>

            <article className='relative py-5 bg-gradient-to-b from-transparent to-white' style={{ backgroundImage: `url(${m_pillco})`, backgroundSize: "cover", backgroundPosition: "65% 0" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium mb-5 text-white'>Reportes Pillco Marca</h1>
                <SwiperComponent data={Data_destacados} />
                <Link to="/reportes/pillco-marca">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>

            <Footer />

        </main>
    )
}
