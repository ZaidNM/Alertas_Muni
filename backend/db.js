import { createPool } from 'mysql2/promise'

//PROMESAS

// FIX: Sin contraseña por defecto para que funcione en otras PCs (si tu MySQL tiene pass, cámbiala local sin commitear)
export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'proyect-uni'
})