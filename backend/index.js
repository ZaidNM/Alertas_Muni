import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/Admin.routes.js';
import verifRoutes from './routes/verificar.routes.js';
import captRoutes from './routes/capt.routes.js';
import reporteRoutes from './routes/reporte.routes.js'; // FIX: reporte con geolocalización del dispositivo

const app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173'
}));

app.use(userRoutes, verifRoutes, captRoutes,adminRoutes, reporteRoutes);

app.listen(PORT)
console.log(`server ejecutandose en el puerto ${PORT}`)