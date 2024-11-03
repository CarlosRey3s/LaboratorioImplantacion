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