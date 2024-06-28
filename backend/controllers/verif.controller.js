import { pool } from "../db.js";


// AUTENTICAR USUARIO
export const authenticateUser = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        //console.log("correo frontend", correo)
        //console.log("contra frontend", contrasena)

        const [result] = await pool.query('SELECT * FROM usuarios WHERE correoUser = ?', [correo]);

        if (result.length === 0) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        const user = result[0];
        //console.log("",user.contraUser)
        //console.log("", user)

        // Comparación de contraseñas como varchar
        if (contrasena !== user.contraUser) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        res.json({ message: "Inicio de sesión exitoso", user });
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
};


// AUTENTICAR ADMINS
export const authenticateAdmin = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        //console.log("correo frontend", correo)
        //console.log("contra frontend", contrasena)

        const [result] = await pool.query('SELECT * FROM admins WHERE correoAdmin = ?', [correo]);

        if (result.length === 0) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        const admin = result[0];
        //console.log("", admin)
        //console.log("contra backend", admin.contraAdmin)

        // Comparación de contraseñas como varchar
        if (contrasena !== admin.contraAdmin) {
            return res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }

        res.json({ message: "Inicio de sesión exitoso", admin });
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        return res.status(500).json({ message: "Error al conectar con el servidor" });
    }
};

//AUTENTICAR EMAILS
export const authenticateEmails = async (req, res) => {
    try {
        const [admins] = await pool.query('SELECT correoAdmin FROM admins');
        const adminEmails = admins.map(admin => admin.correoAdmin);
        //console.log("Admin Emails:", adminEmails);
        res.json(adminEmails);
    } catch (error) {
        console.error('Error al obtener correos de administradores:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};