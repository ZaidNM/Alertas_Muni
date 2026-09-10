import HeaderAdmi from '../../componentes/header/HeaderAdmi'
import Footer from '../../componentes/footer/footer'
import AllCardsUser from '../../componentes/cards/AllCardsUser'
import { Link } from 'react-router-dom'
export default function AllUser() {
  return (
    <div className="min-h-screen bg-crema-light">
      <HeaderAdmi />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link to="/admin/home" className="text-sm font-semibold text-plomo hover:text-nilo">← Panel</Link>
        <h1 className="mt-3 font-display text-3xl font-bold text-negro">Usuarios <span className="text-nilo">registrados</span></h1>
        <p className="text-sm text-plomo">Gestiona, edita o elimina cuentas ciudadanas.</p>
      </div>
      <AllCardsUser/>
      <Footer />
    </div>
  )
}
