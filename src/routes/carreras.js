const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarrerasRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.ObtenerTodasLascarreras();
    response.render('carreras/listado', { carreras });
});

// Endpoint para mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async (request, response) => {
    response.render('carreras/agregar');
});

// Endpoint para agregar una carrera
router.post('/agregar', async (request, response) => {
    const { idcarrera, nombreCarrera } = request.body;
    try {
        const result = await queries.agregarCarreras({ idcarrera,nombreCarrera });

        if (result) {
            //console.log('Carrera agregada con éxito');
            request.flash('success', 'Registro insertado con éxito');
         
        } else {
            request.flash('error','Ocurrio un problema al guardar el registro');
            response.render('carreras/agregar', { error: 'Hubo un error al agregar la carrera' });
        }
    } catch (error) {
        console.error('Error al agregar una carrera:', error);
        response.render('carreras/agregar', { error: 'Hubo un problema al agregar la carrera' });
    }
});

// Endpoint para mostrar el formulario de edición de una carrera
router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const carrera = await queries.ObtenerCarrerasPorId(id);
        if (!carrera) {
            return res.status(404).send('Carrera no encontrada');
        }
        res.render('carreras/editar', { carrera});
    } catch (error) {
        console.error('Error al obtener la carrera:', error);
        res.status(500).send('Error al cargar la página de edición');
    }
});

// Endpoint para actualizar una carrera
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { idcarrera, carrera } = req.body;

    try {
        const result = await queries.actualizarCarreras(idcarrera, carrera);
        if (result) {
            console.log('Carrera actualizada con éxito');
            res.redirect('/carreras');
        } else {
            res.render('carreras/editar', { error: 'No se puede actualizar la carrera' });
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
        res.render('carreras/editar', { error: 'Hubo un error al actualizar la carrera' });
    }
});

// Endpoint para eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    try {
        const resultado = await queries.eliminarCarrera(idcarrera);
        if (resultado > 0) {
            console.log('Carrera eliminada con éxito');
        }
        response.redirect('/carreras');
    } catch (error) {
        console.error('Error al eliminar la carrera:', error);
        response.status(500).send('Hubo un error al eliminar la carrera'
        );}
});

module.exports = router;
