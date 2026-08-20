# ReporteCiudadano

Sistema web para reportes ciudadanos de la región de Huánuco, Perú. Permite a los ciudadanos reportar problemas de infraestructura, limpieza, seguridad y otros a las municipalidades de Huánuco, Amarilis y Pillco Marca.

## Tecnologías

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MySQL2
- **Base de datos:** MySQL / MariaDB

## Requisitos previos

| Programa | Versión mínima | Descarga |
|----------|---------------|----------|
| Node.js | 18+ | https://nodejs.org |
| npm | (viene con Node) | — |
| MySQL o MariaDB | 10.5+ | https://mariadb.org/download |

## Configuración de git por primera vez
| Configuración | Comando |
|---------------|---------|
| Nombre de usuario | `git config --global user.name "Tu Nombre"` |
| Correo electrónico | `git config --global user.email "tu-correo@ejemplo.com"` |

## Instalación en Linux (Ubuntu/Debian)

### 1. Instalar Node.js

```bash
# Instalar nvm (gestor de versiones de Node)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

# Instalar Node.js
nvm install 20
nvm use 20
node -v  # debe mostrar v20.x.x
```

### 2. Instalar MariaDB

```bash
sudo apt update
sudo apt install -y mariadb-server

# Iniciar servicio
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Configurar root sin contraseña (solo desarrollo)
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('');"
sudo mysql -e "FLUSH PRIVILEGES;"

# Verificar conexión
mysql -u root -e "SELECT VERSION();"
```

### 3. Crear la base de datos

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS \`proyect-uni\`;"
```

### 4. Clonar e instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd pr-react-uni

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 5. Configurar base de datos (migraciones + datos demo)

```bash
cd backend
npm run setup
```

### 6. Iniciar el proyecto

Terminal 1 — Backend:
```bash
cd backend
npm run dev
# Servidor en http://localhost:4000
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
# App en http://localhost:5173
```

## Instalación en Windows

### 1. Instalar Node.js

1. Descargar desde https://nodejs.org (versión LTS)
2. Ejecutar el instalador (marcar "Automatically install the necessary tools")
3. Reiniciar la terminal

```bash
node -v  # debe mostrar v18.x.x o superior
```

### 2. Instalar MariaDB

1. Descargar desde https://mariadb.org/download
2. Ejecutar el instalador:
   - Puerto: 3306 (default)
   - Contraseña del root: dejar vacía o recordarla
   - Servicio: agregar al PATH del sistema
3. Abrir **MySQL Command Line Client** y verificar:

```sql
SELECT VERSION();
```

### 3. Crear la base de datos

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS `proyect-uni`;"
```

> Si configuraste contraseña, usa: `mysql -u root -p` y ingresa la contraseña.

### 4. Clonar e instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd pr-react-uni

# Backend
cd backend
npm install

# Frontend
cd ..\frontend
npm install
```

### 5. Configurar base de datos

```bash
cd backend
npm run setup
```

### 6. Iniciar el proyecto

Abrir **dos terminales**:

Terminal 1 — Backend:
```bash
cd backend
npm run dev
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
```

## Scripts disponibles

### Backend (`cd backend`)

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor en modo desarrollo (con auto-reload) |
| `npm run migrate` | Ejecutar migraciones pendientes |
| `npm run migrate:down` | Revertir la última migración |
| `npm run migrate:reset` | Eliminar todas las tablas |
| `npm run migrate:status` | Ver estado de las migraciones |
| `npm run seed` | Poblar base de datos con datos demo |
| `npm run setup` | Reset + Migrate + Seed completo |

### Frontend (`cd frontend`)

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo Vite |
| `npm run build` | Generar build de producción |
| `npm run preview` | Previsualizar build de producción |

## Estructura del proyecto

```
pr-react-uni/
├── backend/
│   ├── db.js                  # Conexión a MySQL/MariaDB
│   ├── index.js               # Servidor Express (puerto 4000)
│   ├── seed.js                # Datos demo para las 13 tablas
│   ├── migrate/
│   │   ├── run.js             # Runner de migraciones (up/down/reset/status)
│   │   ├── 00_base_tables.js  # usuarios + admins
│   │   ├── 01_municipalidades.js
│   │   ├── 02_categorias_reporte.js
│   │   ├── 03_reportes.js
│   │   ├── 04_noticias.js
│   │   ├── 05_destacados.js
│   │   ├── 06_preguntas_frecuentes.js
│   │   ├── 07_slider_imagenes.js
│   │   ├── 08_comentarios.js
│   │   ├── 09_notificaciones.js
│   │   ├── 10_historial_estados.js
│   │   └── 11_auditoria.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Base de datos — 13 tablas

| Tabla | Registros demo | Descripción |
|-------|---------------|-------------|
| `usuarios` | 8 | Ciudadanos registrados |
| `admins` | 3 | Administradores del sistema |
| `municipalidades` | 3 | Huánuco, Amarilis, Pillco Marca |
| `categorias_reporte` | 8 | Infraestructura, limpieza, seguridad... |
| `reportes` | 11 | Reportes ciudadanos con ubicación GPS |
| `noticias` | 8 | Publicaciones de admins |
| `destacados` | 5 | Contenido destacado por municipio |
| `preguntas_frecuentes` | 5 | Preguntas frecuentes |
| `slider_imagenes` | 7 | Imágenes de carruseles |
| `comentarios` | 8 | Comentarios en reportes y noticias |
| `notificaciones` | 6 | Avisos de cambio de estado |
| `historial_estados` | 7 | Tracking de cambios de estado |
| `auditoria` | 6 | Log de operaciones CRUD |

## Datos de prueba

### Usuarios (correo / contraseña)

| Nombre | Correo | Contraseña |
|--------|--------|-----------|
| Ana García | ana.garcia@demo.com | ana1234 |
| José Pérez | jose.perez@demo.com | jose123 |
| María Flores | maria.flores@demo.com | maria123 |
| Luis Cruz | luis.cruz@demo.com | luis123 |
| Rosa Huamán | rosa.huaman@demo.com | rosa123 |
| Pedro Sánchez | pedro.sanchez@demo.com | pedro123 |
| Carmen Quispe | carmen.quispe@demo.com | carmen123 |
| Juan Torres | juan.torres@demo.com | juan123 |

### Administradores

| Nombre | Correo | Contraseña | Tipo |
|--------|--------|-----------|------|
| Carlos Mendoza | admin@demo.com | admin123 | superadmin |
| Lucía Torres | lucia.torres@demo.com | lucia123 | editor |
| Miguel Ríos | miguel.rios@demo.com | miguel123 | admin |

## Solución de problemas

### "Access denied for user 'root'@'localhost'"

```bash
# Linux
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('');"
sudo mysql -e "FLUSH PRIVILEGES;"

# Windows — abrir MySQL Command Line Client como administrador
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('');"
mysql -u root -e "FLUSH PRIVILEGES;"
```

### "ER_DUP_ENTRY" al ejecutar seed

Los datos ya existen. Ejecuta:

```bash
npm run seed   # limpia y vuelve a insertar automáticamente
```

### "Cannot find module" al ejecutar migrate

Asegúrate de haber instalado las dependencias:

```bash
cd backend && npm install
```

### Puerto 4000 o 5173 en uso

```bash
# Linux — encontrar y matar el proceso
lsof -i :4000
kill -9 <PID>

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### MariaDB no inicia

```bash
# Linux
sudo systemctl status mariadb
sudo systemctl restart mariadb

# Windows — reiniciar servicio desde Services (services.msc)
```
