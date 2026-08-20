export default {
    up: async (pool) => {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                idUser INT AUTO_INCREMENT PRIMARY KEY,
                nomUser VARCHAR(100) NOT NULL,
                apeUser VARCHAR(100) NOT NULL,
                dniUser VARCHAR(20) NOT NULL,
                correoUser VARCHAR(150) NOT NULL,
                contraUser VARCHAR(255) NOT NULL,
                bornUser DATE NOT NULL,
                celUser VARCHAR(20) NOT NULL
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS admins (
                idAdmin INT AUTO_INCREMENT PRIMARY KEY,
                nomAdmin VARCHAR(100) NOT NULL,
                apeAdmin VARCHAR(100) NOT NULL,
                dniAdmin VARCHAR(20) NOT NULL,
                correoAdmin VARCHAR(150) NOT NULL,
                contraAdmin VARCHAR(255) NOT NULL,
                bornAdmin DATE NOT NULL,
                celAdmin VARCHAR(20) NOT NULL,
                typeAdmin VARCHAR(50) NOT NULL
            )
        `);
    },
    down: async (pool) => {
        await pool.query('DROP TABLE IF EXISTS usuarios');
        await pool.query('DROP TABLE IF EXISTS admins');
    }
};
