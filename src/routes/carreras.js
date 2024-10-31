const express = require('express')
const router = express.Router();
const queries = require ('../repositories/CarrerasRepository');

//endpoint para mostrar todos las carreras
router.get('/',async (request,response) => {
    const carrera = await queries.ObtenerTodasLascarreras();
    response.render('carreras/listado', {carrera});
});
//endppoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request,response) =>{
    //Renderizar el formulario
    response.render('carreras/agregar');
});
//enpoint para agregar una carrera
router.post('agregar', async (request,response)=>{
    const{idcarrera,carrera} = request.body
    try{
        const result = await queries.agregarCarreras({idcarrera,carrera});
        if(result){
            console.log('Carrera Agregada Con exito');
        }else{
            response.render('carreras/agregar', {error: 'Hubo un error al agregar la carrera'})
        }
    }catch(error){
        console.error('Error al agregar una carrera:', error);
        response.render('carreras/agregar',{error:'Hubo un problema al agregar carrera'})
    }
});

/**
 * Metodo de actualizar
 */

router.get('/editar/:id', async(req,res) =>{
    const {id} = req.params; // obtener el id carreras
    try{
        const carrera = await queries.ObtenerCarrerasPorId(id);//Obtiene el id de la carrera
        const carreras = await queries.ObtenerTodasLascarreras();
        if(!carrera){
            return res.status(404).send('Carrera no encontrada');
        }
        res.render('carrera/editar', {carrera,carreras});
    }catch(error){
        console.error('Error obtenido ', error);
        res.status(500).send('Error al cargar la pagina de edicion');
    }
});

router.post('/editar/:id', async (req,res) => {
    const {id} = req.params; //id de la carrera
    const {idcarrera,carrera} = req.body;

    try{
        const result = await queries.actualizarCarreras(idcarrera,carrera);
        if(result){
            console.log('Carreras actualizado con exito');
            res.redirect('/carreras');
        }else{
            res.render('carreras/editar', {error: 'No se puede actualizar la carrera'});
        }
    }catch(error){
        console.error('Error al actualizar:', error);
        res.render('carreras/editar', { error: 'Hubo un error al actualizar el estudiante'});
    }
})

router.get('/eliminar/:idcarrera', async(request,response) => {
    const{idcarrera} = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if(resultado > 0){
        console.log('Eliminado con exito');
    }
    response.redirect('/carreras')
});
