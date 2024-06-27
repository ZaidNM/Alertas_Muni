import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';

const app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:5173'
}));

app.use(userRoutes);

app.listen(PORT)
console.log(`server ejecutandose en el puerto ${PORT}`)