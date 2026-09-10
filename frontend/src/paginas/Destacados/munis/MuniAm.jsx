import { useEffect, useState } from 'react'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import AllCards from '../../../componentes/cards/AllCards'
import { captReportesRequest } from '../../../api/capt.api'
import { Link } from 'react-router-dom'
export default function MuniAm() {
  const [reports,setReports]=useState([])
  useEffect(()=>{ captReportesRequest('amarillis').then(r=>setReports(r.data)).catch(console.error)},[])
  return (
    <div className="min-h-screen bg-crema-light">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link to="/reportes" className="text-sm font-semibold text-plomo hover:text-nilo">← Volver</Link>
        <h1 className="mt-3 font-display text-3xl font-bold text-negro">Reportes <span className="text-nilo">Amarilis</span></h1>
        <p className="text-sm text-plomo">{reports.length} reportes encontrados</p>
      </div>
      <AllCards data={reports} />
      <Footer />
    </div>
  )
}
