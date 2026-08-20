import { pool } from './db.js';

const seed = async () => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS total FROM municipalidades');
        if (rows[0].total > 0) {
            console.log('Ya existen datos. Limpiando tablas...\n');
            await pool.query('SET FOREIGN_KEY_CHECKS = 0');
            const tables = [
                'auditoria', 'historial_estados', 'notificaciones', 'comentarios',
                'slider_imagenes', 'preguntas_frecuentes', 'destacados', 'noticias',
                'reportes', 'categorias_reporte', 'municipalidades', 'admins', 'usuarios'
            ];
            for (const t of tables) {
                await pool.query(`TRUNCATE TABLE \`${t}\``);
            }
            await pool.query('SET FOREIGN_KEY_CHECKS = 1');
            console.log('Tablas limpiadas.\n');
        }

        console.log('Insertando datos demo...\n');
        // 1. MUNICIPALIDADES
        const municipalidades = [
            { nombre: 'Huánuco', slug: 'huanuco', descripcion: 'Cercado de Huánuco - capital regional' },
            { nombre: 'Amarilis', slug: 'amarillis', descripcion: 'Distrito de Amarilis' },
            { nombre: 'Pillco Marca', slug: 'pillco-marca', descripcion: 'Distrito de Pillco Marca' }
        ];
        for (const m of municipalidades) {
            await pool.query('INSERT INTO municipalidades (nombre, slug, imagen, descripcion) VALUES (?, ?, ?, ?)',
                [m.nombre, m.slug, `/img/muni-${m.slug}.jpg`, m.descripcion]);
        }
        console.log('  3 municipalidades');

        // 2. CATEGORÍAS DE REPORTE
        const categorias = [
            { nombre: 'Infraestructura', icono: 'building', descripcion: 'Vías, puentes, edificios públicos' },
            { nombre: 'Limpieza', icono: 'trash', descripcion: 'Basura, recolección, ornato' },
            { nombre: 'Seguridad', icono: 'shield', descripcion: 'Robos, iluminación, vigilancia' },
            { nombre: 'Salud', icono: 'heart', descripcion: 'Postas médicas, saneamiento, agua' },
            { nombre: 'Educación', icono: 'book', descripcion: 'Escuelas, infraestructura educativa' },
            { nombre: 'Transporte', icono: 'bus', descripcion: 'Vías de acceso, transporte público' },
            { nombre: 'Agua y Desagüe', icono: 'droplet', descripcion: 'Tuberías, cortes de agua, desagüe' },
            { nombre: 'Otros', icono: 'alert', descripcion: 'Otros problemas no categorizados' }
        ];
        for (const c of categorias) {
            await pool.query('INSERT INTO categorias_reporte (nombre, icono, descripcion) VALUES (?, ?, ?)',
                [c.nombre, c.icono, c.descripcion]);
        }
        console.log('  8 categorías de reporte');

        // 3. USUARIOS
        const usuarios = [
            { nomUser: 'Ana', apeUser: 'García', dniUser: '70123456', correoUser: 'ana.garcia@demo.com', contraUser: 'ana1234', bornUser: '2001-05-12', celUser: '912345678' },
            { nomUser: 'José', apeUser: 'Pérez', dniUser: '71234567', correoUser: 'jose.perez@demo.com', contraUser: 'jose123', bornUser: '1999-09-25', celUser: '923456789' },
            { nomUser: 'María', apeUser: 'Flores', dniUser: '72345678', correoUser: 'maria.flores@demo.com', contraUser: 'maria123', bornUser: '2000-01-30', celUser: '934567890' },
            { nomUser: 'Luis', apeUser: 'Cruz', dniUser: '73456789', correoUser: 'luis.cruz@demo.com', contraUser: 'luis123', bornUser: '1998-12-03', celUser: '945678901' },
            { nomUser: 'Rosa', apeUser: 'Huamán', dniUser: '74567890', correoUser: 'rosa.huaman@demo.com', contraUser: 'rosa123', bornUser: '2002-06-18', celUser: '956789012' },
            { nomUser: 'Pedro', apeUser: 'Sánchez', dniUser: '75678901', correoUser: 'pedro.sanchez@demo.com', contraUser: 'pedro123', bornUser: '1997-04-07', celUser: '967890123' },
            { nomUser: 'Carmen', apeUser: 'Quispe', dniUser: '76789012', correoUser: 'carmen.quispe@demo.com', contraUser: 'carmen123', bornUser: '2003-08-14', celUser: '978901234' },
            { nomUser: 'Juan', apeUser: 'Torres', dniUser: '77890123', correoUser: 'juan.torres@demo.com', contraUser: 'juan123', bornUser: '1996-11-22', celUser: '989012345' }
        ];
        for (const u of usuarios) {
            await pool.query(
                'INSERT INTO usuarios (nomUser, apeUser, dniUser, correoUser, contraUser, bornUser, celUser) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [u.nomUser, u.apeUser, u.dniUser, u.correoUser, u.contraUser, u.bornUser, u.celUser]
            );
        }
        console.log('  8 usuarios');

        // 4. ADMINS
        const admins = [
            { nomAdmin: 'Carlos', apeAdmin: 'Mendoza', dniAdmin: '45123678', correoAdmin: 'admin@demo.com', contraAdmin: 'admin123', bornAdmin: '1985-03-15', celAdmin: '951236478', typeAdmin: 'superadmin' },
            { nomAdmin: 'Lucía', apeAdmin: 'Torres', dniAdmin: '46234789', correoAdmin: 'lucia.torres@demo.com', contraAdmin: 'lucia123', bornAdmin: '1990-07-22', celAdmin: '962348791', typeAdmin: 'editor' },
            { nomAdmin: 'Miguel', apeAdmin: 'Ríos', dniAdmin: '47345890', correoAdmin: 'miguel.rios@demo.com', contraAdmin: 'miguel123', bornAdmin: '1988-11-08', celAdmin: '973459812', typeAdmin: 'admin' }
        ];
        for (const a of admins) {
            await pool.query(
                'INSERT INTO admins (nomAdmin, apeAdmin, dniAdmin, correoAdmin, contraAdmin, bornAdmin, celAdmin, typeAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [a.nomAdmin, a.apeAdmin, a.dniAdmin, a.correoAdmin, a.contraAdmin, a.bornAdmin, a.celAdmin, a.typeAdmin]
            );
        }
        console.log('  3 admins');

        // 5. REPORTES
        const reportes = [
            { idUser: 1, idMunicipalidad: 1, idCategoria: 1, titulo: 'Bache en Av. Circunvalación', descripcion: 'Existe un bache de aproximadamente 2 metros de diámetro en la Av. Circunvalación a la altura del km 3. Vehículos están teniendo problemas para circular.', ubicacion: 'https://maps.google.com/?q=-9.9306,-76.2417', latitud: -9.9306, longitud: -76.2417, estado: 'en_proceso' },
            { idUser: 2, idMunicipalidad: 1, idCategoria: 2, titulo: 'Acumulación de basura en el parque', descripcion: 'El parque principal presenta acumulación de basura en su costado norte. Los contenedores están saturados y la basura se esparce por el área verde.', ubicacion: 'https://maps.google.com/?q=-9.9291,-76.2398', latitud: -9.9291, longitud: -76.2398, estado: 'pendiente' },
            { idUser: 3, idMunicipalidad: 1, idCategoria: 3, titulo: 'Falta de iluminación en Jr. San Martín', descripcion: 'El Jr. San Martín entre las cuadras 5 y 8 no cuenta con iluminación. Esto genera inseguridad durante la noche para los vecinos.', ubicacion: 'https://maps.google.com/?q=-9.9275,-76.2410', latitud: -9.9275, longitud: -76.2410, estado: 'resuelto' },
            { idUser: 4, idMunicipalidad: 2, idCategoria: 4, titulo: 'Posta médica sin personal', descripcion: 'La posta médica de Amarilis lleva más de una semana sin personal médico. Los pacientes son derivados al hospital central.', ubicacion: 'https://maps.google.com/?q=-9.9534,-76.2289', latitud: -9.9534, longitud: -76.2289, estado: 'pendiente' },
            { idUser: 5, idMunicipalidad: 2, idCategoria: 1, titulo: 'Puente peatonal dañado', descripcion: 'El puente peatonal sobre el río performing presenta grietas estructurales. Es peligroso para los peatones que cruzan diariamente.', ubicacion: 'https://maps.google.com/?q=-9.9520,-76.2300', latitud: -9.9520, longitud: -76.2300, estado: 'en_proceso' },
            { idUser: 6, idMunicipalidad: 3, idCategoria: 6, titulo: 'Vía de acceso en mal estado', descripcion: 'La vía principal de acceso a Pillco Marca presenta multiple baches y zanjas que dificultan el tránsito vehicular y peatonal.', ubicacion: 'https://maps.google.com/?q=-9.9145,-76.2534', latitud: -9.9145, longitud: -76.2534, estado: 'pendiente' },
            { idUser: 7, idMunicipalidad: 3, idCategoria: 7, titulo: 'Corte de agua recurrente', descripcion: 'El sector de Pillco Marca Alto presenta cortes de agua de más de 24 horas. La población no cuenta con agua potable para consumo.', ubicacion: 'https://maps.google.com/?q=-9.9130,-76.2520', latitud: -9.9130, longitud: -76.2520, estado: 'pendiente' },
            { idUser: 8, idMunicipalidad: 1, idCategoria: 5, titulo: 'Escuela con techo deteriorado', descripcion: 'La I.E. 30566 de Huánuco presenta filtraciones de agua en 3 aulas debido al deterioro del techo. Los alumnos no pueden usar esas aulas.', ubicacion: 'https://maps.google.com/?q=-9.9310,-76.2430', latitud: -9.9310, longitud: -76.2430, estado: 'pendiente' },
            { idUser: 1, idMunicipalidad: 1, idCategoria: 8, titulo: 'Perro vagabundo agresivo', descripcion: 'En la cuadra 12 del Jr. Cusco se encuentra un perro vagabundo que ha atacado a varios vecinos. Se requiere atención urgente.', ubicacion: 'https://maps.google.com/?q=-9.9298,-76.2405', latitud: -9.9298, longitud: -76.2405, estado: 'resuelto' },
            { idUser: 2, idMunicipalidad: 2, idCategoria: 2, titulo: 'Vertimiento de aguas servidas', descripcion: 'Existe un vertimiento de aguas servidas a la calle en el sector de Huamantanga, Amarilis. Esto genera malos olores y plagas.', ubicacion: 'https://maps.google.com/?q=-9.9540,-76.2295', latitud: -9.9540, longitud: -76.2295, estado: 'en_proceso' },
            { idUser: 3, idMunicipalidad: 1, idCategoria: 1, titulo: 'Semáforo dañado en la Plaza', descripcion: 'El semáforo peatonal de la Plaza de Armas de Huánuco está dañado. Los peatones cruzan sin control generando riesgo de accidentes.', ubicacion: 'https://maps.google.com/?q=-9.9285,-76.2395', latitud: -9.9285, longitud: -76.2395, estado: 'pendiente' }
        ];
        for (const r of reportes) {
            await pool.query(
                'INSERT INTO reportes (idUser, idMunicipalidad, idCategoria, titulo, descripcion, ubicacion, latitud, longitud, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [r.idUser, r.idMunicipalidad, r.idCategoria, r.titulo, r.descripcion, r.ubicacion, r.latitud, r.longitud, r.estado]
            );
        }
        console.log('  11 reportes');

        // 6. NOTICIAS
        const noticias = [
            { titulo: 'Jornada de limpieza en el Parque Principal', descripcion: 'La municipalidad de Huánuco organiza una jornada de limpieza en el Parque Principal este sábado. Se invita a todos los vecinos a participar desde las 8:00 am. Se proveerán bolsas, guantes y herramientas de limpieza.', idAdminCreador: 1, activa: true },
            { titulo: 'Nueva ruta de transporte público', descripcion: 'A partir del lunes se habilitará una nueva ruta de transporte público que conectará el centro de Huánuco con el sector de Pillco Marca. La nueva ruta pasará por la Av. Circunvalación y reducirá el tiempo de viaje en 15 minutos.', idAdminCreador: 1, activa: true },
            { titulo: 'Festival gastronómico huanuquense', descripcion: 'Se realizará el Festival Gastronómico en la Plaza de Armas del 15 al 17 de este mes. Participarán más de 30 restaurantes locales con platos típicos de la región. Entrada libre.', idAdminCreador: 2, activa: true },
            { titulo: 'Programa de vacunación para mascotas', descripcion: 'La dirección de salud municipal实施ará un programa gratuito de vacunación para mascotas en los distritos de Huánuco, Amarilis y Pillco Marca. Las vacunas serán aplicadas en los centros de salud de cada distrito.', idAdminCreador: 2, activa: true },
            { titulo: 'Mejoramiento de iluminación en el centro histórico', descripcion: 'Se instalarán 50 nuevos puntos de iluminación LED en el centro histórico de Huánuco. El proyecto tiene una inversión de S/ 250,000 y mejorará la seguridad nocturna de los vecinos.', idAdminCreador: 3, activa: true },
            { titulo: 'Concurso de arte para estudiantes', descripcion: 'La municipalidad convoca al Concurso de Arte Juvenil 2024 para estudiantes de primaria y secundaria. Las categorías son: pintura, poesía y narrativa. Inscripciones abiertas hasta el 30 de este mes.', idAdminCreador: 1, activa: true },
            { titulo: 'Corte programado de agua para Amarilis', descripcion: 'Se realizará un corte programado de agua potable en todo el distrito de Amarilis el próximo miércoles de 6:00 am a 2:00 pm por mantenimiento de la red de tuberías. Se recomienda almacenar agua.', idAdminCreador: 3, activa: true },
            { titulo: 'Campaña de reforestación en Pillco Marca', descripcion: 'Se ejecutará una campaña de reforestación en las riberas del río en Pillco Marca. Se plantarán más de 500 árboles nativos. Se busca voluntarios interesados en participar.', idAdminCreador: 2, activa: true }
        ];
        for (const n of noticias) {
            await pool.query(
                'INSERT INTO noticias (titulo, descripcion, idAdminCreador, activa) VALUES (?, ?, ?, ?)',
                [n.titulo, n.descripcion, n.idAdminCreador, n.activa]
            );
        }
        console.log('  8 noticias');

        // 7. DESTACADOS
        const destacados = [
            { titulo: 'Proyecto de agua potable Huánuco 2024', descripcion: 'La municipalidad invierte S/ 2.5 millones en la mejora del sistema de agua potable para 15,000 familias del centro de Huánuco. El proyecto incluye la renovación de 8 km de tuberías principales.', idMunicipalidad: 1, activo: true },
            { titulo: 'Nuevo mercado de Amarilis', descripcion: 'Se inauguró el nuevo mercado de Amarilis con 120 puestos comerciales, baño público y estacionamiento. La inversión fue de S/ 3.8 millones y beneficia a más de 5,000 familias.', idMunicipalidad: 2, activo: true },
            { titulo: 'Carretera Pillco Marca - Tingó', descripcion: 'Se ha completado el mejoramiento de la carretera que conecta Pillco Marca con el centro poblado de Tingó. La vía cuenta ahora con capa asfáltica y señalización vial.', idMunicipalidad: 3, activo: true },
            { titulo: 'Programa de empleo juvenil', descripcion: 'Más de 200 jóvenes de los tres distritos se beneficiarán con el programa de capacitación y empleo. Se ofrecerán cursos de computación, inglés, electricidad y albañilería.', idMunicipalidad: null, activo: true },
            { titulo: 'Parque ecológico de Huánuco', descripcion: 'Se inauguró el Parque Ecológico con áreas verdes, juegos infantiles, canchas deportivas y una laguna artificial. El parque se extiende sobre 5 hectáreas en el sector de Pueblo Libre.', idMunicipalidad: 1, activo: true }
        ];
        for (const d of destacados) {
            await pool.query(
                'INSERT INTO destacados (titulo, descripcion, idMunicipalidad, activo) VALUES (?, ?, ?, ?)',
                [d.titulo, d.descripcion, d.idMunicipalidad, d.activo]
            );
        }
        console.log('  5 destacados');

        // 8. PREGUNTAS FRECUENTES
        const faqs = [
            { pregunta: '¿Cómo puedo hacer un reporte ciudadano?', respuesta: 'Para hacer un reporte, primero debes registrarte e iniciar sesión como usuario. Luego ve a la sección "Reportar" donde podrás seleccionar la ubicación en Google Maps, elegir la municipalidad, describir el problema y adjuntar una foto como evidencia.', orden: 1 },
            { pregunta: '¿Cuánto tiempo tarda en resolverse un reporte?', respuesta: 'El tiempo de respuesta varía según la complejidad del problema. Los reportes simples se resuelven en 3-5 días hábiles. Los reportes que requieren inversión mayor pueden tardar hasta 30 días. Puedes verificar el estado de tu reporte en la sección "Mis Reportes".', orden: 2 },
            { pregunta: '¿Puedo hacer reportes anónimos?', respuesta: 'Actualmente es necesario registrarse para hacer reportes. Sin embargo, tus datos personales son tratados con confidencialidad y solo son utilizados para dar seguimiento a tu caso.', orden: 3 },
            { pregunta: '¿Cómo me entero del estado de mi reporte?', respuesta: 'Cuando el estado de tu reporte cambie, recibirás una notificación en la plataforma. También puedes revisar el historial de estados en la sección de tu reporte. Los estados son: Pendiente, En Proceso y Resuelto.', orden: 4 },
            { pregunta: '¿Qué tipos de problemas puedo reportar?', respuesta: 'Puedes reportar problemas de infraestructura (baches, puentes), limpieza (basura, ornato), seguridad (iluminación, robos), salud (postas médicas), educación (escuelas), transporte (vías), agua y desagüe, y otros problemas de tu comunidad.', orden: 5 }
        ];
        for (const f of faqs) {
            await pool.query(
                'INSERT INTO preguntas_frecuentes (pregunta, respuesta, orden) VALUES (?, ?, ?)',
                [f.pregunta, f.respuesta, f.orden]
            );
        }
        console.log('  5 preguntas frecuentes');

        // 9. SLIDER IMÁGENES
        const sliderImgs = [
            { titulo: 'Vista panorámica de Huánuco', imagen: '/img/slider/huanuco-1.jpg', seccion: 'home', orden: 1 },
            { titulo: 'Parque Principal de noche', imagen: '/img/slider/huanuco-2.jpg', seccion: 'home', orden: 2 },
            { titulo: 'Plaza de Armas', imagen: '/img/slider/huanuco-3.jpg', seccion: 'home', orden: 3 },
            { titulo: 'Noticia: Festival gastronómico', imagen: '/img/slider/noticia-1.jpg', seccion: 'noticias', orden: 1 },
            { titulo: 'Noticia: Jornada de limpieza', imagen: '/img/slider/noticia-2.jpg', seccion: 'noticias', orden: 2 },
            { titulo: 'Destacado: Proyecto agua potable', imagen: '/img/slider/dest-1.jpg', seccion: 'destacados', orden: 1 },
            { titulo: 'Destacado: Nuevo mercado', imagen: '/img/slider/dest-2.jpg', seccion: 'destacados', orden: 2 }
        ];
        for (const s of sliderImgs) {
            await pool.query(
                'INSERT INTO slider_imagenes (titulo, imagen, seccion, orden) VALUES (?, ?, ?, ?)',
                [s.titulo, s.imagen, s.seccion, s.orden]
            );
        }
        console.log('  7 imágenes de slider');

        // 10. COMENTARIOS
        const comentarios = [
            { idUser: 1, idReporte: 1, idNoticia: null, contenido: 'Ese bache lleva más de 2 meses. Ya han caído varios motociclistas.', activo: true },
            { idUser: 2, idReporte: 1, idNoticia: null, contenido: 'Confirmo, es muy peligroso especialmente de noche.', activo: true },
            { idUser: 3, idReporte: null, idNoticia: 1, contenido: 'Participaré con mi familia. Es una excelente iniciativa.', activo: true },
            { idUser: 4, idReporte: 4, idNoticia: null, contenido: 'La posta médica necesita más personal urgente. Somos muchos los que dependemos de ella.', activo: true },
            { idUser: 5, idReporte: null, idNoticia: 3, contenido: '¿Habrá puestos de comida para celíacos?', activo: true },
            { idUser: 6, idReporte: 6, idNoticia: null, contenido: 'La carretera está horrible. No se puede pasar en época de lluvias.', activo: true },
            { idUser: 7, idReporte: 7, idNoticia: null, contenido: 'Confirmo el corte de agua. Llevamos 2 días sin servicio en mi zona.', activo: true },
            { idUser: 8, idReporte: null, idNoticia: 5, contenido: 'Muy buena iniciativa de iluminación LED. Espero que llegue también a Pillco Marca.', activo: true }
        ];
        for (const c of comentarios) {
            await pool.query(
                'INSERT INTO comentarios (idUser, idReporte, idNoticia, contenido, activo) VALUES (?, ?, ?, ?, ?)',
                [c.idUser, c.idReporte, c.idNoticia, c.contenido, c.activo]
            );
        }
        console.log('  8 comentarios');

        // 11. NOTIFICACIONES
        const notificaciones = [
            { idUser: 1, titulo: 'Reporte en proceso', mensaje: 'Tu reporte "Bache en Av. Circunvalación" ha sido tomado por el equipo de mantenimiento.', leida: false, tipo: 'reporte_estado', referenciaId: 1 },
            { idUser: 3, titulo: 'Reporte resuelto', mensaje: 'Tu reporte "Falta de iluminación en Jr. San Martín" ha sido resuelto. Se instalaron 4 faroles nuevos.', leida: true, tipo: 'reporte_estado', referenciaId: 3 },
            { idUser: 8, titulo: 'Reporte resuelto', mensaje: 'Tu reporte "Perro vagabundo agresivo" ha sido atendido por la patrol municipal.', leida: true, tipo: 'reporte_estado', referenciaId: 9 },
            { idUser: 4, titulo: 'Reporte en proceso', mensaje: 'Tu reporte "Posta médica sin personal" está siendo evaluado por la dirección de salud.', leida: false, tipo: 'reporte_estado', referenciaId: 4 },
            { idUser: 1, titulo: 'Nuevo comentario', mensaje: 'José Pérez comentó en tu reporte "Bache en Av. Circunvalación".', leida: false, tipo: 'comentario', referenciaId: 1 },
            { idUser: 5, titulo: 'Bienvenido', mensaje: 'Bienvenido a ReporteCiudadano. Ya puedes crear reportes para mejorar tu comunidad.', leida: true, tipo: 'sistema', referenciaId: null }
        ];
        for (const n of notificaciones) {
            await pool.query(
                'INSERT INTO notificaciones (idUser, titulo, mensaje, leida, tipo, referenciaId) VALUES (?, ?, ?, ?, ?, ?)',
                [n.idUser, n.titulo, n.mensaje, n.leida, n.tipo, n.referenciaId]
            );
        }
        console.log('  6 notificaciones');

        // 12. HISTORIAL DE ESTADOS
        const historial = [
            { idReporte: 1, estadoAnterior: 'pendiente', estadoNuevo: 'en_proceso', idAdmin: 1, observaciones: 'Equipo de vialidad asignado para evaluación.', fechaCambio: '2024-06-10 09:30:00' },
            { idReporte: 3, estadoAnterior: 'pendiente', estadoNuevo: 'en_proceso', idAdmin: 1, observaciones: 'Se gestionó compra de faroles LED.', fechaCambio: '2024-06-05 14:00:00' },
            { idReporte: 3, estadoAnterior: 'en_proceso', estadoNuevo: 'resuelto', idAdmin: 1, observaciones: 'Se instalaron 4 faroles LED en el Jr. San Martín cuadras 5-8.', fechaCambio: '2024-06-12 11:00:00' },
            { idReporte: 9, estadoAnterior: 'pendiente', estadoNuevo: 'en_proceso', idAdmin: 3, observaciones: 'La patrol municipal fue despachada al sector.', fechaCambio: '2024-06-08 16:30:00' },
            { idReporte: 9, estadoAnterior: 'en_proceso', estadoNuevo: 'resuelto', idAdmin: 3, observaciones: 'Se capturó al animal y fue trasladado al albergue.', fechaCambio: '2024-06-09 10:00:00' },
            { idReporte: 5, estadoAnterior: 'pendiente', estadoNuevo: 'en_proceso', idAdmin: 2, observaciones: 'Ingenieros evaluaron la estructura del puente.', fechaCambio: '2024-06-11 08:45:00' },
            { idReporte: 10, estadoAnterior: 'pendiente', estadoNuevo: 'en_proceso', idAdmin: 2, observaciones: 'Se realizó inspección del vertimiento. Se identificó la fuente.', fechaCambio: '2024-06-13 10:15:00' }
        ];
        for (const h of historial) {
            await pool.query(
                'INSERT INTO historial_estados (idReporte, estadoAnterior, estadoNuevo, idAdmin, observaciones, fechaCambio) VALUES (?, ?, ?, ?, ?, ?)',
                [h.idReporte, h.estadoAnterior, h.estadoNuevo, h.idAdmin, h.observaciones, h.fechaCambio]
            );
        }
        console.log('  7 historiales de estado');

        // 13. AUDITORÍA (datos demo)
        const auditoria = [
            { tabla: 'usuarios', idRegistro: 1, accion: 'CREATE', datosAntes: null, datosDespues: '{"nomUser":"Ana","correoUser":"ana.garcia@demo.com"}', idUsuario: null, idAdmin: 1 },
            { tabla: 'reportes', idRegistro: 1, accion: 'CREATE', datosAntes: null, datosDespues: '{"titulo":"Bache en Av. Circunvalación","estado":"pendiente"}', idUsuario: 1, idAdmin: null },
            { tabla: 'reportes', idRegistro: 1, accion: 'UPDATE', datosAntes: '{"estado":"pendiente"}', datosDespues: '{"estado":"en_proceso"}', idUsuario: null, idAdmin: 1 },
            { tabla: 'reportes', idRegistro: 3, accion: 'UPDATE', datosAntes: '{"estado":"en_proceso"}', datosDespues: '{"estado":"resuelto"}', idUsuario: null, idAdmin: 1 },
            { tabla: 'noticias', idRegistro: 1, accion: 'CREATE', datosAntes: null, datosDespues: '{"titulo":"Jornada de limpieza"}', idUsuario: null, idAdmin: 1 },
            { tabla: 'admins', idRegistro: 1, accion: 'CREATE', datosAntes: null, datosDespues: '{"nomAdmin":"Carlos","typeAdmin":"superadmin"}', idUsuario: null, idAdmin: null }
        ];
        for (const a of auditoria) {
            await pool.query(
                'INSERT INTO auditoria (tabla, idRegistro, accion, datosAntes, datosDespues, idUsuario, idAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [a.tabla, a.idRegistro, a.accion, a.datosAntes, a.datosDespues, a.idUsuario, a.idAdmin]
            );
        }
        console.log('  6 registros de auditoría');

        console.log('\nSeed completado.');
        console.log('Resumen: 13 tablas pobladas con datos demo.');

    } catch (error) {
        console.error('Error en seed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
};

seed();
