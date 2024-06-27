import { pool } from "../db.js"; // Ajusta la ruta según la estructura de tu proyecto

// OBTENER UN USUARIO
export const getUser = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}

// OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}

// CREAR USUARIO
export const createUser = async (req, res) => {
    try {
        const { nombre, apellido, dni, correo, contrasena, dia, mes, ano, celular } = req.body;
        const bornUser = `${ano}-${mes}-${dia}`; // Construir la fecha de nacimiento

        const [result] = await pool.query(
            "INSERT INTO usuarios(nomUser, apeUser, dniUser, correoUser, contraUser, bornUser, celUser) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombre, apellido, dni, correo, contrasena, bornUser, celular]
        );

        res.json({
            id: result.insertId,
            nomUser: nombre,
            apeUser: apellido,
            dniUser: dni,
            correoUser: correo,
            contraUser: contrasena,
            bornUser: bornUser,
            celUser: celular
        });
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
};

// ACTUALIZAR USUARIO
export const updateUser = async (req, res) => {
    try {
        const { nomUser, apeUser, dniUser, correoUser, contraUser, bornUser, celUser } = req.body;
        const [result] = await pool.query(
            'UPDATE usuarios SET nomUser = ?, apeUser = ?, dniUser = ?, correoUser = ?, contraUser = ?, bornUser = ?, celUser = ? WHERE id = ?',
            [nomUser, apeUser, dniUser, correoUser, contraUser, bornUser, celUser, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}

// ELIMINAR USUARIO
export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}
