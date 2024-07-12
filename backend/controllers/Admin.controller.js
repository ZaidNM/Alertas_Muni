import { pool } from "../db.js"; // Ajusta la ruta según la estructura de tu proyecto

// OBTENER UN ADMIN
export const getAdmin = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM admins WHERE idAdmin = ?', [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: "admin no encontrado" });
        }

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}

// OBTENER TODOS LOS ADMIN
export const getAdmins = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admins');
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}

// CREAR ADMIN
export const createAdmin = async (req, res) => {
    try {
        const { nombre, apellido, dni, correo, contrasena, dia, mes, ano, celular, tipoAdmin } = req.body;
        const bornAdmin = `${ano}-${mes}-${dia}`; // Construir la fecha de nacimiento

        const [result] = await pool.query(
            "INSERT INTO admins(nomAdmin, apeAdmin, dniAdmin, correoAdmin, contraAdmin, bornAdmin, celAdmin, typeAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [nombre, apellido, dni, correo, contrasena, bornAdmin, celular, tipoAdmin]
        );

        res.json({
            id: result.insertId,
            nomAdmin: nombre,
            apeAdmin: apellido,
            dniAdmin: dni,
            correoAdmin: correo,
            contraAdmin: contrasena,
            bornAdmin: bornAdmin,
            celAdmin: celular,
            typeAdmin: tipoAdmin
        });
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
};

// ACTUALIZAR ADMIN
export const updateAdmin = async (req, res) => {
    try {
        const { nombre, apellido, dni, correo, contrasena, dia, mes, ano, celular, tipoAdmin } = req.body;
        const bornAdmin = `${ano}-${mes}-${dia}`;
        //console.log(req.body)
        const [result] = await pool.query(
            'UPDATE admins SET nomAdmin = ?, apeAdmin = ?, dniAdmin = ?, correoAdmin = ?, contraAdmin = ?, bornAdmin = ?, celAdmin = ?, typeAdmin = ? WHERE idAdmin = ?',
            [nombre, apellido, dni, correo, contrasena, bornAdmin, celular, tipoAdmin, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "admin no encontrado" });
        }

        res.json({ message: "admin actualizado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}

// ELIMINAR ADMIN
export const deleteAdmin = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM admins WHERE idAdmin = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Admin no encontrado" });
        }

        res.json({ message: "admin eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
}
