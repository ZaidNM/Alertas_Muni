import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmi from "../../componentes/header/HeaderAdmi"
import Footer from "../../componentes/footer/footer";
import SwiperComponent from "../../componentes/swiper/swiper";
import { captDestacadosRequest, captNoticiasRequest } from "../../api/capt.api";

export default function HomeAdmin() {
  const [destacados, setDestacados] = useState([])
  const [news, setNews] = useState([])
  useEffect(() => {
    Promise.all([captDestacadosRequest(), captNoticiasRequest()]).then(([d,n])=>{ setDestacados(d.data); setNews(n.data)}).catch(console.error)
  }, [])
  return (
    <div className="min-h-screen bg-crema-light">
      <HeaderAdmi />
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-3xl bg-gradient-to-r from-nilo to-nilo-dark p-6 md:p-8 text-white shadow-float">
          <p className="text-xs font-bold tracking-widest text-white/70">PANEL ADMINISTRATIVO</p>
          <h1 className="mt-1 font-display text-2xl font-bold">Gestión centralizada</h1>
          <p className="mt-1 max-w-2xl text-sm text-white/80">Administra destacados, noticias, usuarios y personal desde un solo lugar. Cambios reflejados al instante.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {/* FIX MAPA ADMIN: Botón destacado al mapa con todos los puntos reportados - acceso directo para el admin */}
            <Link to="/admin/mapa" className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-nilo-dark hover:bg-emerald-300">🗺️ Ver mapa de alertas</Link>
            <Link to="/admin/all-user" className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-nilo hover:bg-crema-light">Ver usuarios</Link>
            <Link to="/admin/all-admin" className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20">Ver personal</Link>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-plomo-light">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-negro">Gestión de Destacados</h2>
              <p className="text-sm text-plomo">Carrusel principal de la home</p>
            </div>
            <span className="hidden rounded-full bg-nilo-muted px-3 py-1 text-xs font-bold text-nilo md:inline-flex">{destacados.length} ítems</span>
          </div>
          <div className="mt-6"><SwiperComponent data={destacados} /></div>
          <div className="mt-4 flex justify-end"><button className="rounded-full bg-nilo px-6 py-2 text-sm font-bold text-white hover:bg-nilo-dark">Editar destacados</button></div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-6">
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-card ring-1 ring-plomo-light">
          <h2 className="text-center font-display text-xl font-bold text-negro">Gestión de Usuarios y Personal</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link to="/admin/all-user" className="group rounded-2xl border border-plomo-light bg-crema-light p-6 text-center hover:shadow-soft hover:border-nilo/20 transition">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-nilo text-2xl text-white shadow">👥</div>
              <p className="mt-4 font-display font-bold text-negro group-hover:text-nilo">Usuarios</p>
              <p className="text-sm text-plomo">Gestión de ciudadanos registrados</p>
            </Link>
            <Link to="/admin/all-admin" className="group rounded-2xl border border-plomo-light bg-nilo-muted p-6 text-center hover:shadow-soft hover:border-nilo/20 transition">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-negro text-2xl text-white shadow">🛡️</div>
              <p className="mt-4 font-display font-bold text-negro group-hover:text-nilo">Administradores</p>
              <p className="text-sm text-plomo">Personal con acceso al panel</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-plomo-light">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-negro">Gestión de Noticias</h2>
              <p className="text-sm text-plomo">Actualidad municipal</p>
            </div>
            <span className="hidden rounded-full bg-crema px-3 py-1 text-xs font-bold text-nilo-dark md:inline-flex">{news.length} noticias</span>
          </div>
          <div className="mt-6"><SwiperComponent data={news} /></div>
          <div className="mt-4 flex justify-end"><button className="rounded-full bg-negro px-6 py-2 text-sm font-bold text-white hover:bg-black">Editar noticias</button></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
