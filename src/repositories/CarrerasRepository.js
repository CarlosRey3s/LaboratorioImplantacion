const pool = require('../config/databaseController');

module.exports = {
    // Obtener todas las carreras
    ObtenerTodasLascarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de carreras', error);
        }
    },

    // Obtener carreras por el ID para actualizar
    ObtenerCarrerasPorId: async (idcarrera) => {
        try {
            const result = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.length > 0 ? result[0] : null; // Devuelve la primera coincidencia (asumiendo que el id es único)
        } catch (error) {
            console.error('Error al obtener la carrera por ID:', error);
            throw error;
        }
    },

    // Agregar una carrera
    agregarCarreras: async (carreras) => {
        const{idcarrera,nombreCarrera} = carreras;
        try {
            const result = await pool.query( 'INSERT INTO carreras (idcarrera, carrera) VALUES (?, ?)',[idcarrera, nombreCarrera]);
            return result.insertId; // Devuelve el ID de la carrera agregada
        } catch (error) {
            console.error('Error al agregar la carrera:', error);
            return null;
        }
    },

    // Actualizar una carrera
    actualizarCarreras: async (idcarrera, carrera) => {
        try {
            const result = await pool.query('UPDATE carreras SET carrera = ? WHERE idcarrera = ?', [carrera, idcarrera]);
            return result.affectedRows > 0; // Devuelve true si se actualizó alguna fila
        } catch (error) {
            console.error('Error al actualizar la carrera:', error);
            throw error;
        }
    },

    // Eliminar una carrera
    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0; // Devuelve true si se eliminó alguna fila
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    }
};
