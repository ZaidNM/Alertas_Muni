import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Imagen from "../../assets/img/logo.jpg";
import { useLogin } from "../../context/LoginContext.jsx";

const navLinkClass = ({ isActive }) =>
  `relative px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
    isActive ? "text-nilo" : "text-negro hover:text-nilo"
  } after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:bg-nilo after:origin-left after:transition-transform ${
    isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
  }`;

export default function HeaderAdmi() {
  const { login, logout } = useLogin();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <header className="sticky top-0 z-50 border-b border-plomo-light bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/admin/home" className="flex items-center gap-3">
          <img src={Imagen} alt="logo" className="h-11 w-11 rounded-xl object-cover shadow-soft ring-1 ring-nilo/10" />
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold text-nilo-dark">ReporteCiudadano</p>
            <span className="inline-flex items-center rounded-full bg-nilo px-2 py-0.5 text-[10px] font-bold tracking-widest text-white">ADMIN</span>
          </div>
        </Link>

        {/* FIX MAPA: Link al mapa admin con todos los puntos reportados */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/admin/home" className={navLinkClass}>Panel</NavLink>
          <NavLink to="/admin/mapa" className={navLinkClass}>Mapa</NavLink>
          <NavLink to="/admin/all-user" className={navLinkClass}>Usuarios</NavLink>
          <NavLink to="/admin/all-admin" className={navLinkClass}>Personal</NavLink>
          <NavLink to="/noticias" className={navLinkClass}>Noticias</NavLink>
          <NavLink to="/reportes" className={navLinkClass}>Reportes</NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-3 rounded-full bg-nilo px-1.5 py-1.5 pr-4 text-white shadow-soft">
            <img src={Imagen} alt="avatar" className="h-9 w-9 rounded-full border-2 border-white/30 object-cover" />
            <div className="leading-tight">
              <p className="text-sm font-bold leading-none">{login ? `${login.nombre} ${login.apellido}` : "Admin"}</p>
              <p className="text-xs font-medium text-white/80">Administrador</p>
            </div>
          </div>
          <button onClick={handleLogout} className="rounded-full border border-plomo-light bg-white px-4 py-2 text-sm font-semibold text-negro hover:bg-plomo-lighter transition">Salir</button>
        </div>

        <button aria-label="Abrir menú" onClick={() => setOpen(!open)} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-nilo text-white md:hidden">
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden border-t border-plomo-light bg-white transition-all ${open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col px-4 py-4 gap-1">
          {[
            ["/admin/home", "Panel"],
            ["/admin/mapa", "Mapa"],
            ["/admin/all-user", "Usuarios"],
            ["/admin/all-admin", "Personal"],
            ["/noticias", "Noticias"],
            ["/reportes", "Reportes"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-nilo-muted text-nilo" : "text-negro hover:bg-plomo-lighter"}`}>{label}</NavLink>
          ))}
          <div className="mt-4 rounded-2xl bg-nilo p-3 flex items-center gap-3 text-white">
            <img src={Imagen} alt="avatar" className="h-10 w-10 rounded-full border-2 border-white/30" />
            <div className="flex-1 leading-tight">
              <p className="text-sm font-bold">{login ? `${login.nombre} ${login.apellido}` : "Admin"}</p>
              <p className="text-xs text-white/80">Administrador</p>
            </div>
            <button onClick={handleLogout} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-nilo">Salir</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
