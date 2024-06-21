import React from 'react'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import AllCards from '../../../componentes/cards/AllCards'
import reportsAm from '../../../componentes/dataS/reportesMuni/mAm/reportsAm'

export default function MuniAm() {
  return (
    <main>
        <Header />

        <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Reportes Amarillis</h1>
        
        <AllCards data={reportsAm} />

        <Footer />
    </main>
  )
}
