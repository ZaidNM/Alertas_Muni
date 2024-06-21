import React from 'react'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import AllCards from '../../../componentes/cards/AllCards'
import reportsHco from '../../../componentes/dataS/reportesMuni/mHco/reportsHco'


export default function MuniHco() {


  return (
    <main>
      <Header />

      <h1 className='text-center text-3xl text-[#2D9596] uppercase pt-10 font-medium '>Reportes Huánuco</h1>

      <AllCards data={reportsHco} />

      <Footer />
    </main>
  )
}
