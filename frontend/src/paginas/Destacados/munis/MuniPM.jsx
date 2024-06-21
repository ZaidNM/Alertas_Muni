import React from 'react'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import reportsPM from '../../../componentes/dataS/reportesMuni/mPM/reportsPM'
import AllCards from '../../../componentes/cards/AllCards'

export default function MuniPM() {
  return (
    <main>
        <Header />

        <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Reportes Pillco Marca</h1>
        <AllCards data={reportsPM} />

        <Footer />
    </main>
  )
}
