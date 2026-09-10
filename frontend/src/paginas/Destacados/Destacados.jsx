import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../componentes/header/header'
import Footer from '../../componentes/footer/footer'
import SwiperComponent from '../../componentes/swiper/swiper'
import SwiperImg from '../../componentes/swiper/swiperImg'
import { captReportesRequest, captSliderRequest } from '../../api/capt.api'

const CardMuni = ({ title, subtitle, data, to, bg }) => (
  <section className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-plomo-light">
    <div className="relative h-28 bg-gradient-to-r from-nilo to-nilo-dark flex items-center px-6" style={bg ? {backgroundImage:`url(${bg})`, backgroundSize:'cover'} : {}}>
      <div className="absolute inset-0 bg-nilo/80" />
      <div className="relative">
        <h2 className="font-display text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-white/80">{subtitle}</p>
      </div>
      <Link to={to} className="relative ml-auto hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-nilo hover:bg-crema-light md:inline-flex">Ver más →</Link>
    </div>
    <div className="p-4 md:p-6">
      {data.length===0 ? <p className="py-8 text-center text-sm text-plomo">Sin reportes aún.</p> : <SwiperComponent data={data} />}
      <Link to={to} className="mt-4 flex justify-center md:hidden"><span className="rounded-full bg-nilo px-6 py-2 text-sm font-bold text-white">Ver más</span></Link>
    </div>
  </section>
)

export default function Destacados() {
  const [reports, setReports] = useState({ huanuco: [], amarillis: [], pillco: [] })
  const [slider, setSlider] = useState([])
  useEffect(() => {
    Promise.all([captReportesRequest('huanuco'), captReportesRequest('amarillis'), captReportesRequest('pillco-marca'), captSliderRequest('destacados')])
      .then(([h,a,p,s])=>{ setReports({huanuco:h.data, amarillis:a.data, pillco:p.data}); setSlider(s.data) }).catch(console.error)
  }, [])
  return (
    <div className="min-h-screen bg-crema-light">
      <Header />
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-plomo-light">
          <SwiperImg data={slider} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-negro">Reportes por municipalidad</h1>
          <p className="text-sm text-plomo">Explora los reportes ciudadanos filtrados por distrito.</p>
        </div>
        <CardMuni title="Huánuco" subtitle={`${reports.huanuco.length} reportes`} data={reports.huanuco} to="/reportes/huanuco" />
        <CardMuni title="Amarilis" subtitle={`${reports.amarillis.length} reportes`} data={reports.amarillis} to="/reportes/amarillis" />
        <CardMuni title="Pillco Marca" subtitle={`${reports.pillco.length} reportes`} data={reports.pillco} to="/reportes/pillco-marca" />
      </div>
      <Footer />
    </div>
  )
}
