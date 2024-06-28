import { pool } from "../db.js";

export const captAdmins = async (req, res) => {
    try {
        const [admins] = await pool.query('SELECT nomAdmin, apeAdmin FROM admins');
        const adminNames = admins.map(admin => ({
            nombre: admin.nomAdmin,
            apellido: admin.apeAdmin
        }));
        res.json(adminNames);
    } catch (error) {
        console.error('Error al obtener nombres de administradores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const captUsers = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT nomUser, apeUser FROM usuarios');
        res.json(users);
        //console.log(users)
    } catch (error) {
        console.error('Error al obtener nombres de administradores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
