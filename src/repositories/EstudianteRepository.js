const pool = require('../config/databaseController');

module.exports = {
    //Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async() => {
        try{
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        }catch(eror){
            console.error('Ocurrio un problema al consultar la lista de estudiantes:',error);

        }
    }
}