const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriasRepository'); // Repositorio de materias

// Endpoint para mostrar todas las materias
router.get('/', async (req, res) => {
    try {
        const materias = await queries.obtenerTodasLasMaterias();
        res.render('materias/listado', { materias }); // Renderiza la vista con la lista de materias
    } catch (error) {
        console.error('Error obteniendo las materias:', error);
        res.status(500).send('Error al cargar la lista de materias');
    }
});

// Endpoint para mostrar el formulario para agregar una nueva materia
router.get('/agregar', (req, res) => {
    res.render('materias/agregar'); // Renderiza el formulario para agregar una materia
});

// Endpoint para agregar una nueva materia
router.post('/agregar', async (req, res) => {
    const { materia } = req.body;

    if (!materia) {
        return res.render('materias/agregar', { error: 'El campo materia es obligatorio' });
    }

    try {
        const result = await queries.agregarMateria({ materia });

        if (result) {
            console.log('Materia agregada con éxito');
            res.redirect('/materias');
        } else {
            res.render('materias/agregar', { error: 'No se pudo agregar la materia' });
        }
    } catch (error) {
        console.error('Error al agregar materia:', error);
        res.render('materias/agregar', { error: 'Hubo un error al agregar la materia' });
    }
});

// Endpoint para mostrar el formulario de edición de una materia
router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const materia = await queries.obtenerMateriaPorId(id);
        if (!materia) {
            return res.status(404).send('Materia no encontrada');
        }
        res.render('materias/editar', { materia });
    } catch (error) {
        console.error('Error obteniendo la materia:', error);
        res.status(500).send('Error al cargar la página de edición');
    }
});

// Endpoint para actualizar una materia
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { materia } = req.body;

    try {
        const result = await queries.actualizarMateria(id, { materia });

        if (result) {
            console.log('Materia actualizada con éxito');
            res.redirect('/materias');
        } else {
            res.render('materias/editar', { error: 'No se pudo actualizar la materia' });
        }
    } catch (error) {
        console.error('Error al actualizar la materia:', error);
        res.render('materias/editar', { error: 'Hubo un error al actualizar la materia' });
    }
});

// Endpoint para eliminar una materia
router.get('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await queries.eliminarMateria(id);

        if (result) {
            console.log('Materia eliminada con éxito');
        }

        res.redirect('/materias');
    } catch (error) {
        console.error('Error al eliminar la materia:', error);
        res.status(500).send('Hubo un error al eliminar la materia');
    }
});

module.exports = router;