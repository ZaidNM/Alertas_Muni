import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import SwiperComponent from '../../../componentes/swiper/swiper'
import SwiperImg from '../../../componentes/swiper/swiperImg'
import { captNoticiasRequest, captSliderRequest } from '../../../api/capt.api'

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [slider, setSlider] = useState([])

  useEffect(() => {
    Promise.all([captNoticiasRequest(), captSliderRequest('noticias')])
      .then(([n, s]) => { setNews(n.data); setSlider(s.data) })
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen bg-crema-light">
      <Header/>
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-plomo-light">
          <SwiperImg data={slider} />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-flex rounded-full bg-nilo px-3 py-1 text-xs font-bold tracking-widest text-white">ACTUALIDAD</span>
            <h1 className="mt-2 font-display text-3xl font-bold text-negro">Noticias municipales</h1>
            <p className="mt-1 text-sm text-plomo">Obras, comunicados y eventos de las tres municipalidades.</p>
          </div>
          <Link to="/noticias/all-noticias" className="hidden rounded-full bg-nilo px-6 py-2.5 text-sm font-bold text-white hover:bg-nilo-dark md:inline-flex">Ver todas →</Link>
        </div>
        <div className="mt-8 rounded-3xl bg-white p-4 md:p-6 shadow-card ring-1 ring-plomo-light">
          <SwiperComponent data={news} />
        </div>
        <Link to="/noticias/all-noticias" className="mt-6 flex justify-center md:hidden">
          <span className="rounded-full bg-nilo px-6 py-3 text-sm font-bold text-white">Ver todas las noticias</span>
        </Link>
      </section>
      <Footer/>
    </div>
  )
}
