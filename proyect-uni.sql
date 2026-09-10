-- ============================================
-- ReporteCiudadano - Base de datos proyect-uni
-- Dump generado para descargar/importar en otra PC
-- Compatible con MySQL / MariaDB 10.5+
-- Uso: mysql -u root < proyect-uni.sql
--   o en phpMyAdmin / MySQL Workbench -> Importar
-- También funciona con: cd backend && npm run setup
-- ============================================
CREATE DATABASE IF NOT EXISTS `proyect-uni` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `proyect-uni`;

SET FOREIGN_KEY_CHECKS=0;

-- Limpieza (orden inverso por FK)
DROP TABLE IF EXISTS `auditoria`;
DROP TABLE IF EXISTS `historial_estados`;
DROP TABLE IF EXISTS `notificaciones`;
DROP TABLE IF EXISTS `comentarios`;
DROP TABLE IF EXISTS `slider_imagenes`;
DROP TABLE IF EXISTS `preguntas_frecuentes`;
DROP TABLE IF EXISTS `destacados`;
DROP TABLE IF EXISTS `noticias`;
DROP TABLE IF EXISTS `reportes`;
DROP TABLE IF EXISTS `categorias_reporte`;
DROP TABLE IF EXISTS `municipalidades`;
DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `usuarios`;
DROP TABLE IF EXISTS `_migrations`;

SET FOREIGN_KEY_CHECKS=1;

-- 00_base_tables: usuarios, admins
CREATE TABLE `usuarios` (
  `idUser` INT AUTO_INCREMENT PRIMARY KEY,
  `nomUser` VARCHAR(100) NOT NULL,
  `apeUser` VARCHAR(100) NOT NULL,
  `dniUser` VARCHAR(20) NOT NULL,
  `correoUser` VARCHAR(150) NOT NULL,
  `contraUser` VARCHAR(255) NOT NULL,
  `bornUser` DATE NOT NULL,
  `celUser` VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `admins` (
  `idAdmin` INT AUTO_INCREMENT PRIMARY KEY,
  `nomAdmin` VARCHAR(100) NOT NULL,
  `apeAdmin` VARCHAR(100) NOT NULL,
  `dniAdmin` VARCHAR(20) NOT NULL,
  `correoAdmin` VARCHAR(150) NOT NULL,
  `contraAdmin` VARCHAR(255) NOT NULL,
  `bornAdmin` DATE NOT NULL,
  `celAdmin` VARCHAR(20) NOT NULL,
  `typeAdmin` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 01_municipalidades
CREATE TABLE `municipalidades` (
  `idMunicipalidad` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `imagen` VARCHAR(255),
  `descripcion` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 02_categorias_reporte
CREATE TABLE `categorias_reporte` (
  `idCategoria` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(100) NOT NULL,
  `icono` VARCHAR(50),
  `descripcion` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 03_reportes
CREATE TABLE `reportes` (
  `idReporte` INT AUTO_INCREMENT PRIMARY KEY,
  `idUser` INT NOT NULL,
  `idMunicipalidad` INT NOT NULL,
  `idCategoria` INT NOT NULL,
  `titulo` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `ubicacion` VARCHAR(500),
  `latitud` DECIMAL(10,8),
  `longitud` DECIMAL(11,8),
  `evidencia` VARCHAR(500),
  `estado` VARCHAR(50) DEFAULT 'pendiente',
  `fechaCreacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fechaActualizacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`idUser`) REFERENCES `usuarios`(`idUser`) ON DELETE CASCADE,
  FOREIGN KEY (`idMunicipalidad`) REFERENCES `municipalidades`(`idMunicipalidad`),
  FOREIGN KEY (`idCategoria`) REFERENCES `categorias_reporte`(`idCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 04_noticias
CREATE TABLE `noticias` (
  `idNoticia` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `imagen` VARCHAR(255),
  `link` VARCHAR(500),
  `linkTexto` VARCHAR(100),
  `idAdminCreador` INT,
  `activa` BOOLEAN DEFAULT TRUE,
  `fechaCreacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idAdminCreador`) REFERENCES `admins`(`idAdmin`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 05_destacados
CREATE TABLE `destacados` (
  `idDestacado` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(200) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `imagen` VARCHAR(255),
  `link` VARCHAR(500),
  `linkTexto` VARCHAR(100),
  `idMunicipalidad` INT,
  `activo` BOOLEAN DEFAULT TRUE,
  `fechaCreacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idMunicipalidad`) REFERENCES `municipalidades`(`idMunicipalidad`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 06_preguntas_frecuentes
CREATE TABLE `preguntas_frecuentes` (
  `idPregunta` INT AUTO_INCREMENT PRIMARY KEY,
  `pregunta` VARCHAR(500) NOT NULL,
  `respuesta` TEXT NOT NULL,
  `orden` INT DEFAULT 0,
  `activa` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 07_slider_imagenes
CREATE TABLE `slider_imagenes` (
  `idImagen` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(200),
  `imagen` VARCHAR(255) NOT NULL,
  `seccion` VARCHAR(50) NOT NULL,
  `orden` INT DEFAULT 0,
  `activa` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 08_comentarios
CREATE TABLE `comentarios` (
  `idComentario` INT AUTO_INCREMENT PRIMARY KEY,
  `idUser` INT NOT NULL,
  `idReporte` INT,
  `idNoticia` INT,
  `contenido` TEXT NOT NULL,
  `activo` BOOLEAN DEFAULT TRUE,
  `fechaCreacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idUser`) REFERENCES `usuarios`(`idUser`) ON DELETE CASCADE,
  FOREIGN KEY (`idReporte`) REFERENCES `reportes`(`idReporte`) ON DELETE CASCADE,
  FOREIGN KEY (`idNoticia`) REFERENCES `noticias`(`idNoticia`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 09_notificaciones
CREATE TABLE `notificaciones` (
  `idNotificacion` INT AUTO_INCREMENT PRIMARY KEY,
  `idUser` INT NOT NULL,
  `titulo` VARCHAR(200) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `leida` BOOLEAN DEFAULT FALSE,
  `tipo` VARCHAR(50),
  `referenciaId` INT,
  `fechaCreacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idUser`) REFERENCES `usuarios`(`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10_historial_estados
CREATE TABLE `historial_estados` (
  `idHistorial` INT AUTO_INCREMENT PRIMARY KEY,
  `idReporte` INT NOT NULL,
  `estadoAnterior` VARCHAR(50),
  `estadoNuevo` VARCHAR(50) NOT NULL,
  `idAdmin` INT,
  `observaciones` TEXT,
  `fechaCambio` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idReporte`) REFERENCES `reportes`(`idReporte`) ON DELETE CASCADE,
  FOREIGN KEY (`idAdmin`) REFERENCES `admins`(`idAdmin`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 11_auditoria
CREATE TABLE `auditoria` (
  `idAuditoria` INT AUTO_INCREMENT PRIMARY KEY,
  `tabla` VARCHAR(50) NOT NULL,
  `idRegistro` INT NOT NULL,
  `accion` VARCHAR(50) NOT NULL,
  `datosAntes` JSON,
  `datosDespues` JSON,
  `idUsuario` INT,
  `idAdmin` INT,
  `fechaAccion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`idUsuario`) REFERENCES `usuarios`(`idUser`) ON DELETE SET NULL,
  FOREIGN KEY (`idAdmin`) REFERENCES `admins`(`idAdmin`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- DATOS DEMO (seed.js) - 13 tablas
-- ============================================

-- Municipalidades (3)
INSERT INTO `municipalidades` (`nombre`,`slug`,`imagen`,`descripcion`) VALUES
('Huánuco','huanuco','/img/muni-huanuco.jpg','Cercado de Huánuco - capital regional'),
('Amarilis','amarillis','/img/muni-amarillis.jpg','Distrito de Amarilis'),
('Pillco Marca','pillco-marca','/img/muni-pillco.jpg','Distrito de Pillco Marca');

-- Categorias (8)
INSERT INTO `categorias_reporte` (`nombre`,`icono`,`descripcion`) VALUES
('Infraestructura','building','Vías, puentes, edificios públicos'),
('Limpieza','trash','Basura, recolección, ornato'),
('Seguridad','shield','Robos, iluminación, vigilancia'),
('Salud','heart','Postas médicas, saneamiento, agua'),
('Educación','book','Escuelas, infraestructura educativa'),
('Transporte','bus','Vías de acceso, transporte público'),
('Agua y Desagüe','droplet','Tuberías, cortes de agua, desagüe'),
('Otros','alert','Otros problemas no categorizados');

-- Usuarios (8) - correos demo: ana.garcia@demo.com / ana1234 etc.
INSERT INTO `usuarios` (`nomUser`,`apeUser`,`dniUser`,`correoUser`,`contraUser`,`bornUser`,`celUser`) VALUES
('Ana','García','70123456','ana.garcia@demo.com','ana1234','2001-05-12','912345678'),
('José','Pérez','71234567','jose.perez@demo.com','jose123','1999-09-25','923456789'),
('María','Flores','72345678','maria.flores@demo.com','maria123','2000-01-30','934567890'),
('Luis','Cruz','73456789','luis.cruz@demo.com','luis123','1998-12-03','945678901'),
('Rosa','Huamán','74567890','rosa.huaman@demo.com','rosa123','2002-06-18','956789012'),
('Pedro','Sánchez','75678901','pedro.sanchez@demo.com','pedro123','1997-04-07','967890123'),
('Carmen','Quispe','76789012','carmen.quispe@demo.com','carmen123','2003-08-14','978901234'),
('Juan','Torres','77890123','juan.torres@demo.com','juan123','1996-11-22','989012345');

-- Admins (3) - admin@demo.com / admin123 superadmin
INSERT INTO `admins` (`nomAdmin`,`apeAdmin`,`dniAdmin`,`correoAdmin`,`contraAdmin`,`bornAdmin`,`celAdmin`,`typeAdmin`) VALUES
('Carlos','Mendoza','45123678','admin@demo.com','admin123','1985-03-15','951236478','superadmin'),
('Lucía','Torres','46234789','lucia.torres@demo.com','lucia123','1990-07-22','962348791','editor'),
('Miguel','Ríos','47345890','miguel.rios@demo.com','miguel123','1988-11-08','973459812','admin');

-- Reportes (21) con lat/lng para el mapa admin
INSERT INTO `reportes` (`idUser`,`idMunicipalidad`,`idCategoria`,`titulo`,`descripcion`,`ubicacion`,`latitud`,`longitud`,`estado`) VALUES
(1,1,1,'Bache en Av. Circunvalación','Existe un bache de aproximadamente 2 metros de diámetro en la Av. Circunvalación a la altura del km 3.','https://maps.google.com/?q=-9.9306,-76.2417',-9.93060000,-76.24170000,'en_proceso'),
(2,1,2,'Acumulación de basura en el parque','El parque principal presenta acumulación de basura en su costado norte.','https://maps.google.com/?q=-9.9291,-76.2398',-9.92910000,-76.23980000,'pendiente'),
(3,1,3,'Falta de iluminación en Jr. San Martín','El Jr. San Martín entre las cuadras 5 y 8 no cuenta con iluminación.','https://maps.google.com/?q=-9.9275,-76.2410',-9.92750000,-76.24100000,'resuelto'),
(4,2,4,'Posta médica sin personal','La posta médica de Amarilis lleva más de una semana sin personal médico.','https://maps.google.com/?q=-9.9534,-76.2289',-9.95340000,-76.22890000,'pendiente'),
(5,2,1,'Puente peatonal dañado','El puente peatonal sobre el río performing presenta grietas estructurales.','https://maps.google.com/?q=-9.9520,-76.2300',-9.95200000,-76.23000000,'en_proceso'),
(6,3,6,'Vía de acceso en mal estado','La vía principal de acceso a Pillco Marca presenta multiple baches y zanjas.','https://maps.google.com/?q=-9.9145,-76.2534',-9.91450000,-76.25340000,'pendiente'),
(7,3,7,'Corte de agua recurrente','El sector de Pillco Marca Alto presenta cortes de agua de más de 24 horas.','https://maps.google.com/?q=-9.9130,-76.2520',-9.91300000,-76.25200000,'pendiente'),
(8,1,5,'Escuela con techo deteriorado','La I.E. 30566 de Huánuco presenta filtraciones de agua en 3 aulas.','https://maps.google.com/?q=-9.9310,-76.2430',-9.93100000,-76.24300000,'pendiente'),
(1,1,8,'Perro vagabundo agresivo','En la cuadra 12 del Jr. Cusco se encuentra un perro vagabundo que ha atacado a varios vecinos.','https://maps.google.com/?q=-9.9298,-76.2405',-9.92980000,-76.24050000,'resuelto'),
(2,2,2,'Vertimiento de aguas servidas','Existe un vertimiento de aguas servidas a la calle en el sector de Huamantanga.','https://maps.google.com/?q=-9.9540,-76.2295',-9.95400000,-76.22950000,'en_proceso'),
(3,1,1,'Semáforo dañado en la Plaza','El semáforo peatonal de la Plaza de Armas de Huánuco está dañado.','https://maps.google.com/?q=-9.9285,-76.2395',-9.92850000,-76.23950000,'pendiente'),
(4,1,2,'Contenedores insuficientes en Las Moras','El sector de Las Moras cuenta con pocos contenedores de basura.','https://maps.google.com/?q=-9.9350,-76.2480',-9.93500000,-76.24800000,'pendiente'),
(5,2,3,'Poste de alumbrado sin funcionamiento','Un poste de alumbrado público permanece apagado en el Jr. Los Olivos de Amarilis.','https://maps.google.com/?q=-9.9505,-76.2265',-9.95050000,-76.22650000,'en_proceso'),
(6,3,4,'Desagüe colapsado en zona residencial','Las aguas residuales se desbordan por un desagüe colapsado.','https://maps.google.com/?q=-9.9170,-76.2550',-9.91700000,-76.25500000,'pendiente'),
(7,1,5,'Aulas con ventanas rotas','La institución educativa del barrio presenta varias ventanas rotas.','https://maps.google.com/?q=-9.9260,-76.2440',-9.92600000,-76.24400000,'pendiente'),
(8,2,6,'Paradero informal genera congestión','Los vehículos de transporte público se detienen en una esquina concurrida de Amarilis.','https://maps.google.com/?q=-9.9560,-76.2320',-9.95600000,-76.23200000,'en_proceso'),
(1,3,7,'Fuga de agua en la vía principal','Una fuga de agua potable discurre por la vía principal de Pillco Marca.','https://maps.google.com/?q=-9.9120,-76.2505',-9.91200000,-76.25050000,'pendiente'),
(2,1,8,'Árbol caído bloquea la vereda','Un árbol caído bloquea parcialmente la vereda y dificulta el paso de peatones.','https://maps.google.com/?q=-9.9300,-76.2425',-9.93000000,-76.24250000,'resuelto'),
(3,2,1,'Vereda deteriorada frente al mercado','La vereda frente al mercado de Amarilis presenta desniveles y grietas.','https://maps.google.com/?q=-9.9515,-76.2290',-9.95150000,-76.22900000,'pendiente'),
(4,3,2,'Residuos acumulados junto al río','Se han acumulado residuos sólidos junto a la ribera del río en Pillco Marca.','https://maps.google.com/?q=-9.9155,-76.2540',-9.91550000,-76.25400000,'pendiente'),
(5,1,3,'Zona escolar sin señalización','La zona cercana a una institución educativa no cuenta con señalización visible.','https://maps.google.com/?q=-9.9245,-76.2385',-9.92450000,-76.23850000,'en_proceso');

-- Noticias (8)
INSERT INTO `noticias` (`titulo`,`descripcion`,`idAdminCreador`,`activa`) VALUES
('Jornada de limpieza en el Parque Principal','La municipalidad de Huánuco organiza una jornada de limpieza en el Parque Principal este sábado.',1,1),
('Nueva ruta de transporte público','A partir del lunes se habilitará una nueva ruta de transporte público que conectará el centro de Huánuco con Pillco Marca.',1,1),
('Festival gastronómico huanuquense','Se realizará el Festival Gastronómico en la Plaza de Armas del 15 al 17 de este mes.',2,1),
('Programa de vacunación para mascotas','La dirección de salud municipal implementará un programa gratuito de vacunación para mascotas.',2,1),
('Mejoramiento de iluminación en el centro histórico','Se instalarán 50 nuevos puntos de iluminación LED en el centro histórico de Huánuco.',3,1),
('Concurso de arte para estudiantes','La municipalidad convoca al Concurso de Arte Juvenil 2024 para estudiantes de primaria y secundaria.',1,1),
('Corte programado de agua para Amarilis','Se realizará un corte programado de agua potable en todo el distrito de Amarilis el próximo miércoles.',3,1),
('Campaña de reforestación en Pillco Marca','Se ejecutará una campaña de reforestación en las riberas del río en Pillco Marca.',2,1);

-- Destacados (5)
INSERT INTO `destacados` (`titulo`,`descripcion`,`idMunicipalidad`,`activo`) VALUES
('Proyecto de agua potable Huánuco 2024','La municipalidad invierte S/ 2.5 millones en la mejora del sistema de agua potable para 15,000 familias.',1,1),
('Nuevo mercado de Amarilis','Se inauguró el nuevo mercado de Amarilis con 120 puestos comerciales.',2,1),
('Carretera Pillco Marca - Tingó','Se ha completado el mejoramiento de la carretera que conecta Pillco Marca con Tingó.',3,1),
('Programa de empleo juvenil','Más de 200 jóvenes de los tres distritos se beneficiarán con el programa de capacitación y empleo.',NULL,1),
('Parque ecológico de Huánuco','Se inauguró el Parque Ecológico con áreas verdes, juegos infantiles y laguna artificial.',1,1);

-- Preguntas frecuentes (5)
INSERT INTO `preguntas_frecuentes` (`pregunta`,`respuesta`,`orden`) VALUES
('¿Cómo puedo hacer un reporte ciudadano?','Para hacer un reporte, primero debes registrarte e iniciar sesión. Luego ve a Reportar y selecciona ubicación en Google Maps.',1),
('¿Cuánto tiempo tarda en resolverse un reporte?','Reportes simples 3-5 días hábiles. Con inversión mayor hasta 30 días.',2),
('¿Puedo hacer reportes anónimos?','Actualmente es necesario registrarse. Tus datos son confidenciales.',3),
('¿Cómo me entero del estado de mi reporte?','Recibirás notificación. Estados: Pendiente, En Proceso y Resuelto.',4),
('¿Qué tipos de problemas puedo reportar?','Infraestructura, limpieza, seguridad, salud, educación, transporte, agua y desagüe, otros.',5);

-- Slider imágenes (7)
INSERT INTO `slider_imagenes` (`titulo`,`imagen`,`seccion`,`orden`) VALUES
('Vista panorámica de Huánuco','/img/slider/huanuco-1.jpg','home',1),
('Parque Principal de noche','/img/slider/huanuco-2.jpg','home',2),
('Plaza de Armas','/img/slider/huanuco-3.jpg','home',3),
('Noticia: Festival gastronómico','/img/slider/noticia-1.jpg','noticias',1),
('Noticia: Jornada de limpieza','/img/slider/noticia-2.jpg','noticias',2),
('Destacado: Proyecto agua potable','/img/slider/dest-1.jpg','destacados',1),
('Destacado: Nuevo mercado','/img/slider/dest-2.jpg','destacados',2);

-- Comentarios (8)
INSERT INTO `comentarios` (`idUser`,`idReporte`,`idNoticia`,`contenido`,`activo`) VALUES
(1,1,NULL,'Ese bache lleva más de 2 meses. Ya han caído varios motociclistas.',1),
(2,1,NULL,'Confirmo, es muy peligroso especialmente de noche.',1),
(3,NULL,1,'Participaré con mi familia. Es una excelente iniciativa.',1),
(4,4,NULL,'La posta médica necesita más personal urgente.',1),
(5,NULL,3,'¿Habrá puestos de comida para celíacos?',1),
(6,6,NULL,'La carretera está horrible. No se puede pasar en época de lluvias.',1),
(7,7,NULL,'Confirmo el corte de agua. Llevamos 2 días sin servicio.',1),
(8,NULL,5,'Muy buena iniciativa de iluminación LED.',1);

-- Notificaciones (6)
INSERT INTO `notificaciones` (`idUser`,`titulo`,`mensaje`,`leida`,`tipo`,`referenciaId`) VALUES
(1,'Reporte en proceso','Tu reporte \"Bache en Av. Circunvalación\" ha sido tomado por el equipo de mantenimiento.',0,'reporte_estado',1),
(3,'Reporte resuelto','Tu reporte \"Falta de iluminación en Jr. San Martín\" ha sido resuelto.',1,'reporte_estado',3),
(8,'Reporte resuelto','Tu reporte \"Perro vagabundo agresivo\" ha sido atendido.',1,'reporte_estado',9),
(4,'Reporte en proceso','Tu reporte \"Posta médica sin personal\" está siendo evaluado.',0,'reporte_estado',4),
(1,'Nuevo comentario','José Pérez comentó en tu reporte \"Bache en Av. Circunvalación\".',0,'comentario',1),
(5,'Bienvenido','Bienvenido a ReporteCiudadano. Ya puedes crear reportes.',1,'sistema',NULL);

-- Historial estados (7)
INSERT INTO `historial_estados` (`idReporte`,`estadoAnterior`,`estadoNuevo`,`idAdmin`,`observaciones`,`fechaCambio`) VALUES
(1,'pendiente','en_proceso',1,'Equipo de vialidad asignado.','2024-06-10 09:30:00'),
(3,'pendiente','en_proceso',1,'Se gestionó compra de faroles LED.','2024-06-05 14:00:00'),
(3,'en_proceso','resuelto',1,'Se instalaron 4 faroles LED.','2024-06-12 11:00:00'),
(9,'pendiente','en_proceso',3,'La patrol municipal fue despachada.','2024-06-08 16:30:00'),
(9,'en_proceso','resuelto',3,'Se capturó al animal y fue trasladado al albergue.','2024-06-09 10:00:00'),
(5,'pendiente','en_proceso',2,'Ingenieros evaluaron la estructura del puente.','2024-06-11 08:45:00'),
(10,'pendiente','en_proceso',2,'Se realizó inspección del vertimiento.','2024-06-13 10:15:00');

-- Auditoria (6)
INSERT INTO `auditoria` (`tabla`,`idRegistro`,`accion`,`datosAntes`,`datosDespues`,`idUsuario`,`idAdmin`) VALUES
('usuarios',1,'CREATE',NULL,'{\"nomUser\":\"Ana\",\"correoUser\":\"ana.garcia@demo.com\"}',NULL,1),
('reportes',1,'CREATE',NULL,'{\"titulo\":\"Bache en Av. Circunvalación\",\"estado\":\"pendiente\"}',1,NULL),
('reportes',1,'UPDATE','{\"estado\":\"pendiente\"}','{\"estado\":\"en_proceso\"}',NULL,1),
('reportes',3,'UPDATE','{\"estado\":\"en_proceso\"}','{\"estado\":\"resuelto\"}',NULL,1),
('noticias',1,'CREATE',NULL,'{\"titulo\":\"Jornada de limpieza\"}',NULL,1),
('admins',1,'CREATE',NULL,'{\"nomAdmin\":\"Carlos\",\"typeAdmin\":\"superadmin\"}',NULL,NULL);

-- Fin del dump
