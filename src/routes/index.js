//este archivo sera utilizado para configurar todas las rutas principales del sistema

const express = require('express');
const router = express.Router();
const EstudianteRepository = require('../repositories/EstudianteRepository');

//configuracion de ruta inicial de la aplicacion
router.get('/', async (request,response) =>{
    //Probando conexin con la base de datos.
    const lstEstudiantes = await EstudianteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado; ', lstEstudiantes);

    response.send('Bienvenido al laboratorio de IMPS');
});
module.exports = router;