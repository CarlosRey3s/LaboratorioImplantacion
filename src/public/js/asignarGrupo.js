// En esta lista se agregaran los registros temporales 
let estudiantes = []; 
let idgrupo; 
 
// Funcion que permite agregar un estudiante a la tabla temporal 
function agregarEstudiante(idgrupo) { 
 
     
    // Si no se ha seleccionado un elemento del select, debemos advertirlo 
    if ($("#estudiante").prop("selectedIndex") === 0) { 
 
        alert("Debe seleccionar un estudiante"); 
    } 
 
    // Validamos si el estudiante ya existe en la lista 
    if (validarEstudianteExiste()) { 
 
        alert("El estudiante ya ha sido agregado."); 
 
    } else { 
 
        estudiantes.push({ 
 
            idestudiante: $("#estudiante").val(), 
 
            nombrecompleto: $("#estudiante option:selected").text().trim(), 
 
            idgrupo: $("#idgrupo").val() 
        }); 
 
        mostrarEstudiantes(); 
    } 
} 
 
function mostrarEstudiantes() { 
 
    let contenido = $("#contenido_tabla"); 
 
    let data = $("#data"); 
 
    // Se limpia la informacion oculta 
    data.empty(); 
 
    // Se limpia la informacion del contenido de la tabla 
    contenido.empty(); 
 
    if (estudiantes.length > 0) { 

 
        for (let i = 0; i < estudiantes.length; i++) { 
            // Se agrega la informacion visual en la tabla 
            contenido.append("<tr>"); 
            contenido.append("<td>" + estudiantes[i].idestudiante + "</tr>"); 
            contenido.append("<td>" + estudiantes[i].nombrecompleto + "</tr>"); 
            contenido.append("<td>" + "<a class='btn btn-danger' href='#' onclick='eliminarEstudiante(event," + i + ")'>Eliminar</a>" + "</tr>"); 
            // Se agrega la información oculta que se enviará finalmente al controlador 
            data.append("<input type='hidden' name='grupo_estudiantes[" + i + "][idgrupo]' value='" + estudiantes[i].idgrupo + "'/>"); 
            data.append("<input type='hidden' name='grupo_estudiantes[" + i + "][idestudiante]' value='" + estudiantes[i].idestudiante + "'/>"); 
        } 
 
    } else { 
        // En caso de que la lista no tenga informacion, mostraremos un mensaje 
        contenido.append("<tr>"); 
        contenido.append("<td colspan='3' style='text-align: center'>No hay información.</td>"); 
        contenido.append("</tr>"); 
    } 
 
    // se agrega siempre el idgrupo 
    data.append("<input type='hidden' name='idgrupo' value='" + $("#idgrupo").val()  + "'/>") 
 
   // $('#data').val(JSON.stringify(estudiantes)); 
     
} 
 
// Funcion que permite validar si un estudiante ya existe 
function validarEstudianteExiste() { 
    let control = false; // Variable bandera 
    // Recorremos la listita de estudiantes 
    for (let index = 0; index < estudiantes.length; index++) { 
        // Evaluamos si el estudiante en la pos de la lista es igual al capturado por el select 
        if (estudiantes[index].idestudiante === $("#estudiante").val()) { 
            control = true; // la bandera indica igualdad 
            break; // detemos el flujo  
        } 
    } 
    return control; // Retornarmos el valor logico correspondiente 
} 
 
// Funcion que permite eliminar un dato de la tablita 
function eliminarEstudiante(event, index) { 
    // Buscamos detener el evento que da seguimiento a la URL (cuando el usuario de click en eliminar) 
    event.preventDefault(); 
    // Eliminamos el registro de la tabla temporal 
    estudiantes.splice(index, 1); 
    // Refrescamos la tablita 
    mostrarEstudiantes(); 
} 
