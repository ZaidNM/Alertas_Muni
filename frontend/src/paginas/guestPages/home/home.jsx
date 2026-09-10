import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../componentes/header/header";
import Footer from "../../../componentes/footer/footer";
import SwiperComponent from "../../../componentes/swiper/swiper";
import { captDestacadosRequest, captNoticiasRequest } from "../../../api/capt.api";

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    Promise.all([captDestacadosRequest(), captNoticiasRequest()])
      .then(([d, n]) => {
        setDestacados(d.data);
        setNews(n.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-crema-light">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/img/banner.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-nilo-900/80 via-nilo-700/40 to-nilo/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-widest text-white ring-1 ring-white/20 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-crema" /> HUÁNUCO • AMARILIS • PILLCO MARCA
            </span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Tu voz construye <span className="text-nilo-light">la ciudad</span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/90">
              Reporta infraestructura, limpieza y seguridad directamente a tu municipalidad. Seguimiento transparente, respuesta ágil y una comunidad que participa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/formulario" className="rounded-full bg-nilo px-7 py-3 text-sm font-bold text-white shadow-float hover:bg-nilo-dark transition">
                Crear reporte →
              </Link>
              <Link to="/instrucciones" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-nilo hover:bg-crema-light transition">
                Cómo funciona
              </Link>
            </div>
            <div className="mt-8 flex gap-6 text-white/90">
              <div><p className="font-display text-2xl font-bold">3</p><p className="text-xs tracking-wide">Municipalidades</p></div>
              <div className="h-10 w-px bg-white/20" />
              <div><p className="font-display text-2xl font-bold">24h</p><p className="text-xs tracking-wide">Respuesta promedio</p></div>
              <div className="h-10 w-px bg-white/20" />
              <div><p className="font-display text-2xl font-bold">+500</p><p className="text-xs tracking-wide">Reportes resueltos</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-xs font-bold tracking-[0.2em] text-nilo">BIENVENIDOS</p>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-negro">Una plataforma hecha <span className="text-nilo">para ti</span></h2>
          </div>
          <div className="md:col-span-2 rounded-2xl bg-white p-6 shadow-card ring-1 ring-plomo-light md:p-8">
            <p className="text-[15px] leading-relaxed text-plomo-dark">
              ReporteCiudadano centraliza los reportes de vecinos y los deriva a la municipalidad correspondiente. Cada reporte incluye ubicación exacta, evidencia fotográfica y seguimiento de estado. Transparencia total para una gestión más eficiente.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["📍", "Ubicación exacta", "GPS + mapa interactivo"],
                ["📸", "Evidencia", "Foto del problema"],
                ["🔔", "Notificaciones", "Estado de tu reporte"],
              ].map(([ico, t, d]) => (
                <div key={t} className="rounded-xl bg-crema-light p-4 ring-1 ring-nilo/10">
                  <p className="text-lg">{ico}</p>
                  <p className="mt-1 text-sm font-bold text-negro">{t}</p>
                  <p className="text-xs text-plomo">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="bg-white py-12 md:py-16 border-y border-plomo-light">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-nilo">DESTACADOS</p>
              <h2 className="font-display text-2xl font-bold text-negro md:text-3xl">Lo último en tu distrito</h2>
            </div>
            <Link to="/reportes" className="hidden text-sm font-semibold text-nilo hover:text-nilo-dark md:inline-flex">Ver todos →</Link>
          </div>
          <div className="mt-8">
            <SwiperComponent data={destacados} />
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section className="bg-nilo-muted py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="inline-flex rounded-full bg-nilo px-3 py-1 text-xs font-bold tracking-widest text-white">NOSOTROS</span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold text-negro">Ciudadanía activa, gobierno cercano</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-plomo-dark">
            Creemos en una Huánuco participativa donde cada vecino es agente de cambio. Nuestra misión es acortar la distancia entre ciudadano y municipalidad con tecnología simple, accesible y transparente.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 text-left">
            {[
              ["Transparencia", "Cada reporte es público y trazable."],
              ["Cercanía", "Derivación automática a tu muni."],
              ["Impacto", "Obras y mejoras visibles."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-plomo-light">
                <p className="font-display font-bold text-negro">{t}</p>
                <p className="mt-1 text-sm text-plomo">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="bg-crema-light py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-nilo">NOTICIAS</p>
              <h2 className="font-display text-2xl font-bold text-negro md:text-3xl">Actualidad municipal</h2>
            </div>
            <Link to="/noticias" className="hidden text-sm font-semibold text-nilo hover:text-nilo-dark md:inline-flex">Ver todas →</Link>
          </div>
          <div className="mt-8">
            <SwiperComponent data={news} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
