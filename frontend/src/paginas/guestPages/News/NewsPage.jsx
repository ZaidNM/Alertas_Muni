import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import SwiperComponent from '../../../componentes/swiper/swiper'
import f_news from '../../../assets/img/fondo-news.png'
import SwiperImg from '../../../componentes/swiper/swiperImg'
import { Button } from '../../../componentes/ui'
import { captNoticiasRequest, captSliderRequest } from '../../../api/capt.api'


export default function NewsPage() {
    const [news, setNews] = useState([])
    const [slider, setSlider] = useState([])

    useEffect(() => {
        Promise.all([captNoticiasRequest(), captSliderRequest('noticias')])
            .then(([newsResponse, sliderResponse]) => {
                setNews(newsResponse.data)
                setSlider(sliderResponse.data)
            })
            .catch(console.error)
    }, [])

    return (
        <main>
            <Header/>
                
            <article className="cont-tarjeta">
                <SwiperImg data={slider} />
            </article>
                
            <article className="relative pt-5 bg-gradient-to-b from-transparent to-white pb-5" style={{ backgroundImage: `url(${f_news})`, backgroundSize: "cover", backgroundPosition: "0% 10%" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium text-white pb-10'>Noticias</h1>
                <SwiperComponent data={news} />
                <Link to="/noticias/all-noticias">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>
                
            <Footer/>
        </main>
    )
}
