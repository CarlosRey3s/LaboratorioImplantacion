const express = require('express'); 
const router = express.Router(); 
const queries = require('../repositories/EstudianteRepository'); 

 
// Endpoint para mostrar todos los estudiantes 
router.get('/', async (request, response) => { 
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes 
    }); 
    
//endpoint de carreras 
router.get('/agregar', async (request, response) => { 
    try {
        const carreras = await queries.ObtenerCarreras(); // Obtener carreras desde el servicio
        console.log(carreras); // Verificar qué datos se están obteniendo
        response.render('estudiantes/agregar', { carreras }); // Pasar carreras a la vista
    } catch (error) {
        console.error('Error obteniendo carreras:', error);
        response.status(500).send('Error al obtener las carreras');
    }
});
    // Endpoint que permite mostrar el formulario para agregar un nuevo estudiante 
router.get('/agregar', async(request, response) => { 
        // Renderizamos el formulario 
        response.render('estudiantes/agregar'); 
    }); 

    // Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {
    const { nombre, apellido, email, usuario, idcarrera } = request.body;
    try {
        const result = await queries.agregarEstudiante({ nombre, apellido, email, usuario, idcarrera });
        if (result) {
            console.log('Estudiante agregado con éxito');
            response.redirect('/estudiantes');
        } else {
            response.render('estudiantes/agregar', { error: 'No se pudo agregar el estudiante' });
        }
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
        response.render('estudiantes/agregar', { error: 'Hubo un error al agregar el estudiante' });
    }
    });
    /**
     * metdos actualizar
     */
    router.get('/editar/:id', async (req, res) => {
        const { id } = req.params; // Obtener el id del estudiante de la URL
        try {
            const estudiante = await queries.obtenerEstudiantePorId(id); // Obtener datos del estudiante
            const carreras = await queries.ObtenerCarreras();
            if (!estudiante) {
                return res.status(404).send('Estudiante no encontrado');
            }
            res.render('estudiantes/editar', { estudiante, carreras});
        } catch (error) {
            console.error('Error obteniendo el estudiante o las carreras:', error);
            res.status(500).send('Error al cargar la página de edición');
        }
    });
    

    router.post('/editar/:id', async (req, res) => {
        const { id } = req.params;  // id es el idestudiante
        const { nombre, apellido, email, usuario, idcarrera } = req.body;
        try {
            const result = await queries.actualizarEstudiante(id, { nombre, apellido, email, usuario, idcarrera });
            if (result) {
                console.log('Estudiante actualizado con éxito');
                res.redirect('/estudiantes');
            } else {
                res.render('estudiantes/editar', { error: 'No se pudo actualizar el estudiante' });
            }
        } catch (error) {
            console.error('Error al actualizar :', error);
            res.render('estudiantes/editar', { error: 'Hubo un error al actualizar el estudiante' });
        }
    });
    

    // Endpoint que permite eliminar un estudiante 
    router.get('/eliminar/:idestudiante', async(request, response) => { 
        // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante 
        const { idestudiante } = request.params; 
        const resultado = await queries.eliminarEstudiante(idestudiante); 
        if(resultado > 0){ 
            console.log('Eliminado con éxito'); 
        } 
        response.redirect('/estudiantes');
    }); 

  
    
     
    module.exports = router; 