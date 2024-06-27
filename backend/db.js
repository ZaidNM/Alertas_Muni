import { createPool } from 'mysql2/promise'

//PROMESAS

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyect-uni'
})