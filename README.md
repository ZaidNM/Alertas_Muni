# Alertas_Muni — ReporteCiudadano Huánuco

Sistema web para **reportes ciudadanos geolocalizados** de la región Huánuco (Huánuco, Amarilis, Pillco Marca). Los ciudadanos reportan problemas de infraestructura, limpieza, seguridad, etc. con **ubicación real del dispositivo (GPS)** y los administradores los visualizan en un **mapa interactivo** para su atención.

> Repositorio original: `Savage-22/pr-react-uni` rama `zaid` → espejo en `ZaidNM/Alertas_Muni`

## Tecnologías
- **Frontend:** React 18 + Vite + Tailwind CSS + React Router + Formik/Yup + Swiper + Leaflet (react-leaflet)
- **Backend:** Node.js + Express + MySQL2 (promise) + CORS
- **Base de datos:** MySQL / MariaDB 10.5+ (13 tablas + `proyect-uni.sql` dump)
- **Mapa:** Leaflet + OpenStreetMap (sin API key) para admin; Google Maps link para usuario

## Roles y accesos

### Usuarios demo — Ciudadanos (8)
| # | Nombre | Correo | Contraseña | DNI | Celular |
|---|--------|--------|------------|-----|---------|
| 1 | Ana García | ana.garcia@demo.com | ana1234 | 70123456 | 912345678 |
| 2 | José Pérez | jose.perez@demo.com | jose123 | 71234567 | 923456789 |
| 3 | María Flores | maria.flores@demo.com | maria123 | 72345678 | 934567890 |
| 4 | Luis Cruz | luis.cruz@demo.com | luis123 | 73456789 | 945678901 |
| 5 | Rosa Huamán | rosa.huaman@demo.com | rosa123 | 74567890 | 956789012 |
| 6 | Pedro Sánchez | pedro.sanchez@demo.com | pedro123 | 75678901 | 967890123 |
| 7 | Carmen Quispe | carmen.quispe@demo.com | carmen123 | 76789012 | 978901234 |
| 8 | Juan Torres | juan.torres@demo.com | juan123 | 77890123 | 989012345 |

### Administradores demo — Staff (3)
| # | Nombre | Correo | Contraseña | Tipo | DNI |
|---|--------|--------|------------|------|-----|
| 1 | Carlos Mendoza | admin@demo.com | admin123 | superadmin | 45123678 |
| 2 | Lucía Torres | lucia.torres@demo.com | lucia123 | editor | 46234789 |
| 3 | Miguel Ríos | miguel.rios@demo.com | miguel123 | admin | 47345890 |

> Login unificado en `/login` detecta rol por email (consulta `GET /auth/admin/emails`). Ciudadano → `/user/home`, Admin → `/admin/home`.

## Funcionalidades por página

| Ruta | Rol | Funcionalidad |
|------|-----|---------------|
| `/` | Guest | Hero, intro, destacados (Swiper), nosotros, noticias. Header dinámico (mantiene sesión) |
| `/registro` | Guest | Registro ciudadano (Formik+Yup) → `POST /users` |
| `/login` | Guest | Login ciudadano/admin → `POST /auth/user` o `/auth/admin` + `localStorage login` con sync entre pestañas (`storage` event) |
| `/instrucciones` | Todos | Guía 4 pasos para reportar |
| `/prfrecuentes` | Todos | FAQ |
| `/noticias` + `/noticias/all-noticias` | Todos | Noticias municipales (`GET /capt/noticias`, slider `noticias`) |
| `/reportes` `/reportes/huanuco|amarillis|pillco-marca` | Todos | Reportes por municipalidad (`GET /capt/reportes/:slug`) + slider `destacados` |
| `/formulario` | User (requiere ubicación) | **Formulario funcional con GPS del dispositivo**: `navigator.geolocation.getCurrentPosition` → `latitud/longitud`, Nota: *"La ubicación será tomada del dispositivo donde usted envía el formulario"*, selects municipalidad/categoría (`GET /reportes/municipalidades|categorias`), preview mini-mapa Leaflet, `POST /reportes` guarda y aparece en mapa admin |
| `/user/home` | User | Panel ciudadano personalizado |
| `/admin/home` | Admin | Panel admin + acceso a `Mapa`, `Usuarios`, `Personal` |
| `/admin/mapa` | Admin | **Mapa de alertas** Leaflet (`GET /capt/reportes/mapa`): todos los reportes con `lat,lng`, colores por estado (pendiente rojo, en_proceso ámbar, resuelto verde), filtros estado/municipalidad/categoría, popups con detalle + tabla sincronizada |
| `/admin/all-user` `/admin/edit-user/:id` | Admin | CRUD usuarios |
| `/admin/all-admin` `/admin/edit-admin/:id` | Admin | CRUD personal |
| `/admin/registro` | Admin | Registro de admins |

## Flujos principales

### Flujo Ciudadano (reporte con ubicación real)
1. Se registra (`/registro`) o inicia sesión (`/login` → `ana.garcia@demo.com / ana1234`)
2. Va a `/formulario`
3. Lee nota: *"La ubicación será tomada del dispositivo donde usted envía el formulario"*
4. Pulsa **"📍 Usar mi ubicación"** → navegador pide permiso → captura `lat,lng` + precisión → auto-selecciona municipalidad más cercana → muestra mini-mapa y link Google Maps. Si falla, ingresa manual o usa "Abrir Google Maps".
5. Completa `municipalidad`, `categoría`, `título`, `descripción`, evidencia (URL o nombre archivo)
6. Envía → `POST /reportes` → `201 idReporte` + `ubicacion https://maps.google.com/?q=lat,lng` → mensaje éxito. El punto aparece instantáneo en `/admin/mapa`.

### Flujo Admin (gestión)
1. Login `admin@demo.com / admin123` → `/admin/home`
2. Entra a **🗺️ Ver mapa de alertas** (`/admin/mapa`) → ve 21 puntos demo + nuevos. Filtra por estado/muni/categoría. Click pin → popup con título, estado, municipalidad, fecha, reportante, botón Google Maps.
3. Gestiona usuarios/personal (`/admin/all-user`, `/admin/all-admin`) y contenidos (noticias/destacados).

### Flujo Sesión
- `LoginContext.jsx` guarda `login` en `localStorage` + `storage` listener → sesión persiste al cambiar de ventana/pestaña/ruta. Header dinámico (`header.jsx`) muestra avatar/nombre/Salir si hay sesión en cualquier ruta pública, evitando ilusión de "sesión cerrada".

## Base de datos — 13 tablas (dump `proyect-uni.sql` + `backend/proyect-uni.sql`)

| Tabla | Registros demo | Descripción |
|-------|---------------|-------------|
| `usuarios` | 8 | Ciudadanos |
| `admins` | 3 | Staff |
| `municipalidades` | 3 | Huánuco, Amarilis, Pillco Marca |
| `categorias_reporte` | 8 | Infraestructura...Otros |
| `reportes` | 21 | Incluye `latitud, longitud, ubicacion, estado` |
| `noticias` | 8 | |
| `destacados` | 5 | |
| `preguntas_frecuentes` | 5 | |
| `slider_imagenes` | 7 | |
| `comentarios` | 8 | |
| `notificaciones` | 6 | |
| `historial_estados` | 7 | |
| `auditoria` | 6 | |

Import rápido: `mysql -u root < proyect-uni.sql` (raíz o `backend/proyect-uni.sql`) o `cd backend && npm run setup` (reset + migrate + seed).

## Instalación

### Requisitos
Node 18+, MySQL/MariaDB 10.5+

### Pasos (Windows/Linux)
```bash
git clone https://github.com/ZaidNM/Alertas_Muni.git
cd Alertas_Muni

# Backend
cd backend
npm install
# Crear DB (sin contraseña por defecto; si tu MySQL tiene pass, edita backend/db.js o export DB_PASSWORD=tu_pass)
mysql -u root -e "CREATE DATABASE IF NOT EXISTS \`proyect-uni\`;"
npm run setup   # o mysql -u root < ../proyect-uni.sql

# Frontend
cd ../frontend
npm install
```

### Iniciar (2 terminales)
```bash
# Terminal 1 - Backend http://localhost:4000
cd backend
npm run dev

# Terminal 2 - Frontend http://localhost:5173
cd frontend
npm run dev
```

### Scripts
`backend: npm run dev | migrate | migrate:down | migrate:reset | migrate:status | seed | seed:flush | setup`  
`frontend: npm run dev | build | preview`

## Estructura
```
Alertas_Muni/
├── proyect-uni.sql          # Dump completo para otras PCs
├── backend/
│   ├── db.js                # Pool MySQL con fallback '' -> '1234' + autocreación DB
│   ├── index.js             # Express :4000 + reporte.routes
│   ├── controllers/reporte.controller.js # POST /reportes con GPS
│   ├── routes/reporte.routes.js
│   ├── migrate/00_...11_*.js
│   └── seed.js
└── frontend/
    ├── src/paginas/adminPages/MapaReportes.jsx # Mapa Leaflet
    ├── src/paginas/userPages/formulario/formulario.jsx # GPS dispositivo
    └── src/context/LoginContext.jsx # Persistencia + sync pestañas
```

## Notas técnicas
- `backend/db.js` soporta `DB_PASSWORD` env y fallback automático `''` → `'1234'` para evitar `500 ER_ACCESS_DENIED` en diferentes PCs.
- Swiper flechas reducidas a `34px` circulares (`swiper.css`) para no tapar cards; imágenes con fallback `huanuco.jpg`/`banner.png` si `imagen` es `null`.
- CORS `origin: http://localhost:5173`

## Autor
Rama `zaid` - ZaidNM - Alertas_Muni
