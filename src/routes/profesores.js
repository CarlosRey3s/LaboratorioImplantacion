const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

//Enpoint para mostrar todos los profesores
const { format } = require('date-fns');
// Registrar el helper `eq`
router.get('/', async (request, response) => {
    try {
        let profesores = await queries.ObtenerTodosLosProfesores();
        // Formatear fechas de nacimiento
        profesores = profesores.map(profesor => ({
            ...profesor,
            fecha_nacimiento: profesor.fecha_nacimiento
                ? format(new Date(profesor.fecha_nacimiento), 'yyyy-MM-dd') // Ajusta el formato según lo que necesites
                : null
        }));
        response.render('profesores/listado', { profesores });
    } catch (error) {
        console.error('Error al obtener los profesores:', error);
        response.status(500).send('Ocurrió un problema al obtener los datos.');
    }
});
//Enpoint para mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', async (request, response) => {
    response.render('profesores/agregar');
});
// Endpoint para agregar un nuevo profesor
router.post('/agregar', async (request, response) => {
    console.log(request.body); // Esto te permitirá verificar los datos enviados desde el formulario
    const { nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    if (!fecha_nacimiento) {
        return response.render('profesores/agregar', { error: 'Debe proporcionar una fecha de nacimiento válida' });
    }
    try {
        const result = await queries.agregarProfesor({
            nombre,
            apellido,
            fecha_nacimiento,
            profesion,
            genero,
            email,
        });

        if (result) {
            console.log('Profesor agregado correctamente');
            response.redirect('/profesores');
        } else {
            response.render('profesores/agregar', { error: 'Hubo un error al agregar el profesor' });
        }
    } catch (error) {
        console.error('Error al agregar un profesor:', error);
        response.render('profesores/agregar', { error: 'Hubo un problema al agregar el profesor' });
    }
});
/**
     * metdos actualizar
     */
router.get('/editar/:id', async (req, res) => {
    const { id } = req.params; // Obtener el id del estudiante de la URL
    try {
        const profesor = await queries.ObtenerProfesoresPorId(id); // Obtener datos del estudiante
        if (!profesor) {
            return res.status(404).send('Profesor no encontrado');
        }
        res.render('profesores/editar', {profesor });
    } catch (error) {
        console.error('Error obteniendo el profesor:', error);
        res.status(500).send('Error al cargar la página de edición');
    }
});
// Endpoint para actualizar profesor
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email } = req.body;
    console.log('Datos recibidos:', req.body); // Agrega este log para depuración
    try {
        const result = await queries.actualizarProfesor(id, { idprofesor,nombre, apellido,fecha_nacimiento,profesion, genero, email });
        if (result) {
            console.log('Profesor actualizado con éxito');
        } else {
            console.log('No se actualizó ninguna fila');
            res.render('profesores/editar', { error: 'No se puede actualizar el profesor' });
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
        res.render('profesores/editar', { error: 'Hubo un error al actualizar el profesor' });
    }
});
// Endpoint para eliminar una carrera
router.get('/eliminar/:idprofesor', async (request, response) => {
    const { idprofesor } = request.params;
    try {
        const resultado = await queries.eliminarProfesor(idprofesor);
        if (resultado > 0) {
            console.log('Profesor eliminado con éxito');
        }
        response.redirect('/profesores');
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        response.status(500).send('Hubo un error al eliminar el profesor');
    }
});
module.exports = router;