const pool = require('../config/databaseController'); 
 
module.exports = { 
 
    // Consulta para obtener todos los estudiantes 
obtenerTodosLosEstudiantes: async() => { 
        try { 
            const result = await pool.query('SELECT * FROM estudiantes'); 
            return result; 
        } catch (error) { 
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error); 
        } 
    }, 
  obtenerEstudiantePorId: async (idestudiante) => { 
      try { 
          const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = ?', [idestudiante]); 
          return result.length > 0 ? result[0] : null; // Devuelve el estudiante si existe, de lo contrario null
      } catch (error) { 
          console.error('Ocurrió un problema al consultar el estudiante por ID: ', error); 
          throw error; // Propaga el error para ser manejado en el controlador
      } 
  },
  
//sin implementar
ObtenerCarreras: async () => {
  try {
      const rows = await pool.query('SELECT * FROM carreras');
      return rows; // Asegúrate de devolver las filas del resultado
  } catch (error) {
      console.error('Ocurrió un problema al consultar la lista de carreras: ', error);
      throw error; // Propaga el error para manejarlo en el controlador si es necesario
  }
},
/**
 * 
 */
    // Agregar un estudiante
    agregarEstudiante: async (estudiante) => {
      const { nombre, apellido, email, usuario, idcarrera } = estudiante;
      try {
          const result = await pool.query('INSERT INTO estudiantes (nombre, apellido, email, usuario, idcarrera) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, email, usuario, idcarrera]);
          return result.insertId; // Devuelve el ID del estudiante agregado
      } catch (error) {
          console.error('Error al agregar el estudiante: ', error);
          return null;
      }
    },

 /** 
  * ACTUALIZAR ESTUDIANTES
  */
 actualizarEstudiante: async (idestudiante, estudiante) => {
  try {
      const result = await pool.query(
          'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?',
          [estudiante.nombre, estudiante.apellido, estudiante.email, estudiante.idcarrera, estudiante.usuario, idestudiante]
      );
      return result.affectedRows > 0;
  } catch (error) {
      console.error('Error al actualizar el estudiante:', error);
      throw error;
  }
},

   // Eliminar un estudiante 
   eliminarEstudiante: async(idestudiante) => { 
    try{ 
      const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]); 
      return result.affectedRows > 0; 
    }catch(error){ 
      console.error('Erro al eliminar el registro', error); 
    } 
  } 
} 