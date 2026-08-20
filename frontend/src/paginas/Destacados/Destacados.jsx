import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../componentes/header/header'
import Footer from '../../componentes/footer/footer'
import SwiperComponent from '../../componentes/swiper/swiper'
import SwiperImg from '../../componentes/swiper/swiperImg'
import m_huanuco from '../../assets/img/muni-huanuco.jpg'
import m_amarillis from '../../assets/img/muni-amarillis.jpg'
import m_pillco from '../../assets/img/muni-pillco.jpg'
import { Button } from '../../componentes/ui'
import { captReportesRequest, captSliderRequest } from '../../api/capt.api'




export default function Destacados() {
    const [reports, setReports] = useState({ huanuco: [], amarillis: [], pillco: [] })
    const [slider, setSlider] = useState([])

    useEffect(() => {
        Promise.all([
            captReportesRequest('huanuco'),
            captReportesRequest('amarillis'),
            captReportesRequest('pillco-marca'),
            captSliderRequest('destacados')
        ])
            .then(([huanuco, amarillis, pillco, sliderResponse]) => {
                setReports({
                    huanuco: huanuco.data,
                    amarillis: amarillis.data,
                    pillco: pillco.data
                })
                setSlider(sliderResponse.data)
            })
            .catch(console.error)
    }, [])

    return (
        <main>
            <Header />

            <article>
                <SwiperImg data={slider} />
            </article>

            <article className='relative py-5 mb-1 bg-gradient-to-b from-transparent to-white' style={{ backgroundImage: `url(${m_huanuco})`, backgroundSize: "cover", backgroundPosition: "65% 0" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium mb-5 text-white'>Reportes Huánuco</h1>
                <SwiperComponent data={reports.huanuco} />
                <Link to="/reportes/huanuco">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>

            <article className='relative py-5 mb-1 bg-gradient-to-b from-transparent to-white ' style={{ backgroundImage: `url(${m_amarillis})`, backgroundSize: "cover", backgroundPosition: "65% 0" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium mb-5 text-white'>Reportes Amarillis</h1>
                <SwiperComponent data={reports.amarillis} />
                <Link to="/reportes/amarillis">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>

            <article className='relative py-5 bg-gradient-to-b from-transparent to-white' style={{ backgroundImage: `url(${m_pillco})`, backgroundSize: "cover", backgroundPosition: "65% 0" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className='relative text-center text-3xl font-medium mb-5 text-white'>Reportes Pillco Marca</h1>
                <SwiperComponent data={reports.pillco} />
                <Link to="/reportes/pillco-marca">
                    <Button className='relative bg-emerald-600 hover:bg-emerald-700 text-[#ECF4D6] flex ml-auto mr-8'>Ver Más </Button>
                </Link>
            </article>

            <Footer />

        </main>
    )
}
