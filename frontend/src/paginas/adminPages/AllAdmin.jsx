import HeaderAdmi from '../../componentes/header/HeaderAdmi'
import Footer from '../../componentes/footer/footer'
import AllCardsAdmin from '../../componentes/cards/AllCardsAdmin'
import { Link } from 'react-router-dom'
export default function AllAdmin() {
  return (
    <div className="min-h-screen bg-crema-light">
      <HeaderAdmi />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/admin/home" className="text-sm font-semibold text-plomo hover:text-nilo">← Panel</Link>
            <h1 className="mt-3 font-display text-3xl font-bold text-negro">Personal <span className="text-nilo">administrativo</span></h1>
            <p className="text-sm text-plomo">Administradores con acceso al sistema.</p>
          </div>
          <Link to="/admin/registro" className="hidden rounded-full bg-nilo px-6 py-3 text-sm font-bold text-white hover:bg-nilo-dark md:inline-flex">+ Agregar admin</Link>
        </div>
      </div>
      <AllCardsAdmin />
      <div className="mx-auto max-w-6xl px-6 pb-8 md:hidden">
        <Link to="/admin/registro" className="flex w-full justify-center rounded-full bg-nilo py-3 font-bold text-white">+ Agregar administrador</Link>
      </div>
      <Footer />
    </div>
  )
}
