import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../componentes/footer/footer";
import SwiperComponent from "../../componentes/swiper/swiper";
import HeaderUser from "../../componentes/header/HeaderUser";
import { captDestacadosRequest, captNoticiasRequest } from "../../api/capt.api";
import { useLogin } from "../../context/LoginContext";

export default function HomeUser() {
  const [destacados, setDestacados] = useState([])
  const [news, setNews] = useState([])
  const { login } = useLogin();
  useEffect(() => {
    Promise.all([captDestacadosRequest(), captNoticiasRequest()]).then(([d,n])=>{ setDestacados(d.data); setNews(n.data)}).catch(console.error)
  }, [])
  return (
    <div className="min-h-screen bg-crema-light">
      <HeaderUser />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/img/banner.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-nilo-900/80 via-nilo-700/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl rounded-3xl bg-white/95 p-6 shadow-float ring-1 ring-plomo-light backdrop-blur">
            <p className="text-xs font-bold tracking-widest text-nilo">HOLA, {login?.nombre?.toUpperCase() || "CIUDADANO"}</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-negro">¿Qué quieres reportar hoy?</h1>
            <p className="mt-2 text-sm text-plomo">Tu reporte llega directo a la municipalidad con ubicación y evidencia. Respuesta en 24h.</p>
            <Link to="/formulario" className="mt-5 inline-flex rounded-full bg-nilo px-7 py-3 text-sm font-bold text-white hover:bg-nilo-dark">Crear reporte →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-plomo-light">
          <h2 className="font-display text-lg font-bold text-negro">Bienvenido a tu panel ciudadano</h2>
          <p className="mt-1 text-sm text-plomo">Desde aquí puedes crear reportes, revisar destacadas y mantenerte informado con noticias locales.</p>
        </div>
      </section>

      <section className="bg-white py-10 border-y border-plomo-light">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-negro">Destacados</h2>
          <div className="mt-6"><SwiperComponent data={destacados} /></div>
        </div>
      </section>

      <section className="bg-nilo-muted py-10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-negro">Tu participación importa</h2>
          <p className="mt-2 text-sm text-plomo-dark">Cada reporte suma. Con tu ayuda mejoramos pistas, limpieza y seguridad en Huánuco.</p>
        </div>
      </section>

      <section className="bg-crema-light py-10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-bold text-negro">Noticias</h2>
          <div className="mt-6"><SwiperComponent data={news} /></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
