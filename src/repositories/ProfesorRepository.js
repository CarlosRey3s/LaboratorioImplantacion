const pool = require('../config/databaseController');

module.exports = {
    // Obtener todos los profesores
    ObtenerTodosLosProfesores: async () => {
        try {
            const result = await pool.query('SELECT idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email FROM profesores;');
            
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de profesores:', error);
            throw error; // Ensure the calling function knows about the error
        }
    },

    // Obtener profesor por ID
    ObtenerProfesoresPorId: async (idprofesor) => {
        try {
            const result = await pool.query('SELECT * FROM profesores WHERE idprofesor = ?', [idprofesor]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error('Error al obtener el profesor por ID:', error);
            throw error;
        }
    },

    // Agregar un nuevo profesor
    agregarProfesor: async (profesor) => {
        const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = profesor; // Usa "fecha_nacimiento"
        try {
            const result = await pool.query(
                `INSERT INTO profesores(nombre, apellido, fecha_nacimiento, profesion, genero, email)
                 VALUES (?, ?, STR_TO_DATE(?, '%Y-%m-%d'), ?, ?, ?)`,
                [nombre, apellido, fecha_nacimiento, profesion, genero, email]
            );
            
            return result.insertId; // Devuelve el ID del registro insertado
        } catch (error) {
            console.error('Error al agregar el profesor:', error);
            throw error;
        }
    },
    
    // Actualizar un profesor
    actualizarProfesor: async (idprofesor, profesor) => {
        try {
            const result = await pool.query(
                'UPDATE profesores SET nombre = ?, apellido = ?, fecha_nacimiento = ?, profesion = ?, genero = ?, email = ? WHERE idprofesor = ?',
                [profesor.nombre, profesor.apellido, profesor.fecha_nacimiento, profesor.profesion, profesor.genero, profesor.email, idprofesor]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el profesor:', error);
            throw error;
        }
      },
      
    

    // Eliminar un profesor
    eliminarProfesor: async (idprofesor) => {
        try {
            const result = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
            return result.affectedRows > 0; // Return true if a row was deleted
        } catch (error) {
            console.error('Error al eliminar el profesor:', error);
            throw error;
        }
    },
};
