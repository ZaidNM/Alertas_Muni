// FIX FORMULARIO FUNCIONAL: Guarda ubicación real del dispositivo vía navigator.geolocation
// Nota solicitada: "La ubicación será tomada del dispositivo donde usted envía el formulario"
// Usa backend POST /reportes con latitud/longitud + municipalidad/categoría/titulo/descripción
import { useEffect, useState } from "react";
import Header from "../../../componentes/header/header";
import Footer from "../../../componentes/footer/footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getMunicipalidadesRequest, getCategoriasRequest, createReporteRequest } from "../../../api/capt.api";
import { useLogin } from "../../../context/LoginContext";

// Fix iconos Leaflet en Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

export default function Formulario() {
  const { login } = useLogin();
  const [municipalidades, setMunicipalidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    idMunicipalidad: "",
    idCategoria: "",
    evidencia: "",
    // lat/lng se llenan desde el dispositivo
    latitud: null,
    longitud: null,
  });
  const [geoStatus, setGeoStatus] = useState("idle"); // idle | loading | ok | error | denied
  const [geoError, setGeoError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  // Carga selects
  useEffect(() => {
    getMunicipalidadesRequest().then(r=>setMunicipalidades(r.data)).catch(()=>{});
    getCategoriasRequest().then(r=>setCategorias(r.data)).catch(()=>{});
  }, []);

  // FIX: Obtiene ubicación del dispositivo (GPS del celular/PC). Requiere HTTPS o localhost y permiso del usuario.
  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      setGeoError("Tu navegador no soporta geolocalización.");
      return;
    }
    setGeoStatus("loading");
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setForm(f => ({ ...f, latitud: latitude, longitud: longitude }));
        setGeoStatus("ok");
        setGeoError(`Precisión ±${Math.round(accuracy)}m`);
        // Auto-selecciona municipalidad más cercana (aprox por lat)
        // Huánuco ~ -9.93, Amarilis ~ -9.95, Pillco ~ -9.91
        let best = null, bestDist = Infinity;
        const approx = { 1: -9.93, 2: -9.95, 3: -9.91 };
        for (const m of municipalidades) {
          const d = Math.abs(approx[m.idMunicipalidad] - latitude);
          if (d < bestDist) { bestDist = d; best = m.idMunicipalidad; }
        }
        if (best) setForm(f => ({ ...f, idMunicipalidad: String(best) }));
      },
      (err) => {
        if (err.code === 1) { setGeoStatus("denied"); setGeoError("Permiso denegado. Activa la ubicación en el navegador."); }
        else { setGeoStatus("error"); setGeoError(err.message); }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Intenta obtener automáticamente al entrar (opcional, no bloquea)
  useEffect(()=>{ /* obtenerUbicacion(); */ }, [municipalidades]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(null);
    if (!form.titulo || !form.descripcion || !form.idMunicipalidad || !form.idCategoria) {
      setError("Completa título, descripción, municipalidad y categoría.");
      return;
    }
    if (form.latitud == null || form.longitud == null) {
      setError("Debes capturar la ubicación del dispositivo con el botón 'Usar mi ubicación actual'.");
      return;
    }
    setSubmitting(true);
    try {
      // idUser: si está logueado usa 1 por demo (login no guarda id), si no también 1
      const payload = {
        idUser: 1,
        idMunicipalidad: Number(form.idMunicipalidad),
        idCategoria: Number(form.idCategoria),
        titulo: form.titulo,
        descripcion: form.descripcion,
        latitud: Number(form.latitud),
        longitud: Number(form.longitud),
        evidencia: form.evidencia || null,
      };
      const res = await createReporteRequest(payload);
      setSuccess(`Reporte #${res.data.idReporte} guardado. Ubicación: ${payload.latitud.toFixed(5)}, ${payload.longitud.toFixed(5)}. Aparecerá en el mapa del admin.`);
      setForm({ titulo:"", descripcion:"", idMunicipalidad:"", idCategoria:"", evidencia:"", latitud:null, longitud:null });
      setGeoStatus("idle"); setGeoError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar. Verifica que el backend esté corriendo (npm run dev en backend) y la DB migrada.");
    } finally { setSubmitting(false); }
  };

  const mapsLink = form.latitud && form.longitud ? `https://maps.google.com/?q=${form.latitud},${form.longitud}` : null;

  return (
    <div className="min-h-screen bg-crema-light">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-card ring-1 ring-plomo-light">
          <span className="inline-flex rounded-full bg-nilo-muted px-3 py-1 text-xs font-bold tracking-widest text-nilo">NUEVO REPORTE</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-negro">Formulario de reporte ciudadano</h1>
          <p className="mt-1 text-sm text-plomo">Describe el problema con ubicación exacta y evidencia fotográfica.</p>

          {/* NOTA solicitada: ubicación del dispositivo */}
          <div className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-200">
            <p className="font-bold">📍 Nota: La ubicación será tomada del dispositivo donde usted envía el formulario.</p>
            <p className="mt-1">Al pulsar "Usar mi ubicación actual" el sistema captura tu GPS (lat/lng). Debe permitir el permiso de ubicación en el navegador. Si estás en PC sin GPS, usa el celular o permite ubicación manual.</p>
          </div>

          {success && <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">{success}</div>}
          {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 ring-1 ring-red-200">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Ubicación con geolocalización */}
            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Ubicación del dispositivo *</label>
              <div className="mt-1.5 flex flex-col gap-2">
                <div className="flex gap-2">
                  <input type="text" value={form.latitud && form.longitud ? `${form.latitud.toFixed(6)}, ${form.longitud.toFixed(6)}` : ""} placeholder="Aún sin ubicación — pulsa el botón" readOnly className="flex-1 rounded-xl border border-plomo-light bg-plomo-lighter px-4 py-3 text-sm outline-none" />
                  <button type="button" onClick={obtenerUbicacion} disabled={geoStatus==="loading"} className="rounded-xl bg-nilo px-5 py-3 text-sm font-bold text-white hover:bg-nilo-dark disabled:opacity-60 whitespace-nowrap">
                    {geoStatus==="loading" ? "Obteniendo..." : "📍 Usar mi ubicación"}
                  </button>
                </div>
                {/* Estado GPS */}
                <div className="text-xs">
                  {geoStatus==="ok" && <span className="font-semibold text-emerald-600">✓ Ubicación capturada {geoError && `(${geoError})`}</span>}
                  {geoStatus==="denied" && <span className="font-semibold text-red-600">✗ {geoError} — Activa permisos y reintenta. En Chrome: candado → Ubicación → Permitir.</span>}
                  {geoStatus==="error" && <span className="font-semibold text-red-600">✗ {geoError}</span>}
                  {geoStatus==="idle" && <span className="text-plomo">Pulsa el botón para capturar GPS. Requiere HTTPS o localhost.</span>}
                </div>
                {/* Entrada manual si GPS falla */}
                <details className="rounded-xl border border-plomo-light bg-crema-light/40 px-3 py-2">
                  <summary className="cursor-pointer text-xs font-bold text-nilo">¿Sin GPS? Ingresar manualmente</summary>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input name="latitud" type="number" step="any" placeholder="Latitud ej -9.9306" value={form.latitud ?? ""} onChange={e=>setForm({...form, latitud: e.target.value? Number(e.target.value): null})} className="rounded-xl border border-plomo-light bg-white px-3 py-2 text-sm" />
                    <input name="longitud" type="number" step="any" placeholder="Longitud ej -76.2417" value={form.longitud ?? ""} onChange={e=>setForm({...form, longitud: e.target.value? Number(e.target.value): null})} className="rounded-xl border border-plomo-light bg-white px-3 py-2 text-sm" />
                  </div>
                  <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-bold text-nilo hover:underline">Abrir Google Maps para copiar coordenadas →</a>
                </details>
                {/* Preview mapa si hay coords */}
                {form.latitud && form.longitud && (
                  <div className="overflow-hidden rounded-2xl ring-1 ring-plomo-light">
                    <div style={{height:220}}>
                      <MapContainer center={[form.latitud, form.longitud]} zoom={15} style={{height:"100%", width:"100%"}} scrollWheelZoom={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OSM" />
                        <Marker position={[form.latitud, form.longitud]}>
                          <Popup>Ubicación de tu reporte<br/><a href={mapsLink} target="_blank" rel="noreferrer" className="font-bold text-nilo">Ver en Google Maps</a></Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                    <div className="flex items-center justify-between bg-white px-3 py-2 text-xs">
                      <span className="font-mono text-plomo">{form.latitud.toFixed(5)}, {form.longitud.toFixed(5)}</span>
                      <a href={mapsLink} target="_blank" rel="noreferrer" className="font-bold text-nilo hover:underline">Abrir en Google Maps →</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold tracking-wide text-negro">Municipalidad *</label>
                <select name="idMunicipalidad" value={form.idMunicipalidad} onChange={onChange} required className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm">
                  <option value="">Selecciona</option>
                  {municipalidades.map(m=> <option key={m.idMunicipalidad} value={m.idMunicipalidad}>{m.nombre}</option>)}
                </select>
                <p className="mt-1 text-[11px] text-plomo">Se auto-selecciona según tu GPS, puedes corregir.</p>
              </div>
              <div>
                <label className="text-xs font-bold tracking-wide text-negro">Categoría *</label>
                <select name="idCategoria" value={form.idCategoria} onChange={onChange} required className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm">
                  <option value="">Selecciona</option>
                  {categorias.map(c=> <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Título del reporte *</label>
              <input name="titulo" value={form.titulo} onChange={onChange} required placeholder="Ej: Hueco peligroso en Jr. 2 de Mayo" className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/15" />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Descripción del problema *</label>
              <textarea name="descripcion" value={form.descripcion} onChange={onChange} rows={4} placeholder="Describe el problema con detalle: qué ocurre, desde cuándo, a quién afecta..." required className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/15" />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Evidencia (foto URL opcional)</label>
              <input name="evidencia" value={form.evidencia} onChange={onChange} placeholder="https://... o nombre del archivo" className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm" />
              <div className="mt-1.5 rounded-xl border-2 border-dashed border-plomo-light bg-crema-light/50 p-4 text-center">
                <p className="text-xs text-plomo">Subida de archivo pendiente de implementar (por ahora pega URL). JPG, PNG hasta 5MB</p>
                <input type="file" accept="image/*" onChange={e=> setForm({...form, evidencia: e.target.files?.[0]?.name || ""})} className="mt-2 mx-auto block text-xs" />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full rounded-full bg-nilo py-3.5 text-sm font-bold text-white shadow-soft hover:bg-nilo-dark transition disabled:opacity-60">
              {submitting ? "Enviando..." : "Enviar reporte →"}
            </button>
            <p className="text-center text-xs text-plomo">Al enviar aceptas que tu reporte sea público y verificable. La ubicación se guarda para el mapa del admin.</p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
