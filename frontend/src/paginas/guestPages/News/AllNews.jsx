import { useEffect, useState } from 'react'
import Header from '../../../componentes/header/header'
import AllCards from '../../../componentes/cards/AllCards'
import Footer from '../../../componentes/footer/footer'
import { captNoticiasRequest } from '../../../api/capt.api'
import { Link } from 'react-router-dom'

export default function AllNews() {
  const [news, setNews] = useState([])
  useEffect(() => { captNoticiasRequest().then(r=>setNews(r.data)).catch(console.error) }, [])
  return (
    <div className="min-h-screen bg-crema-light">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link to="/noticias" className="text-sm font-semibold text-plomo hover:text-nilo">← Volver</Link>
        <h1 className="mt-4 font-display text-3xl font-bold text-negro">Todas las noticias</h1>
        <p className="mt-1 text-sm text-plomo">{news.length} publicaciones encontradas</p>
      </div>
      <AllCards data={news} />
      <Footer />
    </div>
  )
}
