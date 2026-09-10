// FIX: Antes usaba HeaderUser (siempre vista logueada) lo que hacía que invitados vieran "Usuario" y usuarios vieran header distinto al resto de páginas
// Ahora usa Header dinámico que muestra estado real (invitado/usuario/admin) y mantiene sesión visible al cambiar de ventana/ruta
import Header from "../../../componentes/header/header";
import Footer from "../../../componentes/footer/footer";

export default function Formulario() {
  const seleccionUbicacion = () => window.open('https://www.google.com/maps', '_blank');
  return (
    <div className="min-h-screen bg-crema-light">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-card ring-1 ring-plomo-light">
          <span className="inline-flex rounded-full bg-nilo-muted px-3 py-1 text-xs font-bold tracking-widest text-nilo">NUEVO REPORTE</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-negro">Formulario de reporte ciudadano</h1>
          <p className="mt-1 text-sm text-plomo">Describe el problema con ubicación exacta y evidencia fotográfica.</p>

          <form className="mt-6 space-y-5">
            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Ubicación *</label>
              <div className="mt-1.5 flex gap-2">
                <input type="text" placeholder="Selecciona tu ubicación en el mapa" readOnly className="flex-1 rounded-xl border border-plomo-light bg-plomo-lighter px-4 py-3 text-sm outline-none" />
                <button type="button" onClick={seleccionUbicacion} className="rounded-xl bg-nilo px-5 py-3 text-sm font-bold text-white hover:bg-nilo-dark">Seleccionar</button>
              </div>
              <p className="mt-1 text-xs text-plomo">Se abrirá Google Maps para marcar el punto exacto.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-bold tracking-wide text-negro">Municipalidad</label>
                <input type="text" placeholder="Se asigna automáticamente" readOnly className="mt-1.5 w-full rounded-xl border border-plomo-light bg-plomo-lighter px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold tracking-wide text-negro">Categoría</label>
                <select className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm">
                  <option>Infraestructura</option>
                  <option>Limpieza</option>
                  <option>Seguridad</option>
                  <option>Parques y jardines</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Título del reporte *</label>
              <input type="text" placeholder="Ej: Hueco peligroso en Jr. 2 de Mayo" className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/15" />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Descripción del problema *</label>
              <textarea rows={4} placeholder="Describe el problema con detalle: qué ocurre, desde cuándo, a quién afecta..." required className="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/15" />
            </div>

            <div>
              <label className="text-xs font-bold tracking-wide text-negro">Evidencia (foto)</label>
              <div className="mt-1.5 rounded-xl border-2 border-dashed border-plomo-light bg-crema-light/50 p-6 text-center hover:border-nilo/40 hover:bg-nilo-muted/30 transition">
                <p className="text-2xl">📸</p>
                <p className="mt-1 text-sm font-semibold text-negro">Arrastra tu foto o haz clic</p>
                <p className="text-xs text-plomo">JPG, PNG hasta 5MB</p>
                <input type="file" accept="image/*" className="mt-3 mx-auto block text-sm" />
              </div>
            </div>

            <button type="submit" className="w-full rounded-full bg-nilo py-3.5 text-sm font-bold text-white shadow-soft hover:bg-nilo-dark transition">Enviar reporte →</button>
            <p className="text-center text-xs text-plomo">Al enviar aceptas que tu reporte sea público y verificable por la municipalidad.</p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
