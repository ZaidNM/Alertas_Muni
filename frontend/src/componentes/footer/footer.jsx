import { Link } from "react-router-dom";
import logo from "../../assets/img/log.jpeg";

export default function Footer() {
  return (
    <footer className="bg-negro text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10" />
              <div>
                <p className="font-display text-lg font-bold leading-none">ReporteCiudadano</p>
                <p className="text-xs tracking-[0.2em] text-nilo-light">HUÁNUCO • AMARILIS • PILLCO MARCA</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Plataforma ciudadana para reportar infraestructura, limpieza y seguridad. Conectamos vecinos y municipalidades para una ciudad más limpia y segura.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-nilo-light animate-pulse" /> Sistema activo
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="font-display text-sm font-bold tracking-wide text-nilo-light">Usuario</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                <li><Link to="/login" className="hover:text-white transition">Iniciar sesión</Link></li>
                <li><Link to="/registro" className="hover:text-white transition">Registrarse</Link></li>
                <li><Link to="/formulario" className="hover:text-white transition">Crear reporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold tracking-wide text-nilo-light">Navegación</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                <li><Link to="/" className="hover:text-white transition">Inicio</Link></li>
                <li><Link to="/instrucciones" className="hover:text-white transition">Instrucciones</Link></li>
                <li><Link to="/reportes" className="hover:text-white transition">Reportes</Link></li>
                <li><Link to="/noticias" className="hover:text-white transition">Noticias</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold tracking-wide text-nilo-light">Ayuda</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                <li><Link to="/prfrecuentes" className="hover:text-white transition">Preguntas frecuentes</Link></li>
                <li><Link to="/" className="hover:text-white transition">Privacidad</Link></li>
                <li><Link to="/" className="hover:text-white transition">Términos</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/60">© 2024 ReporteCiudadano. Todos los derechos reservados. Hecho para Huánuco.</p>
          <div className="flex items-center gap-3">
            {["f","t","ig"].map(k=> (
              <a key={k} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-nilo transition">
                <span className="text-xs font-bold">{k.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
