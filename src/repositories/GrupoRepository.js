const pool = require('../config/databaseController');

module.exports = {
  ObtenerTodoslosGrupos: async () => {
    try {
        const result = await pool.query('SELECT * FROM grupos');
        return result;
    } catch (error) {
        console.error('Ocurrió un problema al consultar la lista de grupos', error);
    }
},
    agregarGrupo: async (grupo) => {
        const { num_grupo, anio, ciclo, idmateria, idprofesor } = grupo;

        try {
            const result = await pool.query(
                `INSERT INTO grupos(num_grupo, anio, ciclo, idmateria, idprofesor)
                VALUES (?, ?, ?, ?, ?)`,
                [num_grupo, anio, ciclo, idmateria, idprofesor]
            );
            
            return result.insertId; // Devuelve el ID del registro insertado
        } catch (error) {
            console.error('Error al agregar el grupo:', error);
            throw error;
        }
    },
    actualizarGrupo: async (idgrupo, grupo) => {
        const { num_grupo, anio, ciclo, idmateria, idprofesor } = grupo;
        try {
            const result = await pool.query(
                `UPDATE grupos 
                 SET num_grupo = ?, anio = ?, ciclo = ?, idmateria = ?, idprofesor = ? 
                 WHERE idgrupo = ?`,
                [num_grupo, anio, ciclo, idmateria, idprofesor, idgrupo]
            );
            return result.affectedRows > 0; // Devuelve true si se actualizó alguna fila
        } catch (error) {
            console.error('Error al actualizar el grupo:', error);
            throw error; // Lanza el error para que sea manejado por el controlador
        }
    },
    /**Obtener grupo por ID */
    obtenerGrupoPorId: async (idgrupo) => {
        try {
            const result = await pool.query('SELECT * FROM grupos WHERE idgrupo = ?', [idgrupo]);
            return result.length > 0 ? result[0] : null; // Devuelve el primer resultado o null si no existe
        } catch (error) {
            console.error('Error al obtener el grupo por ID:', error);
            throw error; // Lanza el error para que sea manejado por el controlador
        }
    },
    /**ACTUALIZAR EL GRUPO  */
    actualizarGrupo: async (idgrupo, grupo) => {
        const { num_grupo, anio, ciclo, idmateria, idprofesor } = grupo;
        try {
            const result = await pool.query(
                `UPDATE grupos 
                 SET num_grupo = ?, anio = ?, ciclo = ?, idmateria = ?, idprofesor = ? 
                 WHERE idgrupo = ?`,
                [num_grupo, anio, ciclo, idmateria, idprofesor, idgrupo]
            );
            return result.affectedRows > 0; // Devuelve true si se actualizó alguna fila
        } catch (error) {
            console.error('Error al actualizar el grupo:', error);
            throw error;
        }
    },
    
      /**Eliminar grupo por id */  
    eliminarGrupo: async (idgrupo) => {
        try {
            const result = await pool.query('DELETE FROM grupos WHERE idgrupo = ?', [idgrupo]);
            return result.affectedRows > 0; // Devuelve true si se eliminó alguna fila
        } catch (error) {
            console.error('Error al eliminar el grupo:', error);
            throw error; // Lanza el error para que sea manejado por el controlador
        }
    },

    // Asignar grupo 
    asignarGrupo: async(asignacion) => { 
        try { 
          const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ", asignacion); 
          console.log('resultado: ', result) 
          return result; 
   
        } catch (error) { 
          console.log('Ocurrio un problema al asignar el grupo', error); 
        } 
      } 
  
    
}
 
 