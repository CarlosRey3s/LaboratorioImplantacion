const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoRepository'); // Repositorio de grupos


//Enpoint para mostrar todos los grupos
router.get('/', async (request, response) =>{
  const grupos = await queries.ObtenerTodoslosGrupos();
  response.render('grupos/listado',{ grupos });
});

    // Endpoint que permite mostrar el formulario para agregar un nuevo grupo
    router.get('/agregar', async(request, response) => { 
      // Renderizamos el formulario 
      response.render('grupos/agregar'); 
  });

  router.post('/agregar', async (request, response) => {
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    try {
        const result = await queries.agregarGrupo({ num_grupo, anio, ciclo, idmateria, idprofesor });
        if (result) {
            console.log('Grupo agregado con éxito');
           // response.redirect('/estudiantes');
        } else {
            response.render('grupos/agregar', { error: 'No se pudo agregar el grupo' });
        }
    } catch (error) {
        console.error('Error al agregar el grupo:', error);
        response.render('grupos/agregar', { error: 'Hubo un error al agregar el grupo' });
    }
    });
    /**Para mostrar el formulario con los datos a editar */
    router.get('/editar/:id', async (req, res) => {
      const { id } = req.params;
      try {
          const grupo = await queries.obtenerGrupoPorId(id); // Cambiado a obtenerGrupoPorId
          if (!grupo) {
              return res.status(404).send('Grupo no encontrado');
          }
          res.render('grupos/editar', { grupo }); // Cambiado a renderizar la vista de grupos
      } catch (error) {
          console.error('Error obteniendo el grupo:', error);
          res.status(500).send('Error al cargar la página de edición');
      }
  });
  /**ACTUALIZAR EL GRUPO */
  router.post('/editar/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del grupo desde los parámetros
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = req.body; // Obtener los datos del formulario

    try {
        // Llamar a la función de consulta para actualizar el grupo
        const actualizado = await queries.actualizarGrupo(id, { num_grupo, anio, ciclo, idmateria, idprofesor });

        if (actualizado) {
            console.log('Grupo actualizado con éxito.');
            res.redirect('/grupos'); // Redirigir a la lista de grupos después de actualizar
        } else {
            console.log('No se encontró el grupo o no se realizaron cambios.');
            res.status(404).send('No se pudo actualizar el grupo.');
        }
    } catch (error) {
        console.error('Error al actualizar el grupo:', error);
        res.status(500).send('Error al intentar actualizar el grupo.');
    }
});

/**Eliminar grupos */
    router.get('/eliminar/:idgrupo', async (request, response) => {
      const { idgrupo } = request.params;
      try {
          const resultado = await queries.eliminarGrupo(idgrupo); // Llama a la función eliminarGrupo
          if (resultado) {
              console.log('Grupo eliminado con éxito');
          }
          response.redirect('/grupos'); // Redirige a la lista de grupos
      } catch (error) {
          console.error('Error al eliminar el grupo:', error);
          response.status(500).send('Hubo un error al eliminar el grupo');
      }
     });
  
/**ANEXO DE LA GUIA */
// Enpoint que permite navegar a la pantalla para asignar un grupo 
router.get('/asignargrupo/:idgrupo', async (request, reponse) => { 
    const { idgrupo } = request.params; 
    // Consultamos el listado de estudiantes disponible 
    const lstEstudiantes = await estudiantesQuery.obtenerTodosLosEstudiantes(); 
   
    reponse.render('grupos/asignargrupo', { lstEstudiantes, idgrupo }); 
  }); 
   
  // Endpoint que permite asignar un grupo 
  router.post('/asignargrupo', async (request, response) => { 
   
    const data = request.body; 
   
    let resultado = null; 
   
    const result = processDataFromForm(data); 
   
    for (const tmp of result.grupo_estudiantes) { 
      //const asignacion = [tmp.idgrupo, tmp.idestudiante]; 
      //const { idgrupo, idestudiante } = tmp; 
      //const asignacionObj = {idgrupo, idestudiante}; 
   
      resultado = await queries.asignarGrupo(tmp); 
    } 
   
    if (resultado) { 
      request.flash('success', 'Asignacion de grupo realizada con exito'); 
    } else { 
      request.flash('error', 'Ocurrio un problema al realizar asignacion'); 
    } 
   
    response.redirect('/grupos'); 
  }); 
   
  // Función para procesar los datos del formulario 
  function processDataFromForm(data) { 
    const result = { 
      grupo_estudiantes: [] 
    }; 
   
    for (const key in data) { 
      if (key.startsWith('grupo_estudiantes[')) { 
        const match = key.match(/\[(\d+)\]\[(\w+)\]/); 
        if (match) { 
          const index = parseInt(match[1]); 
          const property = match[2]; 
          if (!result.grupo_estudiantes[index]) { 
            result.grupo_estudiantes[index] = {}; 
          } 
          result.grupo_estudiantes[index][property] = data[key]; 
        } 
      } else { 
        result[key] = data[key]; 
      } 
    } 
   
    return result; 
  } 
  module.exports = router;