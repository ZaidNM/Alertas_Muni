import React, { useEffect, useState } from 'react'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import AllCards from '../../../componentes/cards/AllCards'
import { captReportesRequest } from '../../../api/capt.api'

export default function MuniPM() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    captReportesRequest('pillco-marca').then(response => setReports(response.data)).catch(console.error)
  }, [])

  return (
    <main>
        <Header />

        <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Reportes Pillco Marca</h1>
        <AllCards data={reports} />

        <Footer />
    </main>
  )
}
