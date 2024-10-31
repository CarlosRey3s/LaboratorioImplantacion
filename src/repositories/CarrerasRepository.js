const pool = require('../config/databaseController');
module.exports = {
    //Obtener Todas las carreras
    ObtenerTodasLascarreras: async() => {
        try{
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        }catch(error){
            console.error('Ocurrio un problema al consultar la lista de carreras',error);
        }
    },
    //Obtener Carreras por el id para actualizar
    ObtenerCarrerasPorId: async (idcarrera) =>{
        try{
            
        }catch{}
    },
    agregarCarreras: async (carrera) =>{
        const {idcarrera, carrera} = carrera;
        try {
            const result = await pool.query('INSER INTO carreras (idcarrera,carrera) VALUES (?,?)',[idcarrera,carrera]);
            return result.insertId; // Devuelve el id de la carrera agregada
        } catch (error) {
            console.error('Error al agregar la carrera: ', error);
            return null;
        }
    },
    /**
     * Actualizar Carreras
     */
    actualizarCarreras: async(idcarrera,carrera) => {
        try {
            const result = await pool.query('UPDATE carreras SET carrera = ? WHERE idcarrera = ?',[carrera,idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la Carrera: ', error);
            throw error;
            
        }
    },
    //eliminar una Carrera
    eliminarCarrera: async(idcarrera) =>{
        try {
            const result = await pool.query('DELETE FROM carrea WHERE idcarrera = ?',[idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro')
        }
    }
}