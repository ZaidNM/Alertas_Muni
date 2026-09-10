// FIX MAPA ADMIN: Página exclusiva para administradores que visualiza en un mapa todos los reportes ciudadanos geolocalizados
// Librería: react-leaflet (wrapper React de Leaflet) + OpenStreetMap como TileLayer (gratis, sin API key necesaria como Google Maps)
// Datos: viene de GET /capt/reportes/mapa que trae latitud/longitud de la tabla reportes (seed con 21 reportes en Huánuco/Amarilis/Pillco)
// Funcionalidad: markers por estado con colores, popups con detalle, filtros por estado/municipalidad/categoría y tabla sincronizada
import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // FIX: Componentes base del mapa Leaflet
import L from "leaflet"; // FIX: Para crear iconos personalizados por estado
import "leaflet/dist/leaflet.css"; // FIX: Estilos obligatorios de Leaflet (sin esto el mapa se ve roto)
import HeaderAdmi from "../../componentes/header/HeaderAdmi"; // FIX: Header protegido admin
import Footer from "../../componentes/footer/footer";
import { captReportesMapaRequest } from "../../api/capt.api"; // FIX: API que trae todos los reportes con coordenadas

// FIX LEAFLET+VITE: Los iconos por defecto se rompen en Vite (404), se reasignan manualmente las URLs
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// FIX: Colores por estado para diferenciar rápidamente en el mapa (rojo=urgente, ámbar=en atención, verde=resuelto)
const estadoColor = {
  pendiente: "#ef4444", // rojo - requiere atención
  en_proceso: "#f59e0b", // ámbar - en atención
  resuelto: "#10b981", // verde - ya atendido
};

const estadoLabel = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  resuelto: "Resuelto",
};

// FIX: Crea icono circular de color según estado usando L.divIcon (más visible que el pin azul por defecto)
function createIcon(estado) {
  const color = estadoColor[estado] || "#6366f1";
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background:${color};width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;">📍</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28], // punto de anclaje en la base del pin
    popupAnchor: [0, -28], // popup aparece arriba del pin
  });
}

export default function MapaReportes() {
  const [reportes, setReportes] = useState([]); // FIX: Guarda todos los reportes con coordenadas del backend
  const [loading, setLoading] = useState(true); // FIX: Para mostrar "Cargando mapa..." mientras fetch
  const [filtroEstado, setFiltroEstado] = useState("todos"); // FIX: Filtros que el admin puede cambiar para focalizar el mapa
  const [filtroMuni, setFiltroMuni] = useState("todos");
  const [filtroCat, setFiltroCat] = useState("todos");

  // FIX: Al montar, pide todos los reportes geolocalizados al backend (21 en seed)
  useEffect(() => {
    captReportesMapaRequest()
      .then((r) => setReportes(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // FIX: Extrae categorías/municipalidades únicas para poblar los <select> de filtros dinámicamente
  const categorias = useMemo(() => [...new Set(reportes.map((r) => r.categoria))], [reportes]);
  const municipalidades = useMemo(() => [...new Set(reportes.map((r) => r.municipalidad))], [reportes]);

  // FIX: Aplica filtros en memoria (sin pedir de nuevo al backend) para que el mapa reaccione instantáneo
  const filtrados = useMemo(
    () =>
      reportes.filter(
        (r) =>
          (filtroEstado === "todos" || r.estado === filtroEstado) &&
          (filtroMuni === "todos" || r.municipalidad === filtroMuni) &&
          (filtroCat === "todos" || r.categoria === filtroCat)
      ),
    [reportes, filtroEstado, filtroMuni, filtroCat]
  );

  // FIX: Stats para las tarjetas superiores (permite ver carga por estado de un vistazo)
  const stats = useMemo(() => {
    return {
      total: reportes.length,
      pendiente: reportes.filter((r) => r.estado === "pendiente").length,
      en_proceso: reportes.filter((r) => r.estado === "en_proceso").length,
      resuelto: reportes.filter((r) => r.estado === "resuelto").length,
      filtrados: filtrados.length,
    };
  }, [reportes, filtrados]);

  // FIX: Centro del mapa en Huánuco (coordenadas promedio de los 3 distritos) para que al cargar se vean todos los pins
  const center = [-9.93, -76.24];

  if (loading) {
    return (
      <div className="min-h-screen bg-crema-light">
        <HeaderAdmi />
        <div className="mx-auto max-w-7xl px-6 py-12 text-center">
          <p className="text-plomo">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema-light">
      <HeaderAdmi />

      {/* FIX: Banner superior admin con título y stats - da contexto rápido antes de ver el mapa */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="rounded-3xl bg-gradient-to-r from-nilo to-nilo-dark p-6 md:p-8 text-white shadow-float">
          <p className="text-xs font-bold tracking-widest text-white/70">MAPA DE REPORTES</p>
          <h1 className="mt-1 font-display text-2xl font-bold">Alertas geolocalizadas</h1>
          <p className="mt-1 max-w-2xl text-sm text-white/80">
            Visualiza en tiempo real todos los puntos reportados por ciudadanos. Filtra por estado, municipalidad y categoría.
          </p>
          {/* FIX: Stats en tarjetas - conteo por estado para priorizar atención */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-2xl bg-white/15 px-4 py-3 ring-1 ring-white/20">
              <p className="text-xs font-bold tracking-widest text-white/70">TOTAL</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
              <p className="text-xs font-bold text-red-200">PENDIENTE</p>
              <p className="text-xl font-bold">{stats.pendiente}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
              <p className="text-xs font-bold text-amber-200">EN PROCESO</p>
              <p className="text-xl font-bold">{stats.en_proceso}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
              <p className="text-xs font-bold text-emerald-200">RESUELTO</p>
              <p className="text-xl font-bold">{stats.resuelto}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FIX: Barra de filtros - sin recargar, solo filtra el array filtrados que alimenta el mapa y la tabla */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-plomo-light flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="rounded-xl border border-plomo-light bg-white px-3 py-2 text-sm font-semibold text-negro outline-none focus:border-nilo">
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En proceso</option>
              <option value="resuelto">Resuelto</option>
            </select>
            <select value={filtroMuni} onChange={(e) => setFiltroMuni(e.target.value)} className="rounded-xl border border-plomo-light bg-white px-3 py-2 text-sm font-semibold text-negro outline-none focus:border-nilo">
              <option value="todos">Todas las munis</option>
              {municipalidades.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select value={filtroCat} onChange={(e) => setFiltroCat(e.target.value)} className="rounded-xl border border-plomo-light bg-white px-3 py-2 text-sm font-semibold text-negro outline-none focus:border-nilo">
              <option value="todos">Todas las categorías</option>
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <p className="text-sm font-bold text-nilo">
            Mostrando {stats.filtrados} de {stats.total} reportes
          </p>
        </div>
      </div>

      {/* FIX: Contenedor del mapa Leaflet - altura fija 520px para que sea visible sin scroll infinito */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-plomo-light">
          <div className="flex items-center gap-3 bg-white px-4 py-3 border-b border-plomo-light">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="h-3 w-3 rounded-full bg-red-500"></span> Pendiente
              <span className="h-3 w-3 rounded-full bg-amber-500 ml-2"></span> En proceso
              <span className="h-3 w-3 rounded-full bg-emerald-500 ml-2"></span> Resuelto
            </div>
            <span className="ml-auto text-xs text-plomo">Haz clic en un pin para detalles • Zoom con rueda/botones</span>
          </div>
          {/* FIX: MapContainer es el mapa; TileLayer es la capa de calles OSM; Marker+Popup por cada reporte filtrado */}
          <MapContainer center={center} zoom={13} style={{ height: "520px", width: "100%" }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtrados.map((r) => (
              <Marker key={r.idReporte} position={[Number(r.latitud), Number(r.longitud)]} icon={createIcon(r.estado)}>
                <Popup>{/* FIX: Popup al hacer clic en pin - muestra detalle del reporte y link a Google Maps con ubicacion */}
                  <div className="min-w-[220px] max-w-[280px]">
                    <span
                      className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{ background: estadoColor[r.estado] }}
                    >
                      {estadoLabel[r.estado] || r.estado}
                    </span>
                    <h3 className="mt-1 font-bold text-sm leading-tight text-negro">{r.titulo}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-plomo line-clamp-3">{r.descripcion}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <p><span className="font-bold">Municipalidad:</span> {r.municipalidad}</p>
                      <p><span className="font-bold">Categoría:</span> {r.categoria}</p>
                      <p><span className="font-bold">Reportado por:</span> {r.nomUser} {r.apeUser}</p>
                      <p><span className="font-bold">Fecha:</span> {new Date(r.fechaCreacion).toLocaleDateString()}</p>
                    </div>
                    {r.ubicacion && (
                      <a href={r.ubicacion} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex rounded-full bg-nilo px-3 py-1.5 text-xs font-bold text-white hover:bg-nilo-dark">
                        Ver en Google Maps →
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* FIX: Tabla sincronizada con el mapa - lista los mismos filtrados para que el admin pueda copiar coordenadas o ir a Google Maps sin abrir cada popup */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-plomo-light">
          <h2 className="font-display text-lg font-bold text-negro">Listado filtrado ({filtrados.length})</h2>
          <p className="text-sm text-plomo">Coincide con lo visible en el mapa</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-plomo-light text-left text-xs font-bold tracking-widest text-plomo">
                  <th className="py-2">#</th>
                  <th className="py-2">Título</th>
                  <th className="py-2">Municipalidad</th>
                  <th className="py-2">Categoría</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Ubicación</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((r) => (
                  <tr key={r.idReporte} className="border-b border-plomo-light/60 hover:bg-crema-light/60">
                    <td className="py-2 font-mono text-xs">{r.idReporte}</td>
                    <td className="py-2 font-semibold text-negro max-w-[260px] truncate">{r.titulo}</td>
                    <td className="py-2">{r.municipalidad}</td>
                    <td className="py-2">{r.categoria}</td>
                    <td className="py-2">
                      <span className="rounded-full px-2 py-1 text-xs font-bold text-white" style={{ background: estadoColor[r.estado] }}>
                        {estadoLabel[r.estado]}
                      </span>
                    </td>
                    <td className="py-2">
                      <a href={r.ubicacion} target="_blank" rel="noopener noreferrer" className="font-bold text-nilo hover:underline">
                        Maps
                      </a>
                      <span className="ml-2 text-xs text-plomo">{Number(r.latitud).toFixed(4)}, {Number(r.longitud).toFixed(4)}</span>
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-plomo">Sin reportes con esos filtros.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
