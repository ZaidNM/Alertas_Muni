// FIX: Header dinámico según sesión - antes siempre mostraba vista invitado (Iniciar sesión/Regístrate)
// aunque hubiera sesión iniciada, lo que hacía parecer que "al cambiar de ventana la sesión se cierra"
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

export default function Header() {
  const [open, setOpen] = useState(false);
  // FIX: Leemos login/logout del contexto para saber si hay sesión activa
  const { login, logout } = useLogin();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/"); setOpen(false); };

  // FIX: Detectamos rol para mostrar navegación correcta y evitar ilusión de logout
  const isAdmin = login?.isAdmin;
  const isUser = login && !isAdmin;
  // FIX: El logo lleva a la home correcta según rol (admin/user/guest)
  const homeLink = isAdmin ? "/admin/home" : isUser ? "/user/home" : "/";

  // FIX: Links dinámicos según rol - antes Header solo tenía links de invitado, por eso al ir a /noticias parecía deslogueado
  // FIX MAPA: añadido /admin/mapa para que admin vea todos los puntos reportados
  const desktopLinks = isAdmin ? [
    ["/admin/home", "Panel"],
    ["/admin/mapa", "Mapa"],
    ["/admin/all-user", "Usuarios"],
    ["/admin/all-admin", "Personal"],
    ["/noticias", "Noticias"],
    ["/reportes", "Reportes"],
  ] : [
    [homeLink, "Inicio"],
    ["/instrucciones", "Instrucciones"],
    ["/noticias", "Noticias"],
    ["/reportes", "Reportes"],
    ["/formulario", "Formulario"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-plomo-light bg-crema-light/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to={homeLink} className="flex items-center gap-3">
          <img src={Imagen} alt="ReporteCiudadano Huánuco" className="h-11 w-11 rounded-xl object-cover shadow-soft ring-1 ring-nilo/10" />
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold text-nilo-dark">ReporteCiudadano</p>
            <p className="text-[11px] font-medium tracking-widest text-plomo">{isAdmin ? "ADMIN" : isUser ? "CIUDADANO" : "HUÁNUCO"}</p>
          </div>
        </Link>

        {/* FIX: Nav de escritorio ahora usa desktopLinks según rol, no solo invitado */}
        <nav className="hidden items-center gap-1 md:flex">
          {desktopLinks.map(([to,label])=>(
            <NavLink key={to} to={to} className={navLinkClass}>{label}</NavLink>
          ))}
        </nav>

        {/* FIX: Zona derecha dinámica - si hay login muestra avatar+nombre+Salir, si no muestra Iniciar sesión/Regístrate */}
        <div className="hidden items-center gap-3 md:flex">
          {!login ? (
            <>
              <Link to="/login" className="rounded-full px-5 py-2 text-sm font-semibold text-nilo ring-1 ring-nilo/20 hover:bg-nilo-muted transition">Iniciar sesión</Link>
              <Link to="/registro" className="rounded-full bg-nilo px-5 py-2.5 text-sm font-bold text-white shadow-soft hover:bg-nilo-dark transition">Regístrate</Link>
            </>
          ) : (
            <>
              <div className={`flex items-center gap-3 rounded-full px-2 py-1.5 pr-4 shadow-sm border ${isAdmin ? "bg-nilo text-white border-nilo" : "bg-white border-plomo-light"}`}>
                <img src={Imagen} alt="avatar" className={`h-9 w-9 rounded-full object-cover ${isAdmin ? "border-2 border-white/30" : ""}`} />
                <div className="leading-tight">
                  <p className={`text-sm font-bold ${isAdmin ? "text-white" : "text-negro"}`}>{`${login.nombre} ${login.apellido}`}</p>
                  <p className={`text-xs font-medium ${isAdmin ? "text-white/80" : "text-plomo"}`}>{isAdmin ? "Administrador" : "Ciudadano"}</p>
                </div>
              </div>
              <button onClick={handleLogout} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isAdmin ? "border border-plomo-light bg-white text-negro hover:bg-plomo-lighter" : "bg-negro text-white hover:bg-black"}`}>Salir</button>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-nilo text-white md:hidden"
        >
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {/* FIX: Drawer móvil también dinámico - antes siempre mostraba opción invitado */}
      <div className={`md:hidden overflow-hidden border-t border-plomo-light bg-white transition-all ${open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col px-4 py-4">
          {desktopLinks.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-nilo-muted text-nilo" : "text-negro hover:bg-plomo-lighter"}`}>
              {label}
            </NavLink>
          ))}
          {!login ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-full border border-nilo px-4 py-3 text-center text-sm font-semibold text-nilo">Iniciar sesión</Link>
              <Link to="/registro" onClick={() => setOpen(false)} className="rounded-full bg-nilo px-4 py-3 text-center text-sm font-bold text-white">Regístrate</Link>
            </div>
          ) : (
            // FIX: Si hay sesión, muestra avatar y botón Salir también en móvil
            <div className={`mt-4 rounded-2xl p-3 flex items-center gap-3 ${isAdmin ? "bg-nilo text-white" : "border border-plomo-light bg-crema-light"}`}>
              <img src={Imagen} alt="avatar" className={`h-10 w-10 rounded-full ${isAdmin ? "border-2 border-white/30" : ""}`} />
              <div className="flex-1">
                <p className={`text-sm font-bold ${isAdmin ? "text-white" : "text-negro"}`}>{`${login.nombre} ${login.apellido}`}</p>
                <p className={`text-xs ${isAdmin ? "text-white/80" : "text-plomo"}`}>{isAdmin ? "Administrador" : "Ciudadano"}</p>
              </div>
              <button onClick={handleLogout} className={`rounded-full px-3 py-2 text-xs font-bold ${isAdmin ? "bg-white text-nilo" : "bg-negro text-white"}`}>Salir</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
