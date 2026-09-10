import { Link } from "react-router-dom";
import Header from "../../../componentes/header/header";
import Footer from "../../../componentes/footer/footer";
import Imagen1 from '../../../assets/img/paso1.png';
import Imagen2 from '../../../assets/img/paso2.png';
import Imagen3 from '../../../assets/img/paso3.png';
import Imagen4 from '../../../assets/img/paso4.png';

const pasos = [
  { n: "01", t: "Selecciona tu ubicación", d: "Haz clic en «Seleccionar» para abrir Google Maps y marca el punto exacto del problema.", img: Imagen1 },
  { n: "02", t: "Confirma el punto", d: "Arrastra el pin, verifica la dirección y copia las coordenadas automáticamente.", img: Imagen2 },
  { n: "03", t: "Describe el problema", d: "Explica con detalle qué ocurre, categoría, municipalidad y urgencia.", img: Imagen3 },
  { n: "04", t: "Adjunta evidencia", d: "Sube una foto clara. Una buena evidencia acelera la atención de tu reporte.", img: Imagen4 },
];

export default function Instrucciones() {
  return (
    <div className="min-h-screen bg-crema-light">
      <Header />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-white p-6 md:p-10 shadow-card ring-1 ring-plomo-light">
          <span className="inline-flex rounded-full bg-nilo-muted px-3 py-1 text-xs font-bold tracking-widest text-nilo">GUÍA RÁPIDA</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-negro">Cómo crear un reporte en 4 pasos</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-plomo">Sigue estos pasos y tu municipalidad recibirá el reporte con ubicación, fotos y seguimiento en tiempo real.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {pasos.map(p=> (
              <div key={p.n} className="group overflow-hidden rounded-2xl border border-plomo-light bg-crema-light transition hover:shadow-soft">
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nilo text-sm font-extrabold text-white">{p.n}</span>
                    <h3 className="font-display font-bold text-negro">{p.t}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-plomo-dark">{p.d}</p>
                </div>
                <div className="bg-white p-3">
                  <img src={p.img} alt={p.t} className="h-48 w-full rounded-xl object-cover ring-1 ring-plomo-light group-hover:scale-[1.01] transition" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-nilo p-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-display text-lg font-bold text-white">¿Listo para reportar?</p>
              <p className="text-sm text-white/80">Te toma menos de 2 minutos. Tu reporte llega directo a la municipalidad.</p>
            </div>
            <Link to="/formulario" className="rounded-full bg-white px-7 py-3 text-sm font-bold text-nilo hover:bg-crema-light transition shadow">Realizar un reporte →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
